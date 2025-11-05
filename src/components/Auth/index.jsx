import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { actions } from "../../redux/store";
import { resetEnquiryStore } from "../../views/pages/Enquiry/Guardian";
import { useGetTokenVerifyMutation } from "../../api/tokenVerify";

const Auth = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { MobileNumber: mobileNumber, isUpdatingEnquiry } = useSelector((state) => state.enquiry);
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/login");
            actions.modal.closeMobile();
        } else {
            if (!pathname.startsWith("/enquiry")) {
                actions.modal.closeMobile();
                resetEnquiryStore();
            }
            if (pathname.startsWith("/enquiry") && !mobileNumber && !isUpdatingEnquiry) navigate("/enquiry/form-first");
            if (!pathname.startsWith("/admission")) actions.modal.closeAdmission();
            // if (!pathname.startsWith("/student-records") || !pathname.startsWith("/enquiry")) localStorage.removeItem("STUDENT_DETAIL");
        }
        // actions.student.setStandard("");
        // actions.student.setBatch("");
        actions.student.setSubject("");
    }, [pathname, navigate, mobileNumber, isUpdatingEnquiry]);

    const [tokenExp] = useGetTokenVerifyMutation();

    const tokenExpire = () => {
        if (!sessionStorage.getItem("token")) {
            navigate("/login");
        } else {
            tokenExp(sessionStorage.getItem("token"))
                .unwrap()
                .then((response) => {})
                .catch((error) => {
                    if (error?.status === 401) {
                        navigate("/login");
                        toast.error(error?.message);
                    }
                });
        }
    };

    useEffect(() => {
        tokenExpire();
    }, [pathname]);

    return <></>;
};

export default Auth;
