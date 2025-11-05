import { useCallback } from "react";
import { useSelector } from "react-redux";
import { actions } from "../../redux/store/store";

export const useRowSelect = (rows) => {
    const selected = useSelector((state) => state?.row?.arrOfRows);

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const handleSelectAllClick = useCallback(
        ({ target: { checked } }) => {
            actions.row.selectRow(checked ? rows?.map(({ _id }) => _id) : []);
        },
        [rows]
    );

    const handleClick = useCallback(
        (e, name) => {
            const selectedIndex = selected.indexOf(name);
            let newSelected = [];

            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, name);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected?.slice(1));
            } else if (selectedIndex === selected?.length - 1) {
                newSelected = newSelected.concat(selected?.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(selected?.slice(0, selectedIndex), selected?.slice(selectedIndex + 1));
            }
            actions.row.selectRow(newSelected);
        },
        [selected]
    );

    return {
        isSelected,
        handleSelectAllClick,
        handleClick,
        selected,
    };
};
