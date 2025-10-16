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
import { MdCloudUpload } from 'react-icons/md';
import isAdmin from '../utils/isAdmin';


const Account = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  return (
    <section className={`account-wrapper ${location.pathname === "/account" ? "show-menu" : "hide-menu"}`}>
      <div className='account-detail'>
        {/*//? left side  */}
        <div className='account-menu' >
          {isAdmin(user.role) ? <p className='admin-tag'>Admin</p> : null}
          <div className='accountToHome' onClick={() => navigate('/')}>
            <IoIosArrowRoundBack size={30} />
            Home
          </div>
          {
            isAdmin(user.role) ? (
              <>
                <NavLink to="/account/product">
                  <span><FiPackage /></span>
                  All Products
                </NavLink>

                <NavLink to="/account/category">
                  <span><MdCategory /></span>
                  Categories
                </NavLink>
                <NavLink to="/account/subcategory">
                  <span><BiCategoryAlt /></span>
                  Sub Categories
                </NavLink>
                <NavLink to="/account/upload-product">
                  <span><MdCloudUpload /></span>
                  Upload Product
                </NavLink>
              </>
            ) : null
          }

          <NavLink to='profile'>
            <span><FiUser /></span>
            My Profile
          </NavLink>
          <NavLink to='address'>
            <span><LuMapPinned /></span>
            My Addresses
          </NavLink>
          <NavLink to='orders'>
            <span><FaRegListAlt /></span>
            My Orders
          </NavLink>
          <NavLink to='privacy'>
            <span><MdOutlineLock /></span>
            Account Privacy
          </NavLink>
          <NavLink to='/'>
            {/* onClick={handleLogout} */}
            <span><FaRegUser /></span>
            Logout DISABLED
          </NavLink>
        </div>
        <div className='account-content'>
          <Outlet />
        </div>
      </div>
    </section>
  )
}

export default Account
