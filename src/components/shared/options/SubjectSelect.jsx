import { useEffect, forwardRef, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";

import { useGetSubjectQuery } from "../../../api/subject";
import { StandardModifiedSelectStyle } from "./styles/CreatableSelect";
import { isValidArray } from "../../../utils/constants/validation/array";

const SubjectSelect = forwardRef(({ isError, disabled, handleChange, ...props }, ref) => {
    const subject = useSelector((state) => state.student.subject);
    const [subjectList, setSubjectLis] = useState([]);

    const { data: subjectResponse } = useGetSubjectQuery(null, {
        refetchOnFocus: true,
    });

    useEffect(() => {
        if (subjectResponse?.status !== 200) return;
        const subjectOptions = subjectResponse?.data?.map(({ name, _id }) => {
            return { label: name, value: _id };
        });
        setSubjectLis(subjectOptions);
    }, [subjectResponse]);

    return (
        <>
            <Select
                isClearable
                styles={StandardModifiedSelectStyle}
                value={isValidArray(subjectList) && subjectList?.find((option) => option?.value === subject)}
                options={isValidArray(subjectList) ? subjectList : []}
                onChange={(selectedOption) => handleChange(selectedOption?.value)}
                components={{
                    IndicatorSeparator: () => null,
                }}
                ref={ref}
                {...props}
            />
        </>
    );
});

export default SubjectSelect;
