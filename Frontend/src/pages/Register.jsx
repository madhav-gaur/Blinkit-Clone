import React, { useState } from 'react';
import './stylesheets/Register.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import Axios from '../utils/axios';
import SummaryApi from '../common/summaryAPI';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const validateData = Object.values(data).every((elem) => elem)
  const [message, setMessage] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (data.password !== data.confirmPassword) {
      setMessage("Password and Confirm Password must be same !!")
    }
    try {
      
      const response = await Axios.request({
        method: SummaryApi.register.method,
        url: SummaryApi.register.url,
        data: data,
      });

      if (!response.data.success) {
        setMessage(response.data.message)
      }
      if (response.data.success) {
        toast.success(response.data.message || "User Registered Successfully")

        setData({ name: '', email: '', password: '', confirmPassword: '' });
        setMessage("");
        navigate('/login')
      }


      console.log(response)
    } catch (error) {
      toast.error(error.message || "Some error Occured")
      console.log(error)
    }
  }
  return (
    <section className="auth-container-wrapper">
      <div className="auth-container">
        <p className='auth-form-head'>Welcome to Blinkit</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-field">
            <label htmlFor="name">Full Name</label>
            <input
              autoFocus
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={handleChange}
              placeholder='Enter your full name'
            />
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={data.email}
              onChange={handleChange}
              placeholder='Enter your email address'
            />
          </div>
          <div className="input-field password-wrapper">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={data.password}
                onChange={handleChange}
                placeholder='Create a strong password'
              />
              <span
                className="toggle-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <IoEyeOutline />}
              </span>
            </div>
          </div>
          <div className="input-field password-wrapper">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input">
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                id="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder='Re-enter your password'
              />
              <span
                className="toggle-eye"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showPassword ? <FaRegEyeSlash /> : <IoEyeOutline />}
              </span>
            </div>
          </div>
          <span className="auth-msg">{message}</span>
          <button disabled={!validateData} className={`auth-btn ${validateData ? "" : "btn-disable"} `}>Register</button>
        </form>
        <p className='auth-footer-link'>Already have Account? <Link to="/login">Login</Link></p>
      </div>
    </section>
  );
};

export default Register;
