import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function Login() {
    let history = useNavigate();
    const [login, setLogin] = useState({ email: "", password: ""});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const req = {
        email: login.email,
        password: login.password
    }
    console.log(req);
    const response = await fetch(`http://localhost:3000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });
    const json = await response.json();
    console.log(json);
    if(json.authToken) {
        localStorage.setItem('token', json.authToken)
        history("/")
    }
  };

  const onChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            value = {login.email}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value = {login.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
