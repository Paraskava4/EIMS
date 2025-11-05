import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import "./style.scss";
import { useGetStdAndSubByStandardQuery } from "../../../api/standardAndSubject";
import { useGetResultReportQuery } from "../../../api/studentAttendance";
import { Loader } from "../../../components/shared/Loader";
import { ModifiedSelect } from "../../../components/shared/options/CustomSelect";
import { roleSelectStyle } from "../../../components/shared/options/styles/CreatableSelect";
import ProgressTable from "../../../components/shared/Table/ProgressTable";

const ParentExam = () => {
    const selectedStudentId = useSelector((state) => state.student.studentId);

    const [obj, setObj] = useState([]);

    const form = useForm({
        defaultValues: { subjectId: "" },
    });

    const { control, watch } = form;

    const { data: subjectsFromStandard } = useGetStdAndSubByStandardQuery(selectedStudentId?.standardId, {
        refetchOnMountOrArgChange: true,
        skip: !selectedStudentId?.standardId,
    });

    const {
        data: examReportResponse,
        error: examReportError,
        isFetching: isFetchingExamReport,
    } = useGetResultReportQuery(
        { studentId: selectedStudentId?.studentId, subjectId: watch("subjectId") || "" },
        { skip: !selectedStudentId?.studentId, refetchOnMountOrArgChange: true }
    );

    const option = subjectsFromStandard?.map((item) => {
        return { value: item.subjectId, label: item.sub };
    });

    option?.unshift({ value: "", label: "ALL" });

    useEffect(() => {
        if (subjectsFromStandard?.status === 200) return;
        setObj(examReportResponse?.data);
        if (examReportResponse?.status === 200) return;
    }, [subjectsFromStandard, examReportResponse]);

    return (
        <>
            <div className="w-50 mx-auto d-block mt-2 mb-2">
                <ModifiedSelect
                    title={"Select Subject"}
                    control={control}
                    name={`subjectId`}
                    form={form}
                    options={option}
                    CustomLabelStyle={"default_label"}
                    CustomSelectStyle={roleSelectStyle}
                />
            </div>
            <div className="progress-table-container">
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
        </>
    );
};

export default ParentExam;
