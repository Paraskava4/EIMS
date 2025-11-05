import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const useFilteredData = (data, search, arrOfSearchKeys) => {
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (!data || !Array.isArray(data)) return; //if data not found OR data is not array

        setFilteredData(data); //sets data for first time
        console.log("search", search);
        if (search) {
            // found query if search query found
            setFilteredData((prevState) =>
                prevState.filter((item) => arrOfSearchKeys.some((key) => item[key]?.toLowerCase()?.includes(search?.toLowerCase())))
            );
        }

        return () => setFilteredData([]);
    }, [data, search, arrOfSearchKeys]);

    return {
        filteredData,
    };
};

useFilteredData.propTypes = {
    data: PropTypes.array,
    search: PropTypes.string,
    arrOfSearchKeys: PropTypes.arrayOf(PropTypes.string),
};
