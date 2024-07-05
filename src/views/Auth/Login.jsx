import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import api from '../../api'

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values, formik) => {
        console.log(values);
        try {
            const res = await api.post('/api/login', values);

            localStorage.setItem("access_token", res.data.success.token);
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container flex flex-col justify-center items-center min-h-[100vh]">
            <div className="bg-white w-[420px] h-[360px] border rounded-lg p-4 flex flex-col justify-center items-center gap-2">
                <h1 className="text-3xl font-bold">ระบบ Follow-up</h1>
                <div className="mt-4">
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
                                        <label htmlFor="">Email :</label>
                                        <input
                                            type="text"
                                            name="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">Password :</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <button type="submit" className="btn btn-outline-primary">
                                            Sign in
                                        </button>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Login