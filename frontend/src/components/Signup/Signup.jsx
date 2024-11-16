import React from 'react';
import './Signup.css';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINT } from '../../../Constant.js';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';




function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };


  const onSubmitSignup = async (data) => {
    try {
      handleOpen();
      const response = await axios.post(`${API_ENDPOINT}/api/users/signup`, data);
      // console.log('Signup successful:', response.data);
      if(response)
        {
          handleClose();
        }
      alert("Signup successful! Please log in.");
      navigate('/login');
    } catch (error) {
      handleClose()
      alert("Error signing up. Please try again.");
      console.error('Error signing up:', error);
    } finally {
      reset();
    }
  };

  return (
    <div className="signup-page" style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#eef2f3",
      }}>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        <form
          className="reactform signupform"
          onSubmit={handleSubmit(onSubmitSignup)}
          style={{
            width: "100%",
            maxWidth: "400px",
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
            Sign Up
          </h2>
      
          <div style={{ marginBottom: "15px" }}>
            <input
              placeholder="Full Name*..."
              className="inputfield nameinp signupname"
              type="text"
              id="fullname"
              name="fullname"
              {...register("fullname", {
                required: "Full Name is required",
                minLength: {
                  value: 2,
                  message: "Full Name must be at least 2 characters long",
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
            {errors.fullname && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors.fullname.message}
              </span>
            )}
          </div>
      
          <div style={{ marginBottom: "15px" }}>
            <input
              placeholder="Email*..."
              className="inputfield emailinp signupemail"
              type="email"
              id="email"
              name="email"
              {...register("email", {
                required: "Email is required",
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
            {errors.email && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors.email.message}
              </span>
            )}
          </div>
      
          <div style={{ marginBottom: "20px" }}>
            <input
              placeholder="Password*..."
              className="inputfield signuppass"
              type="password"
              id="password"
              name="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                  message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
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
            {errors.password && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors.password.message}
              </span>
            )}
          </div>
      
          <button
            className="reactbtn signupbtn button"
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
            Sign Up
          </button>
        </form>
      </div>
      
  );
}

export default Signup;
