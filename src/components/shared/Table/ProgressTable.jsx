import React from "react";
import "./style.scss";

const ProgressTable = ({ progressData, className, style }) => {
    const {
        subjects,
        averagePercentage,
        lastYearPercentage,
        performance,
        data,
        totalObtain,
        totalMark,
        percentages,
        regularAttendance,
        testAttendance,
        rankInStandard,
        rankInBatch,
    } = progressData;

    const columns = [
        { label: "Test Number", name: "testNumber" },
        { label: "Date", name: "date" },
        { label: "Subject", name: "subject" },
        { label: "Notes", name: "notes" },
        { label: "Total Marks", name: "totalMarks" },
        { label: "Obtain Marks", name: "obtainMarks" },
        { label: "Percentage", name: "percentage" },
    ];

    const renderDataRows = () => {
        const rows = [];

        if (subjects && subjects.length > 0) {
            subjects.forEach((subject) => {
                const { subject: subjectName, data, totalMark, totalObtain, percentage } = subject;

                if (data && data.length > 0) {
                    data.forEach((item, index) => {
                        rows.push(
                            <React.Fragment key={`${subjectName}-${index}`}>
                                <tr>
                                    <td className="subject_row">{item.testNumber}</td>
                                    <td className="subject_row">{item.date}</td>
                                    {index === 0 && (
                                        <>
                                            <td rowSpan={data?.length} className="subject_row">
                                                {subject?.subject}
                                            </td>
                                        </>
                                    )}
                                    <td className="w-25">{item.notes}</td>
                                    <td className="subject_row">{item?.totalMarks || "-"}</td>
                                    <td className="subject_row">{item.obtainMarks}</td>
                                    <td className="subject_row">{item.percentage}</td>
                                </tr>
                            </React.Fragment>
                        );
                    });
                }

                // Add the total row for each subject
                if (data && data.length > 0) {
                    rows.push(
                        <tr key={`${subjectName}-total`}>
                            <td className="py-2" style={{ backgroundColor: "#F5F5F5" }}></td>
                            <td className="py-2" style={{ backgroundColor: "#F5F5F5" }}></td>
                            <td className="py-2" style={{ backgroundColor: "#F5F5F5" }}></td>
                            <td className="text-end py-2 totalMarks_row">Total...</td>
                            <td className="py-2 totalMarks_row">{totalMark || "-"}</td>
                            <td className="py-2 totalMarks_row">{totalObtain || "-"}</td>
                            <td className="py-2 totalMarks_row">{percentage || "-"}</td>
                        </tr>
                    );
                }
            });
        } else {
            if (data && data.length > 0) {
                data.forEach((item, index) => {
                    rows.push(
                        <React.Fragment key={`${item?.testNumber}-${index}`}>
                            <tr>
                                <td className="subject_row">{item.testNumber}</td>
                                <td className="subject_row">{item.date}</td>
                                {index === 0 && (
                                    <>
                                        <td rowSpan={data.length} className="subject_row">
                                            {item.subject}
                                        </td>
                                    </>
                                )}
                                <td className="w-25">{item.notes}</td>
                                <td className="subject_row">{item.totalMarks}</td>
                                <td className="subject_row">{item.obtainMarks}</td>
                                <td className="subject_row">{item.percentage}</td>
                            </tr>
                        </React.Fragment>
                    );
                });
            }
        }

        return rows;
    };

    return (
        <table className={className} style={style}>
            <thead className="">
                <tr>
                    {columns.map((column, index) => (
                        <th key={index} className="py-3 totalMarks_row text-dark">
                            {column?.label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {renderDataRows()}
                {!subjects && (
                    <tr>
                        <td className="py-2" style={{ backgroundColor: "#F5F5F5" }}></td>
                        <td className="py-2" style={{ backgroundColor: "#F5F5F5" }}></td>
                        <td className="py-2" style={{ backgroundColor: "#F5F5F5" }}></td>
                        <td className="text-end py-2 totalMarks_row">Total...</td>
                        <td className="py-2 totalMarks_row">{totalMark || "-"}</td>
                        <td className="py-2 totalMarks_row">{totalObtain || "-"}</td>
                        <td className="py-2 totalMarks_row">{percentages || "-"}</td>
                    </tr>
                )}
            </tbody>
            <tfoot className="">
                <tr className="text-start">
                    <td colSpan="4" className="tfoot-border-set">
                        Average per (%) : {averagePercentage || "-"} % <br />
                        Last Year Per (%) : {lastYearPercentage || "-"} % <br />
                        Rank In Standard : {rankInStandard || "-"} <br />
                        Rank In Batch : {rankInBatch || "-"}
                    </td>
                    <td colSpan="3" className="tfoot-border-set">
                        Performance : {performance || "-"} <br />
                        Attendance : {testAttendance || "-"} <br />
                        Regular Attendance : {regularAttendance || "-"}
                    </td>
                </tr>
            </tfoot>
        </table>
    );
};

export default ProgressTable;
