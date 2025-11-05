import React, { useEffect, useState } from "react";
import { orderBy } from "lodash";
import cn from "classnames";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import "./style.scss";
import "../../../views/styles/_data.scss";
import { isValidArray } from "../../../utils/constants/validation/array.js";
import { Loader } from "../Loader";

const THItem = ({ label, sublabel, sortable, sortDir, changeSortDir, maxWidth }) => {
    const sortingTitle = sortDir === "asc" ? "Sort Data in descending order" : "Sort Data in ascending order";
    return (
        <th scope="col" className={`border-bottom`} style={{ maxWidth: maxWidth }}>
            {sortable ? (
                <span
                    className={cn("table__th-sorter", {
                        [`sort-${sortDir}`]: sortable && sortDir,
                    })}
                    onClick={changeSortDir}
                >
                    <span>
                        {label}
                        {sublabel && <span className="table__th-sublabel">{sublabel}</span>}
                    </span>

                    {sortable && (
                        <span className="table__sort-dir ms-2" title={sortingTitle}>
                            <IoIosArrowUp className="icon icon-asc" />
                            <IoIosArrowDown className="icon icon-desc" />
                        </span>
                    )}
                </span>
            ) : (
                <React.Fragment>
                    {label}

                    {sublabel && <span className="table__th-sublabel">{sublabel}</span>}
                </React.Fragment>
            )}
        </th>
    );
};

const oppositeDir = (dir) => (dir === "asc" ? "desc" : "asc");

const Table = ({ columns, items, className, rowClass, width, onRowClick, isLoading }) => {
    const [sortBy, setSortBy] = useState();
    const [sortDir, setSortDir] = useState();
    const [sortedItems, setSortedItems] = useState(items || []);

    const changeSortDirection = (column) => {
        setSortDir(sortBy === column ? oppositeDir(sortDir) : "asc");
        setSortBy(column);
    };

    const sorted = (column) => {
        return {
            sortDir: sortBy === column ? sortDir : undefined,
            changeSortDir: () => changeSortDirection(column),
        };
    };

    useEffect(() => {
        setSortedItems(sortBy && sortDir ? orderBy(items, [(item) => item && item[sortBy]?.toLowerCase()], [sortDir]) : items);
    }, [items, sortBy, sortDir]);

    return isLoading ? (
        <Loader height={"inherit"} />
    ) : isValidArray(items) ? (
        <table className={`table table_sortable table-striped table-hover ${className}`} style={{ borderCollapse: "unset", width: width || "" }}>
            <thead className="border table-header">
                <tr className="text-center tr">
                    {columns?.map(
                        ({ label, sublabel, name, sortable, maxWidth }, index) =>
                            !["HIDE"].includes(label) && (
                                <THItem
                                    key={`${label}__${index}`}
                                    label={label}
                                    sublabel={sublabel}
                                    name={name}
                                    prefix={className}
                                    sortable={sortable}
                                    {...sorted(name)}
                                    maxWidth={maxWidth}
                                />
                            )
                    )}
                </tr>
            </thead>
            <tbody className="overflow-auto table-body">
                {isValidArray(sortedItems) &&
                    sortedItems?.map((item, itemIndex) => (
                        <tr onClick={() => (onRowClick ? onRowClick(item) : {})} key={itemIndex} className={`w-100 text-center ${rowClass}`}>
                            {columns?.map(
                                (column, columnIndex) =>
                                    !["HIDE"].includes(column?.label) && (
                                        <td
                                            className="td text-truncate text-center"
                                            key={`${column.label}__${columnIndex + 1}`}
                                            {...(column.className ? { className: column?.className } : {})}
                                            style={{ maxWidth: column.maxWidth }}
                                        >
                                            {column.renderer ? column.renderer(item, itemIndex) || "-" : item[column.name] || "-"}
                                        </td>
                                    )
                            )}
                        </tr>
                    ))}
            </tbody>
        </table>
    ) : (
        <div className="flex_center" style={{ height: "inherit" }}>
            No Result Found!
        </div>
    );
};

export default Table;

// const sortingInInnerObj = (item) => {
//     let splitedArr = sortBy.split("-");
//     if (item[splitedArr[0]] && item[splitedArr[0]][splitedArr[1]]) return item[splitedArr[0]][splitedArr[1]].toLowerCase();
// };
