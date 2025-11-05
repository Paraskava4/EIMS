import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loadable from "./components/shared/Loader";
import TeacherDashboard from "./views/Teacher/TeacherDashboard/TeacherDashboard";
import TeacherAttendance from "./views/Teacher/TeacherProfile/TeacherAttendance";
import TeacherDetails from "./views/Teacher/TeacherProfile/TeacherDetails";
import TeacherProfile from "./views/Teacher/TeacherProfile/TeacherProfile";

const Enquiry = lazy(() => import("./views/pages/Enquiry/Enquiry"));
const Admission = lazy(() => import("./views/pages/Admission"));
const EducationalDetail = lazy(() => import("./views/pages/Enquiry/Educational"));
const GuardianDetail = lazy(() => import("./views/pages/Enquiry/Guardian"));
const Dashboard = lazy(() => import("./views/pages/Dashboard"));
const Staff = lazy(() => import("./views/pages/Staff"));
const StaffAttendance = lazy(() => import("./views/pages/StaffAttendance"));
const Accounts = lazy(() => import("./views/pages/Accounts"));
const Noticeboard = lazy(() => import("./views/pages/Noticeboard"));
const CreateNotice = lazy(() => import("./views/pages/Noticeboard/CreateNotice"));
const StudentContacts = lazy(() => import("./views/pages/StudentContacts"));
const Leave = lazy(() => import("./views/pages/Leave"));
const Holiday = lazy(() => import("./views/pages/Holiday"));
const TimeTable = lazy(() => import("./views/pages/TimeTable"));
const EnquiryWrapper = lazy(() => import("./views/pages/Enquiry"));
const StudentRecords = lazy(() => import("./views/pages/StudentRecords"));
const StudentDetails = lazy(() => import("./views/pages/StudentRecords/StudentDetails"));
const PersonalDetails = lazy(() => import("./views/pages/StudentRecords/PersonalDetails"));
const StudentAttendance = lazy(() => import("./views/pages/StudentRecords/StudentAttendance"));
const ProgressReport = lazy(() => import("./views/pages/StudentRecords/ProgressReport"));
const CheckAttendance = lazy(() => import("./views/pages/Attendance/CheckAttendance"));
const TakeAttendance = lazy(() => import("./views/pages/Attendance/TakeAttendance"));
const AttendanceWrapper = lazy(() => import("./views/pages/Attendance"));
const CreateUpdateStaff = lazy(() => import("./views/pages/Staff/CreateUpdateStaff"));
const Login = lazy(() => import("./views/pages/Login"));
const Master = lazy(() => import("./views/pages/Master"));
const Standard = lazy(() => import("./views/pages/Master/Standard"));
const Subject = lazy(() => import("./views/pages/Master/Subject"));
const Shift = lazy(() => import("./views/pages/Master/Shift"));
const Batch = lazy(() => import("./views/pages/Master/Batch"));
const StandardAndSubject = lazy(() => import("./views/pages/Master/StdAndSub"));
const CreateUpdateExam = lazy(() => import("./views/pages/Exam/CreateUpdateExam"));
const ScheduleExam = lazy(() => import("./views/pages/Exam/ScheduleExam"));
const ExamReport = lazy(() => import("./views/pages/Exam/ExamReport"));
const IncomeExpense = lazy(() => import("./views/pages/IncomeExpense"));
const Income = lazy(() => import("./views/pages/IncomeExpense/income"));
const Expense = lazy(() => import("./views/pages/IncomeExpense/expense"));
const CreateUpdateIncome = lazy(() => import("./views/pages/IncomeExpense/CreateUpdateIncome"));
const CreateUpdateExpense = lazy(() => import("./views/pages/IncomeExpense/CreateUpdateExpense"));
const ParentDashboard = lazy(() => import("./views/ParentPages/Dashboard"));
const Profile = lazy(() => import("./views/ParentPages/Profile"));
const Fees = lazy(() => import("./views/ParentPages/Fees"));
const FeesDetails = lazy(() => import("./views/ParentPages/Fees/Feesdetails"));
const PaymentHistory = lazy(() => import("./views/ParentPages/Fees/PaymentHistory"));
const Academics = lazy(() => import("./views/ParentPages/Academics"));
const ParentTimeTable = lazy(() => import("./views/ParentPages/Academics/ParentTimeTable"));
const ParentAttendance = lazy(() => import("./views/ParentPages/Academics/ParentAttendance"));
const Holidays = lazy(() => import("./views/ParentPages/Holidays/Holidays"));
const ExamWrapper = lazy(() => import("./views/pages/Exam"));
const Notice = lazy(() => import("./views/ParentPages/Notice/Notice"));
const ParentExam = lazy(() => import("./views/ParentPages/ParentExam/ParentExam"));
const ApplyLeave = lazy(() => import("./views/ParentPages/ApplyLeave/ApplyLeave"));

