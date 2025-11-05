import React from "react";
import "../../../views/pages/StudentRecords/style.scss";

const SelectMonths = ({ selectedDate, selectedMonth, onMonthChange }) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const getMonthNames = () => {
        var currentDate = new Date();
        // var currentYears = currentDate.getFullYear();
        var currentMonth = currentDate.getMonth() + 1;

        var currentYear, toDate;
        if (currentMonth < 6 || (currentMonth === 6 && currentDate.getDate() < 1)) {
            currentYear = new Date().getFullYear() - 1;
            // console.log("<<<<<<<<<<<<< currentYear ", currentYear);

            toDate = new Date().getFullYear();
        } else {
            currentYear = new Date().getFullYear();
            // console.log("currentYear >>>>>>>>>>>", currentYear);
            toDate = new Date().getFullYear() + 1;
        }

        console.log(currentYear);
        console.log("toDate", toDate);
        console.log(currentYear);
        const months = [];

        for (let monthIndex = 5; monthIndex <= 16; monthIndex++) {
            const adjustedMonthIndex = monthIndex % 12; // Ensure the index is between 0 and 11
            const year = currentYear + Math.floor(monthIndex / 12);
            months.push({ monthIndex: adjustedMonthIndex, year });
        }

        return months;
    };

    const monthNamesWithNumbers = [
        { name: "June", number: 5 },
        { name: "July", number: 6 },
        { name: "August", number: 7 },
        { name: "September", number: 8 },
        { name: "October", number: 9 },
        { name: "November", number: 10 },
        { name: "December", number: 11 },
        { name: "January", number: 0 },
        { name: "February", number: 1 },
        { name: "March", number: 2 },
        { name: "April", number: 3 },
        { name: "May", number: 4 },
    ];
    const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

    // Helper function to get the number of days in a month
    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Helper function to generate an array of dates for a given month
    const generateDates = (month, year) => {
        const dates = [];
        const daysInMonth = getDaysInMonth(month, year);

        for (let day = 1; day <= daysInMonth; day++) {
            dates.push(new Date(year, month, day));
        }
        return dates;
    };

    const handleMonthClick = (monthIndex, year) => {
        const selectedDate = new Date(year, monthIndex, 1);
        onMonthChange(selectedDate);
    };

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    return (
        <>
            {getMonthNames().map(({ monthIndex, year }) => (
                <button
                    className={`month-container fw-medium me-2 my-2 ${selectedMonth.getMonth() === monthIndex ? "focused" : ""}`}
                    key={`${year}-${monthIndex}`}
                    onClick={() => handleMonthClick(monthIndex, year)}
                >
                    <div className="header">
                        <span className="month-name">{monthNames[monthIndex]}</span>
                        <div className="week-names">
                            {weekDays.map((day, index) => (
                                <span key={index}>{day}</span>
                            ))}
                        </div>
                    </div>
                    <div className="dates">
                        {generateDates(monthIndex, year).map((date, index) => (
                            <div key={date} className={`date ${selectedDate && date.getTime() === selectedDate.getTime() ? "selected" : ""}`}>
                                {date.getDate()}
                            </div>
                        ))}
                    </div>
                </button>
            ))}
        </>
    );
};

export default SelectMonths;
