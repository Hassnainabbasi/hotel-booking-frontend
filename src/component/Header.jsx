import React from "react";
import { Link } from "react-router-dom";
import "./header.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, reset } from "../feautures/auth/authSlice";

export default function Header() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch()
  const handleLogout = async() =>{
    dispatch(logoutUser())
    dispatch(reset())
  }
  return (
    <>
      <header className="main-header">
        <div className="container">
          <Link to={'/'}>
            <h1 className="logo">Logo</h1>
          </Link>

          <nav>
            <Link to={"/"}>Home</Link>
            {user ? (
              <>
                <Link to={"/create-room"}>Create</Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to={"/login"}>Login</Link>
                <Link to={"/register"}>Register</Link>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
