import { Button, Modal, Form, FormGroup, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import "./style.scss";
import { InputItem } from "../../forms";
import { actions } from "../../../../redux/store";
import { REGEX } from "../../../../utils/constants/validation/regex";
import { Validation } from "../../../../utils/constants/validation/validation";
import { defaultEducationalValues, defaultGuardianValues, defaultPersonalValues } from "../../../../utils/constants/api/defaultValue";
import { useRegisterMobileMutation } from "../../../../api/common";
import { isValidArray } from "../../../../utils/constants/validation/array";
import { ROLES } from "../../../../utils/constants/option-menu";

const MobileModal = () => {
    const navigate = useNavigate();
    const { open } = useSelector((state) => state?.modal?.mobile || "");

    const [registerMobileReq, registerMobile] = useRegisterMobileMutation();

    const form = useForm({
        defaultValues: { MobileNumber: "" },
        resolver: yupResolver(Validation.MOBILE),
    });

    const { setValue, reset, handleSubmit } = form;

    const validateMobileNumber = (e, name) => {
        const phoneNumber = e.target.value;
        if (!REGEX.MOBILE.test(phoneNumber)) return;
        else setValue(name, phoneNumber);
    };

    const handleRegister = async (data) => {
        const response = await registerMobileReq(data);

        if (response?.data?.student) {
            actions.enquiry.addMobileNumber(data?.MobileNumber);
            handleEnquiryFormData(response?.data?.student);
            actions.enquiry.setStudentId("");
            reset();
        }
    };

    const token = sessionStorage.getItem("roles");

    const handleClose = () => {
        actions.modal.closeMobile();
        if (token === ROLES.TECHAR) navigate("/teacher/dashboard");
        if (token === ROLES.ADMIN) navigate("/dashboard");
        reset();
    };

    return (
        <Modal show={open} onHide={handleClose} animation={true} centered backdrop="static" keyboard={false} size="md">
            <Modal.Header className="modal__title__wrapper " closeButton>
                <h2 className="modal__title">Add Mobile Number</h2>
            </Modal.Header>
            <Modal.Body
                className="bg-white"
                style={{
                    borderBottomRightRadius: "5px",
                    borderBottomLeftRadius: "5px",
                }}
            >
                <Form onSubmit={handleSubmit(handleRegister)} className="d-flex flex-column">
                    <div className="input-with-icons my-2">
                        <InputItem
                            title="Mobile Number"
                            className="form__input"
                            classNameLabel="default_label"
                            name="MobileNumber"
                            form={form}
                            onInput={(e) => validateMobileNumber(e, "MobileNumber")}
                        />
                    </div>

                    <FormGroup className="mb-2 text-center" controlId="exampleForm.ControlInput3">
                        <Button className="btn btn-lg form__button text-white" type="submit" disabled={registerMobile?.isLoading}>
                            {registerMobile?.isLoading ? (
                                <>
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Registering...
                                </>
                            ) : (
                                "Register"
                            )}
                        </Button>
                    </FormGroup>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default MobileModal;

export const handleEnquiryFormData = (apiResponse) => {
    let defaultPersonalVal = { ...defaultPersonalValues };
    let defaultEducationalVal = { ...defaultEducationalValues };
    let defaultGuardianVal = { ...defaultGuardianValues };

    Object.entries(apiResponse).forEach(([key, value]) => {
        if (["subject"].includes(key)) defaultEducationalVal["subjects"] = value?.map(({ _id }) => ({ subjectId: _id }));

        if (key in defaultPersonalVal) {
            defaultPersonalVal[key] = value;
        } else if (key in defaultEducationalVal) {
            defaultEducationalVal[key] = value;
        } else if (key in defaultGuardianVal) {
            let extractedData = value;
            if (key === "siblings") {
                extractedData =
                    isValidArray(apiResponse?.siblings) &&
                    apiResponse?.siblings?.map((sibling) => ({
                        siblingContact1: sibling?.siblingContact1,
                        siblingLastName: sibling?.lastName,
                        siblingMiddleName: sibling?.middleName,
                        siblingPrefix: sibling?.prefix,
                        siblingFirstName: sibling?.firstName,
                        studyHere: sibling?.studyHere,
                    }));
            }
            defaultGuardianVal[key] = extractedData;
        }
    });
    actions.enquiry.addPersonalData(defaultPersonalVal);
    actions.enquiry.addEducationData(defaultEducationalVal);
    actions.enquiry.addGuardianData(defaultGuardianVal);
};
