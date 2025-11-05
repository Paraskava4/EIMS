import { useEffect } from "react";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import "./style.scss";
import { ErrorMessage, InputItem, Label } from "../../../components/shared/forms";
import { defaultLeaveValue } from "../../../utils/constants/api/defaultValue";
import { Validation } from "../../../utils/constants/validation/validation";
import { CustomDatePicker } from "../../pages/Enquiry/Enquiry";
import profileImg from "../../../assets/images/demo-img/demoImg-1.svg";
import { useCrateApplyLeaveMutation, useGetApplyLeaveQuery } from "../../../api/applyLeave";
import { isStatusInclude } from "../../../utils/constants/validation/response";

const ApplyLeave = () => {
    const selectedStudentId = useSelector((state) => state.student.studentId);

    const [startDate, setStartDate] = useState(null);
    const [leaveCard, setLeaveCard] = useState([]);

    const [addReq] = useCrateApplyLeaveMutation();

    const {
        data: resLastLeave,
        isLastLeaveFating,
        refetch,
    } = useGetApplyLeaveQuery(selectedStudentId?.studentId, {
        refetchOnMountOrArgChange: true,
        skip: !selectedStudentId?.studentId,
    });

    const form = useForm({
        defaultValues: defaultLeaveValue,
        resolver: yupResolver(Validation.PARENT_LEAVE_SCHEMA),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = form;

    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1); // Disable past dates
    const maxDate = new Date(today.getFullYear() + 1, 11, 31);

    useEffect(() => {
        if (resLastLeave?.status === 200) {
            setLeaveCard(resLastLeave?.data);
        }
    }, [resLastLeave]);

    const applyLeave = async (data) => {
        const leaveData = {
            ...data,
            fromDate: data.fromDate ? format(new Date(data.fromDate), "dd/MM/yyyy") : null,
            toDate: data.toDate ? format(new Date(data.toDate), "dd/MM/yyyy") : null,
            studentId: selectedStudentId?.studentId,
        };

        const apiResponse = await addReq(leaveData);

        if (!isStatusInclude(apiResponse?.data?.status)) {
            toast.error(apiResponse?.error?.data?.message);
        } else {
            refetch();
        }

        form.reset();
    };

    return (
        <div className="applyLeave-content">
            <Form onSubmit={handleSubmit(applyLeave)} className="mt-3">
                <Row>
                    <div className="col-6">
                        <div style={{ width: "200px" }} className="mx-auto d-block">
                            <Controller
                                control={control}
                                name={`day`}
                                render={({ field }) => (
                                    <Form.Check
                                        inline
                                        label="One day"
                                        value="oneDay"
                                        type={"radio"}
                                        id={`inline-radio-1`}
                                        checked={["oneDay"].includes(field.value)}
                                        onChange={(e) => field.onChange(e.target.checked ? e.target.value : "")}
                                        className="radio_button"
                                    />
                                )}
                            />
                        </div>
                        {<ErrorMessage error={errors?.day} />}
                    </div>
                    <div className="col-6">
                        <div style={{ width: "200px" }} className="mx-auto d-block">
                            <Controller
                                control={control}
                                name={`day`}
                                render={({ field }) => (
                                    <Form.Check
                                        inline
                                        label="Multi Day"
                                        type={"radio"}
                                        value="multiDay"
                                        id={`inline-radio-2`}
                                        checked={["multiDay"].includes(field.value)}
                                        onChange={(e) => field.onChange(e.target.checked ? e.target.value : "")}
                                        className="radio_button"
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <Col sm="12" md={watch("day") === "multiDay" ? 6 : 12}>
                        <Label name="fromDate" title="Form" classNameLabel={"default_label text-dark"} />
                        <div className="datepicker-container">
                            <Controller
                                name="fromDate"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <>
                                        <div className="datepicker-container w-100">
                                            <CustomDatePicker
                                                dateFormat="dd/MM/yyyy"
                                                showPopperArrow={false}
                                                placeholderText="Select date"
                                                selected={value || null}
                                                minDate={minDate}
                                                maxDate={maxDate}
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
                        {<ErrorMessage error={errors?.fromDate} />}
                    </Col>
                    {watch("day") === "multiDay" ? (
                        <Col sm="12" md="6">
                            <Label name="fromDate" title="To" classNameLabel={"default_label text-dark"} />
                            <div className="datepicker-container">
                                <Controller
                                    name="toDate"
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <>
                                            <div className="datepicker-container w-100">
                                                <CustomDatePicker
                                                    dateFormat="dd/MM/yyyy"
                                                    showPopperArrow={false}
                                                    placeholderText="Select date"
                                                    selected={value || null}
                                                    onChange={(date) => onChange(date)}
                                                    minDate={startDate}
                                                />
                                            </div>
                                        </>
                                    )}
                                />
                            </div>
                            {<ErrorMessage error={errors?.toDate} />}
                        </Col>
                    ) : (
                        ""
                    )}
                    <Col>
                        <InputItem
                            name="reason"
                            title="Reason"
                            form={form}
                            as="textarea"
                            rows={3}
                            className="exam_textArea shadow-none"
                            classNameLabel={"default_label"}
                        />
                    </Col>
                </Row>
                <p className="fs-5">Last apply leave</p>
                <div className="row justify-content-center apply-leave-container">
                    {leaveCard?.map((item) => {
                        let statusClass = "";
                        if (item?.status === "Approved") {
                            statusClass = "approved";
                        } else if (item?.status === "Pending") {
                            statusClass = "pending";
                        } else if (item?.status === "Declined") {
                            statusClass = "declined";
                        }
                        return (
                            <React.Fragment key={item?.leaveId}>
                                <div className="leave-card ms-3 mt-4">
                                    <div className="card-header">
                                        <p className="leave-format">
                                            <span>{item?.day === "oneDay" ? "One day application" : `Multi day application`}</span>
                                            <span className={`${statusClass}`}>{item?.status || ""}</span>
                                        </p>
                                        <div className="profile-img-and-name">
                                            <div>
                                                <img src={profileImg} alt={"profileImg"} />
                                            </div>
                                            <p>{item?.studentName || "-"}</p>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        date :-{" "}
                                        <span>
                                            {item?.fromDate} {item?.day === "oneDay" ? "" : `To`} {item?.toDate}
                                        </span>
                                    </div>
                                    <div className="card-footer">
                                        <span>Reason</span> <br />
                                        {item?.reason || "-"}
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
                <button disabled={isLastLeaveFating} type="submit" className="submit_button p-2 px-3 mt-4 mx-auto d-block">
                    {isLastLeaveFating ? "Loading" : "Apply Leave"}
                </button>
            </Form>
        </div>
    );
};

export default ApplyLeave;
