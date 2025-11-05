import React, { useEffect, useState } from "react";
import "../../pages/StudentRecords/style.scss";
import { formatAddress } from "../../../utils/constants/helper/stringBuilders";
import { useGetTeacherProfileQuery } from "../../../api/teacher";

const TeacherDetails = () => {
    const [profile, setProfile] = useState();
    const { data: profileData } = useGetTeacherProfileQuery();
    useEffect(() => {
        if (profileData?.status == 200) {
            setProfile(profileData?.data);
        }
    }, [profileData]);
    const { dateOfBirth, role, standardSubject } = profile || {};

    const detailsObj = [
        { label: "Address", value: formatAddress(profile) },
        { label: "Date Of Birth", value: dateOfBirth },
        { label: "Faculty", value: role },
        { label: "Class", value: standardSubject?.map((item, idx) => <span key={idx + 1}>{item?.standardName} , </span>) },
    ];

    return (
        <div>
            <table className="personalDetails_table">
                <tbody>
                    {detailsObj?.map(({ label, value }, idx) => {
                        return (
                            <tr key={idx + 1}>
                                <td>{label}</td>
                                <td>{value || "-"}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TeacherDetails;
