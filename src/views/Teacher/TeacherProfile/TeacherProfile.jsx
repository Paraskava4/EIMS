import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useGetTeacherProfileQuery } from "../../../api/teacher";
import placeholder from "../../../assets/images/demo-img/placeholder.svg";
import { CustomNav } from "../../pages/Master";

const TeacherProfile = () => {
    const [profile, setProfile] = useState();
    const { data: profileData } = useGetTeacherProfileQuery();
    useEffect(() => {
        if (profileData?.status == 200) {
            setProfile(profileData?.data);
        }
    }, [profileData]);

    return (
        <div>
            <div className="profile_details_wrapper d-flex align-items-center mt-2">
                <div className="student_image">
                    <img src={profile?.photo || placeholder} alt={""} className="image" width={140} height={150} loading="lazy" />
                </div>
                <div className="student_profile_details d-flex ps-3">
                    <div className="text-end me-1 text-muted fs-5">
                        Name :: <br />
                        Father Name :: <br />
                        Contact No. (1) :: <br />
                        (2) ::
                    </div>
                    <div className="text-start fs-5">
                        {`${profile?.firstName || " "} ${profile?.lastName || ""}`}
                        <br />
                        {`${profile?.middleName || " "} ${profile?.lastName || ""}`}
                        <br />
                        <span>{profile?.contact1 || ""}</span>
                        <br />
                        <span>{profile?.contact2 || "-"}</span>
                    </div>
                </div>
            </div>
            <hr />
            <div className="tab__container d-flex justify-content-center">
                <CustomNav path="/teacher/profile/personal-details" name="Personal details" />
                <CustomNav path="/teacher/profile/attendance" name="Attendance" />
            </div>
            <Outlet />
        </div>
    );
};

export default TeacherProfile;
