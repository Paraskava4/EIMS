import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./style.scss";
import { useGetStudentTimeTableQuery } from "../../../api/studentTimeTable";

const ParentTimeTable = () => {
    const [timeTable, setTimeTable] = useState();

    const selectedStudentId = useSelector((state) => state.student.studentId);

    const { data: resTimeTable } = useGetStudentTimeTableQuery(selectedStudentId?.studentId);

    useEffect(() => {
        if (resTimeTable?.status !== 200) return;
        setTimeTable(resTimeTable?.data);
    }, [resTimeTable]);

    return (
        <div className="time-table-container">
            <img src={timeTable?.image} alt="" className="image" />
        </div>
    );
};

export default ParentTimeTable;
