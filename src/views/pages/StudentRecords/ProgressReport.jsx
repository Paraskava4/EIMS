import React, { useState, useEffect, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import { useSelector } from "react-redux";
import { endOfDay, isWithinInterval, parse, startOfDay } from "date-fns";

import "./style.scss";
import { useGetStdAndSubByStandardQuery } from "../../../api/standardAndSubject";
import { useGetResultReportQuery } from "../../../api/studentAttendance";
import { isValidArray } from "../../../utils/constants/validation/array";
import ProgressTable from "../../../components/shared/Table/ProgressTable";
import ProgressFilter from "../../../components/Filter/ProgressFilter";
import { useOutsideAlerter } from "../../../utils/constants/hooks/useOutsideAlert";
import { Loader } from "../../../components/shared/Loader";
import { isStatusInclude } from "../../../utils/constants/validation/response";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ProgressReport = () => {
    const componenetRef = useRef();
    const wrapperRef = useRef(null);

    const [obj, setObj] = useState([]);
    const [subjectId, setSubjectId] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useOutsideAlerter(wrapperRef, setIsFormVisible);

    const { studentId, standardId } = JSON.parse(localStorage.getItem("STUDENT_DETAIL"));
    const { progressFilterObj } = useSelector((state) => state?.utils);
    const { lastFewExamFrom, lastFewExamTo, startDate, endDate } = progressFilterObj;

    const handleFilterButtonClick = () => setIsFormVisible(!isFormVisible);

    const { data: subjectsFromStandard } = useGetStdAndSubByStandardQuery(standardId, {
        refetchOnMountOrArgChange: true,
        skip: !standardId,
    });

    const {
        data: examReportResponse,
        error: examReportError,
        isFetching: isFetchingExamReport,
    } = useGetResultReportQuery({ studentId, subjectId: subjectId || "" }, { skip: !studentId, refetchOnMountOrArgChange: true });

    useEffect(() => {
        if (!isStatusInclude(examReportResponse?.status)) return;
        setObj(examReportResponse.data);
        if (startDate && endDate) {
            setObj((prevData) => handleProgressFilter(prevData, startDate, endDate));
        }
        if (lastFewExamFrom && lastFewExamTo) setObj((prevData) => handleProgressFilterLastFewExam(prevData, lastFewExamFrom, lastFewExamTo));
    }, [examReportResponse, progressFilterObj, startDate, endDate, lastFewExamFrom, lastFewExamTo]);

    const handleGeneratePDF = () => {
        const element = document.getElementById("table-to-pdf");
        if (!element) return;

        // Generate the PDF using html2canvas and jsPDF
        html2canvas(element, { scale: 5 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/jpeg");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();

            const imgWidth = pdfWidth - 6; // Adjust the margins as needed
            const imgHeight = (imgWidth * canvas.height) / canvas.width;

            const xPos = 3; // Left margin
            const yPos = 3; // Top margin

            pdf.addImage(imgData, "JPEG", xPos, yPos, imgWidth, imgHeight);
            pdf.save("progress.pdf");
        });
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <div>
                    <p className="fs-4 p-0 m-0">Select Subject</p>
                </div>
                <div className="position-relative" ref={wrapperRef} style={{ zIndex: "5" }}>
                    <button className="border-0 p-2 rounded-3" onClick={handleFilterButtonClick}>
                        <FaFilter size={23} />
                    </button>
                    <div className="overLay w-100 mt-2">
                        {isFormVisible && <ProgressFilter isFormVisible={isFormVisible} setIsFormVisible={() => setIsFormVisible(!isFormVisible)} />}
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between flex-nowrap text-truncate">
                <button className={`subject_select_button fs-6 ${!subjectId ? "subject_select_button_active" : ""}`} onClick={() => setSubjectId("")}>
                    All
                </button>
                {isValidArray(subjectsFromStandard) &&
                    subjectsFromStandard?.map((item) => (
                        <button
                            key={item?.subjectId}
                            onClick={() => {
                                setSubjectId(item?.subjectId);
                            }}
                            className={`subject_select_button fs-6 text-truncate ${subjectId === item?.subjectId ? "subject_select_button_active" : ""}`}
                        >
                            {item?.sub}
                        </button>
                    ))}
            </div>
            <div id="table-to-pdf" ref={componenetRef}>
                {isFetchingExamReport ? (
                    <div className="mt-5">
                        <Loader height={"inherit"} />
                    </div>
                ) : examReportError ? (
                    <div className="mt-5">
                        <Loader height={"inherit"} />
                    </div>
                ) : obj ? (
                    <ProgressTable progressData={obj} className="w-100 progress-table border border-dark text-center my-3" />
                ) : (
                    <p>No progress data available.</p>
                )}
            </div>
            <div style={{ display: "flex" }}>
                <button
                    className="mx-auto d-block Download_Report_Button px-3 fs-5"
                    onClick={handleGeneratePDF}
                    disabled={!obj?.subjects || obj.subjects.length === 0}
                >
                    Download Report
                </button>
            </div>
        </div>
    );
};

export default ProgressReport;

const handleProgressFilter = (data, startDate, endDate) => {
    const { subjects } = data;

    // Map over the subjects and apply the filtering on each subject's data
    const filteredSubjects = subjects?.map((item) => {
        const compare = item?.data?.filter(({ date }) => {
            return isWithinInterval(parse(date, "dd/MM/yyyy", new Date()), { start: startOfDay(startDate), end: endOfDay(endDate) });
        });
        return { ...item, data: compare }; // Update the subject's data with the filtered result
    });

    return { ...data, subjects: filteredSubjects }; // Update the original data with the filtered subjects
};

const handleProgressFilterLastFewExam = (data, lastFewExamFrom, lastFewExamTo) => {
    const { subjects } = data;

    // Map over the subjects and apply the filtering on each subject's data
    const filteredSubjects = subjects?.map((item) => {
        const compare = item?.data?.filter(({ testNumber }) => {
            // Check if the test number is within the selected range (lastFewExamFrom to lastFewExamTo)
            const isWithinTestNumberRange = testNumber >= lastFewExamFrom && testNumber <= lastFewExamTo;
            return isWithinTestNumberRange;
        });
        return { ...item, data: compare }; // Update the subject's data with the filtered result
    });

    return { ...data, subjects: filteredSubjects }; // Update the original data with the filtered subjects
};
