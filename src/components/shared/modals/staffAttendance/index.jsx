import React from "react";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { actions } from "../../../../redux/store";
import { formatDate } from "../../../../utils/constants/formats/dates";
import { useCreateStaffAttendanceMutation } from "../../../../api/staffAttendance";
import useErrorCatcher from "../../../../utils/constants/hooks/useErrorCatcher";

const StaffAttendanceUpdate = ({ data }) => {
    const { open } = useSelector((state) => state?.modal?.staffAttendance) || {};
    const { date, staffData, isPresent } = data || {};

    const [createStaffAttendance, { error, isError, isLoading }] = useCreateStaffAttendanceMutation();
    useErrorCatcher({ error, isError });

    const handleClose = () => actions.modal.closeStaffAttendance();

    const handleConfirmAbsent = async () => {
        const { _id } = staffData;
        const payload = { date: formatDate({ date }), isAbsent: isPresent, staffId: _id };

        await createStaffAttendance(payload);
        handleClose();
    };

    return (
        <Modal show={open} onHide={handleClose} animation={true} centered size="sm">
            <Modal.Body className="bg-white rounded rounded-2">
                <Container className="my-4 text-center">
                    <p className="fs-5 fw-bold">{`Do you really want to ${isPresent ? "Absent" : "Present"} this Staff ?`}</p>
                </Container>
                <Row>
                    <Col>
                        <button
                            disabled={isLoading}
                            type="button"
                            className={`w-100 rounded-3 border py-2 fs-5 text-white fs-5 fw-semibold ${isPresent ? "bg-danger " : "bg-success"}`}
                            onClick={handleConfirmAbsent}
                        >
                            Save
                        </button>
                    </Col>
                    <Col>
                        <button
                            type="button"
                            className={`w-100 border  rounded-3 py-2 fs-5 text-white fs-5 fw-semibold ${isPresent ? "bg-success" : "bg-danger "}`}
                            onClick={() => handleClose()}
                        >
                            Cancel
                        </button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default StaffAttendanceUpdate;
