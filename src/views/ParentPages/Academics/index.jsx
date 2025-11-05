import React from "react";
import { Outlet } from "react-router-dom";

import { CustomNav } from "../../pages/Master";

const Academics = () => {
    return (
        <>
            <div className="d-flex justify-content-center mt-3 tab__container" style={{ backgroundColor: "#fff" }}>
                <CustomNav path={"/academics/parent-time-table"} name="Time-Table" />
                <CustomNav path={"/academics/parent-attendance"} name="Attendance" />
            </div>

            <Outlet />
        </>
    );
};

export default Academics;
