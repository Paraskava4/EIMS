import React from "react";
import { useNavigate } from "react-router-dom";
import { TbZoomPan } from "react-icons/tb";

import { isValidArray } from "../../../utils/constants/validation/array";
import { SingleProgress } from "../SingleProgress";
import noDataFound from "../../../assets/images/demo-img/noDataFound.svg";

export const DashboardNoticeboard = (props) => {
    const { noticeboard, navigateRoute, className, dashboardTitle } = props;
    const navigate = useNavigate();
    const colors = ["#F0FFF3", "#F0F7FF", "#fffff0", "#FFF5F0"];
    const colorsNoticeBadge = ["#07F", "#FF1D86", "#FF7E3E", "#16D03B"];
    return (
        <div className={` ${className}`}>
            <div className="d-flex justify-content-between">
                <p className={`p-0 m-0 ${dashboardTitle}`}>Noticeboard</p>
                <button
                    className="border-0 bg-transparent fw-bold fs-5 text-color"
                    onClick={() => {
                        navigate(navigateRoute);
                    }}
                >
                    See all
                </button>
            </div>
            <div className="overflow-auto px-2 mx-2" style={{ height: "calc(100% - 40px)" }}>
                {isValidArray(noticeboard) &&
                    noticeboard?.map((item, index) => {
                        const noticeDateParts = item.date.split("/");
                        const noticeDate = new Date(parseInt(noticeDateParts[2]), parseInt(noticeDateParts[1]) - 1, parseInt(noticeDateParts[0]));

                        const isNoticeTodayOrFuture = noticeDate >= new Date();

                        if (isNoticeTodayOrFuture) {
                            return (
                                <React.Fragment key={item?._id}>
                                    <div
                                        className="d-flex justify-content-between align-items-center NoticeboardStyle mt-2"
                                        style={{ background: colors[index % colors.length] }}
                                        onClick={() => {
                                            navigate(navigateRoute);
                                        }}
                                    >
                                        <div className="d-flex align-items-center">
                                            <p
                                                className="p-0 m-0 NoticeboardNumberBadge fw-bold fs-5"
                                                style={{ background: colorsNoticeBadge[index % colorsNoticeBadge.length] }}
                                            >
                                                {item?.date?.slice(0, 2)}
                                            </p>
                                            <div className="p-0 m-0 ms-4">
                                                <span className="fs-5 fw-bold">{item?.title}</span>
                                                <br />
                                                <p className="fs-6 text-muted p-0 m-0">
                                                    <span>{item?.date}</span>
                                                    <span style={{ color: "#07F" }}> &#9679; </span>
                                                    <span>{item?.standard}</span>
                                                    <span style={{ color: "#07F" }}> &#9679; </span>
                                                    <span>{item?.batch}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <p className="p-0 m-0 fs-1">&#8250;</p>
                                    </div>
                                </React.Fragment>
                            );
                        } else {
                            return null;
                        }
                    })}
            </div>
        </div>
    );
};

export const Progress = (props) => {
    const { progress, progressTitle, isProgressShow, toggleProgress, className, bigContainerStyle } = props;
    return (
        <div className={`${className} position-relative`}>
            <div className="d-flex justify-content-between px-3 pt-2 fs-5 fw-bold">
                <span className="p-0 m-0">{progressTitle}</span>
                <button className="border-0 bg-transparent" onClick={toggleProgress}>
                    <TbZoomPan />
                </button>
            </div>
            <div className={`overflow-auto px-2 mx-2 pb-3 position-absolute ${bigContainerStyle}`}>
                {progress?.map((item, idx) => {
                    return (
                        <React.Fragment key={idx}>
                            <SingleProgress item={item} />
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export const NoDataFound = () => {
    return (
        <div className="text-center">
            <img src={noDataFound} />
            <p style={{ color: "#407BFF" }} className="fw-bold fs-5">
                No Data Found
            </p>
        </div>
    );
};
