import { useEffect, useLayoutEffect, useState } from "react";
import Select from "react-select";
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import { actions } from "../../../redux/store";
import Table from "../../../components/shared/Table";
import { useGetAdmissionEnquiryListingQuery } from "../../../api/admission";
import EditAndDelete from "../../../components/shared/Actions/EditAndDelete";
import { customStyles } from "../../../components/shared/options/styles/styles";
import { handleEnquiryFormData } from "../../../components/shared/modals/mobile";
import { resetEnquiryStore } from "../Enquiry/Guardian";
import StandardSelect from "../../../components/shared/options/StandardSelect";

const Admission = () => {
    const navigate = useNavigate();
    const { isConfirmingAdmission } = useSelector((state) => state.enquiry);
    const selectedStandard = useSelector((state) => state.student.selectedStandard);

    const [admissionData, setAdmissionData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const { data: admissionResponse, isFetching: isAdmissionLoading } = useGetAdmissionEnquiryListingQuery(selectedStandard, {
        refetchOnMountOrArgChange: true,
    });

    useLayoutEffect(() => {
        isConfirmingAdmission && actions.modal.openAdmission();
        resetEnquiryStore();
    }, [isConfirmingAdmission]);

    useEffect(() => {
        if (!admissionResponse || admissionResponse?.status !== 200) return;
        setAdmissionData(admissionResponse?.data);

        if (searchQuery) {
            setAdmissionData((filteredAdmissionData) =>
                filteredAdmissionData.filter((admissionObj) => {
                    const { firstName, lastName, middleName } = admissionObj;
                    const name = `${firstName} ${middleName} ${lastName}`;
                    return (
                        admissionObj?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        admissionObj?.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        admissionObj?.middleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (admissionObj?.enquiryNumber && admissionObj?.enquiryNumber.toLowerCase().includes(searchQuery.toLowerCase()))
                    );
                })
            );
        }
    }, [admissionResponse, searchQuery]);

    const handleOpenDelete = (e, id) => {
        e.stopPropagation();
        actions.modal.openDelete({ id, type: "ADMISSION" });
    };

    const handleEditEnquiry = (e, data) => {
        handleEnquiryFormData(data, "UPDATE_DATA");
        actions.enquiry.setIsUpdatingEnquiry(true);
        actions.enquiry.setStudentId(data?.studentId);
        actions.enquiry.addEnquiryNumber(data?.enquiryNumber);
        // navigate("/enquiry/form-first", { state: data });
        navigate("/enquiry/form-first");
    };

    const hanleRowClick = (item) => {
        actions.enquiry.setStudentId(item?.studentId);
        actions.modal.openAdmission();
    };

    const columns = [
        { name: "", label: "No", renderer: (_, idx) => idx + 1 },
        { name: "enquiryNumber", label: "Enquiry No." },
        {
            name: "",
            label: "Name",
            renderer: (item) => {
                const { firstName, lastName, middleName, studentId } = item;
                return (
                    <div className="d-flex justify-content-between">
                        <span className="p-0 m-0 d-block align-self-center">{`${lastName} ${firstName}  ${middleName}`}</span>
                        <span>
                            <EditAndDelete onEdit={(e) => handleEditEnquiry(e, item)} onDelete={(e) => handleOpenDelete(e, studentId)} />
                        </span>
                    </div>
                );
            },
        },
    ];

    return (
        <>
            <div className="overflow-x-hidden overflow-y-auto" style={{ height: "calc(100vh - 96px)", overflow: "auto" }}>
                <Row className="row my-3">
                    <Col sm={12} md={6} className={"mb-2 mb-lg-0"}>
                        <StandardSelect
                            className="shadow-none"
                            styles={customStyles}
                            placeholder="Select Standard...."
                            handleChange={(selectedStandard) => actions.student.setStandard(selectedStandard)}
                        />
                    </Col>
                    <Col sm={12} md={6}>
                        <Form.Control
                            type="text"
                            placeholder="Search by Name...."
                            className="input_style shadow-none mb-2 mb-lg-0 mt-2 mt-lg-0 fw-semibold fs-5"
                            size="lg"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Col>
                </Row>
                <div>
                    <div style={{ height: "calc(100vh - 180px)", overflow: "auto" }} className="border border-dark">
                        <Table
                            columns={columns}
                            items={admissionData}
                            isLoading={isAdmissionLoading}
                            onRowClick={(item) => hanleRowClick(item)}
                            rowClass={"cursor_pointer"}
                            className={"addmission_scroll"}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admission;
