import { format, getMonth, isSameDay, isSunday, parse, endOfMonth, startOfMonth } from "date-fns";

import { isValidArray } from "../../../utils/constants/validation/array";

// ---------- /student-records/student-details/student-attendance --- Attendance  of Calendar  ------------

export const StudentAttendanceCalendar = (props) => {
    const { selectedMonth, onMonthChange, data } = props || {};
    const { holidays, absentDays } = data || {};
    const monthStart = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
    const monthEnd = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);
    const firstDayOfMonth = monthStart.getDay();
    const totalDays = monthEnd.getDate();
    const selectedMonths = selectedMonth;

    const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    // Generate an array of days for the selected month
    const days = Array.from({ length: totalDays }, (_, index) => index + 1);

    const handlePrevMonth = () => {
        const prevMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1);
        console.log("prevMonth", prevMonth);
        onMonthChange(prevMonth);
    };

    const handleNextMonth = () => {
        const nextMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1);
        onMonthChange(nextMonth);
    };

    return (
        <div className="big-calendar mx-auto w-100">
            <div className="calendar-header d-flex justify-content-between">
                {selectedMonth.toLocaleDateString(undefined, { month: "long" }) !== "June" ? (
                    <button className="prev-month scroll-month-arrow fs-4 border-0 bg-transparent" onClick={handlePrevMonth}>
                        &#8249;
                    </button>
                ) : (
                    <button className="prev-month scroll-month-arrow fs-4 border-0 text-muted bg-secondary-subtle user-select-none">&#8249;</button>
                )}
                <div className="text-center">
                    <span className="calendar_title">Attendance of</span> <br />
                    <p className="fw-bold"> {selectedMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" })}</p>
                </div>
                {selectedMonth.toLocaleDateString(undefined, { month: "long" }) !== "May" ? (
                    <button className="next-month scroll-month-arrow fs-4 border-0 bg-transparent" onClick={handleNextMonth}>
                        &#8250;
                    </button>
                ) : (
                    <button className="prev-month scroll-month-arrow fs-4 border-0 text-muted bg-secondary-subtle user-select-none">&#8250;</button>
                )}
            </div>
            <div className="week-names mt-2">
                {weekDays.map((day) => (
                    <div className="week-name fw-bold" key={day}>
                        {day}
                    </div>
                ))}
            </div>
            <div className="calendar-body">
                {Array(firstDayOfMonth)
                    .fill("")
                    .map((_, index) => (
                        <div className="empty-date" key={`empty-${index}`} />
                    ))}
                {days.map((day) => {
                    const currentMonth = getMonth(selectedMonth);
                    const currentYear = selectedMonth?.getFullYear();
                    const isHoliday = checkIsArrayIncludes({ arrayOfDates: holidays, currentMonth, currentYear, day });
                    const isAbsent = checkIsArrayIncludes({ arrayOfDates: absentDays, currentMonth, currentYear, day });

                    return (
                        <div className={`fw-medium ${isHoliday ? "text-danger" : isAbsent ? "absent__badge" : ""}`} key={day}>
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// finds the if the date is included in the holidays array
export const checkIsArrayIncludes = ({ arrayOfDates, currentYear, currentMonth, day }) => {
    return (
        isValidArray(arrayOfDates) &&
        arrayOfDates?.some((date) => {
            const parsedHoliday = parse(date, "dd/MM/yyyy", new Date());
            return isSameDay(parsedHoliday, new Date(currentYear, currentMonth, day));
        })
    );
};

// ---------- /holiday --- Holidays Calendar  ------------

export const HolidayCalendar = (props) => {
    const { selectedMonth = new Date(), onMonthChange, holiday = [] } = props || {};

    const HolidayDates = holiday?.map((item) => item.date);

    const currentMonth = selectedMonth.getMonth();
    const currentYear = selectedMonth.getFullYear();
    const monthStart = new Date(currentYear, currentMonth, 1);
    const monthEnd = new Date(currentYear, currentMonth + 1, 0);
    const firstDayOfMonth = monthStart.getDay();
    const totalDays = monthEnd.getDate();

    const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    // Generate an array of days for the selected month
    const days = Array.from({ length: totalDays }, (_, index) => index + 1);

    const handlePrevMonth = () => onMonthChange(new Date(currentYear, currentMonth - 1, 1));
    const handleNextMonth = () => onMonthChange(new Date(currentYear, currentMonth + 1, 1));

    return (
        <div className="big-calendar holiday-big-calendar mx-auto">
            <div className="holiday-calendar-header">
                <div className="calendar-header align-items-center px-5 py-1">
                    <button className="prev-month scroll-month-arrow  fs-4 border-0 bg-transparent fw-medium" onClick={handlePrevMonth}>
                        &#8249;
                    </button>
                    <div className="">
                        <p className="text-center p-0 m-0  fs-5">{selectedMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" })}</p>
                    </div>
                    <button className="next-month scroll-month-arrow  fs-4 border-0 bg-transparent fw-medium" onClick={handleNextMonth}>
                        &#8250;
                    </button>
                </div>
            </div>
            <div className="weeks_and_dates">
                <div className="week-names mt-2">
                    {weekDays.map((day, index) => (
                        <div className={`week-name fw-bold fs-6 ${index === 0 ? "text-danger" : ""}`} key={day}>
                            {day}
                        </div>
                    ))}
                </div>
                <div className="calendar-body">
                    {Array(firstDayOfMonth)
                        .fill("")
                        .map((_, index) => (
                            <div className="empty-date" key={`empty-${index}`} />
                        ))}
                    {days.map((day) => {
                        const currentMonth = selectedMonth.getMonth();
                        const currentYear = selectedMonth.getFullYear();
                        const formattedDate = format(new Date(currentYear, currentMonth, day), "dd/MM/yyyy");
                        const isHoliday = HolidayDates.includes(formattedDate);
                        const isSunday1 = isSunday(new Date(currentYear, currentMonth, day)); // Use the isSunday helper function

                        return (
                            <div
                                key={day}
                                className={`calendar-day fw-semibold ${isHoliday ? "absent__badge" : ""} ${isSunday1 ? "sunday-and-holiday-mix " : ""} `}
                            >
                                {day}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// ---------- /dashboard --- Festival Calendar  ------------

export const FestivalCalendar = (props) => {
    const { selectedMonth, onMonthChange, data, titleName } = props || {};

    const holidays = [...data?.festival, ...data?.sunday];
    const currentMonth = selectedMonth?.getMonth();
    const currentYear = selectedMonth?.getFullYear();
    const monthStart = startOfMonth(selectedMonth);
    const monthEnd = endOfMonth(selectedMonth);

    const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    // Generate an array of days for the selected month
    const days = Array.from({ length: monthEnd.getDate() }, (_, index) => index + 1);

    const handlePrevMonth = () => onMonthChange(new Date(currentYear, currentMonth - 1, 1));
    const handleNextMonth = () => onMonthChange(new Date(currentYear, currentMonth + 1, 1));

    const shouldPrevBtnDisabled = format(selectedMonth, "MMMM") === "June";
    const shouldNextBtnDisabled = format(selectedMonth, "MMMM") === "May";

    return (
        <div className="big-calendar festival-calendar mx-auto w-100 h-100 ">
            <div className="calendar-header">
                <button
                    disabled={shouldPrevBtnDisabled}
                    className="prev-month scroll-month-arrow fs-4 border-0 bg-transparent custom-icon-button"
                    onClick={handlePrevMonth}
                >
                    &#8249;
                </button>
                <div className="text-center">
                    <span className="calendar_title fw-bold fs-6">{titleName}</span> <br />
                    <p className="fw-bold"> {selectedMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" })}</p>
                </div>
                <button disabled={shouldNextBtnDisabled} className="next-month scroll-month-arrow fs-4 border-0 bg-transparent" onClick={handleNextMonth}>
                    {" "}
                    &#8250;
                </button>
            </div>
            <div className="week-names mt-2">
                {weekDays.map((day) => (
                    <div className="week-name fw-bold text-center" key={day}>
                        {day}
                    </div>
                ))}
            </div>
            <div className="calendar-body">
                {Array(monthStart.getDay())
                    .fill("")
                    .map((_, index) => (
                        <div className="empty-date" key={`empty-${index}`} />
                    ))}
                {days.map((day) => {
                    const currentDateObj = new Date(currentYear, currentMonth, day);
                    const formattedDate = format(currentDateObj, "dd/MM/yyyy");
                    const isHoliday = holidays.includes(formattedDate);
                    const isSunday1 = isSunday(currentDateObj);

                    return (
                        <div
                            className={`calendar-day fw-semibold ${isHoliday && !isSunday1 ? "absent__badge" : ""} ${isSunday1 ? "text-danger" : ""}`}
                            key={day}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// ---------- /academics/parent-attendance --- Absent Calendar  ------------

export const AbsentCalendar = (props) => {
    const { selectedMonth, onMonthChange, data } = props || {};
    const { holidays, absentDays } = data || {};

    const monthStart = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
    const monthEnd = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);
    const firstDayOfMonth = monthStart.getDay();
    const totalDays = monthEnd.getDate();

    const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    // Generate an array of days for the selected month
    const days = Array.from({ length: totalDays }, (_, index) => index + 1);

    const handlePrevMonth = () => {
        const prevMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1);
        onMonthChange(prevMonth);
    };

    const handleNextMonth = () => {
        const nextMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1);
        onMonthChange(nextMonth);
    };

    return (
        <div className="big-calendar mx-auto w-100">
            <div className="calendar-header d-flex justify-content-between">
                <button className="prev-month scroll-month-arrow fs-4 border-0 bg-transparent" onClick={handlePrevMonth}>
                    &#8249;
                </button>
                <div className="text-center">
                    <span className="calendar_title">Attendance of</span> <br />
                    <p className="fw-bold"> {selectedMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" })}</p>
                </div>
                <button className="next-month scroll-month-arrow fs-4 border-0 bg-transparent" onClick={handleNextMonth}>
                    &#8250;
                </button>
            </div>
            <div className="week-names mt-2">
                {weekDays.map((day) => (
                    <div className="week-name fw-bold" key={day}>
                        {day}
                    </div>
                ))}
            </div>
            <div className="calendar-body">
                {Array(firstDayOfMonth)
                    .fill("")
                    .map((_, index) => (
                        <div className="empty-date" key={`empty-${index}`} />
                    ))}
                {days.map((day) => {
                    const currentMonth = getMonth(selectedMonth);
                    const currentYear = selectedMonth?.getFullYear();
                    const isHoliday = checkIsArrayIncludes({ arrayOfDates: holidays, currentMonth, currentYear, day });
                    const isAbsent = checkIsArrayIncludes({
                        arrayOfDates: absentDays?.map((item) => item?.date),
                        currentMonth,
                        currentYear,
                        day,
                    });

                    return (
                        <div className={`fw-medium ${isHoliday ? "text-danger" : isAbsent ? "absent__badge" : ""}`} key={day}>
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export const StudentHolidayCalendar = (props) => {
    const { selectedMonth, onMonthChange, data } = props || {};
    const { holidays, absentDays } = data || {};
    const monthStart = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
    const monthEnd = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);
    const firstDayOfMonth = monthStart.getDay();
    const totalDays = monthEnd.getDate();

    const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    // Generate an array of days for the selected month
    const days = Array.from({ length: totalDays }, (_, index) => index + 1);

    const handlePrevMonth = () => {
        console.log("selectedMonth", selectedMonth);
        const prevMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1);
        onMonthChange(prevMonth);
    };

    const handleNextMonth = () => {
        console.log("selectedMonth", selectedMonth);
        const nextMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1);
        onMonthChange(nextMonth);
    };

    return (
        <div className="big-calendar mx-auto w-100">
            <div className="calendar-header d-flex justify-content-between">
                {selectedMonth.toLocaleDateString(undefined, { month: "long" }) !== "June" ? (
                    <button className="prev-month scroll-month-arrow fs-4 border-0 bg-transparent" onClick={handlePrevMonth}>
                        &#8249;
                    </button>
                ) : (
                    <button className="prev-month scroll-month-arrow fs-4 border-0 text-muted bg-secondary-subtle user-select-none">&#8249;</button>
                )}
                <div className="text-center">
                    {/* <span className="calendar_title">Attendance of</span> <br /> */}
                    <p className="fw-bold"> {selectedMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" })}</p>
                </div>
                {selectedMonth.toLocaleDateString(undefined, { month: "long" }) !== "May" ? (
                    <button className="next-month scroll-month-arrow fs-4 border-0 bg-transparent" onClick={handleNextMonth}>
                        &#8250;
                    </button>
                ) : (
                    <button className="prev-month scroll-month-arrow fs-4 border-0 text-muted bg-secondary-subtle user-select-none">&#8250;</button>
                )}
            </div>
            <div className="week-names mt-2">
                {weekDays.map((day) => (
                    <div className="week-name fw-bold" key={day}>
                        {day}
                    </div>
                ))}
            </div>
            <div className="calendar-body">
                {Array(firstDayOfMonth)
                    .fill("")
                    .map((_, index) => (
                        <div className="empty-date" key={`empty-${index}`} />
                    ))}
                {days.map((day) => {
                    const currentMonth = getMonth(selectedMonth);
                    const currentYear = selectedMonth?.getFullYear();
                    const isHoliday = checkIsArrayIncludes({ arrayOfDates: holidays, currentMonth, currentYear, day });
                    const isAbsent = checkIsArrayIncludes({ arrayOfDates: absentDays, currentMonth, currentYear, day });

                    return (
                        <div className={`fw-medium ${isHoliday ? "text-danger" : isAbsent ? "absent__badge" : ""}`} key={day}>
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
