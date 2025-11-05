import { memo } from "react";
import PropTypes from "prop-types";
import { useLocation, NavLink } from "react-router-dom";
import { CloseButton, Container, Offcanvas } from "react-bootstrap";

import "./style.scss";
import { ROLES } from "../../utils/constants/option-menu";
import Dashboard from "../../assets/images/Sidebar/Dashboard.svg";
import Accounts from "../../assets/images/Sidebar/Accounts.svg";
import incomeExpense from "../../assets/images/Sidebar/IncomeExpense.svg";
import Admission from "../../assets/images/Sidebar/Admission.svg";
import Attendance from "../../assets/images/Sidebar/Attendance.svg";
import Enquiry from "../../assets/images/Sidebar/Enquiry.svg";
import Exam from "../../assets/images/Sidebar/Exam.svg";
import Leave from "../../assets/images/Sidebar/Leave.svg";
import logo from "../../assets/images/Sidebar/logo.svg";
import Master from "../../assets/images/Sidebar/Master.svg";
import Noticeboard from "../../assets/images/Sidebar/Noticeboard.svg";
import StaffAttendance from "../../assets/images/Sidebar/Staff-attendance.svg";
import Staff from "../../assets/images/Sidebar/Staff.svg";
import StudentContacts from "../../assets/images/Sidebar/Student-contacts.svg";
import Student_records from "../../assets/images/Sidebar/Student_records.svg";
import Time_table from "../../assets/images/Sidebar/Time-table.svg";
import Holiday from "../../assets/images/Sidebar/Holiday.svg";
import Profile from "../../assets/images/Sidebar/Profile.svg";
import Fees from "../../assets/images/Sidebar/Fees.svg";
import Academics from "../../assets/images/Sidebar/Academics.svg";
import Holidays from "../../assets/images/Sidebar/Holidays.svg";
import ApplyLeave from "../../assets/images/Sidebar/applyLeave.svg";

