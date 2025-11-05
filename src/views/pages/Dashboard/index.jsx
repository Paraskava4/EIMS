import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { format } from "date-fns";
import Highcharts from "highcharts";
import { BiHide, BiShow } from "react-icons/bi";
import { TbZoomPan } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import accessibility from "highcharts/modules/accessibility";

import "./style.scss";
import Woman from "../../../assets/images/Dashboard/woman.svg";
import Man from "../../../assets/images/Dashboard/man.svg";
import { SingleProgress } from "../../../components/shared/SingleProgress";
import { useDashBoardDetailsGetQuery } from "../../../api/dashboard";
import { isValidArray } from "../../../utils/constants/validation/array";
import { FestivalCalendar } from "../../../components/shared/CustomCalendar";
import FinancialDataTable from "../../../components/shared/Chart";
import { DashboardNoticeboard } from "../../../components/shared/SameComponents";

accessibility(Highcharts);

const Dashboard = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [currentMonthFestival, setCurrentMonthFestival] = useState({ festival: [], sunday: [], month: "" });
    const [noticeboard, setNoticeboard] = useState([]);
    const [progress, setStandardProgress] = useState([]);
    const [student, setStudent] = useState({});
    const [staffs, setStaffs] = useState({});
    const [isTableVisible, setTableVisible] = useState(true);
    const [isProgressShow, setProgressShow] = useState(false);

    const { data: dashBoardDetailRes } = useDashBoardDetailsGetQuery();

    const toggleTableVisibility = () => setTableVisible((prevState) => !prevState);
    const handleMonthChange = (newMonth) => setSelectedMonth(newMonth);

    useEffect(() => {
        if (!dashBoardDetailRes) return;

        const { staffs, students, festival, noticeData, standardProgress } = dashBoardDetailRes;

        setStudent(students);
        setStaffs(staffs);
        setNoticeboard(noticeData);
        setStandardProgress(standardProgress);
        setCurrentMonthFestival(() => festival.find((item) => item?.month === format(selectedMonth, "MMMM")));
    }, [dashBoardDetailRes, selectedMonth]);

    return (
        <>
            <div className="position-relative mt-3">
                <Container className="dashboard-container" fluid>
                    <Row className="pt-3 pb-3">
                        <Col sm={12} md={6}>
                            <div className="dashboard-item-div student-faculty-count px-3">
                                <img src={Man} alt="Man Avatar" />
                                <p className="p-0 m-0 fs-5">
                                    Students
                                    <br />
                                    <span className="fs-6 fw-bold">{student?.student || "-"}</span>
                                </p>
                                <p className="p-0 m-0 fs-5">
                                    Male
                                    <br />
                                    <span className="fs-6 fw-bold">{student?.studentMale || "-"}</span>
                                </p>
                                <p className="p-0 m-0 fs-5">
                                    Female
                                    <br />
                                    <span className="fs-6 fw-bold">{student?.studentFemale || "-"}</span>
                                </p>
                            </div>
                            <div className="dashboard-item-div student-faculty-count px-3 mt-3">
                                <img src={Woman} alt="Woman Avatar" />
                                <p className="p-0 m-0 fs-5">
                                    Faculty
                                    <br />
                                    <span className="fs-6 fw-bold">{staffs?.staff || "-"}</span>
                                </p>
                                <p className="p-0 m-0 fs-5">
                                    Male
                                    <br />
                                    <span className="fs-6 fw-bold">{staffs?.staffMale || "-"}</span>
                                </p>
                                <p className="p-0 m-0 fs-5">
                                    Female
                                    <br />
                                    <span className="fs-6 fw-bold">{staffs?.staffFemale || "-"}</span>
                                </p>
                            </div>
                            <div className="dashboard-item-div mt-3" style={{ height: "346px" }}>
                                <FestivalCalendar
                                    data={currentMonthFestival}
                                    selectedMonth={selectedMonth}
                                    holidays={currentMonthFestival}
                                    onMonthChange={handleMonthChange}
                                    titleName={"Festival"}
                                />
                            </div>
                            <div className="dashboard-item-div mt-3" style={{ height: "490px" }}>
                                <div className="d-flex justify-content-between px-3 pt-2 fs-5 fw-bold">
                                    <span className="p-0 m-0">Financial data</span>
                                    <button className="border-0 bg-transparent" onClick={toggleTableVisibility}>
                                        {isTableVisible ? <BiShow /> : <BiHide />}
                                    </button>
                                </div>
                                <div className="overflow-auto px-2 mx-2 pb-2" style={{ height: "calc(100% - 55px)" }}>
                                    {isTableVisible && <FinancialDataTable data={dashBoardDetailRes} />}
                                </div>
                            </div>
                        </Col>
                        <Col sm={12} md={6}>
                            <div className="h-100">
                                <div className="h-50 mt-3 mt-md-0 dashboard-item-div position-relative">
                                    <div className="d-flex justify-content-between px-3 pt-2 fs-5 fw-bold">
                                        <span className="p-0 m-0">Standard Progress</span>
                                        <button className="border-0 bg-transparent" onClick={() => setProgressShow(true)}>
                                            <TbZoomPan />
                                        </button>
                                    </div>
                                    <div
                                        className="overflow-auto px-2 mx-2 pb-3 position-absolute"
                                        style={{ height: "calc(100% - 55px)", width: "calc(100% - 20px)" }}
                                    >
                                        {progress?.map((item, idx) => {
                                            return <SingleProgress item={item} key={idx} />;
                                        })}
                                    </div>
                                </div>
                                <div className="h-50 pt-3 mt-md-0">
                                    <div className="border dashboard-item-div p-2 px-3">
                                        <DashboardNoticeboard
                                            noticeboard={noticeboard}
                                            navigateRoute="/noticeboard"
                                            className={"admin-noticeboard"}
                                            dashboardTitle={"fs-5 fw-bold"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                {isProgressShow && (
                    <div className="position-absolute top-0 w-100 h-100 bg-white">
                        <div className="d-flex justify-content-between px-3 fs-4 fw-bold">
                            <span className="p-0 m-0">Standard Progress</span>
                            <button
                                className="border-0 bg-transparent"
                                onClick={() => {
                                    setProgressShow(false);
                                }}
                            >
                                <TbZoomPan />
                            </button>
                        </div>
                        <div className="overflow-auto px-2 mx-2 pb-3" style={{ height: "calc(100% - 55px)", width: "calc(100% - 20px)" }}>
                            {progress?.map((item, idx) => {
                                return <SingleProgress item={item} key={idx} />;
                            })}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Dashboard;
