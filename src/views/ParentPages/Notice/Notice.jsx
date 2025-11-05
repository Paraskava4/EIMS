import { useSelector } from "react-redux";
import { parse } from "date-fns";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

import "./style.scss";
import "../../pages/Noticeboard/style.scss";
import { useGetStudentNoticeQuery } from "../../../api/notice";
import { isValidArray } from "../../../utils/constants/validation/array";
import { SingleNotice } from "../../pages/Noticeboard";

const Notice = () => {
    const selectedStudentId = useSelector((state) => state.student.studentId);

    const [noticeData, setNoticeData] = useState({ upcomingNotice: [], pastNotice: [] });

    const { data: noticeResponse, isFetchingNotice } = useGetStudentNoticeQuery(selectedStudentId?.studentId, {
        refetchOnMountOrArgChange: true,
        skip: !selectedStudentId?.studentId,
    });

    useEffect(() => {
        if (noticeResponse?.status === 200) {
            const formatString = "dd/MM/yyyy";
            const upcomingNotice = [];
            const pastNotice = [];
            const currentDate = new Date();
            if (isValidArray(noticeResponse?.data)) {
                noticeResponse.data.forEach((noticeObj) => {
                    const noticeDate = parse(noticeObj.date, formatString, new Date());
                    if (noticeDate > currentDate) {
                        upcomingNotice.push(noticeObj);
                    } else {
                        pastNotice.push(noticeObj);
                    }
                });

                setNoticeData({ upcomingNotice, pastNotice });
            }
        }
    }, [noticeResponse]);

    if (isFetchingNotice) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className="student_Notice_container">
                <Row className="h-100 px-2">
                    <Col sm={12} md={6}>
                        <div className="Notice_container pt-3">
                            <p className="title p-0 m-0 text-center fs-5 fw-bold">Upcoming Notice</p>
                            <div className="Notice_content pe-2 me-2 mb-2">
                                {noticeData?.upcomingNotice?.map((item, idx) => (
                                    <SingleNotice key={item._id} data={item} className="d-none" index={idx} />
                                ))}
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} md={6} className="mt-3 mt-md-0">
                        <div className="Notice_container pt-3">
                            <p className="title p-0 m-0 text-center fs-5 fw-bold">Past Notice</p>
                            <div className="Notice_content pe-2 me-2 mb-2">
                                {noticeData?.pastNotice?.map((item, idx) => (
                                    <SingleNotice key={item._id} data={item} className="d-none" index={idx} />
                                ))}
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Notice;
