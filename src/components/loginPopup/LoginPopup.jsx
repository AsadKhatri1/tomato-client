import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Sign Up");
  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-input">
          {currentState !== "Login" ? (
            <input type="text" name="" id="" placeholder="Your Name" required />
          ) : (
            <></>
          )}

          <input type="email" name="" id="" placeholder="Your Email" required />
          <input
            type="password"
            name=""
            id=""
            placeholder="Password"
            required
          />
        </div>
        <button>
          {currentState === "Login" ? "Log In" : "Create Account"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>I agree to terms and conditions</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Signup")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Click Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
