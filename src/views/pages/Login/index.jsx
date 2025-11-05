import { Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "../../styles/login.scss";
import { useLoginMutation } from "../../../api/auth";
import { Validation } from "../../../utils/constants/validation/validation";
import logo from "../../../assets/images/login/login_page_logo.svg";
import background from "../../../assets/images/login/background.svg";
import Vector1 from "../../../assets/images/login/Vector-1.svg";
import Vector from "../../../assets/images/login/Vector.svg";
import { ROLES } from "../../../utils/constants/option-menu";

const Login = () => {
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const form = useForm({
        defaultValues: {
            userName: "",
            password: "",
            notificationToken: "abc",
            deviceName: navigator.platform,
            platform: "web",
        },
        resolver: yupResolver(Validation.LOGIN),
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = await login(form.getValues());
        if (data?.data?.status === 200) {
            toast.success(`${data?.data?.message}`);
            const creationTime = new Date().getTime();
            sessionStorage.setItem("token", data?.data?.token);
            sessionStorage.setItem("roles", data?.data?.role);
            sessionStorage.setItem("tokenCreationTime", creationTime.toString());

            if (data?.data?.role === ROLES.ADMIN) navigate("/master/standard");
            if (data?.data?.role === ROLES.PARENT) navigate("/parent/dashboard");
            if (data?.data?.role === ROLES.TECHAR) navigate("/teacher/dashboard");
        } else {
            toast.error(data?.error?.data?.message);
        }
    };

    return (
        <>
            <div className="login-container">
                <div className="login-form">
                    <div>
                        <img src={logo} alt="logo" className="mx-auto d-block" />
                        <div>
                            <Form role="form">
                                <div>
                                    <div>
                                        <Form.Group>
                                            <Row>
                                                <Col>
                                                    <Form.Control
                                                        type="text"
                                                        name="userName"
                                                        {...form.register("userName")}
                                                        placeholder="USERNAME"
                                                        className="form-control-lg input_set_width_and_height border border-dark"
                                                        sm={{ span: 10, offset: 1 }} // Adjust width for small screens
                                                        md={{ span: 8, offset: 2 }} // Adjust width for medium screens
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Form.Control
                                                        type="password"
                                                        {...form.register("password")}
                                                        name="password"
                                                        placeholder="PASSWORD"
                                                        className="form-control-lg input_set_width_and_height border border-dark"
                                                        sm={{ span: 10, offset: 1 }} // Adjust width for small screens
                                                        md={{ span: 8, offset: 2 }} // Adjust width for medium screens
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                        <Row>
                                            <Col>
                                                <div className="mt-5">
                                                    <button
                                                        onClick={handleLogin}
                                                        type="submit"
                                                        disabled={isLoading}
                                                        className=" w-100 login_button" // Add Bootstrap classes for full width
                                                    >
                                                        Login
                                                    </button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
