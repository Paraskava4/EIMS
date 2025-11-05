import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { CustomNav } from "../../pages/Master";

const Fees = () => {
    const { pathname } = useLocation();

    return (
        <>
            <div className="d-flex justify-content-center mt-3 tab__container" style={{ backgroundColor: "#fff" }}>
                <CustomNav path={"/fees/fees-details"} name="Fees details" />
                <CustomNav path={"/fees/fees-history"} name="Payment History" />
            </div>

            <Outlet />
        </>
    );
};

export default Fees;
