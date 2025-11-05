import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { format, getMonth, isSameDay, parse } from "date-fns";

import "./style.scss";
import SelectMonths from "../../../components/shared/SelectMonths/SelectMonths";
import { useGetStudentAttendanceQuery } from "../../../api/studentAttendance";
import { isValidArray } from "../../../utils/constants/validation/array";
import { StudentAttendanceCalendar } from "../../../components/shared/CustomCalendar";

const StudentAttendance = () => {
    const currentDate = new Date();

    const [selectedMonth, setSelectedMonth] = useState(new Date());
    // const [selectedMonth, setSelectedMonth] = useState(() => {
    //     return new Date(currentDate.getFullYear(), 5); // Month is zero-based (5 is June)
    // });
    const [totalCountAttendance, setTotalCountAttendance] = useState([]);

    const studentId = JSON.parse(localStorage.getItem("STUDENT_DETAIL"));

    const { data: studentAttendanceResponse, isFetching: isFetchingStudentAttendance } = useGetStudentAttendanceQuery(studentId?.studentId);

    useEffect(() => {
        if (isFetchingStudentAttendance || studentAttendanceResponse?.status !== 200) return;
        handleMonthChange();
    }, [studentAttendanceResponse, isFetchingStudentAttendance]);

    const handleMonthChange = useCallback(
        (month = new Date(currentDate.getFullYear(), 5)) => {
            setSelectedMonth(month);
            const dateMonth = format(month, "MMMM");
            const dateYear = month?.getFullYear(month);

            const matchResMonthAndManualMonth = studentAttendanceResponse?.response.filter(
                (item) => dateMonth === item?.monthNames && dateYear == item?.year && item
            );

            setTotalCountAttendance(matchResMonthAndManualMonth);
        },
        [studentAttendanceResponse]
    );
    return (
        <div>
            <Container className="overflow-x-hidden" style={{ height: "calc(100vh - 367px)", overflow: "auto" }}>
                <Row className="mx-auto">
                    <Col sm={12} md={6}>
                        <div className="h-100">
                            <div className="">
                                <div className="mt-2 mx-auto d-block w-100" style={{ height: "348px" }}>
                                    {selectedMonth && (
                                        <StudentAttendanceCalendar
                                            data={totalCountAttendance[0]?.data}
                                            selectedMonth={selectedMonth}
                                            onMonthChange={handleMonthChange}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="px-3 mt-4">
                                {totalCountAttendance?.map((item, index) => {
                                    return (
                                        <Row key={item?.presentDay + index}>
                                            <Col>
                                                <div className="Attendance_details_PresentDays">
                                                    <p className="fs-5 py-2 p-0 m-0 px-2">
                                                        <span className="fs-4">{item?.data?.presentDay}</span> <br />
                                                        Present days
                                                    </p>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="Attendance_details_Absents">
                                                    <p className="fs-5 py-2 p-0 m-0">
                                                        <span className="fs-4">{item?.data?.absentDaysCount}</span> <br />
                                                        Absents
                                                    </p>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="Attendance_details_Holidays">
                                                    <p className="fs-5 py-2 p-0 m-0">
                                                        <span className="fs-4">{item?.data?.holidayCount}</span> <br />
                                                        Holidays
                                                    </p>
                                                </div>
                                            </Col>
                                        </Row>
                                    );
                                })}
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} md={6} className="pt-2 my-auto d-flex mt-3 mt-md-0">
                        <div className="d-flex flex-wrap justify-content-center overflow-auto pt-2" style={{ height: "50vh" }}>
                            <SelectMonths selectedMonth={selectedMonth} onMonthChange={handleMonthChange} startMonth={5} endMonth={4} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default StudentAttendance;
