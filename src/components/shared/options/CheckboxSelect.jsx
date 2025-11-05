import PropTypes from "prop-types";
import Select from "react-select";
import { components } from "react-select";
import makeAnimated from "react-select/animated";

import "./style.scss";

export function compare(a, b) {
    if (a?.username < b?.username) {
        return -1;
    }
    if (a?.username > b?.username) {
        return 1;
    }
    return 0;
}

export const Option = (props) => {
    return (
        <div className="option__wrapper__container">
            <components.Option {...props}>
                <div className="option_inner_wrapper">
                    <input
                        style={{
                            color: props.isSelected && "#4195F5",
                            background: "#FFFFFF",
                            width: "18px",
                            height: "18px",
                            marginTop: "0.2rem",
                            marginRight: "0.8rem",
                        }}
                        checked={props.isSelected}
                        onChange={() => null}
                        type="checkbox"
                    />
                    <label style={{ height: "auto" }} className="menu__label__text">
                        {props.label}
                    </label>
                </div>
            </components.Option>
        </div>
    );
};

const allOption = {
    label: "All",
    value: "*",
};

export const ValueContainer = ({ children, ...props }) => {
    const currentValues = props.getValue();
    let toBeRendered = children;

    if (currentValues.some((val) => val.value === allOption.value)) {
        toBeRendered = [[children[0][0]], children[1]];
    }

    return <components.ValueContainer {...props}>{toBeRendered}</components.ValueContainer>;
};

export const MultiValue = (props) => {
    return <components.MultiValue {...props}>{props.data.label === "All" ? props.data.label : props.data.label}</components.MultiValue>;
};

export const animatedComponents = makeAnimated();

const MySelect = (props) => {
    if (props.allowSelectAll) {
        return (
            <Select
                {...props}
                options={[props.allOption, ...props.options]}
                onChange={(selected, event) => {
                    if (selected !== null && selected.length > 0) {
                        if (selected[selected.length - 1].value === props.allOption.value) {
                            return props.onChange([props.allOption, ...props.options]);
                        }
                        let result = [];
                        if (selected.length === props.options.length) {
                            if (
                                selected.includes(props.allOption) ||
                                (selected[0].value === props.allOption.value && selected.length === props.options.length)
                            ) {
                                result = selected.filter((option) => option.value !== props.allOption.value);
                            } else if (event.action === "select-option") {
                                result = [props.allOption, ...props.options];
                            }
                            return props.onChange(result);
                        }
                    }
                    return props.onChange(selected);
                }}
                styles={props.CustomSelectStyle}
            />
        );
    }

    return <Select {...props} styles={props.CustomSelectStyle} />;
};

MySelect.propTypes = {
    options: PropTypes.array,
    value: PropTypes.any,
    onChange: PropTypes.func,
    allowSelectAll: PropTypes.bool,
    allOption: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
    }),
};

MySelect.defaultProps = {
    allOption: {
        label: "All",
        value: "*",
    },
};

export default MySelect;