const MainLayout = Loadable(lazy(() => import("./components/layouts/MainLayout")));

const RouterWrapper = () => {
    const userRole = "Admin";
    function generateRoutes(routes, userRole) {
        return routes
            .map((route, index) => {
                const { path, element, children, roles } = route;

                // Check if the route has roles specified and if the user's role is allowed
                // console.log("!roles || roles.includes(userRole)", !roles || roles.includes(userRole));
                if (!roles || roles.includes(userRole)) {
                    return (
                        <Route key={index} path={path} element={element}>
                            {children && children.length > 0 && generateRoutes(children, userRole)}
                        </Route>
                    );
                }

                return null; // Return null for routes that the user doesn't have access to
            })
            .filter(Boolean); // Filter out null values
    }
    return (
        <MainLayout>
            <Routes>{generateRoutes(routeConfig, userRole)}</Routes>
        </MainLayout>
    );
};

export default RouterWrapper;

function DefaultForm() {
    return <div>Default Form Component</div>;
}

const routeConfig = [
    // {
    //     path: "/",
    //     element:  <Login />,
    // },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <Dashboard />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/enquiry",
        element: <EnquiryWrapper />,

        children: [
            {
                index: true,
                path: "/enquiry/form-first",
                element: <Enquiry />,
            },
            {
                path: "/enquiry/form-second",
                element: <EducationalDetail />,
            },
            {
                path: "/enquiry/form-third",
                element: <GuardianDetail />,
            },
            {
                path: "/enquiry/*",
                element: <DefaultForm />,
            },
        ],
    },
    {
        path: "/admission",
        element: <Admission />,
    },
    {
        path: "/staff",
        element: <Staff />,
    },
    {
        path: "/create-staff",
        element: <CreateUpdateStaff />,
    },
    {
        path: "/update-staff/:staffId",
        element: <CreateUpdateStaff />,
    },
    {
        path: "/staff_attendance",
        element: <StaffAttendance />,
    },
    {
        path: "/accounts",
        element: <Accounts />,
    },
    {
        path: "/income-expense",
        element: <IncomeExpense />,
        children: [
            {
                path: "/income-expense/income",
                element: <Income />,
                children: [
                    {
                        index: true,
                        path: "/income-expense/income/create-income",
                        element: <CreateUpdateIncome />,
                    },
                    {
                        path: "/income-expense/income/edit-income/:incomeId",
                        element: <CreateUpdateIncome />,
                    },
                ],
            },
            {
                path: "/income-expense/expense",
                element: <Expense />,
                children: [
                    {
                        index: true,
                        path: "/income-expense/expense/create-expense",
                        element: <CreateUpdateExpense />,
                    },
                    {
                        path: "/income-expense/expense/edit-expense/:expenseId",
                        element: <CreateUpdateExpense />,
                    },
                ],
            },
        ],
    },
    {
        path: "/noticeboard",
        element: <Noticeboard />,
    },
    {
        path: "/create-notice",
        element: <CreateNotice />,
    },
    {
        path: "/edit-notice/:noticeId",
        element: <CreateNotice />,
    },
    {
        path: "/exam",
        element: <ExamWrapper />,
        children: [
            {
                path: "/exam/schedule-exam",
                element: <ScheduleExam />,
                children: [
                    {
                        index: true,
                        path: "/exam/schedule-exam/create-exam",
                        element: <CreateUpdateExam />,
                    },
                    {
                        path: "/exam/schedule-exam/edit-exam/:examId",
                        element: <CreateUpdateExam />,
                    },
                ],
            },
            {
                path: "/exam/exam-report",
                element: <ExamReport />,
            },
        ],
    },
    {
        path: "/attendance",
        element: <AttendanceWrapper />,
        children: [
            {
                index: true,
                path: "/attendance/take-attendance",
                element: <TakeAttendance />,
            },
            {
                path: "/attendance/check-attendance",
                element: <CheckAttendance />,
            },
            {
                path: "/attendance/*",
                element: <DefaultForm />,
            },
        ],
    },
    {
        path: "/student_contacts",
        element: <StudentContacts />,
    },
    {
        path: "/student-records",
        element: <StudentRecords />,
    },
    {
        path: "/student-records/student-details",
        element: <StudentDetails />,
        children: [
            {
                path: "/student-records/student-details/personal-details",
                element: <PersonalDetails />,
            },
            {
                path: "/student-records/student-details/student-attendance",
                element: <StudentAttendance />,
            },
            {
                path: "/student-records/student-details/progress-report",
                element: <ProgressReport />,
            },
        ],
    },
    {
        path: "/master",
        element: <Master />,
        children: [
            {
                index: true,
                path: "/master/standard",
                element: <Standard />,
            },
            {
                path: "/master/subject",
                element: <Subject />,
            },
            {
                path: "/master/shift",
                element: <Shift />,
            },
            {
                path: "/master/batch",
                element: <Batch />,
            },
            {
                path: "/master/standard-and-subject",
                element: <StandardAndSubject />,
            },
        ],
    },
    {
        path: "/leave",
        element: <Leave />,
    },
    {
        path: "/holiday",
        element: <Holiday />,
    },
    {
        path: "/time_table",
        element: <TimeTable />,
    },
    {
        path: "*",
        element: <Navigate to={"/dashboard"} replace />,
    },

    //---parent router start----------------------------------------------------------------

    {
        path: "/parent/dashboard",
        element: <ParentDashboard />,
    },
    {
        path: "/profile",
        element: <Profile />,
    },
    {
        path: "/fees",
        element: <Fees />,
        children: [
            {
                path: "/fees/fees-details",
                element: <FeesDetails />,
            },
            {
                path: "/fees/fees-history",
                element: <PaymentHistory />,
            },
        ],
    },
    {
        path: "/academics",
        element: <Academics />,
        children: [
            {
                path: "/academics/parent-time-table",
                element: <ParentTimeTable />,
            },
            {
                path: "/academics/parent-attendance",
                element: <ParentAttendance />,
            },
        ],
    },
    {
        path: "/holidays",
        element: <Holidays />,
    },
    {
        path: "/notice",
        element: <Notice />,
    },
    {
        path: "/parent/exam",
        element: <ParentExam />,
    },
    {
        path: "/apply-leave",
        element: <ApplyLeave />,
    },

    // Teacher routers ----------------------------------------------------------------
    {
        path: "/teacher/dashboard",
        element: <TeacherDashboard />,
    },
    {
        path: "/teacher/profile",
        element: <TeacherProfile />,
        children: [
            {
                path: "/teacher/profile/personal-details",
                element: <TeacherDetails />,
            },
            {
                path: "/teacher/profile/attendance",
                element: <TeacherAttendance />,
            },
        ],
    },
];
