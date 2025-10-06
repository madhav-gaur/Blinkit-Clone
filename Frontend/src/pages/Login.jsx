import React, { useState } from 'react';
import './stylesheets/Register.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import Axios from '../utils/axios';
import SummaryApi from '../common/summaryAPI';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import fetchUserDetails from '../utils/userDetails';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const validateData = Object.values(data).every((elem) => elem)
  const [message, setMessage] = useState("")
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await Axios.request({
        method: SummaryApi.login.method,
        url: SummaryApi.login.url,
        data: data,
      });

      if (!response.data.success) {
        setMessage(response.data.message)
      }
      if (response.data.success) {
        toast.success(response.data.message || "User Logged In Successfully")
        localStorage.setItem("accessToken", response.data.data.accessToken)
        localStorage.setItem("refreshToken", response.data.data.refreshToken)

        const userDetails = await fetchUserDetails()
        dispatch(setUserDetails(userDetails.data.data))
        // console.log(response)
        setData({ email: '', password: '', });
        setMessage("");

        navigate('/')
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
        <p className='auth-form-head'>Login to Blinkit</p>
        <form onSubmit={handleSubmit} className="auth-form">

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
                placeholder='Enter your password'
              />
              <span
                className="toggle-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <IoEyeOutline />}
              </span>
            </div>
          </div>
          <Link className='forgot-link' to='/forgot-password'>Forgot Password?</Link>
          {/* //! FORGOT PASSWORD  3:15 to 4:20 playlist video 2 */}
          <span className="auth-msg">{message}</span>
          <button disabled={!validateData} className={`auth-btn ${validateData ? "" : "btn-disable"} `}>Login</button>
        </form>
        <p className='auth-footer-link'>New User? <Link to="/register">Register</Link></p>
      </div>
    </section>
  );
};

export default Login;
