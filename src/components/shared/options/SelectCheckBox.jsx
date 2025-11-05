import React from "react";
import Select from "react-select";

const SelectCheckBox = ({ options, value, onChange, ...props }) => {
    const handleSelectChange = (selectedValues) => {
        onChange(selectedValues);
    };

    const handleOptionChange = (option) => {
        const selectedOption = value.find((val) => val.value === option.value);
        if (selectedOption) {
            onChange(value.filter((val) => val.value !== option.value));
        } else {
            onChange([...value, option]);
        }
    };

    const Option = ({ innerProps, label, isSelected }) => (
        <div className="d-flex px-2 align-items-center justify-content-between" {...innerProps}>
            <label>{label}</label>
            <input type="checkbox" checked={isSelected} onChange={() => handleOptionChange({ value: label, label })} />
        </div>
    );

    return (
        <Select
            options={options}
            value={value}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            onChange={handleSelectChange}
            components={{ Option }}
            {...props}
        />
    );
};

export default SelectCheckBox;
