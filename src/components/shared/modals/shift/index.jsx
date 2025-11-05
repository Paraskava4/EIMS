import { useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { actions } from "../../../../redux/store";
import { InputItem } from "../../forms";
import { Validation } from "../../../../utils/constants/validation/validation";
import { useCreateShiftMutation, useUpdateShiftMutation } from "../../../../api/shift";
import { isStatusInclude } from "../../../../utils/constants/validation/response";

const ShiftModal = () => {
    const { open, data } = useSelector((state) => state?.modal?.shift) || {};
    const [updateReq, { isLoading: isUpdating }] = useUpdateShiftMutation();
    const [addReq, { isLoading: isCreating }] = useCreateShiftMutation();

    const form = useForm({
        defaultValues: { name: "" },
        resolver: yupResolver(Validation.SHIFT),
    });

    useEffect(() => {
        form.setValue("name", data?.name || "");
    }, [form, data]);

    const handleClose = () => actions.modal.closeShift();

    // Create and Update API
    const onSubmit = async (body) => {
        const payload = {
            ...body,
            _id: data?._id,
        };
        const response = data?._id ? await updateReq(payload) : await addReq(body);
        const message = `Shift ${data?._id ? "updated" : "created"} successfully`;
        if (isStatusInclude(response?.data?.status)) {
            toast.success(message);
            form.reset();
        }
        handleClose();
    };

    return (
        <Modal show={open} onHide={handleClose} animation={true} centered>
            <Modal.Body className="rounded-3 bg-white edit_modal_width">
                <Form onSubmit={form.handleSubmit(onSubmit)}>
                    <InputItem name={"name"} form={form} classNameLabel={"masterLabelClassName"} className={"masterInputClassName"} />
                    <div className="d-flex mt-3">
                        <button type="submit" disabled={isUpdating || isCreating} className="modal_save_button w-50 me-3">
                            Save
                        </button>
                        <button type="button" onClick={handleClose} className="w-50 modal_close_button">
                            Close
                        </button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ShiftModal;
