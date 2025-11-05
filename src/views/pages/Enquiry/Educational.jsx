/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Container, Form } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { isEqual } from "lodash";
import { useSelector } from "react-redux";

import "./style.scss";
import { FooterContainer } from "../../../components/Enquiry";
import { defaultEducationalValues } from "../../../utils/constants/api/defaultValue";
import CustomSelect, { ModifiedSelect } from "../../../components/shared/options/CustomSelect";
import { InputItem, Label } from "../../../components/shared/forms";
import { useGetStandardQuery } from "../../../api/standard";
import { useGetSchoolQuery } from "../../../api/school";
import { Validation } from "../../../utils/constants/validation/validation";
import { actions } from "../../../redux/store";
import { setFormValues } from "../../../utils/constants/api/formData";
import { OPTIONS } from "../../../utils/constants/option-menu";
import { StandardModifiedSelectStyle, SubjectSelect } from "../../../components/shared/options/styles/CreatableSelect";
import { useGetStdAndSubByStandardQuery } from "../../../api/standardAndSubject";
import { isValidArray } from "../../../utils/constants/validation/array";
import MySelect, { Option, ValueContainer, animatedComponents, MultiValue } from "../../../components/shared/options/CheckboxSelect";

const EducationalDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isUpdate = location?.state?.studentId;
    const { educationData } = useSelector((state) => state.enquiry);
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [isSubjectFirstTime, setIsSubjectFirstTime] = useState(true);
    const [standardData, setStandardData] = useState([]);
    const [schoolOptions, setSchoolOptions] = useState([]);
    const [stdSubjects, setStdSubjects] = useState([]);
    const [selectedOption, setSelectedOption] = useState([]);

    const form = useForm({
        defaultValues: defaultEducationalValues,
        resolver: yupResolver(Validation.EDUCATION_FORM),
    });

    const { register, setValue, getValues, watch, handleSubmit, control } = form;

    const formData = watch();
    const standardId = useMemo(() => formData?.standardId, [formData]);

    const { data: standardResponse, isStandardFetching } = useGetStandardQuery(null, { refetchOnMountOrArgChange: true });
    const { data: subjectsFromStandard, isSubjectsFetching } = useGetStdAndSubByStandardQuery(standardId, {
        skip: !standardId,
    });

    const { data: schoolResponse, isSchoolFetching } = useGetSchoolQuery(null, { refetchOnMountOrArgChange: true });

    const countTotalAmount = useCallback(() => {
        const { fees = null, discount = null } = getValues();
        setValue("totalAmount", Number(fees) - Number(discount));
    }, [setValue, getValues]);

    useEffect(() => {
        if (isFirstTime || isSubjectFirstTime || isEqual(educationData, formData)) return;
        actions.enquiry.addEducationData(formData);
    }, [formData, educationData, isFirstTime, isSubjectFirstTime]);

    // Sets the FormData in redux, when page is mounting first time
    useEffect(() => {
        if (!educationData || !isFirstTime || !schoolOptions?.length) return; // Not found Enquiry OR Not updating the first Time it returns
        setFormValues(educationData, setValue);
        const school = educationData["school"];
        handleSchoolOptions(school);
        setIsFirstTime(false);
        countTotalAmount();
    }, [educationData, isFirstTime, setValue, schoolOptions]);

    // Sets the standard Options
    useEffect(() => {
        if (standardResponse?.status !== 200) return;
        const standardOptions = standardResponse?.data?.map(({ name, fees, _id }) => {
            return { label: name, value: _id, fees };
        });
        setStandardData(standardOptions);
    }, [standardResponse, setValue, countTotalAmount]);

    // Sets the School Options
    useEffect(() => {
        if (schoolResponse?.status !== 201) return;
        setSchoolOptions(() => schoolResponse?.data?.map(({ name, _id }) => ({ value: name, label: name, id: _id })));
    }, [schoolResponse]);

    const formatStdSubject = useCallback((subjects) => {
        return subjects?.map(({ sub, subjectId, fees: subjectFees }) => ({ label: sub, value: subjectId, subjectFees }));
    }, []);

    // Sets the subjects Options
    useEffect(() => {
        if (!isValidArray(subjectsFromStandard)) return;
        const allOption = formatStdSubject(subjectsFromStandard);
        setStdSubjects(allOption);
        const selectedSubjectsOption = getValues("subjects");
        // sets all options as selected if no subject or all subjects get selected
        if (!isValidArray(selectedSubjectsOption) || selectedSubjectsOption?.length >= allOption?.length) {
            setSelectedOption([{ label: "All", value: "*" }, ...allOption]);
        }
    }, [subjectsFromStandard, getValues]);

    const handleSubjectChange = useCallback(
        (selectedSubjectsOption) => {
            if (isValidArray(selectedSubjectsOption) && selectedSubjectsOption?.length < stdSubjects.length) {
                const sumOfSelectedSubjectsAmount = selectedSubjectsOption.reduce(
                    (previousValue, currentValue) => previousValue + Number(currentValue?.subjectFees || 0),
                    0
                );
                setValue("fees", sumOfSelectedSubjectsAmount);
                setValue("subjects", selectedSubjectsOption);
            } else {
                const stadardFees = standardData?.find((stdObj) => stdObj?.value === getValues("standardId"))?.fees;
                setValue("fees", stadardFees || null);
                setValue("subjects", []);
            }
            countTotalAmount();
            setSelectedOption(
                !isValidArray(selectedSubjectsOption) ? [{ label: "All", value: "*" }, ...formatStdSubject(subjectsFromStandard)] : selectedSubjectsOption
            );
        },
        [stdSubjects, getValues, setValue, standardData, countTotalAmount]
    );

    useEffect(() => {
        if (!isSubjectFirstTime || !stdSubjects?.length) return;
        let subjects = getValues("subjects");

        if (educationData?.subjects.length > 0 && educationData?.subjects[0].subjectId) {
            subjects = stdSubjects.filter((item) => {
                const isSubjectSelected = educationData.subjects.some((storedSubjects) => storedSubjects.subjectId === item?.value);
                return isSubjectSelected;
            });

            subjects = subjects?.length === stdSubjects.length ? [] : subjects;
        }
        handleSubjectChange(subjects);
        setIsSubjectFirstTime(false);
    }, [stdSubjects, isSubjectFirstTime]);

    const handleSchoolOptions = (selectedSchool) => {
        const selectedSchoolFromOptions = schoolOptions?.find((school) => school?.value === selectedSchool);
        if (selectedSchoolFromOptions) actions.enquiry.setSelectedSchool(selectedSchoolFromOptions);
        else setSchoolOptions([...schoolOptions, { value: selectedSchool, label: selectedSchool, id: "NEW_SCHOOL" }]);
    };

    const handleStandardChange = (selectedOption) => {
        setValue("standardId", selectedOption ? selectedOption.value : "");
        setValue("fees", selectedOption?.fees);
        setValue("subjects", []);
        countTotalAmount();
    };

    const handleEducationalForm = (data) => navigate("/enquiry/form-third");

    const handleCreate = useCallback(
        (inputValue) => {
            const newValue = { value: inputValue, label: inputValue, id: "NEW_SCHOOL" };
            actions.enquiry.setSelectedSchool(newValue);
            setSchoolOptions((prevOptions) => [...prevOptions, newValue]);
            setValue("school", inputValue);
        },
        [setValue]
    );

    const handleSelectChange = (selectedOption, key) => {
        setValue(key, selectedOption?.value ?? "");
        actions.enquiry.setSelectedSchool(selectedOption);
    };

    const isValidNewOption = (inputValue, selectValue, selectOptions) => {
        const isValueSelected = selectValue.some((option) => option?.label?.toLowerCase() === inputValue?.toLowerCase());
        const isValueExisting = selectOptions.some((option) => option?.label?.toLowerCase() === inputValue?.toLowerCase());
        return !isValueSelected && !isValueExisting;
    };

    const handleDiscount = (e) => {
        setValue("discount", e.target.value);
        countTotalAmount();
    };

    return (
        <Container className="educational-container pb-4 pb-md-4" fluid>
            <Form onSubmit={handleSubmit(handleEducationalForm)}>
                <Row className="mb-2">
                    <Col sm={12} lg={6} style={{ height: "114px" }}>
                        <ModifiedSelect
                            className="educational_select_width"
                            title="Standard"
                            name="standardId"
                            control={control}
                            handleCustomChange={(data) => handleStandardChange(data)}
                            options={standardData}
                            form={form}
                            CustomLabelStyle={"default_label mb-2"}
                            CustomSelectStyle={StandardModifiedSelectStyle}
                            isDisabled={isUpdate}
                        />
                    </Col>
                    <Col sm={12} lg={6} style={{ height: "114px" }}>
                        <div className="p-0 m-0">
                            <Form.Label className="w-100 default_label text-start mb-2" htmlFor="pass_from">
                                Pass From
                                <div style={{ margin: "8px 0px 0px 0px" }}>
                                    <Controller
                                        control={control}
                                        name={`passfrom`}
                                        render={({ field }) => (
                                            <Form.Check
                                                id="pass_from"
                                                type="checkbox"
                                                checked={field?.value === "true"}
                                                onChange={(e) => field?.onChange(e?.target?.checked ? "true" : "false")}
                                                className="check_box_wrapper contact_number_checkbox m-0 p-0 pb-2"
                                                style={{ margin: "8px 0px 0px 0px" }}
                                            />
                                        )}
                                    />
                                </div>
                            </Form.Label>
                        </div>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col>
                        <CustomSelect
                            className="educational_select_width"
                            form={form}
                            {...register("schoolTime")}
                            field={register("schoolTime")}
                            options={OPTIONS.SCHOOL_TIMES}
                            hideSelectedOptions={false}
                            isFetching={isSchoolFetching}
                        />
                    </Col>
                    <Col sm={12} lg={6}>
                        <InputItem
                            title="Last year percentage"
                            name="lastYearPercentage"
                            form={form}
                            type="number"
                            min="0"
                            max="100"
                            classNameLabel={"default_label"}
                            className={"form__input border-0 form-control-lg"}
                        />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col sm={12} lg={6}>
                        <CustomSelect
                            allowCreateOption={true}
                            className="educational_select_width"
                            form={form}
                            {...register("school")}
                            field={register("school")}
                            options={schoolOptions}
                            handleCreate={handleCreate}
                            isValidNewOption={isValidNewOption}
                            onCustomHandleChange={(data) => handleSelectChange(data, "school")}
                            isFetching={isSchoolFetching}
                        />
                    </Col>
                    <Col sm={12} lg={6}>
                        <Label
                            name={"subjectSelection"}
                            title="Subject selection"
                            form={form}
                            classNameLabel={"default_label"}
                            className={"form__input border-0 form-control-lg"}
                        />
                        <MySelect
                            options={isValidArray(stdSubjects) ? stdSubjects : []}
                            isMulti={true}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            value={selectedOption}
                            onChange={(val) => handleSubjectChange(val)}
                            allowSelectAll={isValidArray(stdSubjects)}
                            components={{
                                Option,
                                ValueContainer,
                                animatedComponents,
                                MultiValue,
                                IndicatorSeparator: () => null,
                                LoadingIndicator: () => null,
                            }}
                            noOptionsMessage={() => "No Subjects available"}
                            CustomSelectStyle={SubjectSelect}
                            isDisabled={isUpdate}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <h2 className="middle-header">Fees Detail</h2>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col sm={12} md={4}>
                        <InputItem
                            disabled
                            size={4}
                            title="Fee"
                            name="fees"
                            type="number"
                            form={form}
                            min={0}
                            classNameLabel={"default_label"}
                            className={"form__input border-0 form-control-lg"}
                        />
                    </Col>
                    <Col sm={12} md={4}>
                        <InputItem
                            onInput={handleDiscount}
                            size={4}
                            title="Discount"
                            name="discount"
                            type="number"
                            form={form}
                            min={0}
                            classNameLabel={"default_label"}
                            className={"form__input border-0 form-control-lg"}
                        />
                    </Col>
                    <Col sm={12} md={4}>
                        <InputItem
                            disabled
                            size={4}
                            title="Total Amount"
                            name="totalAmount"
                            type="number"
                            form={form}
                            min={0}
                            classNameLabel={"default_label"}
                            className={"form__input border-0 form-control-lg"}
                        />
                    </Col>
                </Row>
                <Row>
                    <InputItem
                        title="Remarks ( for fees )"
                        name="remarkForFees"
                        form={form}
                        classNameLabel={"default_label"}
                        className={"form__input border-0 form-control-lg"}
                    />
                </Row>
                <Row>
                    <InputItem
                        title="Remarks ( for student )"
                        name="remarkForStudent"
                        form={form}
                        classNameLabel={"default_label"}
                        className={"form__input border-0 form-control-lg"}
                    />
                </Row>
                <Row>
                    <InputItem
                        title="Reference name"
                        name="reference"
                        form={form}
                        classNameLabel={"default_label"}
                        className={"form__input border-0 form-control-lg"}
                    />
                </Row>
                <FooterContainer text="Next" currentPage={2} isLoading={isSchoolFetching || isStandardFetching || isSubjectsFetching} />
            </Form>
        </Container>
    );
};

export default EducationalDetail;

/* <Col sm={12} lg={6}>
            <Form.Label className="default_label">Subject selection</Form.Label>
            <MySelect
                options={isValidArray(stdSubjects) ? stdSubjects : []}
                isMulti={true}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                value={selectedOption}
                onChange={(val) => {
                    setSelectedOption(val);
                    form.setValue("subjects", val);
                }}
                allowSelectAll={isValidArray(stdSubjects) ? true : false}
                components={{
                    Option,
                    ValueContainer,
                    IndicatorSeparator: () => null,
                    LoadingIndicator: () => null,
                    animatedComponents,
                }}
                noOptionsMessage={() => "No Subjects available"}
                isDisabled={true}
            />
                    </Col> */
