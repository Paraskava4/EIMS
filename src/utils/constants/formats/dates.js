import { format, isValid } from "date-fns";

export const DtFormat = {
    Y_M_D: "yyyy-MM-DD",
    D_M_Y: "DD-MM-yyyy",
    M_D_Y: "MM-DD-yyyy",
    MUI_DT: "dd/MM/yyyy",
    TAB_DT: "DD/MM/yyyy",
};

export const formatDate = ({ date = new Date(), formatType = DtFormat.MUI_DT }) => {
    let isValidDate = true;
    if (typeof date === "string") {
        date = new Date(date);
        isValidDate = isValid(date);
    } else isValidDate = isValid(date);

    if (!isValidDate) throw new Error("Enter Valid Date");
    else return format(date, formatType);
};
