import {Form, Formik} from "formik";
import {CustomInput} from "../components/CustomInput";
import * as Yup from "yup";
import axios from "axios";
import cookie from "react-cookies";
import {Redirect} from "react-router-dom";
import {useState} from "react";

export const SignUp = (props) => {

    const [msg, setMsg] = useState('')

    let validate = Yup.object().shape({
        name: Yup.string().required('Please complete this field'),
        email: Yup.string().email('Please mention a valid email').required('Please complete this field'),
        password: Yup.string().required('Please complete this field')
    })

    return (
        <Formik initialValues={{
            name: '',
            email: '',
            password: ''
        }} validationSchema={validate}
            //  ??? setSubmitting
                onSubmit={async (values) => {
                    const user = {name: values.name, email: values.email, password: values.password}
                    try {
                        await axios
                            .post(`${process.env.REACT_APP_API_HOST}/user`, user)
                            .then((res) => {
                                cookie.save(process.env.REACT_APP_SESSION_COOKIE_NAME, res.data.data.token, {
                                    path: '/',
                                })
                                props.setIsLoggedIn(true)
                            })
                            .catch(err => {
                                setMsg('Email already exist. Try login.')
                            })
                    } catch (err) {
                        setMsg('Sorry, something went wrong. Try again.')
                    }
                }}
        >
            {({
                  handleSubmit,
                  isSubmitting
              }) => (
                <>
                    <div className='container'>
                        <Form className='form-signin mt-5' onSubmit={handleSubmit}>
                            <h1 className="h3 mb-4 font-weight-normal">Be A Member!</h1>
                            <CustomInput name='name' type='text' placeholder='Full Name' id='name'
                                         style={{marginBottom: "-1px", borderRadius: "0"}}/>
                            <CustomInput name='email' type='email' placeholder='Email' id='email'/>
                            <CustomInput name='password' type='password' placeholder='Password' id='password'
                                         style={{marginBottom: "0", borderRadius: "0"}}/>
                            {props.isLoggedIn ? (
                                    <Redirect to="/"/>
                                ) :
                                <>
                                    <button className="btn btn-lg btn-primary btn-block w-100 my-3" type="submit"
                                            disabled={isSubmitting}>Sign up
                                    </button>
                                </>}
                            <p>{msg}</p>
                        </Form>
                    </div>
                </>
            )}
        </Formik>
    )
}


