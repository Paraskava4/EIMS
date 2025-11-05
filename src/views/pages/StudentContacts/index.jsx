import { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./style.scss";
import Table from "../../../components/shared/Table";
import { customStyles } from "../../../components/shared/options/styles/styles";
import EditAndDelete from "../../../components/shared/Actions/EditAndDelete";
import { actions } from "../../../redux/store";
import { useGetContactsQuery } from "../../../api/studentContact";
import { handleEnquiryFormData } from "../../../components/shared/modals/mobile";
import StandardSelect from "../../../components/shared/options/StandardSelect";

const StudentContact = () => {
    const [selectedStandard, setSelectedStandard] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const navigate = useNavigate();

    const { data: studentsContactData, isFetching: isStudentFetching, refetch } = useGetContactsQuery(null, { refetchOnMountOrArgChange: true });

    const handleEditClick = (item) => {
        handleEnquiryFormData(item, "UPDATE_DATA");
        actions.enquiry.setIsUpdatingEnquiry(true);
        actions.enquiry.setStudentId(item?.studentId);
        actions.enquiry.addEnquiryNumber(item?.enquiryNumber);
        actions.enquiry.setIsStudentConfirmed(true);
        navigate("/enquiry/form-first", { state: item });
    };

    const columns = [
        {
            name: "actions",
            label: "Edit&Delete",
            renderer: (student) => (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <EditAndDelete onDelete={(e) => handleOpenDelete(student?.studentId)} onEdit={(e) => handleEditClick(student)} />
                </div>
            ),
        },
        {
            name: "standard",
            label: "Standard",
        },
        {
            name: "firstName",
            label: "Student Name",
        },
        {
            name: "middleName",
            label: "Father Name",
        },
        { name: "contact1", label: "Mobile No." },
        { name: "contact2", label: "Mobile No." },
        { name: "userName", label: "Username" },
        {
            name: "password",
            label: "Password",
            renderer: (item) => {
                return <span className="fs-5">{`********`}</span>;
            },
        },
    ];

    useEffect(() => {
        if (studentsContactData?.status !== 200) return;
        setFilteredData(studentsContactData?.data);

        if (selectedStandard && selectedStandard !== "") {
            setFilteredData((prevItem) => {
                return prevItem?.filter((studentObj) => studentObj?.standardId === selectedStandard?.id);
            });
        }

        const query = searchQuery.toLowerCase();
        if (searchQuery) {
            setFilteredData((prevItem) => {
                return prevItem.filter((studentObj) => {
                    const nameMatch = studentObj?.firstName?.toLowerCase?.().includes(query);
                    const phoneMatch = String(studentObj?.contact1)?.includes?.(searchQuery) || String(studentObj?.contact2)?.includes?.(searchQuery);
                    return nameMatch || phoneMatch;
                });
            });
        }
    }, [studentsContactData, searchQuery, selectedStandard]);

    const handleOpenDelete = (id) => {
        actions.modal.openDelete({ id, type: "STUDENT" });
    };

    console.log("filteredData>>>>>>", filteredData);
    const handleClearFilter = () => {
        console.log("on Click ");
        // Reset the filteredData to show all table data
        setFilteredData(studentsContactData?.data);
        // Reset the selectedStandard and searchQuery to their initial values
        setSelectedStandard(null);
        setSearchQuery("");
    };

    return (
        <>
            <h3 className="mt-3">All Contacts</h3>
            <div className="overflow-x-hidden" style={{ height: "calc(100vh - 140px)", overflow: "auto" }}>
                <Row className="row my-3">
                    <Col sm={6} className={"mb-2 mb-lg-0"}>
                        <StandardSelect
                            className="shadow-none"
                            styles={customStyles}
                            placeholder="Select Standard"
                            handleChange={(selectedOption) => setSelectedStandard({ id: selectedOption })}
                            clearFilter={handleClearFilter} // Pass the clearFilter function as a prop
                        />
                    </Col>
                    <Col sm={6}>
                        <Form.Control
                            type="text"
                            placeholder="Search by Name and Number"
                            className="input_style shadow-none mb-2 mb-lg-0 mt-2 mt-md-0"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Col>
                </Row>
                <div className="mt-3 staff-list-container border border-dark" style={{ height: "calc(100vh - 284px)", overflow: "auto" }}>
                    <Table columns={columns} items={filteredData} rowClass={"cursor_pointer"} isLoading={isStudentFetching} />
                </div>
            </div>
        </>
    );
};

export default StudentContact;
