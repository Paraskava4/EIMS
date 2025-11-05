import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { useGetExpenseQuery } from "../../../api/incomeAndExpense";
import EditAndDelete from "../../../components/shared/Actions/EditAndDelete";
import Table from "../../../components/shared/Table";
import { actions } from "../../../redux/store";

const Expense = () => {
    const [expense, setExpense] = useState([]);

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { data, isFetching } = useGetExpenseQuery();

    useEffect(() => {
        if (data?.status !== 200) return;
        setExpense(data?.data);
    }, [data]);

    const handleOpenDelete = (e, id) => {
        actions.modal.openDelete({ id, type: "EXPENSE" });
    };

    const handleOpenEdit = (e, expense) => {
        navigate(`/income-expense/expense/edit-expense/${expense?._id}`, { state: { expenseData: expense } });
    };

    const columns = [
        {
            name: "actions",
            label: "Edit&Delete",
            renderer: (expense) => (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <EditAndDelete onDelete={(e) => handleOpenDelete(e, expense?._id)} onEdit={(e) => handleOpenEdit(e, expense)} />
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
            {pathname === "/income-expense/expense" ? (
                <div>
                    <div style={{ overflow: "auto", height: "calc(100vh - 270px)" }} className="border border-dark mt-3">
                        <Table columns={columns} items={expense} className="table_width" isLoading={isFetching} rowClass={"cursor_pointer"} sortable={true} />
                    </div>
                    <div className="position-fixed bottom-0 end-0 p-3">
                        <IoIosAddCircle
                            onClick={() => navigate("/income-expense/expense/create-expense")}
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

export default Expense;
