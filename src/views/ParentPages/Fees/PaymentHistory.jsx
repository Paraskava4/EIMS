import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useGetStudentFeesQuery } from "../../../api/fees";
import Table from "../../../components/shared/Table";

const PaymentHistory = () => {
    const selectedStudentId = useSelector((state) => state.student.studentId);

    const [feesHistory, setFeesHistory] = useState([]);

    const { data: resFeesHistory } = useGetStudentFeesQuery(selectedStudentId?.studentId, {
        refetchOnMountOrArgChange: true,
        skip: !selectedStudentId?.studentId,
    });

    useEffect(() => {
        if (resFeesHistory?.status !== 200) return;
        setFeesHistory(resFeesHistory?.data);
    }, [resFeesHistory]);

    const columns = [
        { name: "no", label: "No", renderer: (_, idx) => idx + 1 },
        { name: "date", label: "Date" },
        { name: "totalAmount", label: "Total Fees" },
        { name: "discount", label: "Discount" },
        { name: "pending", label: "Pending Fees" },
        { name: "collected", label: "Collect Fees" },
    ];
    return (
        <div>
            <div className="mt-3 border border-dark" style={{ height: "calc(100vh - 170px)", overflow: "auto" }}>
                <Table rowClass={"cursor_pointer"} columns={columns} items={feesHistory} />
            </div>
        </div>
    );
};

export default PaymentHistory;
