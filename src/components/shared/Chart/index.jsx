import { Col, Row } from "react-bootstrap";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

import { isValidArray } from "../../../utils/constants/validation/array";

const FinancialDataTable = (props) => {
    const { totalIncomeExpense = [], totalFees = [], feesStatus = [] } = props?.data || {};
    const totalIncomeData = [];
    const totalExpensesData = [];
    const totalFeesArr = isValidArray(totalFees) && totalFees?.map(({ fees }) => (!isNaN(fees) ? fees : ""));

    let max = 0;
    isValidArray(totalIncomeExpense) &&
        totalIncomeExpense?.forEach(({ income, expense }) => {
            if (!isNaN(income)) max = Math.max(max, income);
            if (!isNaN(expense)) max = Math.max(max, expense);
            totalIncomeData.push(income);
            totalExpensesData.push(expense);
        });

    const incomeAndExpense = {
        chart: {
            type: "column",
        },
        title: {
            text: "Total Income & Expenses",
        },
        xAxis: {
            categories: isValidArray(totalIncomeExpense) && totalIncomeExpense?.map(({ month }) => month || ""),
        },
        yAxis: {
            title: {
                text: "",
            },
            min: 0,
            max: max,
            tickInterval: 5000,

            labels: {
                format: "{value}",
            },
        },
        plotOptions: {
            column: {
                colorByPoint: false,
                colors: ["#518BBB", "#C47088"],
            },
        },
        series: [
            {
                name: "Total Income",
                data: totalIncomeData,
                color: "#518BBB",
            },
            {
                name: "Total Expenses",
                data: totalExpensesData,
                color: "#C47088",
            },
        ],
        accessibility: { enabled: false },
        credits: { enabled: false },
    };
    const totalFeesChart = {
        chart: {
            type: "column",
        },
        title: {
            text: "Total Fees",
        },
        xAxis: {
            categories: isValidArray(totalIncomeExpense) && totalIncomeExpense?.map(({ month }) => month || ""),
        },
        yAxis: {
            title: {
                text: "",
            },
            min: 0,
            max: 100,
            tickInterval: 5,
            labels: {
                format: "{value}",
            },
        },
        series: [
            {
                name: "Fees",
                data: totalFeesArr,
                color: "#518BBB",
            },
        ],
        accessibility: { enabled: false },
        credits: { enabled: false },
    };
    return (
        <>
            <Row>
                <Col sm={12}>
                    <div>
                        <HighchartsReact highcharts={Highcharts} options={incomeAndExpense} className="bg-transparent" />
                    </div>
                </Col>
                <Col sm={12}>
                    <HighchartsReact highcharts={Highcharts} options={totalFeesChart} className="bg-transparent" />
                </Col>
            </Row>
            <div className="table-container mt-2">
                <table className="text-center data-table table-bordered border-dark w-100">
                    <tbody>
                        <tr>
                            <th rowSpan={1}>Standard</th>
                            {isValidArray(feesStatus) && feesStatus?.map(({ standard = "" }, idx) => <td key={`${standard}__${idx}`}>{standard || ""}</td>)}
                        </tr>
                        <tr>
                            <th rowSpan={1}>Collected</th>
                            {isValidArray(feesStatus) &&
                                feesStatus?.map(({ collected = "" }, idx) => <td key={`${collected}__${idx}`}>{!isNaN(collected) ? collected : "0"}</td>)}
                        </tr>
                        <tr>
                            <th rowSpan={1}>Pending</th>
                            {isValidArray(feesStatus) &&
                                feesStatus?.map(({ pending = "" }, idx) => <td key={`${pending}__${idx}`}>{!isNaN(pending) ? pending : "0"}</td>)}
                        </tr>
                        <tr>
                            <th rowSpan={1}>Discount</th>
                            {isValidArray(feesStatus) &&
                                feesStatus?.map(({ discount = "" }, idx) => <td key={`${discount}__${idx}`}>{!isNaN(discount) ? discount : "0"}</td>)}
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default FinancialDataTable;
