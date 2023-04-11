import "./register.scss"

const Register = () => {
    return (
        <div className="register">
            <div className="card">
                <div className="left">
                    <h1>Fake book</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, dolorem? Fugit necessitatibus, excepturi quae praesentium assumenda dolorum, deleniti quisquam magnam harum ipsa ipsam aperiam, minus ut nulla. Unde, at vero!</p>
                    <span>Do you have an account? </span>
                    <button>Login</button>
                </div>
                <div className="right">
                    <h1>Register</h1>
                    <form action="">
                        <input type="text" placeholder="Username" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <input type="text" placeholder="Name" />
                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
