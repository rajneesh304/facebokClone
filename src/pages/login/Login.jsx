import { Link } from "react-router-dom"
import "./login.scss"

const Login = () => {
    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Fake book</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, dolorem? Fugit necessitatibus, excepturi quae praesentium assumenda dolorum, deleniti quisquam magnam harum ipsa ipsam aperiam, minus ut nulla. Unde, at vero!</p>
                    <span>Don't you have an account? </span>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form action="">
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
