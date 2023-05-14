import { Link, useNavigate } from "react-router-dom"
import "./login.scss"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const Login = () => {

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(inputs);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response.data)
    }
  }
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
            <input type="text" placeholder="Username" name="username" onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} />
            <button type="submit" onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
