import { Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { actions } from "../../../../redux/store";
import { InputItem } from "../../forms";
import { Validation } from "../../../../utils/constants/validation/validation";
import { useCreateStandardMutation, useUpdateStandardMutation } from "../../../../api/standard";
import { isStatusInclude } from "../../../../utils/constants/validation/response";

const StandardModal = () => {
    const { open, data } = useSelector((state) => state?.modal?.standard);
    const [updateReq, { isLoading: isUpdating }] = useUpdateStandardMutation();
    const [addReq, { isLoading: isCreating }] = useCreateStandardMutation();

    const form = useForm({
        defaultValues: {
            name: data?.name || "",
            fees: data?.fees || null,
        },
        resolver: yupResolver(Validation.STANDARD),
    });

    const handleClose = () => actions.modal.closeStandard();

    // Create and Update API
    const onSubmit = async (body) => {
        const payload = {
            ...body,
            _id: data?._id,
        };
        const res = data?._id ? await updateReq(payload) : await addReq(body);
        handleClose();
    };

    return (
        <Modal show={open} onHide={handleClose} animation={true} centered>
            <Modal.Body className="rounded-3 bg-white edit_modal_width">
                <Form onSubmit={form.handleSubmit(onSubmit)}>
                    <InputItem name={"name"} form={form} classNameLabel={"masterLabelClassName"} className={"masterInputClassName"} />
                    <InputItem name={"fees"} form={form} type="number" classNameLabel={"masterLabelClassName"} className={"masterInputClassName"} />
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

export default StandardModal;
