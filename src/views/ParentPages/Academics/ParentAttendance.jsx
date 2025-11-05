import React, { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import "./style.scss";
import { AbsentCalendar } from "../../../components/shared/CustomCalendar";
import { useGetAttendanceQuery } from "../../../api/attendance";
import { NoDataFound } from "../../../components/shared/SameComponents";

const ParentAttendance = () => {
    const selectedStudentId = useSelector((state) => state.student.studentId);

    const [Attendance, setAttendance] = useState([]);

    const [selectedMonth, setSelectedMonth] = useState(new Date());

    const {
        data: resAttendance,
        isLoading,
        isError,
    } = useGetAttendanceQuery(selectedStudentId?.studentId, {
        refetchOnMountOrArgChange: true,
        skip: !selectedStudentId?.studentId,
    });

    const handleMonthChange = useCallback(
        (month = new Date()) => {
            setSelectedMonth(month);
            const dateMonth = format(month, "MMMM");
            const dateYear = month?.getFullYear(month);
            const matchResMonthAndManualMonth = resAttendance?.data?.filter((item) => dateMonth === item?.monthNames && dateYear === item?.year && item);
            setAttendance(matchResMonthAndManualMonth);
        },
        [resAttendance]
    );

    useEffect(() => {
        if (resAttendance) {
            const dateMonth = format(selectedMonth, "MMMM");
            const dateYear = selectedMonth.getFullYear();
            const filteredData = resAttendance.data.filter((item) => dateMonth === item.monthNames && dateYear === item.year);
            setAttendance(filteredData);
        }
    }, [resAttendance, selectedMonth]);

    useEffect(() => {}, [isLoading]);

    if (isError) {
        return <div>Error loading attendance data.</div>;
    }

    return (
        <Container fluid className="academics-content">
            <Row className="h-100 pt-2">
                <Col sm="12" md="6">
                    <div>
                        <AbsentCalendar data={Attendance[0]?.data} selectedMonth={selectedMonth} onMonthChange={handleMonthChange} />
                    </div>
                    <div className="present-absent-box">
                        <div className="present-box me-3">
                            <span>{Attendance[0]?.data?.presentDay || "0"}</span> <br />
                            Present <br /> days
                        </div>
                        <div className="absent-box">
                            <span>{Attendance[0]?.data?.absentDaysCount || "0"}</span>
                            <br />
                            <p className="mt-3">Absents</p>
                        </div>
                    </div>
                </Col>
                <Col sm="12" md="6">
                    <div className="absents-part h-100">
                        <div className="absents-content pt-2">
                            {Attendance[0]?.data?.absentDays?.length === 0 ? (
                                <div className="d-flex align-items-center justify-content-center h-100">
                                    <NoDataFound />
                                </div>
                            ) : (
                                Attendance[0]?.data?.absentDays?.map((item) => {
                                    return (
                                        <React.Fragment key={item?.date}>
                                            <div className="absent-card">
                                                <div className="absent-card-details">
                                                    <p className="m-p-zero">
                                                        {item?.weekDay} {item?.date}
                                                    </p>
                                                    <span>{item?.status}</span>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ParentAttendance;
