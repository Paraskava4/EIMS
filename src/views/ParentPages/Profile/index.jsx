import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import "./style.scss";
import { useGetStudentProfileQuery } from "../../../api/profile";
import placeholder from "../../../assets/images/demo-img/placeholder.svg";

const Profile = () => {
    const [profileData, setProfileData] = useState();

    const selectedStudentId = useSelector((state) => state.student.studentId);
    const { data: studentProfile } = useGetStudentProfileQuery(selectedStudentId?.studentId, {
        refetchOnMountOrArgChange: true,
        skip: !selectedStudentId?.studentId,
    });

    useEffect(() => {
        if (studentProfile?.status !== 200) return;
        setProfileData(studentProfile?.data);
    }, [studentProfile]);

    return (
        <div className="student-detail-content">
            <Container className="m-p-zero">
                <Row className="m-p-zero">
                    <Col sm={2} md={2}>
                        <div className="w-100">
                            <img src={profileData?.photo || placeholder} alt={"placeholder"} className="w-100 responsive-image" />
                        </div>
                    </Col>
                    <Col sm={10} md={10}>
                        <div className="detail mt-2 mt-md-0">
                            <p className="text-capitalize">{profileData?.studentName || "-"}</p>
                            <p className="text-capitalize">
                                <span>Father name : </span>
                                {profileData?.fatherName || "-"}
                            </p>
                            <p>
                                <span>DOB : </span>
                                {profileData?.dateOfBirth || "-"}
                            </p>
                            <div className="">
                                <span>Contact Number : </span>
                                <p>
                                    <span>(1)</span>.{profileData?.contactNumber1 || "-"}
                                    <br />
                                    <span>(2)</span>.{profileData?.contactNumber2 || "-"}
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="m-p-zero detail">
                    <Col sm={12} md={6} className="detail-address mt-2">
                        <div>
                            <p className="text-capitalize">
                                <span>Address : </span>
                                <br />
                                {profileData?.address || "-"}
                            </p>
                            <p className="text-capitalize">
                                <span>School name :</span>
                                <br />
                                {profileData?.schoolName || "-"}
                            </p>
                            <p className="text-capitalize">
                                <span>Last school name : </span>
                                <br />
                                {"-"}
                            </p>
                        </div>
                    </Col>
                    <Col sm={12} md={6}>
                        <div className="mt-2">
                            <p className="text-capitalize">
                                <span>Gender : </span>
                                <br />
                                {profileData?.gender || "-"}
                            </p>
                            <p>
                                <span>School time : </span>
                                <br />
                                {profileData?.schoolTIme || "-"}
                            </p>
                            <p>
                                <span>Last Year Percentages :</span>
                                <br />
                                {profileData?.lastYearPercentage || "-"}
                            </p>
                            <p className="text-capitalize">
                                <span>Batch :</span>
                                <br />
                                {profileData?.batch || "-"}
                            </p>
                            <p className="text-capitalize">
                                <span>Shift :</span>
                                <br />
                                {profileData?.shift || "-"}
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Profile;
