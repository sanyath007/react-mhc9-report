import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import api from '../../api'
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (values, formik) => {
        try {
            const res = await api.post('/api/login', values);

            if (!res.data.success === true) {  
                alert('Login failed!');
                return;
            }

            localStorage.setItem("access_token", res.data.token);
            login(res.data.user);

            navigate('/')
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container flex flex-col justify-center items-center min-h-[100vh]">
            <div className="login-box bg-white w-[360px] min-h-[360px] rounded-lg px-4 py-4 flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold mt-4">ระบบ Follow-up</h1>
                <div className="w-[100%] my-4">
                    <Formik
                        initialValues={{
                            email: 'sanyath007@gmail.com',
                            password: '4621008811',
                        }}
                        onSubmit={handleSubmit}
                    >
                        {(formik) => (
                            <Form>
                                <Row className="mb-2">
                                    <Col>
                                        <input
                                            type="text"
                                            name="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                            placeholder="Email"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                            placeholder="Password"
                                        />
                                    </Col>
                                </Row>

                                <div className="d-grid mb-2">
                                    <button type="submit" className="btn btn-outline-primary">
                                        Sign in
                                    </button>
                                </div>

                                <div className="flex flex-row justify-between mb-4 px-2">
                                    <div className="flex flex-row items-center gap-1">
                                        <input type="checkbox" name="" /> จำรหัสผ่าน
                                    </div>

                                    <a href="#" className="text-primary">ลืมรหัสผ่าน</a>
                                </div>

                                <hr />

                                <div className="d-grid mt-4">
                                    <button type="submit" className="btn btn-outline-secondary">
                                        Register
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>

            <div className="mt-4 text-gray-600 text-sm">
                <a href="https:www.mhc9dmh.com">©ศูนย์สุขภาพจิตที่ 9</a> | โดย สัญญา ธรรมวงษ์
            </div>
        </div>
    )
}

export default Login