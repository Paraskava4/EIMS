import { useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { actions } from "../../../../redux/store";
import { InputItem } from "../../forms";
import { Validation } from "../../../../utils/constants/validation/validation";
import { useCreateSubjectMutation, useUpdateSubjectMutation } from "../../../../api/subject";
import { isStatusInclude } from "../../../../utils/constants/validation/response";

const SubjectModal = () => {
    const { open, data } = useSelector((state) => state?.modal?.subject) || {};
    const [updateReq, { isLoading: isUpdating }] = useUpdateSubjectMutation();
    const [addReq, { isLoading: isCreating }] = useCreateSubjectMutation();

    const form = useForm({
        defaultValues: { name: "" },
        resolver: yupResolver(Validation.SUBJECT),
    });

    useEffect(() => {
        form.setValue("name", data?.name || "");
    }, [form, data]);

    const handleClose = () => actions.modal.closeSubject();

    // Create and Update API
    const onSubmit = async (body) => {
        const payload = {
            ...body,
            _id: data?._id,
        };
        const response = data?._id ? await updateReq(payload) : await addReq(body);
        const message = `Subject ${data?._id ? "updated" : "created"} successfully`;
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

export default SubjectModal;
