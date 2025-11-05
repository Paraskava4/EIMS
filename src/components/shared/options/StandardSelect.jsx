import { forwardRef, useState, useEffect } from "react";
import Select from "react-select";
import { useSelector } from "react-redux";

import { useGetStandardQuery } from "../../../api/standard";
import { isValidArray } from "../../../utils/constants/validation/array";
import { ModifiedSelectStyle } from "./styles/CreatableSelect";
import CloseIcon from "../../../assets/images/demo-img/closeIconSelect.svg";

const StandardSelect = forwardRef(({ isError, disabled, defaultStandard, handleChange, clearFilter, ...props }, ref) => {
    const standard = useSelector((state) => state.student.selectedStandard);
    const [standardList, setStandardList] = useState([]);

    const { data: standardResponse } = useGetStandardQuery(null, { refetchOnFocus: true });

    useEffect(() => {
        if (standardResponse?.status !== 200) return;
        const standardOptions = standardResponse?.data?.map(({ name, fees, _id }) => {
            return { label: name, value: _id, fees };
        });
        setStandardList(standardOptions);
    }, [standardResponse]);

    // const customComponents = {
    //     IndicatorSeparator: () => null,
    //     ClearIndicator: () => (
    //         <div className="clear-filter-button" onClick={clearFilter}>
    //             Clear Filter
    //         </div>
    //     ),
    // };

    return (
        <Select
            isClearable
            styles={ModifiedSelectStyle}
            value={
                (standard || defaultStandard) && isValidArray(standardList) && standardList?.find((option) => option?.value === (standard || defaultStandard))
            }
            options={isValidArray(standardList) ? standardList : []}
            onChange={(selectedOption) => handleChange(selectedOption?.value)}
            components={{
                IndicatorSeparator: () => null,
                ClearIndicator: () => (
                    <button className="bg-transparent border-0 my-auto d-block align-self-center text-muted fw-semibold" onClick={clearFilter}>
                        <img src={CloseIcon} alt="" width="20px" />
                    </button>
                ),
            }}
            ref={ref}
            {...props}
        />
    );
});

export default StandardSelect;
