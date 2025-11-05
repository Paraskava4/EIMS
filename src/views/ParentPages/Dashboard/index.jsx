import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useGetDashboardQuery } from "../../../api/parentDashboard";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./style.scss";
import { isValidArray } from "../../../utils/constants/validation/array";
import { ROLES } from "../../../utils/constants/option-menu";
import { DashboardNoticeboard, NoDataFound } from "../../../components/shared/SameComponents";
import { useGetParentChildQuery } from "../../../api/parent";

const ParentDashboard = () => {
    const navigate = useNavigate();
    const selectedStudentId = useSelector((state) => state.student.studentId);
    const [noticeboard, setNoticeboard] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [examProgress, setExamProgressData] = useState([]);
    const [recentExam, setRecentExam] = useState([]);
    const [timeTable, setTimeTableData] = useState({});
    const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);

    const { data: resDashboard } = useGetDashboardQuery(selectedStudentId?.studentId, {
        refetchOnMountOrArgChange: true,
        skip: !selectedStudentId?.studentId,
    });

    const { data: childDataResponse } = useGetParentChildQuery();

    const defaultSelect = JSON.parse(sessionStorage.getItem("selectedUserId"));

    useEffect(() => {
        if (sessionStorage.getItem("roles") === ROLES.PARENT) {
            if (childDataResponse?.status === 200) {
                if (!defaultSelect) {
                    sessionStorage.setItem("selectedUserId", JSON.stringify(childDataResponse?.data[0]));
                    window.location.reload();
                }
            }
        }
    }, [childDataResponse, defaultSelect]);

    useEffect(() => {
        if (resDashboard?.status === 200) {
            setNoticeboard(resDashboard?.data?.notice);
            setAttendanceData(resDashboard?.data?.attendance);
            setExamProgressData(resDashboard?.data?.subjectResult);
            setTimeTableData(resDashboard?.data?.timeTable);
            setRecentExam(resDashboard?.data?.exam);
        }
    }, [resDashboard]);

    const handlePrevClick = () => {
        if (selectedMonthIndex > 0) {
            setSelectedMonthIndex(selectedMonthIndex - 1);
        }
    };

    const handleNextClick = () => {
        if (selectedMonthIndex < attendanceData?.length - 1) {
            setSelectedMonthIndex(selectedMonthIndex + 1);
        }
    };

    const selectedMonthData = attendanceData[selectedMonthIndex];
    const selectedMonth = `${selectedMonthData?.month} ${selectedMonthData?.year}`;
    const presentDays = selectedMonthData?.presentDays;
    const absentDays = selectedMonthData?.absentDays;

    ///// ---- progress exam ----

    const maxPercentage = Math.max(...examProgress.map((item) => parseFloat(item.percentage)));

    const totalFeesChart = {
        chart: {
            type: "column",
        },
        title: {
            text: "",
        },
        xAxis: {
            categories: isValidArray(examProgress) && examProgress?.map(({ subject }) => subject || ""),
            labels: {
                format: "{value}",
                style: {
                    fontWeight: "bold", // Make the text bold
                    fontSize: "10px", // Set the font size to 15px
                },
            },
        },
        yAxis: {
            title: {
                text: "",
            },
            min: 0,
            max: 100, // Set max percentage value
            tickInterval: 10,
            labels: {
                format: "{value}",
                style: {
                    fontWeight: "bold", // Make the text bold
                    fontSize: "10px", // Set the font size to 15px
                },
            },
        },
        series: [
            {
                name: "Progress",
                data: isValidArray(examProgress) && examProgress?.map(({ percentage }) => parseFloat(percentage) || 0),
                color: "#518BBB",
            },
        ],
        accessibility: { enabled: false },
        credits: { enabled: false },
    };

    return (
        <>
            <Container className="dashboard-contain">
                <Row className="pt-3 pb-3">
                    <Col sm={12} md={6}>
                        <div className="border border-light">
                            <div className="all-dashboard-box attendance-box">
                                Attendance
                                <div className="prev-next-box">
                                    <button onClick={handlePrevClick} className="bg-transparent border-0 fs-4">
                                        {"<"}
                                    </button>
                                    {selectedMonth}
                                    <button onClick={handleNextClick} className="bg-transparent border-0 fs-4">
                                        {">"}
                                    </button>
                                </div>
                                <div className="days-count">
                                    <div className="present-days-count">
                                        Present days <span>{presentDays}</span>
                                    </div>
                                    <div className="absents-days-count">
                                        Absents <span>{absentDays}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="all-dashboard-box recent-exams-box mt-3">
                                <p className="p-0 m-0 mb-2">Recent Exam</p>
                                <div className="recent-exams-box-overflow">
                                    {!recentExam || recentExam?.length === 0 ? (
                                        <div className="d-flex align-items-center justify-content-center h-100">
                                            <NoDataFound />
                                        </div>
                                    ) : (
                                        recentExam?.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    <div className="d-flex justify-content-between align-items-center recent-exam-content">
                                                        <div>
                                                            {item?.day} {item?.date}
                                                        </div>
                                                        <div>
                                                            <span>Subject : {item?.subject}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                            {isValidArray(examProgress) && examProgress.length > 0 ? (
                                <div className="all-dashboard-box progress-box mt-3">
                                    <p className="">Progress Report</p>
                                    <div>
                                        <HighchartsReact highcharts={Highcharts} options={totalFeesChart} className="bg-transparent" />
                                    </div>
                                </div>
                            ) : (
                                <div className="all-dashboard-box progress-box mt-3">
                                    <p className="">Progress Report</p>
                                    <div className="d-flex align-items-center justify-content-center h-100">
                                        <NoDataFound />
                                    </div>
                                </div>
                            )}
                        </div>
                    </Col>
                    <Col>
                        <div className="h-100">
                            <div className="h-25 mt-3 mt-md-0" onClick={() => navigate("/academics/parent-time-table")}>
                                <div className="all-dashboard-box time-table-box">
                                    Time - Table
                                    <div>
                                        {Object.keys(timeTable)?.length === 0 ? (
                                            <div className="d-flex align-items-center justify-content-center h-100">
                                                <NoDataFound />
                                            </div>
                                        ) : (
                                            <img src={timeTable.image} alt={timeTable.image} className="time-table-image" />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="h-75 pt-3 position-relative">
                                <div className="all-dashboard-box parent-dashboard-notice position-absolute w-100">
                                    {!noticeboard || noticeboard?.length === 0 ? (
                                        <div className="d-flex align-items-center justify-content-center h-100">
                                            <NoDataFound />
                                        </div>
                                    ) : (
                                        <DashboardNoticeboard noticeboard={noticeboard} navigateRoute="/notice" className={"h-100"} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ParentDashboard;
