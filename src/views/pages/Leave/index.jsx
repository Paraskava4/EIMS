import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";

import { useGetLeaveQuery, useUpdateLeaveMutation } from "../../../api/leave";
import { isStatusInclude } from "../../../utils/constants/validation/response";
import Placeholder from "../../../assets/images/StudentRecords/placeholder.svg";
import "./style.scss";

const Leave = () => {
    const [leave, setLeave] = useState({
        Approved: [],
        Declined: [],
        Pending: [],
    });
    const [selectedLeaveType, setSelectedLeaveType] = useState("Pending");
    const { data: leaveRes } = useGetLeaveQuery();
    const [updateLeave, { isLoading: updateLoading, error: updateLeaveError, isError: isUpdateError }] = useUpdateLeaveMutation();

    useEffect(() => {
        if (leaveRes?.status === 200) {
            setLeave(leaveRes?.data);
        }
    }, [leaveRes]);

    const handleLeaveButtonClick = (type) => {
        setSelectedLeaveType(type);
    };

    const updateLeaveType = async (data) => {
        const apiResponse = await updateLeave(data);
        if (isStatusInclude(apiResponse?.data?.status)) {
            toast.success(apiResponse?.data?.message);
        }
    };

    return (
        <div className="leave-container">
            <h3 className="mt-3">Leaves</h3>
            <div className="d-flex justify-content-center">
                <button onClick={() => handleLeaveButtonClick("Approved")} className={`nev-buttons ${selectedLeaveType === "Approved" ? "selected" : ""}`}>
                    Approved
                </button>
                <button onClick={() => handleLeaveButtonClick("Declined")} className={`nev-buttons ${selectedLeaveType === "Declined" ? "selected" : ""}`}>
                    Declined
                </button>
                <button onClick={() => handleLeaveButtonClick("Pending")} className={`nev-buttons ${selectedLeaveType === "Pending" ? "selected" : ""}`}>
                    Pending
                </button>
            </div>
            <Row className="overflow-content mt-2">
                {leave[selectedLeaveType]?.map((item) => {
                    let statusClass = "";
                    if (item?.status === "Approved") {
                        statusClass = "approved";
                    } else if (item?.status === "Pending") {
                        statusClass = "pending";
                    } else if (item?.status === "Declined") {
                        statusClass = "declined";
                    }
                    return (
                        <Col key={item?.leaveId} sm="6" md="6" lg="4" xl="4" xxl="3">
                            <ul className="p-0 m-0">
                                <div>
                                    <div className="leave-card mt-4">
                                        <div className="card-header">
                                            <p className="leave-format">
                                                <span>{item?.day === "oneDay" ? "One day application" : `Multi day application`}</span>
                                                <span className={`${statusClass}`}>{item?.status || ""}</span>
                                            </p>
                                            <div className="profile-img-and-name">
                                                <div>
                                                    <img src={item?.studentPhoto || Placeholder} alt={"profileImg"} />
                                                </div>
                                                <p>{item?.studentName || "-"}</p>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            date :-{" "}
                                            <span>
                                                {item?.fromDate} {item?.day === "oneDay" ? "" : `To`} {item?.toDate}
                                            </span>
                                        </div>
                                        <div className="card-footer">
                                            <span>Reason</span> <br />
                                            {item?.reason || "-"}
                                        </div>
                                        <div className="d-flex justify-content-between p-3">
                                            <button
                                                className={`w-100 me-3 border-0 py-2 fs-5 ${
                                                    item?.status === "Approved" ? "Approved-button" : "pending-button"
                                                }`}
                                                onClick={() => {
                                                    updateLeaveType({ ...item, status: "Approved" });
                                                }}
                                            >
                                                Approved
                                            </button>
                                            <button
                                                className={`w-100 border-0 fs-5 ${item?.status === "Declined" ? "Declined-button" : "pending-button"}`}
                                                onClick={() => {
                                                    updateLeaveType({ ...item, status: "Declined" });
                                                }}
                                            >
                                                Declined
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </ul>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
};

export default Leave;
