import React, { useEffect, useState } from "react";
import { loginUser, reset } from "../../admin/feautures/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./login.styles.scss"

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const { user, isSuccess, isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      email,
      password,
    };
    console.log(dataToSubmit);

    dispatch(loginUser(dataToSubmit));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      dispatch(reset());
    }
  }, [isSuccess, dispatch, navigate, user]);

  return (
    <div className="container">
      <h1 className="heading center">Login</h1>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              name="password"
              onChange={handleChange}
            />
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <div className="loader-wrapper">
                <img
                  className="loader-img"
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif "
                  alt="Loading..."
                />
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
