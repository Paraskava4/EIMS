export const CustomDatePicker = forwardRef((props, ref) => {
    const datePickerRef = React.createRef();
    const startYear = 1990;
    const endYear = new Date().getFullYear() + 1;
    const years = Array.from({ length: endYear - startYear }, (_, index) => startYear + index);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useImperativeHandle(ref, () => ({
        focus: () => {
            datePickerRef.current.setOpen(true);
        },
    }));

    return (
        <DatePicker
            style={{ backgroundColor: "#000000" }}
            ref={datePickerRef}
            renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
                <div className="datepicker-header" style={{ width: "100%", margin: "10px 0", display: "flex", justifyContent: "space-between" }}>
                    <button style={{ widht: "10%" }} type="button" className="datepicker-navigation" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                        {"<"}
                    </button>
                    <select className="datepicker-year-select" value={getYear(date)} onChange={({ target: { value } }) => changeYear(value)}>
                        {years.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <select
                        className="datepicker-month-select"
                        value={months[getMonth(date)]}
                        onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
                    >
                        {months.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <button style={{ widht: "10%" }} className="datepicker-navigation" type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                        {">"}
                    </button>
                </div>
            )}
            {...props}
        />
    );
});
