import {Link} from "react-router-dom";

export const NotFound = () => {
    return (
        <div className="jumbotron">
            <div className="container mt-3">
                <h1 className="display-4">ERROR 404 : PAGE NOT FOUND</h1>
                <Link to={'/'}><button className="btn btn-primary btn-md">Return Home &raquo;</button></Link>
            </div>
        </div>
    )
}
