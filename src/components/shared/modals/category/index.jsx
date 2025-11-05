import React from "react";
import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } from "../../../../api/category";
import { actions } from "../../../../redux/store";
import { isStatusInclude } from "../../../../utils/constants/validation/response";
import { InputItem } from "../../forms";

const Category = () => {
    const { open, data } = useSelector((state) => state?.modal?.category) || {};
    const isEditMode = data?.data?._id;
    const handleClose = () => actions.modal.closeCategory();

    const [createCategoryReq, { isLoading: isCreating }] = useCreateCategoryMutation();
    const [updateReq, { isLoading: isUpdating }] = useUpdateCategoryMutation();
    const [deleteReq, { isLoading }] = useDeleteCategoryMutation();

    const form = useForm({
        defaultValues: { name: data?.data?.name || "" },
    });

    const {
        formState: { errors },
        handleSubmit,
    } = form;

    const onSubmit = async (body) => {
        const payload = {
            ...body,
            _id: data?.data?._id,
        };
        const response = isEditMode ? await updateReq(payload) : await createCategoryReq(body);
        const message = `Category ${data?.data?._id ? "updated" : "created"} successfully`;
        if (isStatusInclude(response?.data?.status)) {
            toast.success(response?.data?.message);
            form.reset();
        }
        handleClose();
    };

    const handleDelete = async () => {
        const response = await deleteReq(data?.data?._id);
        isStatusInclude(response?.data?.status);
        handleClose();
    };

    return (
        <Modal show={open} onHide={handleClose} animation={true} centered>
            <Modal.Body className="rounded-3 bg-white edit_modal_width ">
                <div className="fs-4 text-center">{isEditMode ? "update" : "Add"} income category type</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputItem name="name" form={form} type="text" classNameLabel={"masterLabelClassName"} className={"masterInputClassName"} />
                    <div className="d-flex mt-3 ">
                        <button type="submit" className="modal_save_button w-50 me-3">
                            Save
                        </button>
                        <button type="button" onClick={isEditMode ? handleDelete : handleClose} className="w-50 modal_close_button">
                            {isEditMode ? "delete" : "close"}
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default Category;
