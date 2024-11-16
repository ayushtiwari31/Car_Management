import React from 'react';
import './Login.css';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINT } from '../../../Constant.js';




function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();

  const onSubmitlogin = async (data) => {
    try {
        
      const response = await axios.post(`${API_ENDPOINT}/api/users/login`, data);

      console.log('Login successful:', response.data.data);

      const { accessToken, refreshToken, user } = response.data.data; // Extract tokens and user data

    // Save tokens (if you want to store them manually)
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    //   if (response) {
    //     console.log(response.data.user);
    //   }

      navigate('/productlist');
    } catch (error) {
      alert("Email or Password is incorrect");
      console.error('Error logging in:', error);
    } finally {
      reset();
    }
  };

  return (
    <div className="login-page" style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
      }}>
        <form
          className="reactform loginform"
          onSubmit={handleSubmit(onSubmitlogin)}
          style={{
            width: "100%",
            maxWidth: "500px",
            padding: "20px",
            backgroundColor: "#ffffff",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
          }}
        >
          <h2 style={{
            textAlign: "center",
            color: "#333",
            marginBottom: "20px",
          }}>
            Login
          </h2>
      
          <div style={{ marginBottom: "15px" }}>
            <input
              placeholder="Email*..."
              className="inputfield emailinp loginemail"
              type="email"
              id="loginemail"
              name="loginemail"
              {...register("loginemail", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              style={{
                width: "95%",
                padding: "10px",
                fontSize: "14px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                outline: "none",
                transition: "border-color 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#4caf50")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
            {errors.loginemail && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors.loginemail.message}
              </span>
            )}
          </div>
      
          <div style={{ marginBottom: "15px" }}>
            <input
              placeholder="Password*..."
              className="inputfield loginpass"
              type="password"
              id="loginpassword"
              name="loginpassword"
              {...register("loginpassword", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
                },
              })}
              style={{
                width: "95%",
                padding: "10px",
                fontSize: "14px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                outline: "none",
                transition: "border-color 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#4caf50")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
            {errors.loginpassword && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors.loginpassword.message}
              </span>
            )}
          </div>
      
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <button
              className="reactbtn loginbtn button"
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "#4caf50",
                color: "white",
                transition: "background-color 0.3s ease, transform 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#45a049";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#4caf50";
                e.target.style.transform = "scale(1)";
              }}
            >
              Login
            </button>
      
            <button
              className="reactbtn loginbtn button"
              type="button"
              onClick={() => navigate("/signup")}
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                backgroundColor: "#f0f0f0",
                color: "#333",
                cursor: "pointer",
                transition: "background-color 0.3s ease, transform 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#e0e0e0";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#f0f0f0";
                e.target.style.transform = "scale(1)";
              }}
            >
              Signup
            </button>
      
            <button
              className="reactbtn loginbtn button"
              type="button"
              onClick={() => navigate("/")}
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                backgroundColor: "#f0f0f0",
                color: "#333",
                cursor: "pointer",
                transition: "background-color 0.3s ease, transform 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#e0e0e0";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#f0f0f0";
                e.target.style.transform = "scale(1)";
              }}
            >
              Home
            </button>
          </div>
        </form>
      </div>
      
  );
}

export default Login;
