import React, { useEffect } from "react";
import { format } from "date-fns";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import "./style.scss";
import "../../pages/Dashboard/style.scss";
import { useGetTeacherDashboardQuery } from "../../../api/teacher";
import { DashboardNoticeboard, Progress } from "../../../components/shared/SameComponents";
import { FestivalCalendar } from "../../../components/shared/CustomCalendar";

const TeacherDashboard = () => {
    const [standardProgress, SetStandardProgress] = useState([]);
    const [notice, setNotice] = useState([]);
    const [staffData, setStaffData] = useState();
    const [isProgressShow, setProgressShow] = useState(false);
    const [currentMonthFestival, setCurrentMonthFestival] = useState({ festival: [], sunday: [], month: "" });
    const [selectedMonth, setSelectedMonth] = useState(new Date());

    const { data: teacherDashboardResponse } = useGetTeacherDashboardQuery();

    useEffect(() => {
        if (!teacherDashboardResponse) return;
        const { standardProgress, notice, festival, staffData } = teacherDashboardResponse?.data;
        SetStandardProgress(standardProgress);
        setNotice(notice);
        setCurrentMonthFestival(() => festival.find((item) => item?.month === format(selectedMonth, "MMMM")));
        setStaffData(staffData);
    }, [teacherDashboardResponse, selectedMonth]);

    const toggleProgress = () => {
        setProgressShow((prevState) => !prevState);
    };

    const handleMonthChange = (newMonth) => setSelectedMonth(newMonth);

    return (
        <div className="position-relative">
            <Container className="dashboard-contain" fluid>
                <Col sm={12}>
                    <div className="teacher-details dashboard-item">
                        <p>
                            <span>Name :: </span>
                            {staffData?.name || "-"}
                        </p>
                        <p>
                            <span>Contact No. (1) :: </span>
                            {staffData?.contact1 || "-"}
                            <span> Contact No. (2) :: </span>
                            {staffData?.contact2 || "-"}
                        </p>
                    </div>
                </Col>
                <Col sm={12}>
                    <div className="teacher-progress dashboard-item">
                        <Progress
                            progress={standardProgress}
                            progressTitle={"Student Progress"}
                            toggleProgress={toggleProgress}
                            className={"dashboard-teacher-progress"}
                            bigContainerStyle={"progress-container"}
                        />
                    </div>
                </Col>
                <Row className="pb-2 pt-3">
                    <Col sm={12} md={6} className="">
                        <div className="teacher-holidays dashboard-item h-100">
                            <FestivalCalendar
                                data={currentMonthFestival}
                                selectedMonth={selectedMonth}
                                holidays={currentMonthFestival}
                                onMonthChange={handleMonthChange}
                                titleName={"Upcoming holidays"}
                            />
                        </div>
                    </Col>
                    <Col sm={12} md={6} className="mt-3 mt-md-0">
                        <div className="dashboard-item teacher-Noticeboard h-100 p-2 px-3">
                            <DashboardNoticeboard
                                noticeboard={notice}
                                navigateRoute="/noticeboard"
                                className={"teacher-noticeboard-box"}
                                dashboardTitle={"fs-5 fw-bold"}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
            {isProgressShow && (
                <div className="position-absolute top-0 w-100 h-100 bg-white">
                    <div className="px-2 pt-3">
                        <Progress
                            progress={standardProgress}
                            progressTitle={"Student Progress"}
                            toggleProgress={toggleProgress}
                            className={"teacher-student-progress"}
                            bigContainerStyle={"big-progress-container"}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherDashboard;
