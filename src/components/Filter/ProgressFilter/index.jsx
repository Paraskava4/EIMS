import { yupResolver } from "@hookform/resolvers/yup";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";

import "../style.scss";
import { actions } from "../../../redux/store";
import { defaultProgressFilterObj } from "../../../utils/constants/api/defaultValue";
import { Validation } from "../../../utils/constants/validation/validation";
import { CustomDatePicker } from "../../../views/pages/Enquiry/Enquiry";
import { ErrorMessage, Label } from "../../shared/forms";

const ProgressFilter = forwardRef((props, ref) => {
    const { isFormVisible, setIsFormVisible, filterConditionObj } = props;

    const [startDate, setStartDate] = useState(null);

    const dateFromPicker = useRef(null);
    const dateToPicker = useRef(null);

    const form = useForm({
        defaultValues: defaultProgressFilterObj,
        resolver: yupResolver(Validation.PROGRESS_FILTER_SCHEMA),
    });

    const {
        control,
        handleSubmit,
        setValue,
        register,
        formState: { errors },
    } = form;

    useEffect(() => {
        if (!filterConditionObj) return;
        Object.keys(filterConditionObj).forEach((key) => {
            setValue(key, filterConditionObj[key] || "");
        });
    }, [filterConditionObj, isFormVisible, setValue]);

    const handleAccountFilterSubmit = (data) => {
        actions.utils.setProgressFilter(data);
        setIsFormVisible();
    };

    return (
        isFormVisible && (
            <Form
                ref={ref}
                onSubmit={handleSubmit(handleAccountFilterSubmit)}
                className="position-absolute end-0 ProgressFilter filter-width-resize"
                style={{ zIndex: "5" }}
            >
                <Row className="text-center">
                    <p className="fs-5 fw-bold">Select date</p>
                    <Col sm={12} md={6} className="text-start">
                        <Label name="date" title="Start Date" classNameLabel={"modal_form_label"} />
                        <Controller
                            name="startDate"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <>
                                    <div className="datepicker-container">
                                        <CustomDatePicker
                                            dateFormat="dd/MM/yyyy"
                                            showPopperArrow={false}
                                            placeholderText="Select date"
                                            ref={dateFromPicker}
                                            selected={value || null}
                                            onChange={(date) => {
                                                setStartDate(date);
                                                onChange(date);
                                            }}
                                        />
                                    </div>
                                </>
                            )}
                        />
                    </Col>
                    <Col sm={12} md={6} className="text-start">
                        <Label name="date" title="End Date" classNameLabel={"modal_form_label"} />
                        <Controller
                            name="endDate"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <>
                                    <div className="datepicker-container">
                                        <CustomDatePicker
                                            dateFormat="dd/MM/yyyy"
                                            showPopperArrow={false}
                                            placeholderText="Select date"
                                            ref={dateToPicker}
                                            selected={value || null}
                                            onChange={(date) => {
                                                onChange(date);
                                            }}
                                            minDate={startDate}
                                        />
                                    </div>
                                </>
                            )}
                        />
                    </Col>
                    <ErrorMessage error={{ message: errors["endDate"]?.message }} />
                    <p className="fs-5 fw-bold my-3 text-truncate">Select number of exams</p>
                    <Col className="text-start">
                        <Label name="date" title="Last few exams" classNameLabel={"modal_form_label"} />
                        <div className="text-center d-flex flex-wrap flex-md-nowrap align-items-center">
                            <Form.Control type="number" {...register("lastFewExamFrom")} className="input_style" name="lastFewExamFrom" />
                            <span className="mx-md-2 mx-auto fs-6">TO</span>
                            <Form.Control type="number" {...register("lastFewExamTo")} className="input_style" name="lastFewExamTo" />
                        </div>
                        <ErrorMessage error={{ message: errors["lastFewExamTo"]?.message }} />
                    </Col>
                </Row>
                <button className="submit_button mx-auto d-block mt-3 px-3 py-2 fs-5">Apply</button>
            </Form>
        )
    );
});

export default ProgressFilter;
