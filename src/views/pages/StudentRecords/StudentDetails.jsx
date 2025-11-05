import { Outlet, useLocation, useNavigate } from "react-router-dom";

import "../../styles/StudentRecords.scss";
import { CustomNav } from "../Master";
import placeholder from "../../../assets/images/demo-img/placeholder.svg";

import edit_icon from "../../../assets/images/StudentRecords/edit_icon.svg";
import { actions } from "../../../redux/store";
import { handleEnquiryFormData } from "../../../components/shared/modals/mobile";

const StudentDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = JSON.parse(localStorage.getItem("STUDENT_DETAIL"));
    const { photo, firstName, lastName, parentFirstName, parentLastName, contact1, contact2 } = state || {};

    const handleEditEnquiry = () => {
        handleEnquiryFormData(state, "UPDATE_DATA");
        actions.enquiry.setIsUpdatingEnquiry(true);
        actions.enquiry.setStudentId(state?.studentId);
        actions.enquiry.addEnquiryNumber(state?.enquiryNumber);
        actions.enquiry.setIsStudentConfirmed(true);
        navigate("/enquiry/form-first", { state: state });
    };

    return (
        <>
            <div className="position-relative overflow-x-hidden overflow-y-auto" style={{ height: "calc(100vh - 100px)", overflow: "auto" }}>
                <div className="profile_details_wrapper d-flex">
                    <div className="student_image">
                        <img src={photo || placeholder} alt={""} className="image" width={140} height={150} loading="lazy" />
                    </div>
                    <div className="student_profile_details d-flex ps-3">
                        <div className="text-end me-1 text-muted fs-5">
                            Name :: <br />
                            Father Name :: <br />
                            Contact No. (1) :: <br />
                            (2) ::
                        </div>
                        <div className="text-start fs-5">
                            {`${firstName || " "} ${lastName || ""}`}
                            <br />
                            {`${parentFirstName || " "} ${parentLastName || ""}`}
                            <br />
                            <span>{contact1 || ""}</span>
                            <br />
                            <span>{contact2 || "-"}</span>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="tab__container d-flex justify-content-center">
                    <CustomNav path="/student-records/student-details/personal-details" name="Personal details" />
                    <CustomNav path="/student-records/student-details/student-attendance" name="Attendance" />
                    <CustomNav path="/student-records/student-details/progress-report" name="Progress Report" />
                </div>
                <Outlet />
                {location.pathname === "/student-records/student-details/personal-details" && (
                    <button className="position-absolute bottom-0 end-0 border-0 bg-white" onClick={handleEditEnquiry}>
                        <img src={edit_icon} alt={""} />
                    </button>
                )}
            </div>
        </>
    );
};

export default StudentDetails;
