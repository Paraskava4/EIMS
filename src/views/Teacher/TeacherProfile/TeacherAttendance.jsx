import { format } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { useGetTeacherAttendanceQuery } from "../../../api/teacher";
import { StudentAttendanceCalendar } from "../../../components/shared/CustomCalendar";
import SelectMonths from "../../../components/shared/SelectMonths/SelectMonths";

const TeacherAttendance = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [totalCountAttendance, setTotalCountAttendance] = useState([]);

    const { data: teacherAttendanceResponse, isFetching: isFetchingTeacherAttendance } = useGetTeacherAttendanceQuery();

    useEffect(() => {
        if (isFetchingTeacherAttendance || teacherAttendanceResponse?.status !== 200) return;
        handleMonthChange();
    }, [teacherAttendanceResponse, isFetchingTeacherAttendance]);

    const handleMonthChange = useCallback(
        (month = new Date()) => {
            setSelectedMonth(month);
            const dateMonth = format(month, "MMMM");
            const dateYear = month?.getFullYear(month);

            const matchResMonthAndManualMonth = teacherAttendanceResponse?.data?.Attendance?.filter(
                (item) => dateMonth === item?.monthNames && dateYear === item?.year && item
            );

            setTotalCountAttendance(matchResMonthAndManualMonth);
        },
        [teacherAttendanceResponse]
    );
    return (
        <>
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
                                <SelectMonths selectedMonth={selectedMonth} onMonthChange={handleMonthChange} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default TeacherAttendance;
