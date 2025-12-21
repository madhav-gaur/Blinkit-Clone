import React from 'react'
import { FiUser } from "react-icons/fi";
import { LuMapPinned } from "react-icons/lu";
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import './Account.css'
import { useSelector } from 'react-redux';
import { FiPackage } from 'react-icons/fi';
import { MdCategory } from 'react-icons/md';
import { BiCategoryAlt } from 'react-icons/bi';
import { FiShoppingBag } from "react-icons/fi";
import { MdCloudUpload } from 'react-icons/md';
import isAdmin from '../utils/isAdmin';


const Account = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  return (
    <section className={`${location.pathname === "/account" ? "show-menu" : "hide-menu"}
    ${isAdmin(user.role) ? "admin-account-wrapper" : "account-wrapper "}`}>
      <div className='account-detail'>
        {/*//? left side  */}
        <div className={`account-menu ${isAdmin(user.role) ? "admin-account-menu" : ""}`} >
          {/* {isAdmin(user.role) ? <p className='admin-tag'>Admin</p> : null} */}
          <div className='accountToHome' onClick={() => navigate('/')}>
            <IoIosArrowRoundBack size={30} />
            Home
          </div>
          {
            isAdmin(user.role) ? (
              <>
                <NavLink to="/account/all-orders">
                  <span><FiShoppingBag /></span>
                  <p>All Orders</p>
                </NavLink>
                <NavLink to="/account/product">
                  <span><FiPackage /></span>
                  <p>All Products</p>
                </NavLink>

                <NavLink to="/account/category">
                  <span><MdCategory /></span>
                  <p>Categories</p>
                </NavLink>
                <NavLink to="/account/subcategory">
                  <span><BiCategoryAlt /></span>
                  <p>Sub Categories</p>
                </NavLink>
                <NavLink to="/account/upload-product">
                  <span><MdCloudUpload /></span>
                  <p>Upload Product</p>
                </NavLink>
              </>
            ) : null
          }

          <NavLink to='profile'>
            <span><FiUser /></span>
            <p>My Profile</p>
          </NavLink>
          <NavLink to='address'>
            <span><LuMapPinned /></span>
            <p>My Addresses</p>
          </NavLink>
          <NavLink to='orders'>
            <span><FaRegListAlt /></span>
            <p>My Orders</p>
          </NavLink>
          <NavLink to='privacy'>
            <span><MdOutlineLock /></span>
            <p>Account Privacy</p>
          </NavLink>
          <NavLink to='/'>
            {/* onClick={handleLogout} */}
            <span><FaRegUser /></span>
            <p>Logout DISABLED</p>
          </NavLink>
        </div>
        <div className='account-content' style={{ marginLeft: isAdmin(user.role) ? "3.5rem" : "" }}>
          <Outlet />
        </div>
      </div>
    </section >
  )
}

export default Account
