import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '../assets/NavBar'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Authentication = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState("signin")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const signUpApiCall = async () => {
    try {
      await fetch("http://localhost:4000/user/signup", {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      setemail("")
      setpassword("")
      const a = toast.success("Welcome To Our Plateform !!!", {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: false,
        closeButton: false,
        style: {
          color: "green",
          backgroundColor: "rgb(183, 248, 183)"
        }
      })
      if (a == 1) {
        setTimeout(() => {
          window.location.href="/"
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const loginApiCall = async () => {
    try {
      const res = await fetch("http://localhost:4000/user/login", {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:'same-origin',
        body: JSON.stringify({ email, password })
      })
      const data = await res.json();
      localStorage.setItem("jwt",data.token);
      navigate("/profile")
      setemail("")
      setpassword("")
    } catch (error) {
      console.log(error);
    }
  }

  if (authMode === "signin") {
    return (
      <>
        <NavBar detail={"hidden"}/>
        <div className={"Auth-form card-light mx-auto mt-5"}>
          <div className="Auth-form-content">
            <h3 className={"card-title text-center mb-2 text-dark"}>Sign In</h3>
            <div className="text-center">
              Not registered yet?
              <span className={"text-white ms-2"} onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label className={"text-dark"}>Email</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label className={"text-dark"}>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-danger" onClick={loginApiCall}>
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot  <Link to="/forgetPass" className={'text-white'} style={{ textDecoration: "none" }}>password</Link>
            </p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <NavBar detail={"hidden"}/>
      <ToastContainer autoClose={1000} />
      <div className={"Auth-form card-light mx-auto mt-5"}>
        <div className="Auth-form-content">
          <h3 className={"card-title text-center mb-2 text-dark"}>Sign Up</h3>
          <div className="text-center">
            Already registered ?
            <span className={"text-white ms-2"} onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label className={"text-dark"}>Email</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label className={"text-dark"}>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-danger" onClick={signUpApiCall}>
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot  <Link to="#" className={'text-white'} style={{ textDecoration: "none" }}>password</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Authentication