import {Link, Redirect} from "react-router-dom";
import httpClient from "../utilities/httpClient";
import {useState} from "react";

export const Header = (props) => {

    const [onLogout, setOnLogout] = useState(false)

    const today = new Date()
    const options = {weekday: "long", month: "long", day: "numeric"}
    const time = today.toLocaleDateString("en-US", options)
    const logout = async () => {
        try {
            let result = await httpClient({
                method: 'DELETE',
                url: `${process.env.REACT_APP_API_HOST}/session`,
            })
            if (result) {
                props.setIsLoggedIn(false)
                setOnLogout(true)
                props.history.replace('/')
                return true
            }
        } catch (err) {
            return false
        }
    }


    return (
        <div className="container">
            {onLogout && <Redirect to={'/'}/>}
            <header className="d-flex flex-wrap justify-content-between py-3 mb-3 border-bottom">
                <a href="/"
                   className="d-flex mb-md-0 text-dark text-decoration-none align-items-center">
                    <span className="fs-4">DAILY BLOG</span>
                </a>
                <ul className="nav nav-pills">
                    {!props.isLoggedIn ?
                        <>
                            <li className="nav-item nav-link"><Link to='/signup' style={{textDecoration: 'none'}}>Sign
                                Up</Link></li>
                            <Link to='/login'>
                                <li className="ms-md-3 nav-item rounded bg-primary nav-link text-white">Login</li>
                            </Link>
                        </>
                        :
                        <>
                            <li className="nav-item nav-link"><Link to='/' style={{textDecoration: 'none'}}>Home</Link>
                            </li>
                            <li className="nav-item nav-link"><Link to='/compose'
                                                                    style={{textDecoration: 'none'}}>Compose</Link></li>

                            <li className="nav-item nav-link"><Link to='/update' style={{textDecoration: 'none'}}>Update
                                | Delete
                            </Link>
                            </li>
                            <button className="nav-item rounded bg-primary nav-link text-light"
                                    onClick={logout}>Logout
                            </button>
                        </>
                    }
                </ul>
            </header>
            {!props.isLoggedIn ? true : <li className="nav-item my-auto text-end pe-3 d-none d-sm-block">{time}</li>}
        </div>
    )
}