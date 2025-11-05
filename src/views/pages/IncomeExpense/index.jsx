import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import "./style.scss";
import { CustomNav } from "../Master";

const Income_Expense = () => {
    const { pathname } = useLocation();

    return (
        <>
            {/* {pathname.includes("edit-expense" || "edit-income") ? (
                ""
            ) : ( */}
            <div className="d-flex justify-content-center mt-3 tab__container" style={{ backgroundColor: "#fff" }}>
                <CustomNav path={"/income-expense/income"} name="Income" />
                <CustomNav path={"/income-expense/expense"} name="Expense" />
            </div>
            {/* )} */}
            <Outlet />
        </>
    );
};

export default Income_Expense;
