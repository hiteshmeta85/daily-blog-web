import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom/cjs/react-router-dom";
import {Link} from "react-router-dom";
import httpClient from "../utilities/httpClient";
import HTMLReactParser from 'html-react-parser';

export const IndividualBlog = () => {

    const [post, setPost] = useState([])
    const [errorMsg, setErrorMsg] = useState(null)
    const [didWeGetTheInfo, setDidWeGetTheInfo] = useState('loading')
    const {id} = useParams()

    useEffect(() => {
        const getBlog = async () => {
            try {
                const res = await httpClient({
                    method: 'GET',
                    url: `${process.env.REACT_APP_API_HOST}/blog/${id}`
                })
                if (res.data !== '') {
                    setPost(res.data)
                    setErrorMsg(null)
                    setDidWeGetTheInfo('true')
                }
            } catch (err) {
                setErrorMsg('false')
                setDidWeGetTheInfo('false')
            }
        }
        getBlog()
    }, [id])

    const conditionalContentRendering = () => {
        if (didWeGetTheInfo === 'loading') {
            return (<><h1 className={'display-3'}>Loading...</h1></>)
        } else if (didWeGetTheInfo === 'true') {
            return (
                <>
                    <p>{errorMsg}</p>
                    <h1 className='mb-1'>{post.title}</h1>
                    <h4 className='mt-2' style={{fontWeight: '400'}}>{post.shortDescription}</h4>
                    <hr className='mt-3'/>
                    <div className='mt-3'>{post.content == null ? true : HTMLReactParser(post.content)}</div>
                </>
            )
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
                </>)
        }
    }

    return (
        <div className='container mb-5'>
            {conditionalContentRendering()}
        </div>
    )
}
