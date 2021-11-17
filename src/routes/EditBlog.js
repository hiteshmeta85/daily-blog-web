import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom/cjs/react-router-dom";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import {CustomInput} from "../components/CustomInput";
import {Link} from "react-router-dom";
import httpClient from "../utilities/httpClient";

export const EditBlog = () => {
    const {id} = useParams()
    const [postData, setPostData] = useState()
    const [msg, setMsg] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const [didWeGetTheInfo, setDidWeGetTheInfo] = useState('loading')
    useEffect(() => {
        const getBlog = async () => {
            try {
                const res = await httpClient({
                    method: 'GET',
                    url: `${process.env.REACT_APP_API_HOST}/blog/${id}`,
                })
                setPostData(res.data)
                setErrorMsg(null)
                setDidWeGetTheInfo('true')
            } catch (err) {
                setErrorMsg('Failed to load data.')
                setDidWeGetTheInfo('false')
            }
        }
        getBlog()
    }, [id])

    let validate = Yup.object().shape({
        postTitle: Yup.string().required('Required'),
        postShortDescription: Yup.string().required('Required'),
        postContent: Yup.string().required('Required'),
    })

    const conditionRendering = () => {
        if (didWeGetTheInfo === 'loading') {
            return (<><h1 className={'display-3'}>Loading...</h1></>)
        } else if (didWeGetTheInfo === 'true') {
            return (
                <>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            postTitle: postData.title,
                            postShortDescription: postData.shortDescription,
                            postContent: postData.content
                        }} validationSchema={validate}
                        // {setSubmitting, setErrors} ???
                        onSubmit={async (values) => {
                            const blog = {
                                postTitle: values.postTitle,
                                postShortDescription: values.postShortDescription,
                                postContent: values.postContent
                            }
                            try {
                                await httpClient({
                                    method: 'PUT',
                                    url: `${process.env.REACT_APP_API_HOST}/blog/${id}`,
                                    data: blog
                                })
                                    .then((res) => {
                                        if (res.status === 200) {
                                            setMsg(true)
                                        }
                                    })
                            } catch (err) {
                                setErrorMsg('Sorry, something went wrong.')
                            }
                        }}
                    >
                        {({
                              handleSubmit,
                              isSubmitting,
                              handleChange,
                              handleBlur,
                              errors,
                              values,
                              touched
                          }) => (
                            <>
                                <Form onSubmit={handleSubmit}>
                                    <h1>Edit Post</h1>
                                    <p>{errorMsg}</p>
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
                                    <div className='form-group mt-2'>
                                    </div>
                                    <button className="btn btn-primary my-3 me-3" type="submit"
                                            disabled={isSubmitting}
                                            name="button">Submit
                                    </button>
                                    {msg ? <>
                                            <Link to='/'>
                                                <button className="btn btn-primary" type='reset'>Return Home</button>
                                            </Link>
                                        </> :
                                        ''}
                                    <p className='text-primary'>{msg ? 'Successfully updated the blog!' : ''}</p>
                                </Form>
                            </>
                        )}
                    </Formik>
                </>)
        } else {
            return (
                <>
                    <main role="main" className="inner cover">
                        <h1 className='text-primary mb-3'> Error 404 : Page Not Found!</h1>
                        <p className="lead mb-2">Please return home or Login</p>
                        <Link to='/'>
                            <button className='btn btn-md text-white bg-primary mb-3 me-3'>Return Home</button>
                        </Link>
                        <Link to='/login'>
                            <button className='btn btn-md text-white bg-primary mb-3'>Login</button>
                        </Link>
                    </main>
                </>
            )
        }
    }

    return (
        <div className='container my-3'>
            {conditionRendering()}
        </div>
    )
}