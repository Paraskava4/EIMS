import React, { forwardRef } from "react";
import Select from "react-select";
import { default as CreatableSelect } from "react-select/creatable";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";

import { ErrorMessage, capitalize } from "../forms";
import { standardSelectStyle } from "./styles/CreatableSelect";
import { isValidArray } from "../../../utils/constants/validation/array";

const CustomSelect = forwardRef(
    (
        {
            defaultValue,
            field,
            form: { getValues, setValue, formState },
            options,
            isFetching,
            title,
            className,
            onCustomHandleChange,
            handleCreate,
            allowCreateOption,
            ...rest
        },
        ref
    ) => {
        // Custom logic to convert object value to string value
        const handleChange = (selectedOption) => setValue(field?.name, selectedOption ? selectedOption.value : "");

        const error = formState?.errors?.[field?.name];

        // Custom logic to convert string value to object value
        const selectedValue = getValues(field.name);
        const selectedOption = options?.find((option) => option.value === selectedValue) || null;

        return (
            <div className={`me-3 ${className || "prefix_width"}`}>
                <Form.Label className={`enquiry-label default_label m-0 mb-2 ${capitalize(field?.name) === "StandardId" ? "d-none" : "d-block text-start"}`}>
                    {title || capitalize(field?.name)}
                </Form.Label>
                {allowCreateOption ? (
                    <CreatableSelect
                        {...rest}
                        defaultValue={selectedOption}
                        closeMenuOnSelect={true}
                        value={selectedOption}
                        onChange={onCustomHandleChange || handleChange}
                        ref={ref}
                        styles={standardSelectStyle}
                        options={options}
                        onCreateOption={handleCreate}
                        noOptionsMessage={() => "No Schools available"}
                        components={{
                            IndicatorSeparator: () => null,
                        }}
                        isDisabled={isFetching}
                    />
                ) : (
                    <Select
                        isDisabled={isFetching}
                        defaultValue={defaultValue || ""}
                        {...rest}
                        value={selectedOption}
                        onChange={onCustomHandleChange || handleChange}
                        options={options}
                        ref={ref}
                        components={{ IndicatorSeparator: () => null }}
                        styles={standardSelectStyle}
                        className={`react_select border-0 ${field?.name === "Batch : " ? "bg-dark" : "d-block text-start"}`}
                    />
                )}
                <ErrorMessage error={error} />
            </div>
        );
    }
);

export default CustomSelect;

export const ModifiedSelect = ({
    className,
    title,
    name,
    control,
    options,
    handleCustomChange,
    form: {
        formState: { errors },
    },
    CustomLabelStyle,
    CustomSelectStyle,
    isDisabled,
}) => {
    return (
        <div className={`${className || "w-auto"}`}>
            <Form.Label className={`enquiry-label ${CustomLabelStyle} m-0 d-block text-start`}>{title || capitalize(name)}</Form.Label>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <>
                        <Select
                            styles={CustomSelectStyle}
                            value={value && isValidArray(options) && options?.find((option) => option.value === value)}
                            options={isValidArray(options) ? options : []}
                            onChange={(selectedOption) =>
                                handleCustomChange ? handleCustomChange(selectedOption) : onChange(selectedOption ? selectedOption.value : null)
                            }
                            components={{
                                IndicatorSeparator: () => null,
                            }}
                            isDisabled={isDisabled}
                        />
                        {errors[name] && !value && <ErrorMessage error={errors[name]} />}
                    </>
                )}
            />
        </div>
    );
};
