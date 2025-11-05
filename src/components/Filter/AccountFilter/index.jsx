import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import "../style.scss";
import "../../../views/pages/Accounts/style.scss";
import { actions } from "../../../redux/store";
import { CustomDatePicker } from "../../../views/pages/Enquiry/Enquiry";
import { ErrorMessage } from "../../shared/forms";
import { defaultAccountFilterObj } from "../../../utils/constants/api/defaultValue";
import { Validation } from "../../../utils/constants/validation/validation";

const AccountFilter = forwardRef((props, ref) => {
    const { isFormVisible, setIsFormVisible, filterConditionObj } = props;

    const dateFromPicker = useRef(null);
    const dateToPicker = useRef(null);

    const [feesReport, setFeesReport] = useState(false);
    const [PaymentMethod, setPaymentMethod] = useState(false);
    const [percentageWise, setPercentageWise] = useState(false);
    const [startDate, setStartDate] = useState(null);

    const form = useForm({
        defaultValues: defaultAccountFilterObj,
        resolver: yupResolver(Validation.ACCOUNT_FILTER_SCHEMA),
    });

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        register,
        watch,
    } = form;

    const toggleFeesReport = () => setFeesReport(!feesReport);
    const togglePaymentMethod = () => setPaymentMethod(!PaymentMethod);
    const togglePercentageWise = () => setPercentageWise(!percentageWise);

    useEffect(() => {
        if (!filterConditionObj) return;
        Object.keys(filterConditionObj).forEach((key) => {
            setValue(key, filterConditionObj[key] || "");
        });
        let { feesReportFrom, feesReportTo } = filterConditionObj;
        if (feesReportFrom) {
            const date = new Date(feesReportFrom);
            setValue("feesReportFrom", date);
            setStartDate(date);
        }

        if (feesReportTo) setValue("feesReportTo", new Date(feesReportTo));
    }, [filterConditionObj, isFormVisible, setValue]);

    const handleAccountFilterSubmit = (data) => {
        actions.utils.setAccountFilter(data);
        setIsFormVisible();
    };

    return (
        isFormVisible && (
            <Form
                ref={ref}
                onSubmit={handleSubmit(handleAccountFilterSubmit)}
                className="position-absolute end-0 filter filter-width-resize"
                style={{ zIndex: "5" }}
            >
                <Row className="gy-4">
                    <Col lg={12}>
                        <button type="button" className="w-100 text-start filter_btn" onClick={togglePercentageWise}>
                            {watch("percentageFrom") && watch("percentageTo") ? `${watch()?.percentageFrom} to ${watch()?.percentageTo}` : "Percentage wise"}
                        </button>
                        {percentageWise && (
                            <div className="d-flex justify-content-center my-2 align-items-center">
                                <div>
                                    <button type="button" className="border-0 w-100 rounded text-start fs-4">
                                        <label htmlFor="lessThan" className="w-100 d-flex my-auto d-block">
                                            <span>{"<"}</span>
                                            <Form.Control
                                                onChange={(e) => setValue("percentageFrom", e.target.value, { shouldValidate: true })}
                                                {...register("percentageFrom")}
                                                type="number"
                                                className="bg-transparent border-0 shadow-none w-100"
                                                id="lessThan"
                                            />
                                        </label>
                                    </button>
                                    <ErrorMessage error={{ message: errors["percentageFrom"]?.message }} />
                                </div>
                                <p className="align-self-center mx-4 fs-4">To</p>
                                <div>
                                    <button type="button" className="border-0 w-100 rounded text-start fs-4">
                                        <label htmlFor="greaterThan" className="w-100 d-flex my-auto d-block">
                                            <span>{">"}</span>
                                            <Form.Control
                                                {...register("percentageTo")}
                                                type="number"
                                                className="bg-transparent border-0 shadow-none w-100"
                                                id="greaterThan"
                                            />
                                        </label>
                                    </button>
                                    <ErrorMessage error={{ message: errors["percentageTo"]?.message }} />
                                </div>
                            </div>
                        )}
                    </Col>
                    <Col lg={12}>
                        <button type="button" className="w-100 text-start filter_btn" onClick={toggleFeesReport}>
                            {watch("byFees") ? `${watch("byFees")}` : "Fees report"}
                        </button>
                        {feesReport && (
                            <div className="my-2">
                                <Row className="align-items-center justify-content-between w-100">
                                    <Col sm={6} md={3}>
                                        <div style={{ width: "200px" }}>
                                            <Controller
                                                control={control}
                                                name={`byFees`}
                                                render={({ field }) => (
                                                    <Form.Check
                                                        inline
                                                        label="Today"
                                                        value="Today"
                                                        type={"radio"}
                                                        id={`inline-radio-1`}
                                                        checked={["Today"].includes(field.value)}
                                                        onChange={(e) => field.onChange(e.target.checked ? e.target.value : "")}
                                                        className="radio_button"
                                                    />
                                                )}
                                            />
                                        </div>
                                    </Col>
                                    <Col sm={6} md={3}>
                                        <div style={{ width: "200px" }}>
                                            <Controller
                                                control={control}
                                                name={`byFees`}
                                                render={({ field }) => (
                                                    <Form.Check
                                                        inline
                                                        label="Month"
                                                        type={"radio"}
                                                        value="Month"
                                                        id={`inline-radio-2`}
                                                        checked={["Month"].includes(field.value)}
                                                        onChange={(e) => field.onChange(e.target.checked ? e.target.value : "")}
                                                        className="radio_button"
                                                    />
                                                )}
                                            />
                                        </div>
                                    </Col>
                                    <Col sm={6} md={3}>
                                        <div style={{ width: "200px" }}>
                                            <Controller
                                                control={control}
                                                name={`byFees`}
                                                render={({ field }) => (
                                                    <Form.Check
                                                        inline
                                                        label="Year"
                                                        type={"radio"}
                                                        value={"Year"}
                                                        id={`inline-radio-3`}
                                                        checked={["Year"].includes(field.value)}
                                                        onChange={(e) => field.onChange(e.target.checked ? e.target.value : "")}
                                                        className="radio_button"
                                                    />
                                                )}
                                            />
                                        </div>
                                    </Col>
                                    <Col sm={6} md={3}>
                                        <div style={{ width: "200px" }}>
                                            <Controller
                                                control={control}
                                                name={`byFees`}
                                                render={({ field }) => (
                                                    <Form.Check
                                                        inline
                                                        label="Custom"
                                                        type={"radio"}
                                                        id={`inline-radio-4`}
                                                        value={"Custom"}
                                                        checked={["Custom"].includes(field.value)}
                                                        onChange={(e) => field.onChange(e.target.checked ? e.target.value : "")}
                                                        className="radio_button"
                                                    />
                                                )}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                {watch("byFees") === "Custom" && (
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <div className="datepicker-container">
                                                <Controller
                                                    name="feesReportFrom"
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
                                            </div>
                                            {<ErrorMessage error={errors?.feesReportFrom} />}
                                        </div>
                                        <div className="col-12 col-md-6 mt-3 mt-md-0">
                                            <div className="datepicker-container">
                                                <Controller
                                                    name="feesReportTo"
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
                                                                    onChange={(date) => onChange(date)}
                                                                    minDate={startDate}
                                                                />
                                                            </div>
                                                        </>
                                                    )}
                                                />
                                            </div>
                                            {<ErrorMessage error={errors?.feesReportTo} />}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </Col>
                    <Col lg={12}>
                        <button type="button" className="w-100 text-start filter_btn" onClick={togglePaymentMethod}>
                            {watch("byPaymentMethod") ? `${watch("byPaymentMethod")}` : "Payment method"}
                        </button>
                        {PaymentMethod && (
                            <>
                                <Row className="justify-content-between my-2">
                                    <Col sm="12" md="4">
                                        <Controller
                                            control={control}
                                            name={`byPaymentMethod`}
                                            render={({ field }) => (
                                                <Form.Check
                                                    inline
                                                    label="Cash"
                                                    type={"checkbox"}
                                                    id={`inline-checkbox-1`}
                                                    value={"Cash"}
                                                    checked={["Cash"].includes(field.value)}
                                                    onChange={(e) => field.onChange(e.target.checked ? e.target.value : "")}
                                                    className="filter_select"
                                                />
                                            )}
                                        />
                                    </Col>
                                    <Col sm="12" md="4">
                                        <Controller
                                            control={control}
                                            name={`byPaymentMethod`}
                                            render={({ field }) => (
                                                <Form.Check
                                                    inline
                                                    label="Cheque"
                                                    type={"checkbox"}
                                                    id={`inline-checkbox-2`}
                                                    value={"Cheque"}
                                                    checked={["Cheque"].includes(field.value)}
                                                    onChange={(e) => field.onChange(e.target.checked ? e.target.value : "")}
                                                    className="filter_select"
                                                />
                                            )}
                                        />
                                    </Col>
                                    <Col sm="12" md="4">
                                        <Controller
                                            control={control}
                                            name={`byPaymentMethod`}
                                            render={({ field }) => (
                                                <Form.Check
                                                    inline
                                                    label="UPI"
                                                    type={"checkbox"}
                                                    id={`inline-checkbox-3`}
                                                    value={"UPI"}
                                                    checked={["UPI"].includes(field.value)}
                                                    onChange={(e) => field.onChange(e.target.checked ? e.target.value : "")}
                                                    className="filter_select"
                                                />
                                            )}
                                        />
                                    </Col>
                                </Row>
                                {watch("byPaymentMethod") === "Cheque" && (
                                    <Form.Control {...register("chequeNumber")} size="lg" placeholder="Cheque number" className="input_filed" />
                                )}
                            </>
                        )}
                    </Col>
                    <Col>
                        <button type="submit" className="fs-4 mx-auto d-block mt-4 bg-primary border-0 fw-bold text-white p-2 px-4 rounded-3">
                            Apply
                        </button>
                    </Col>
                </Row>
            </Form>
        )
    );
});

export default AccountFilter;
