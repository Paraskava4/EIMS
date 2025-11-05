import { Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { actions } from "../../../../redux/store";
import { useUpdateStaffPasswordMutation } from "../../../../api/staff";

const PasswordModal = () => {
    const { pathname } = useLocation();
    const staffId = !pathname.startsWith("/create") ? pathname.split("/")[2] : "";

    const { open } = useSelector((state) => state?.modal?.password) || {};
    const passwordStr = useSelector((state) => state.utils.passwordStr);

    const [updateStaffPassword, { isLoading }] = useUpdateStaffPasswordMutation();

    const handleClose = () => actions.modal.closePassword();

    // Create and Update API
    const onSubmit = async () => {
        if (staffId) {
            await updateStaffPassword({ staffId, password: passwordStr });
        }
        handleClose();
    };

    return (
        <Modal show={open} onHide={handleClose} animation={true} centered>
            <Modal.Body className="bg-white edit_modal_width">
                <Form>
                    <h3 className="d-flex justify-content-center">{staffId ? "Edit Password" : "Create Password"}</h3>
                    <Form.Label className="staff_label">New password</Form.Label>
                    <Form.Control
                        type="password"
                        className="staff_input_style"
                        value={passwordStr}
                        onChange={(e) => actions.utils.setPasswordStr(e.target.value)}
                    />
                    <div className="d-flex mt-3">
                        <button
                            type="button"
                            onClick={onSubmit}
                            disabled={isLoading || passwordStr?.trim()?.length < 1}
                            className="modal_save_button w-50 mx-auto bg-primary"
                        >
                            Save
                        </button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default PasswordModal;
