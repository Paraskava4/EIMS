import { useEffect, useMemo } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

import "./style.scss";
import { EnquiryHeader } from "../../../components/Enquiry";
import { useGenerateEnquiryNumberQuery } from "../../../api/common";
import { handleFormTitle } from "../../../utils/constants/helper/handleFormTitle";
import { actions } from "../../../redux/store";

const EnquiryWrapper = () => {
    const { pathname } = useLocation();
    const { enquiryNumber, isUpdatingEnquiry, MobileNumber } = useSelector((state) => state.enquiry);

    const { data, isFetching } = useGenerateEnquiryNumberQuery(null, {
        refetchOnMountOrArgChange: true,
        skip: enquiryNumber || isUpdatingEnquiry || !MobileNumber,
    });

    useEffect(() => {
        data && actions.enquiry.addEnquiryNumber(data);
    }, [data]);

    const title = useMemo(() => handleFormTitle(pathname), [pathname]);

    return (
        <>
            <Row>
                <Col className="text-center">
                    <EnquiryHeader value={!isFetching && enquiryNumber ? enquiryNumber : ""} text={title} enquiryNumber={enquiryNumber} />
                </Col>
            </Row>
            <Outlet />
        </>
    );
};

export default EnquiryWrapper;
