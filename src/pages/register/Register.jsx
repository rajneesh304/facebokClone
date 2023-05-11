import { useState } from "react"
import { Link } from "react-router-dom"
import "./register.scss"
import axios from "axios";

const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputs(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleClick = async e => {
    e.preventDefault();

    try {
      console.log(inputs);
      await axios.post("http://localhost:8800/api/auth/register", inputs)
    } catch (err) {
      setError(err);
    }

    console.log(error);
  }

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Fake book</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, dolorem? Fugit necessitatibus, excepturi quae praesentium assumenda dolorum, deleniti quisquam magnam harum ipsa ipsam aperiam, minus ut nulla. Unde, at vero!</p>
          <span>Do you have an account? </span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form action="">
            <input type="text" placeholder="Username" name="username" onChange={handleChange} />
            <input type="email" placeholder="Email" name="email" onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} />
            <input type="text" placeholder="Name" name="name" onChange={handleChange} />
            <button type="submit" onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
