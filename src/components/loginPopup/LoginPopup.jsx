import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ setShowLogin }) => {
  const { url, token, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Login");
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({ ...data, [name]: value });
  };

  const navigate = useNavigate();
  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    const formData = new FormData();
    if (currentState === "Login") {
      newUrl += "/api/user/login";

      const res = await axios.post(newUrl, data);
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setShowLogin(false);
        navigate("/");

        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } else {
      newUrl += "/api/user/register";

      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("image", image);

      const res = await axios.post(newUrl, formData);
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setShowLogin(false);
        alert(res.data.message);
        navigate("/");
      } else {
        alert(res.data.message);
      }
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={onLogin}>
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
            <>
              <div className="add-img-upload flex-col">
                <p>Upload Avatar</p>
                <label htmlFor="image">
                  <img
                    src={
                      image ? URL.createObjectURL(image) : assets.upload_area
                    }
                    alt="upload"
                  />
                </label>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  name="image"
                  id="image"
                  hidden
                  required
                />
              </div>
              <input
                onChange={onChangeHandler}
                type="text"
                value={data.name}
                name="name"
                id=""
                placeholder="Your Name"
                required
              />
            </>
          ) : (
            <></>
          )}

          <input
            onChange={onChangeHandler}
            type="email"
            name="email"
            value={data.email}
            id=""
            placeholder="Your Email"
            required
          />
          <input
            onChange={onChangeHandler}
            type="password"
            name="password"
            value={data.password}
            id=""
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">
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
