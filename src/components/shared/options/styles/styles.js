export const customStyles = {
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
        fontSize: "1.3rem !important",
        color: "#000",
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = "opacity 300ms";
        const color = "#000000";
        return { ...provided, transition, color, opacity };
    },
};

export const directoryOptionsStyles = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#8d8c8c" : "white",
        "&:hover": {
            background: "#cac4c4",
        },
    }),
    control: (styles) => ({
        ...styles,
        border: "1px solid #707070",
        borderRadius: "10px",
        display: "flex",
        "&:hover": {
            borderColor: "#000",
        },
    }),
    menu: (base) => ({
        ...base,
        borderRadius: 3,
        marginTop: "5px",
        padding: 0,
    }),
    menuList: (base) => ({
        ...base,
        height: "auto",
        padding: 0,
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = "opacity 300ms";
        const color = "#707070";
        return { ...provided, transition, color, opacity };
    },
};

export const spreeOptionsStyles = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#8d8c8c" : "white",
        "&:hover": {
            background: "#cac4c4",
        },
    }),
    control: (styles) => ({
        // none of react-select's styles are passed to <Control />
        ...styles,
        border: "1px solid #707070",
        borderRadius: "10px",
        display: "flex",
        "&:hover": {
            borderColor: "#000",
        },
    }),
    menu: (base) => ({
        ...base,
        // override border radius to match the box
        borderRadius: 5,
        marginTop: "3px",
    }),
    menuList: (base) => ({
        ...base,
        height: "auto",
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = "opacity 300ms";
        const color = "#707070";
        return { ...provided, transition, color, opacity };
    },
};

export const messageListOptionStyles = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#8d8c8c" : "white",
        margin: 0,
        padding: 10,
        fontFamily: "Magdelin-Medium",
        display: "flex",
        alignItems: "center",
        "&:hover": {
            background: "#cac4c4",
        },
    }),
    control: (styles) => ({
        ...styles,
        border: "1px solid #707070",
        borderRadius: "10px",
        display: "flex",
        "&:hover": {
            borderColor: "#000",
        },
    }),
    menu: (base) => ({
        ...base,
        borderRadius: 10,
        marginTop: "1px",
    }),
    menuList: (base) => ({
        ...base,
        height: "250px",
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = "opacity 300ms";
        const color = "#707070";
        return { ...provided, transition, color, opacity };
    },
};
