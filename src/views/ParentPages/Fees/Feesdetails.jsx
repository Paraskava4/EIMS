import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useGetStudentFeesQuery } from "../../../api/fees";
import Table from "../../../components/shared/Table";

const FeesDetails = () => {
    const selectedStudentId = useSelector((state) => state.student.studentId);

    const [feesDetails, setFeesDetails] = useState([]);

    const { data: resFeesDetails } = useGetStudentFeesQuery(selectedStudentId?.studentId, {
        refetchOnMountOrArgChange: true,
        skip: !selectedStudentId?.studentId,
    });

    useEffect(() => {
        if (resFeesDetails?.status !== 200) return;
        setFeesDetails(resFeesDetails?.data);
    }, [resFeesDetails]);

    const columns = [
        { name: "no", label: "No", renderer: (_, idx) => idx + 1 },
        { name: "date", label: "Date" },
        { name: "fees", label: "Fee" },
        { name: "discount", label: "Discount" },
        { name: "totalAmount", label: "Total Amount" },
    ];

    return (
        <div>
            <div className="mt-3 border border-dark" style={{ height: "calc(100vh - 170px)", overflow: "auto" }}>
                <Table rowClass={"cursor_pointer"} columns={columns} items={feesDetails} />
            </div>
        </div>
    );
};

export default FeesDetails;
