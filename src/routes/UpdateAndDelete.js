import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import httpClient from "../utilities/httpClient";

export const UpdateAndDelete = () => {

    const [post, setPost] = useState([])
    const [didWeGetTheInfo, setDidWeGetTheInfo] = useState('loading')

    useEffect(() => {
        const getBlog = async () => {
            try {
                const res = await httpClient({
                    method: 'GET',
                    url: `${process.env.REACT_APP_API_HOST}/blog/index`,
                });
                setPost(res.data)
                setDidWeGetTheInfo('true')
            } catch (err) {
                setDidWeGetTheInfo('false')
            }
        }
        getBlog()
    }, [])

    const Articles = () => {
        return (
            <>
                {post.map((post) => {
                    return <ArticleList key={post.id} list={post}/>
                })}
            </>
        )
    }

    const ArticleList = (props) => {
        const {title, id, shortDescription} = props.list
        return (
            <div className='rounded-3 p-3 my-2' style={{backgroundColor: "#F9F9F9"}}>
                <h4 className='font-weight-light'>{title}</h4>
                <p className="card-text">{shortDescription}</p>
                <Link to={`/update/${id}`}
                >
                    <button className='btn btn-sm bg-white text-primary me-2'>Edit</button>
                </Link>
                <Link to={`/delete/${id}`}
                >
                    <button className='btn btn-sm bg-white text-primary'>Delete</button>
                </Link>
            </div>
        )
    }

    const conditionalRendering = () => {

        if (didWeGetTheInfo === 'loading') {
            return (<><h1 className={'display-3'}>Loading...</h1></>)
        } else if (didWeGetTheInfo === 'true') {
            return (
                <>
                    <div>
                        <header className='mt-3 display-5'>Edit | Delete</header>
                    </div>
                    <div className='my-4'>
                        {post.length !== 0 ? <Articles/> : <><h1 className='display-5 mt-5'>No blogs found. Create
                            now.</h1><Link to={'/compose'}>
                            <button className="btn btn-primary btn-md mt-2">Compose &raquo;</button>
                        </Link></>}
                    </div>
                </>
            )
        } else {
            return (<>
                <main role="main" className="inner cover bg-white">
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
        <div className='container my-3 pb-1 pt-1 rounded'>
            {conditionalRendering()}
        </div>
    )
}
