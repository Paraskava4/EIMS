import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import Table from "../../../components/shared/Table";
import { useGetIncomeQuery } from "../../../api/incomeAndExpense";
import EditAndDelete from "../../../components/shared/Actions/EditAndDelete";
import { actions } from "../../../redux/store";

const Income = () => {
    const [income, setIncome] = useState([]);

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { data, isFetching } = useGetIncomeQuery();

    useEffect(() => {
        if (data?.status !== 200) return;
        setIncome(data?.data);
    }, [data]);

    const handleOpenDelete = (e, id) => {
        actions.modal.openDelete({ id, type: "INCOME" });
    };

    const handleOpenEdit = (e, income) => {
        navigate(`/income-expense/income/edit-income/${income?._id}`, { state: { incomeData: income } });
    };

    const columns = [
        {
            name: "actions",
            label: "Edit&Delete",
            renderer: (income) => (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <EditAndDelete onDelete={(e) => handleOpenDelete(e, income?._id)} onEdit={(e) => handleOpenEdit(e, income)} />
                </div>
            ),
        },
        {
            name: "name",
            label: "name",
        },
        {
            name: "date",
            label: "Date",
        },
        {
            name: "description",
            label: "Description",
        },
        {
            name: "amount",
            label: "Amount",
        },
        {
            name: "categoryName",
            label: "Category",
        },
    ];

    return (
        <>
            {pathname === "/income-expense/income" ? (
                <div>
                    <div style={{ overflow: "auto", height: "calc(100vh - 270px)" }} className="border border-dark mt-3">
                        <Table columns={columns} items={income} className="table_width" isLoading={isFetching} rowClass={"cursor_pointer"} sortable={true} />
                    </div>
                    <div className="position-fixed bottom-0 end-0 p-3">
                        <IoIosAddCircle
                            onClick={() => navigate("/income-expense/income/create-income")}
                            size={62}
                            style={{ color: "#3660F8", cursor: "pointer" }}
                        />
                    </div>
                </div>
            ) : (
                <Outlet />
            )}
        </>
    );
};

export default Income;
