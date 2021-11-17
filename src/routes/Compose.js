import React, {useState} from 'react';
import {Form, Formik} from "formik";
import {CustomInput} from "../components/CustomInput";
import * as Yup from "yup";
import httpClient from "../utilities/httpClient";
import {Link} from "react-router-dom";

function Compose() {

    const [msg, setMsg] = useState(false)
    const [blogId, setBlogId] = useState()

    let validate = Yup.object().shape({
        postTitle: Yup.string().required('Required'),
        postShortDescription: Yup.string().required('Required'),
        postContent: Yup.string().required('Required').min(25)
    })

    return (
        <Formik initialValues={{
            postTitle: '',
            postShortDescription: '',
            postContent: ''
        }} validationSchema={validate}
                onSubmit={async (values, {resetForm}) => {
                    const blog = {
                        postTitle: values.postTitle,
                        postShortDescription: values.postShortDescription,
                        postContent: values.postContent
                    }
                    try {
                        const res = await httpClient({
                            method: 'POST',
                            url: `${process.env.REACT_APP_API_HOST}/blog`,
                            data: blog
                        })
                        if (res.status === 200) {
                            setMsg(true)
                            setBlogId(res.data.raw[0].id)
                            resetForm()
                        }
                    } catch (err) {
                        console.log(err)
                    }
                }}
        >
            {({
                  handleSubmit,
                  handleReset,
                  handleBlur,
                  handleChange,
                  errors,
                  values,
                  touched
              }) => (
                <>
                    <Form className='container mt-1' onSubmit={handleSubmit}>
                        <h1 className='display-5'>Compose</h1>
                        <div className="form-group">
                            <label className="mb-1">Title</label>
                            <CustomInput type="text" name="postTitle" className="form-control"/>
                        </div>
                        <div className="form-group mt-2">
                            <label className="mb-1">Short Description</label>
                            <textarea
                                name='postShortDescription'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.postShortDescription}
                                rows='3'
                                className='form-control'
                            />
                            {errors.postShortDescription && touched.postShortDescription ? (
                                <div className='text-muted'>{errors.postShortDescription}</div>
                            ) : null}
                        </div>
                        <div className='mt-3'>
                            <div className="form-group mt-2">
                                <label className="mb-1">Long Description</label>
                                <textarea
                                    name='postContent'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.postContent}
                                    rows='10'
                                    className='form-control'
                                />
                                {errors.postContent && touched.postContent ? (
                                    <div className='text-muted'>{errors.postContent}</div>
                                ) : null}
                            </div>
                        </div>
                        <p className='text-primary mt-3'>{msg ? 'Successfully uploaded your blog' : ''}</p>
                        <button className="btn btn-primary me-3" type="submit">{msg ? 'Create Another' : 'Publish'}
                        </button>
                        <button className="btn btn-primary me-3" onClick={handleReset}>Reset</button>
                        {msg ? <>
                                <Link to='/'>
                                    <button className="btn btn-primary me-3">Return Home</button>
                                </Link>
                                <Link to={`/blog/${blogId}`}>
                                    <button className="btn btn-primary">View Your Blog</button>
                                </Link>
                            </>
                            : ''}
                    </Form>
                </>
            )}
        </Formik>
    );
}

export default Compose;
