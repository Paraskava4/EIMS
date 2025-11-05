import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Col, Container, Form, Navbar, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import "../../../views/styles/app.scss";
import Sidebar from "../../Sidebar";
import manuIcon from "../../../assets/images/menu-bar-icon.svg";
import { ROLES } from "../../../utils/constants/option-menu";
import { useGetParentChildQuery } from "../../../api/parent";
import { actions } from "../../../redux/store";
import placeHolder from "../../../assets/images/StudentRecords/placeholder.svg";

const MainLayout = ({ children }) => {
    const { pathname } = useLocation();
    const [show, setShow] = useState(false);
    const handleToggle = () => setShow(!show);
    const dispatch = useDispatch();

    const [studentData, setStudentData] = useState([]);

    const { data: childDataResponse } = useGetParentChildQuery();

    const defaultSelect = JSON.parse(sessionStorage.getItem("selectedUserId"));

    useEffect(() => {
        if (sessionStorage.getItem("roles") === ROLES.PARENT) {
            if (childDataResponse?.status === 200) {
                setStudentData(childDataResponse?.data);
                if (!defaultSelect) {
                    sessionStorage.setItem("selectedUserId", JSON.stringify(childDataResponse?.data[0]));
                    window.location.reload();
                }
            }
        }
    }, [childDataResponse, defaultSelect]);

    const handleUserSwitch = (selectedUserId) => {
        const selectedUser = studentData?.find((user) => user.studentId === selectedUserId);
        sessionStorage.setItem("selectedUserId", JSON.stringify(selectedUser));
        dispatch(actions.student.setStudentId(selectedUser));
    };

    return (
        <Container fluid>
            <Row className="w-100 layout__wrapper">
                {pathname !== "/login" && (
                    <Col className="sidebar d-none d-xl-block overflow-hidden " xxl={2} xl={2} lg={2}>
                        <Sidebar show={show} handleClose={handleToggle} />
                    </Col>
                )}
                <Col className="screen_container">
                    {pathname !== "/login" && (
                        <Navbar sticky="top" className="nav__container">
                            <button className="d-xl-none bg-transparent border-0" onClick={handleToggle}>
                                <img src={manuIcon} alt={"manuIcon"} height={"50px"} width={"45px"} />
                            </button>
                            <div className="d-flex justify-content-between w-100 align-items-center">
                                <h3 className="py-0 my-0 ms-3">Hello Admin</h3>
                                {sessionStorage.getItem("roles") == ROLES.PARENT && pathname == "/parent/dashboard" ? (
                                    <UserSwitchDropdown users={studentData} onUserSwitch={handleUserSwitch} />
                                ) : (
                                    ""
                                )}
                            </div>
                        </Navbar>
                    )}
                    <div>{children}</div>
                </Col>
            </Row>
        </Container>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

const UserSwitchDropdown = ({ users, onUserSwitch }) => {
    const defaultSelect = JSON.parse(sessionStorage.getItem("selectedUserId"));
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        toggleDropdown();
        onUserSwitch(user.studentId);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="custom-select-container">
            <div className={`selected-value ${isOpen ? "d-none" : "d-block"}`} onClick={toggleDropdown}>
                {selectedUser ? (
                    <div className={`selected-option`}>
                        <img src={selectedUser?.photo || placeHolder} alt={selectedUser?.studentName} />
                    </div>
                ) : (
                    <div className="selected-option">
                        <img src={defaultSelect?.photo || placeHolder} alt={defaultSelect?.studentName} />
                    </div>
                )}
            </div>
            {isOpen && (
                <ul className="options-list mt-5" ref={dropdownRef}>
                    {users.map((user) => (
                        <li key={user.studentId} onClick={() => handleUserSelect(user)}>
                            <img src={user.photo || placeHolder} alt={user.studentName} />
                            <span className="text-capitalize me-2">{user.studentName}</span>
                            <input
                                type="checkbox"
                                checked={defaultSelect && defaultSelect.studentId === user.studentId}
                                readOnly
                                className="form-check-input shadow-none"
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MainLayout;
