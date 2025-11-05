import { showSuccessToast } from "../api/toast";

const isSuccess = (response, msg) => {
    const message = msg || response?.message || "Successfull";
    if (isStatusInclude(response?.status || response?.data?.status) && !response?.error) {
        showSuccessToast(message);
        return response;
    }
};

export const isStatusInclude = (status) => [200, 201, 202, "success", "Success"].includes(status);

export default isSuccess;
