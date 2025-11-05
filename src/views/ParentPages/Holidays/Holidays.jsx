import React, { useCallback, useEffect, useState } from "react";
import { format, parse } from "date-fns";
import { Col, Container, Row } from "react-bootstrap";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector } from "react-redux";

import "./style.scss";
import { useGetHolidayQuery } from "../../../api/holiday";
import { StudentHolidayCalendar } from "../../../components/shared/CustomCalendar";
import SelectMonths from "../../../components/shared/SelectMonths/SelectMonths";

const Holidays = () => {
    const selectedStudentId = useSelector((state) => state.student.studentId);

    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [holiday, setHoliday] = useState([]);

    const { data: resHoliday, isFatingHoliday } = useGetHolidayQuery(selectedStudentId?.studentId, {
        refetchOnMountOrArgChange: true,
        skip: !selectedStudentId?.studentId,
    });

    const handleMonthChange = useCallback(
        (month = new Date()) => {
            setSelectedMonth(month);
            const dateMonth = format(month, "MMMM");
            const dateYear = month?.getFullYear(month);
            const matchResMonthAndManualMonth = resHoliday?.data?.filter((item) => dateMonth === item?.monthNames && dateYear === item?.year && item);
            setHoliday(matchResMonthAndManualMonth);
        },
        [resHoliday]
    );

    useEffect(() => {
        if (resHoliday?.status === 200) {
            handleMonthChange();
        }
    }, [resHoliday, isFatingHoliday]);

    return (
        <Container fluid className="holidays-container pt-2">
            <Row>
                <Col sm="12" md="6">
                    <div>
                        <StudentHolidayCalendar data={holiday[0]} selectedMonth={selectedMonth} onMonthChange={handleMonthChange} />
                        {holiday[0]?.holidayDateData?.map((item) => {
                            const parsedDate = parse(item?.date, "dd/MM/yyyy", new Date());
                            const formattedDate = format(parsedDate, "dd MMM");
                            return (
                                <React.Fragment key={item?._id}>
                                    <div className="holiday-card mt-3">
                                        <div>
                                            {item?.name || "New year"}
                                            <br />
                                            <span className="card-date">{formattedDate || "Jan 01"}</span>
                                            <br />
                                        </div>
                                        <div>
                                            <BiDotsVerticalRounded className="fs-3" />
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </Col>
                <Col sm="12" md="6" className="position-relative">
                    <div className="months-content pt-2">
                        <SelectMonths selectedMonth={selectedMonth} onMonthChange={handleMonthChange} />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Holidays;
