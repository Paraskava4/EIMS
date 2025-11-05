export const standardSelectStyle = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#4195F5" : "white",
        "&:hover": {
            background: "#4195F5",
            color: "#FFFFFF",
            transition: "all 0.8s",
        },
    }),
    control: (styles) => ({
        ...styles,
        border: "none",
        backgroundColor: "#f5f5f5",
        color: "#000000",
        borderRadius: "10px",
        padding: "3px 0",
        height: "51px",
        boxShadow: "none",
        "&:hover": {
            borderColor: "#a0a293",
        },
        fontWeight: "510",
        fontSize: "22px",
    }),
    menu: (base) => ({
        ...base,
        borderRadius: 0,
        borderColor: "2px solid #dadada",
        zIndex: "1000",
    }),
    menuList: (base) => ({
        ...base,
        cursor: "pointer",
    }),
    placeholder: (base) => ({
        ...base,
        fontSize: "22px",
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = "opacity 300ms";
        const color = "#000000";
        return { ...provided, transition, color, opacity };
    },
};
export const ModifiedSelectStyle = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#4195F5" : "white",
        "&:hover": {
            background: "#4195F5",
            color: "#FFFFFF",
            transition: "all 0.8s",
        },
    }),
    control: (styles) => ({
        ...styles,
        border: "none",
        backgroundColor: "#FFFFFF",
        borderRadius: "10px",
        padding: "3px 0",
        height: "51px",
        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.25)",
        "&:hover": {
            borderColor: "#a0a293",
        },
        fontWeight: "510",
        fontSize: "22px",
    }),
    menu: (base) => ({
        ...base,
        borderRadius: 0,
        borderColor: "2px solid #dadada",
    }),
    menuList: (base) => ({
        ...base,
        cursor: "pointer",
    }),
    placeholder: (base) => ({
        ...base,
        fontSize: "22px",
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = "opacity 300ms";
        const color = "#000000";
        return { ...provided, transition, color, opacity };
    },
};
export const StandardModifiedSelectStyle = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#4195F5" : "white",
        "&:hover": {
            background: "#4195F5",
            color: "#FFFFFF",
            transition: "all 0.8s",
        },
    }),
    control: (styles) => ({
        ...styles,
        border: "none",
        backgroundColor: "#F5F5F5",
        borderRadius: "10px",
        padding: "3px 0",
        height: "51px",
        boxShadow: "none",
        "&:hover": {
            borderColor: "#a0a293",
        },
        fontWeight: "510",
        fontSize: "22px",
    }),
    menu: (base) => ({
        ...base,
        borderRadius: 0,
        borderColor: "2px solid #dadada",
        zIndex: "1000",
    }),
    menuList: (base) => ({
        ...base,
        cursor: "pointer",
    }),
    placeholder: (base) => ({
        ...base,
        fontSize: "22px",
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = "opacity 300ms";
        const color = "#000000";
        return { ...provided, transition, color, opacity };
    },
};

export const staffSelectStyle = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#4195F5" : "white",
        "&:hover": {
            background: "#4195F5",
            color: "#FFFFFF",
            transition: "all 0.8s",
        },
    }),
    control: (styles) => ({
        ...styles,
        border: "none",
        width: "100px",
        backgroundColor: "#F5F5F5",
        borderRadius: "10px",
        padding: "3px 0",
        height: "48px !important",
        boxShadow: "none",
        "&:hover": {
            borderColor: "#a0a293",
        },
        fontWeight: "510",
        fontSize: "20px",
    }),
};

export const roleSelectStyle = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#4195F5" : "white",
        "&:hover": {
            background: "#4195F5",
            color: "#FFFFFF",
            transition: "all 0.8s",
        },
    }),
    control: (styles) => ({
        ...styles,
        border: "none",
        width: "100%",
        backgroundColor: "#F5F5F5",
        borderRadius: "10px",
        padding: "3px 0",
        height: "48px !important",
        boxShadow: "none",
        "&:hover": {
            borderColor: "#a0a293",
        },
        fontWeight: "510",
        fontSize: "20px",
    }),
};

export const admissionFormSelect = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#4195F5" : "white",
        "&:hover": {
            background: "#4195F5",
            color: "#FFFFFF",
            transition: "all 0.8s",
        },
    }),
    control: (styles) => ({
        ...styles,
        border: "none",
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: "10px",
        margin: "0.5rem 0px 0px 0px",
        padding: "3px 0",
        height: "48px !important",
        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.25)",
        "&:hover": {
            borderColor: "#a0a293",
        },
        fontWeight: "510",
        fontSize: "22px",
    }),
};

export const SubjectSelect = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "white" : "white",
        color: "#000",
        "&:hover": {
            background: "#4195F5",
            color: "#FFFFFF",
            transition: "all 0.5s",
        },
    }),
    control: (styles) => ({
        ...styles,
        border: "none",
        backgroundColor: "#f5f5f5",
        color: "#000000",
        borderRadius: "10px",
        padding: "3px 0",
        boxShadow: "none",
        "&:hover": {
            borderColor: "#a0a293",
        },
        fontWeight: "510",
        fontSize: "22px",
    }),
    menu: (base) => ({
        ...base,
        borderRadius: 0,
        borderColor: "2px solid #dadada",
        zIndex: "1000",
    }),
    menuList: (base) => ({
        ...base,
        cursor: "pointer",
    }),
    placeholder: (base) => ({
        ...base,
        fontSize: "22px",
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = "opacity 300ms";
        const color = "#000000";
        return { ...provided, transition, color, opacity };
    },
};
