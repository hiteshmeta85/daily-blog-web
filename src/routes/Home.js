import React from "react";
import {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import httpClient from "../utilities/httpClient";
import PaginationButton from "../components/PaginationButton";

export const Home = () => {
    const [posts, setPosts] = useState([]);
    const [didWeGetTheInfo, setDidWeGetTheInfo] = useState('loading');
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        const getBlog = async () => {
            try {
                const res = await httpClient({
                    method: 'GET',
                    url: `${process.env.REACT_APP_API_HOST}/blog`,
                })
                setPosts(res.data)
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
                <PaginationButton
                    postsPerPage={postsPerPage}
                    totalPosts={posts.length}
                    paginate={paginate}
                />
                {currentPosts.map((post) => {
                    return <ArticleList key={post.id} list={post}/>
                })}
            </>
        )
    }

    const ArticleList = (props) => {
        const {title, id, shortDescription} = props.list
        return (
            <>
                <div className="card my-2">
                    <div className="card-body hover_block">
                        <h3 className='mb-0'>{title}</h3>
                        <Link to={`/blog/${id}`} style={{textDecoration: 'none', color: 'black'}}><p
                            className='mb-0'>{shortDescription}</p>
                            <p className='my-0' style={{color: 'blueviolet'}}>...Read More</p></Link>
                    </div>
                </div>
            </>
        )
    }

    const conditionalRendering = () => {
        if (didWeGetTheInfo === 'loading') {
            return (<><h1 className={'display-3'}>Loading...</h1></>)
        } else if (didWeGetTheInfo === 'true') {
            return (
                <>
                    <Articles/>
                </>
            )
        } else {
            return (
                <div className="jumbotron mt-5">
                    <div className="container text-center">
                        <h1 className='display-1'>Welcome!</h1>
                        <h1 className="display-5 mt-4 mb-0">Create Your Own
                            Beautiful Blog.</h1>
                        <p className='my-0'>This place makes it easy for you to start your own blog.</p>
                        <p>Signup and start sharing your ideas.</p>
                        <Link to='/signup'>
                            <button className="btn rounded bg-primary text-white">Get Started</button>
                        </Link>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className='container'>
            {conditionalRendering()}
        </div>
    )
}
