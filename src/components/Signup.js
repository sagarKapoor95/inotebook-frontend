import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    let history = useNavigate();
    const [user, setUser] = useState({ email: "", password: "", name: ""});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const req = {
            name: user.name,
            email: user.email,
            password: user.password
        }
        const response = await fetch(`http://localhost:3000/api/auth`, {
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
        setUser({ ...user, [event.target.name]: event.target.value});
        console.log(user);
      };
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>

          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>

          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
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

export default Signup;
