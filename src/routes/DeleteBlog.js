import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom/cjs/react-router-dom";
import {Link} from "react-router-dom";
import httpClient from "../utilities/httpClient";
import HTMLReactParser from "html-react-parser";

export const Delete = () => {

    const {id} = useParams()
    const [data, setData] = useState([])
    const [msg, setMsg] = useState(true)
    const [didWeGetTheInfo, setDidWeGetTheInfo] = useState('loading')

    useEffect(() => {
        const getBlog = async () => {
            try {
                const res = await httpClient({
                    method: 'GET',
                    url: `${process.env.REACT_APP_API_HOST}/blog/${id}`,
                })
                setData(res.data)
                setDidWeGetTheInfo('true')
            } catch (err) {
                return setDidWeGetTheInfo('false')
            }
        }
        getBlog()
    }, [id])

    const handleClick = async (id) => {
        await httpClient({
                method: 'DELETE',
                url: `${process.env.REACT_APP_API_HOST}/blog/${id}`
            }
        )
            .then((res) => {
                if (res.status === 200) {
                    setMsg(false)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const conditionRendering = () => {
        if (didWeGetTheInfo === 'loading') {
            return (<><h1 className={'display-3'}>Loading...</h1></>)
        } else if (didWeGetTheInfo === 'true') {
            return (<>
                {msg ? <>
                    <h1 className='mb-1'>{data.title}</h1>
                    <h4>{data.shortDescription}</h4>
                    <hr className='mt-3'/>
                    <div className='mt-3'>{data.content == null ? true : HTMLReactParser(data.content)}</div>
                    <p className='mt-5 text-primary'><cite>Are you sure you want to permanently delete this
                        blog?</cite></p>
                    <button className='btn btn-md bg-primary text-white mb-3'
                            onClick={() => handleClick(id)}>Confirm
                        Delete
                    </button>
                </> : <>
                    <p>Your blog has been successfully deleted.</p>
                    <Link to='/'>
                        <button className='btn btn-md bg-primary text-white mb-3 me-3'>Return Home</button>
                    </Link>
                    <Link to='/update'>
                        <button className='btn btn-md bg-primary text-white mb-3'>Back</button>
                    </Link>
                </>}
            </>)
        } else {
            return <>
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
        }
    }

    return (
        <div className='container mt-3'> {conditionRendering()} </div>
    )
}
