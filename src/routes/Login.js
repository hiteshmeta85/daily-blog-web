import {Form, Formik} from "formik";
import {CustomInput} from "../components/CustomInput";
import * as Yup from "yup";
import axios from "axios";
import cookie from "react-cookies";
import {Redirect} from "react-router-dom";

export const Login = (props) => {
    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={Yup.object({
                    email: Yup.string().email('Must be a valid field')
                        .required('Required'),
                    password: Yup.string().required('Required'),
                })}
                onSubmit={async (values, {setErrors}) => {
                    let payload = {
                        username: values.email,
                        password: values.password,
                    }
                    try {
                        const result = await axios.put(`${process.env.REACT_APP_API_HOST}/session`, payload);
                        if (result) {
                            cookie.save(process.env.REACT_APP_SESSION_COOKIE_NAME, result.data.data.token, {
                                path: '/',
                            })
                            props.setIsLoggedIn(true)
                        }
                    } catch (err) {
                        if (err.response.data.errors) {
                            setErrors(err.response.data.errors);
                        }
                    }
                }}
            >
                {({
                      handleSubmit
                  }) => (
                    <Form className="form-signin" onSubmit={handleSubmit}>
                        <h1 className="h3 font-weight-normal">Login</h1>
                        <CustomInput type="email" name="email" className="form-control"
                                     placeholder="Email address"
                        />
                        <CustomInput type="password" name="password" className="form-control mb-0"
                                     placeholder="Password"/>
                        {props.isLoggedIn ? <Redirect to="/"/> :
                            <button className="btn w-100 d-block btn-primary mt-2" type="submit">Login</button>}
                    </Form>)
                }
            </Formik>
        </>
    )
}