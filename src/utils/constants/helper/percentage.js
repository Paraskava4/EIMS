import { round } from "lodash";

export const calcuatePercentage = (obtainedMarks, totalMarks) => {
    if (!obtainedMarks || !totalMarks) return "";

    const percentage = (obtainedMarks / totalMarks) * 100;
    return `${round(percentage, 2)}%`;
};
