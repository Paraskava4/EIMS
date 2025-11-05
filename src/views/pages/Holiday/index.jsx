import { useState, useEffect, useRef } from "react";
import { addDays, format, parse } from "date-fns";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import "../StudentRecords/style.scss";
import "./style.scss";
import { CardLayout } from "../../../components/layouts/CardLayout";
import { Label, ErrorMessage, InputItem } from "../../../components/shared/forms";
import { CustomDatePicker } from "../Enquiry/Enquiry";
import { formatDate } from "../../../utils/constants/formats/dates";
import { useCreateHolidaysMutation, useGetHolidaysQuery } from "../../../api/holidays";
import { showErrorToast } from "../../../utils/constants/api/toast";
import { Validation } from "../../../utils/constants/validation/validation";
import { HolidayCalendar } from "../../../components/shared/CustomCalendar";

const Holiday = () => {
    const datePickerRef = useRef(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date());

    const [holidayData, setHolidayData] = useState([]);

    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1); // Disable past dates
    const maxDate = new Date(today.getFullYear() + 1, 11, 31);

    const { data: holidayResponse } = useGetHolidaysQuery({ refetchOnMountOrArgChange: true });
    const [createHolidayReq, { isLoading, error }] = useCreateHolidaysMutation();

    const form = useForm({
        defaultValues: { date: addDays(new Date(), 1), name: "", forStaff: false, forStudent: false },
        resolver: yupResolver(Validation.HOLIDAY),
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = form;

    useEffect(() => {
        if (holidayResponse?.status !== 200) return;
        setHolidayData(holidayResponse?.data);
    }, [holidayResponse]);

    useEffect(() => {
        if (!error) return;
        showErrorToast(error?.data?.message || "Something Went Wrong");
    }, [error]);

    const handleMonthChange = (month) => {
        setSelectedMonth(month);
    };

    const handleSubmitHoliday = async (data) => {
        const payload = { ...data, date: formatDate({ date: data?.date }) };
        await createHolidayReq(payload);
        reset();
    };

    return (
        <Row style={{ width: "100%", height: "calc(100vh - 100px)" }} className="my-auto py-2 overflow-auto">
            <Col sm={12} md={6} lg={6} className=" center-border">
                <h3>Holidays</h3>
                <div style={{ height: "345px" }}>
                    <HolidayCalendar selectedMonth={selectedMonth} holiday={holidayData} onMonthChange={handleMonthChange} />
                </div>
                <Container>
                    <div style={{ marginTop: "30px" }}>
                        <CardLayout>
                            <div className="p-2 pb-2">
                                <h4 className="fw-medium p-0 m-0 text-dark ms-2 mb-2 mt-1">Holidays List</h4>
                                <div className="overflow-y-auto pe-2" style={{ height: "32vh" }}>
                                    {holidayData?.map((holiday, idx) => {
                                        const parsedDate = parse(holiday?.date, "dd/MM/yyyy", new Date());
                                        const formattedDate = format(parsedDate, "MMMM dd, yyyy");
                                        return (
                                            <div key={`${(holiday?.name + idx).toString()}`}>
                                                <p className="text-muted p-0 m-0 mt-3">{formattedDate || ""}</p>
                                                <p className="fs-5 p-0 m-0 pb-2" style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.30)" }}>
                                                    {holiday?.name || ""}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </CardLayout>
                    </div>
                </Container>
            </Col>
            <Col sm={12} md={6} lg={6} className="d-block my-auto mt-4 mt-md-auto">
                <Container>
                    <CardLayout>
                        <Form onSubmit={handleSubmit(handleSubmitHoliday)} style={{ padding: "10px" }}>
                            <h4 style={{ textAlign: "center" }}>Add Holiday</h4>
                            <Label name={"date"} title="Date" form={form} classNameLabel={"fw-bold text-dark fs-6"} />
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
                                                ref={datePickerRef}
                                                selected={value || null}
                                                minDate={minDate}
                                                maxDate={maxDate}
                                                onChange={(date) => {
                                                    onChange(date);
                                                }}
                                                className="bg-white border-bottom rounded-0 border-dark"
                                            />
                                        </div>
                                        {<ErrorMessage error={errors?.addmissionDate} />}
                                    </>
                                )}
                            />
                            <InputItem
                                name="name"
                                form={form}
                                classNameLabel={"fw-bold text-dark fs-6"}
                                className="holiDay_name border-0 border-bottom rounded-0 border-dark shadow-none"
                            />
                            <div className="d-flex my-2 flex-wrap">
                                <div>
                                    <Controller
                                        control={control}
                                        name="forStaff"
                                        render={({ field }) => (
                                            <Form.Check
                                                inline
                                                label="For Staff"
                                                type="checkbox"
                                                id="inline-checkbox-1"
                                                checked={field.value} // Bind the checked state to the field value
                                                onChange={(e) => field.onChange(e.target.checked)} // Update the field value on change
                                                className="filter_select fw-semibold fs-6"
                                            />
                                        )}
                                    />
                                </div>
                                <div>
                                    <Controller
                                        control={control}
                                        name="forStudent"
                                        render={({ field }) => (
                                            <Form.Check
                                                inline
                                                label="For Student"
                                                type="checkbox"
                                                id="inline-checkbox-2"
                                                checked={field.value} // Bind the checked state to the field value
                                                onChange={(e) => field.onChange(e.target.checked)} // Update the field value on change
                                                className="filter_select fw-semibold fs-6"
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            <button disabled={isLoading} className="submit_button fs-4 fw-bold mx-auto d-block px-5 py-2">
                                Add
                            </button>
                        </Form>
                    </CardLayout>
                </Container>
            </Col>
        </Row>
    );
};

export default Holiday;