const Sidebar = memo(({ show, handleClose }) => {
    const { pathname } = useLocation();

    const rolesAuth = () => {
        if (sessionStorage.getItem("roles") === ROLES.ADMIN) return routesArray;
        if (sessionStorage.getItem("roles") === ROLES.PARENT) return parentSide;
        if (sessionStorage.getItem("roles") === ROLES.TECHAR) return teachersSide;
    };

    return (
        <Container className={`h-100 w-100 position-absolute overflow-auto`}>
            <Offcanvas show={show} onHide={handleClose} responsive="xl">
                <Offcanvas.Body className="d-block p-4 p-xl-0 w-100">
                    <div className="sb__content__wrapper">
                        <CloseButton
                            onClick={handleClose}
                            className="float-end d-xl-none position-absolute fs-5"
                            style={{ top: "20px", zIndex: "1000", right: "20px" }}
                        />
                        <div className="w-100 image-div">
                            <img src={logo} alt="" className="mx-auto d-block" />
                        </div>
                        <div className="sb__content">
                            <ul className="ul p-0">
                                {rolesAuth()?.map((item, idx) => {
                                    const isActiveRoute = (item?.subRoutes || []).includes(pathname) || [`/${item?.path}`].includes(pathname);
                                    return (
                                        <li key={idx} className="li" style={{ width: "100%" }}>
                                            <NavLink to={`/${item?.path}`} className="link" onClick={handleClose}>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <img src={item.icon} alt={"Dashboard"} />
                                                        <span className="sidebar_text text-nowrap ">{item?.name}</span>
                                                    </div>
                                                    <div className=" align-self-center">
                                                        {isActiveRoute ? (
                                                            <span className="sidebar_text d-inline-flex justify-self-end " style={{ width: "05%" }}>
                                                                {">"}
                                                            </span>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                </div>
                                            </NavLink>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </Container>
    );
});

export default Sidebar;

Sidebar.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

const routesArray = [
    {
        name: "Dashboard",
        path: "dashboard",
        icon: Dashboard,
    },
    {
        name: "Enquiry",
        path: "enquiry/form-first",
        subRoutes: ["/enquiry/form-first", "/enquiry/form-second", "/enquiry/form-third"],
        icon: Enquiry,
    },
    {
        name: "Admission",
        icon: Admission,
        path: "admission",
    },
    {
        name: "Staff",
        icon: Staff,
        path: "staff",
        subRoutes: ["/create-staff", "/update-staff"],
    },
    {
        name: "Staff attendance",
        icon: StaffAttendance,
        path: "staff_attendance",
    },
    {
        name: "Accounts",
        icon: Accounts,
        path: "accounts",
    },
    {
        name: "Income/Expense",
        icon: incomeExpense,
        path: "income-expense/income",
        subRoutes: [
            "/income-expense/income",
            "/income-expense/income/create-income",
            "/income-expense/income/edit-income",
            "/income-expense/expense",
            "/income-expense/expense/create-expense",
            "/income-expense/expense/edit-expense/:expenseId",
        ],
    },
    {
        name: "Noticeboard",
        icon: Noticeboard,
        path: "noticeboard",
    },
    {
        name: "Exam",
        icon: Exam,
        path: "exam/schedule-exam",
        subRoutes: ["/exam/schedule-exam", "/exam/schedule-exam/create-exam", "/exam/schedule-exam/edit-exam", "/exam/exam-report"],
    },
    {
        name: "Attendance",
        icon: Attendance,
        subRoutes: ["/attendance/take-attendance", "/attendance/check-attendance"],
        path: "attendance/take-attendance",
    },
    {
        name: "Student contacts",
        icon: StudentContacts,
        path: "student_contacts",
    },
    {
        name: "Student records",
        icon: Student_records,
        path: "student-records",
        subRoutes: [
            "/student-records",
            "/student-records/student-details",
            "/student-records/student-details/personal-details",
            "/student-records/student-details/student-attendance",
            "/student-records/student-details/progress-report",
        ],
    },
    {
        name: "Master",
        subRoutes: ["/master/standard", "/master/subject", "/master/shift", "/master/batch", "/master/standard-and-subject"],
        icon: Master,
        path: "master/standard",
    },
    {
        name: "Leave",
        icon: Leave,
        path: "leave",
    },
    {
        name: "Holiday",
        icon: Holiday,
        path: "holiday",
    },
    {
        name: "Time table",
        icon: Time_table,
        path: "time_table",
    },
];

//---parent side router----------------------------------------------------------------

const parentSide = [
    {
        name: "Dashboard",
        icon: Dashboard,
        path: "parent/dashboard",
    },
    {
        name: "Profile",
        icon: Profile,
        path: "profile",
    },
    {
        name: "Fees",
        icon: Fees,
        path: "fees/fees-details",
        subRoutes: ["/fees/fees-details", "/fees/fees-history"],
    },
    {
        name: "Academics",
        icon: Academics,
        path: "academics/parent-time-table",
        subRoutes: ["/academics/parent-time-table", "/academics/parent-attendance"],
    },
    {
        name: "Holidays",
        icon: Holidays,
        path: "holidays",
    },
    {
        name: "Notice",
        icon: Noticeboard,
        path: "notice",
    },
    {
        name: "Exam",
        icon: Exam,
        path: "parent/exam",
    },
    {
        name: "Apply Leave",
        icon: ApplyLeave,
        path: "apply-leave",
    },
];

const teachersSide = [
    {
        name: "Dashboard",
        icon: Dashboard,
        path: "teacher/dashboard",
    },
    {
        name: "Enquiry",
        path: "enquiry/form-first",
        subRoutes: ["/enquiry/form-first", "/enquiry/form-second", "/enquiry/form-third"],
        icon: Enquiry,
    },
    {
        name: "Admission",
        icon: Admission,
        path: "admission",
    },
    {
        name: "Profile",
        icon: Staff,
        path: "teacher/profile/personal-details",
        subRoutes: ["/teacher/profile/personal-details", "/teacher/profile/attendance"],
    },
    {
        name: "Accounts",
        icon: Accounts,
        path: "accounts",
    },
    {
        name: "Noticeboard",
        icon: Noticeboard,
        path: "noticeboard",
    },
    {
        name: "Exam",
        icon: Exam,
        path: "exam/schedule-exam",
        subRoutes: ["/exam/schedule-exam", "/exam/schedule-exam/create-exam", "/exam/schedule-exam/edit-exam", "/exam/exam-report"],
    },
    {
        name: "Attendance",
        icon: Attendance,
        subRoutes: ["/attendance/take-attendance", "/attendance/check-attendance"],
        path: "attendance/take-attendance",
    },
    {
        name: "Student contacts",
        icon: StudentContacts,
        path: "student_contacts",
    },
    {
        name: "Student records",
        icon: Student_records,
        path: "student-records",
        subRoutes: [
            "/student-records",
            "/student-records/student-details",
            "/student-records/student-details/personal-details",
            "/student-records/student-details/student-attendance",
            "/student-records/student-details/progress-report",
        ],
    },
    {
        name: "Leave",
        icon: Leave,
        path: "leave",
    },
    {
        name: "Holiday",
        icon: Holiday,
        path: "holiday",
    },
    {
        name: "Time table",
        icon: Time_table,
        path: "time_table",
    },
];
