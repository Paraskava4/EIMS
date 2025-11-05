import { forwardRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";

import { isValidArray } from "../../../utils/constants/validation/array";
import { ModifiedSelectStyle } from "./styles/CreatableSelect";
import { useGetBatchQuery } from "../../../api/batch";

const BatchSelect = forwardRef(({ isError, defaultBatch, disabled, handleChange, ...props }, ref) => {
    const { selectedBatch: batch, selectedStandard: standardId } = useSelector((state) => state.student);

    const [batchList, setBatchList] = useState([]);

    const { data: batchResponse } = useGetBatchQuery(standardId, {
        refetchOnFocus: true,
        skip: !standardId,
    });

    useEffect(() => {
        if (batchResponse?.status !== 200) return;
        const batchOptions = batchResponse?.data?.map(({ name, _id }) => {
            return { label: name, value: _id };
        });
        setBatchList(batchOptions);
    }, [batchResponse]);

    return (
        <Select
            isClearable
            styles={ModifiedSelectStyle}
            value={(batch || defaultBatch) && isValidArray(batchList) && batchList?.find((option) => option?.value === (batch || defaultBatch))}
            options={isValidArray(batchList) ? batchList : []}
            onChange={(selectedOption) => handleChange(selectedOption?.value)}
            components={{
                IndicatorSeparator: () => null,
            }}
            ref={ref}
            {...props}
        />
    );
});

export default BatchSelect;
