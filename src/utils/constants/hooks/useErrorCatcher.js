import React, { useEffect } from "react";
import { showErrorToast } from "../api/toast";

const useErrorCatcher = ({ error, isError }) => {
    useEffect(() => {
        isError && error && showErrorToast(error?.data?.message || error?.message || "Something went wrong!");
    }, [error, isError]);

    return <></>;
};

export default useErrorCatcher;
