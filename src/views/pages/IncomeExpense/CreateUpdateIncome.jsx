import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { MdModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";

import { ErrorMessage, InputItem, Label } from "../../../components/shared/forms";
import { defaultIncomeValue } from "../../../utils/constants/api/defaultValue";
import { StandardModifiedSelectStyle } from "../../../components/shared/options/styles/CreatableSelect";
import { ModifiedSelect } from "../../../components/shared/options/CustomSelect";
import { CustomDatePicker } from "../Enquiry/Enquiry";
import { useCreateIncomeMutation, useUpdateIncomeMutation } from "../../../api/incomeAndExpense";
import { actions } from "../../../redux/store";
import { useGetCategoryQuery } from "../../../api/category";
import { isValidArray } from "../../../utils/constants/validation/array";
import useErrorCatcher from "../../../utils/constants/hooks/useErrorCatcher";
import { Validation } from "../../../utils/constants/validation/validation";
import { isStatusInclude } from "../../../utils/constants/validation/response";

const CreateUpdateIncome = () => {
    const { state } = useLocation();
    const { incomeId } = useParams();
    const navigate = useNavigate();

    const [category, setCategory] = useState([]);

    const form = useForm({
        defaultValues: defaultIncomeValue,
        resolver: yupResolver(Validation.INCOME_SCHEMA),
    });

    const { open } = useSelector((state) => state?.modal?.category);
    const [createIncome, { isLoading: createLoading, error: createIncomeError, isError: isCreateError }] = useCreateIncomeMutation();
    const [updateIncome, { isLoading: updateLoading, error: updateIncomeError, isError: isupdateError }] = useUpdateIncomeMutation();
    useErrorCatcher({ error: createIncomeError || updateIncomeError, isError: isCreateError || isupdateError });
    const { data, isFetching } = useGetCategoryQuery(null, { refetchOnMountOrArgChange: true });
    const incomeData = state?.incomeData || null;
    const isEditMode = !!incomeId || false;

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = form;

    useEffect(() => {
        if (data?.status !== 200) return;
        const categoryOptions =
            isValidArray(data?.data) &&
            data?.data?.map((item) => ({
                value: item?.name,
                label: (
                    <div className=" d-flex justify-content-between">
                        {item?.name}
                        <button onClick={() => handleOpen(item)} className="bg-transparent border-0">
                            <MdModeEdit />
                        </button>
                    </div>
                ),
            }));
        setCategory(categoryOptions);
    }, [data]);

    useEffect(() => {
        setValue("name", incomeData?.name);
        setValue("amount", incomeData?.amount);
        setValue("description", incomeData?.description);
        setValue("categoryId", incomeData?.categoryName);
        open && setValue("categoryId", "");
    }, [incomeData, setValue, open]);

    const onSubmitForm = async (data) => {
        const formattedDate = format(new Date(data.date), "dd/MM/yyyy");
        const body = {
            ...data,
            date: formattedDate,
        };
        const response = !isEditMode ? await createIncome(body) : await updateIncome({ ...body, id: incomeId });
        if (isStatusInclude(response?.data?.status)) {
            navigate("/income-expense/income");
        }
    };

    const handleOpen = (e, data = { open: true, data: e }) => {
        actions.modal.openCategory({ ...data, open: true });
    };

    return (
        <>
            <h3 className={`mb-4 mt-3 text-center ${isEditMode ? "edit-form-header" : "staff-header"}`}>{isEditMode ? "Edit" : "Income"}</h3>
            <form onSubmit={handleSubmit(onSubmitForm)} className="income-and-expense-container position-relative">
                <Row>
                    <Col sm={12} md={6}>
                        <Label
                            name="date"
                            title="Date Selection"
                            form={form}
                            classNameLabel={"default_label"}
                            className={"form__input border-0 form-control-lg"}
                        />
                        <Controller
                            name="date"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <>
                                    <div className="datepicker-container">
                                        <CustomDatePicker
                                            dateFormat="dd/MM/yyyy"
                                            showPopperArrow={false}
                                            placeholderText="Select date"
                                            selected={value || null}
                                            onChange={(date) => onChange(date)}
                                        />
                                    </div>
                                    {<ErrorMessage error={errors?.date} />}
                                </>
                            )}
                        />
                    </Col>
                    <Col sm={12} md={6}>
                        <div className="position-relative">
                            <button
                                type="button"
                                className="position-absolute end-0 top-0 fs-3 border-0 bg-white rounded-2 text-muted shadow-none"
                                onClick={(e) => handleOpen(e)}
                            >
                                &#43;
                            </button>
                            <div className="">
                                <ModifiedSelect
                                    name="categoryId"
                                    title="Category type"
                                    control={control}
                                    options={category}
                                    form={form}
                                    CustomLabelStyle={"default_label mb-2"}
                                    CustomSelectStyle={StandardModifiedSelectStyle}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} md={6}>
                        <InputItem
                            name={"name"}
                            title={"Name"}
                            form={form}
                            classNameLabel={"default_label"}
                            className={"form__input border-0 form-control-lg"}
                        />
                    </Col>
                    <Col sm={12} md={6}>
                        <InputItem
                            name={"amount"}
                            title={"Amount"}
                            form={form}
                            classNameLabel={"default_label"}
                            className={"form__input border-0 form-control-lg"}
                        />
                    </Col>
                    <Col sm={12}>
                        <InputItem
                            name={"description"}
                            title={"Description"}
                            form={form}
                            as="textarea"
                            rows={3}
                            className="exam_textArea shadow-none"
                            classNameLabel={"default_label"}
                        />
                    </Col>
                </Row>
                <button disabled={isFetching || updateLoading || createLoading} type="submit" className="submit-button mx-auto d-block">
                    {isEditMode ? (updateLoading ? "Loading" : "Update") : createLoading ? "Loading" : "Save"}
                </button>
            </form>
        </>
    );
};

export default CreateUpdateIncome;
