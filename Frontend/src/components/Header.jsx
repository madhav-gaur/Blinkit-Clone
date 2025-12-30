// import React, { useEffect, useState } from 'react'
import './stylesheets/Header.css'
import logo from '../assets/logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";

import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowDropdown } from "react-icons/io";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { FaChevronRight } from "react-icons/fa";
import Axios from '../utils/axios';
import SummaryApi from '../common/summaryAPI';
import { logout } from '../store/userSlice';
import { toast } from 'react-toastify';
import { IoClose } from "react-icons/io5";
import isAdmin from '../utils/isAdmin';
import { Cart } from './Cart';
import { setCartPaybleAmount } from '../store/cartSlice';
import { setCartSliceData } from '../store/cartSlice';
import { calcBill } from "../components/calcBill"
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
const Header = () => {
  const cartPaybleAmount = useSelector((state) => state.cart.cartPaybleAmount)
  const [userDropDown, setUserDropDown] = useState(false)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [isCart, setIsCart] = useState(false)

  const location = useLocation();
  const isSearchPage = location.pathname === "/search";

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout
      })
      if (response.data.success) {
        dispatch(logout())
        localStorage.clear()
        toast.success(response.data.message)
        setUserDropDown(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const navigate = useNavigate()

  const [cartData, setCartData] = useState([])
  // const calcBill = (cartData = []) => {
  //   const { totalSaving, productTotal } = cartData.reduce(
  //     (acc, item) => {
  //       const { price, discount } = item.productId;
  //       acc.totalSaving += Math.floor((price * discount) / 100) * item.quantity;
  //       acc.productTotal += Math.floor(price - (price * discount) / 100) * item.quantity;
  //       return acc;
  //     },
  //     { totalSaving: 0, productTotal: 0 }
  //   );

  //   const deliveryCharge = productTotal > 99 ? 0 : 25;
  //   const handlingCharge = 2;
  //   const totalPayblePrice = productTotal + deliveryCharge + handlingCharge;

  //   return { totalSaving, productTotal, deliveryCharge, handlingCharge, totalPayblePrice };
  // };

  const getCartItem = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCartItem
      })
      setCartData(response.data.data || [])
    }
    catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getCartItem()
  }, [cartData])
  const { totalSaving, totalPayblePrice, productTotal, handlingCharge } = calcBill(cartData)
  useEffect(() => {
    dispatch(setCartPaybleAmount(totalPayblePrice))
  }, [dispatch, totalPayblePrice, cartData])
  useEffect(() => {
    dispatch(setCartSliceData(cartData))
  }, [dispatch, cartData])
  return (
    <>
      <header>
        <div className={`header-item-wrapper ${isSearchPage ? "displayNone" : ''}`}>
          <div className='header-item'>
            <Link to='/'>
              <img className='brand-logo' src={logo} alt="logo" />
            </Link>
          </div>
          <div className='header-item header-item-mobile'>
            {user?._id ? (
              <div
                className='user-logo'
                onClick={() => isAdmin(user.role)? navigate('/account/profile'):navigate('/account')}
                style={{ cursor: "pointer" }}
              >
                {user?.avatar
                  ? <img src={user.avatar} alt="" />
                  : <p>{user?.name?.charAt(0)}</p>}
              </div>
            ) : (
              <Link to="/login" style={{ fontSize: "2rem", color: "#555" }}>
                <FiUser />
              </Link>
            )}
          </div>
        </div>

        <div style={{ "width": "100%", "justifyContent": "center" }} className='header-item-wrapper'>
          <Search />
        </div>

        <div className="header-item-wrapper user-controls">
          {user?._id ? (
            <div className='header-item user-area'>
              <div className='user-thumb' onClick={() => setUserDropDown(!userDropDown)}>
                <div className='user-logo'>
                  {
                    user?.avatar ? (
                      <div className='user-logo' style={{ "backgroundColor": "white", "border": "1px solid #666" }}>
                        <img src={user?.avatar} alt="" />
                      </div>
                    ) :
                      userDropDown ? (
                        <p style={{ 'fontSize': "1.5rem", "marginTop": "7px" }} onClick={() => setUserDropDown(!userDropDown)}><IoClose /></p>
                      ) : (
                        <p>{user?.name?.charAt(0)}</p>
                      )

                  }
                </div>
                <h4> {isAdmin(user.role) ? "ADMIN" : "Account"} <span><IoMdArrowDropdown style={{ "transform": userDropDown ? "rotate(180deg)" : "" }} /></span></h4>
              </div>

              <div className='user-dropdown' style={{ "display": userDropDown ? "flex" : "none" }}>
                <Link to="/account/profile" onClick={() => (setUserDropDown(false))} >
                  <span>My Account</span>
                  <p>{user?.name}<FaExternalLinkAlt /></p>
                </Link>
                {isAdmin(user.role) ? <p style={{ fontSize: "1rem", color: "red", "border": "1px solid red", "padding": "2px 4rem", "marginTop": "10px", "borderRadius": "1rem" }}>Admin</p> : null}
                <div className='user-menu-wrapper'>
                  <div className='user-menu'>

                    {isAdmin(user.role) && (
                      <>
                        <Link to='/account/product' onClick={() => (setUserDropDown(false))}>All Products</Link>
                        <Link to='/account/upload-product' onClick={() => (setUserDropDown(false))}>Upload Product</Link>
                      </>
                    )}
                    <Link to='/account/orders' onClick={() => (setUserDropDown(false))} >My Orders</Link>
                    <Link to='/account/address' onClick={() => (setUserDropDown(false))} >Saved Address</Link>
                    <button onClick={handleLogout}>Log Out</button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {!isSearchPage && !user._id && (
            <div className='header-item'>
              <Link to="/login">Login</Link>
            </div>
          )}
          <div className='header-item'>
            <button onClick={() => setIsCart(true)} className='cart-btn'>
              <p className='cart-icon' >
                <AiOutlineShoppingCart />
              </p>
              <span className="header-cart-data">
                {user._id ? (
                  cartData?.length > 0 ? (
                    <p>
                      {cartData?.length} Items
                      <legend>₹ {cartPaybleAmount}</legend>
                    </p>
                  ) : (
                    "My Cart"
                  )
                ) : (
                  "My Cart"
                )}
              </span>
            </button>
          </div>
        </div>
        {cartData[0] && !location.pathname.startsWith("/checkout") && !location.pathname.startsWith("/account")&&
          <div>
            <div className="sc-cart-info" onClick={() => setIsCart(true)}>
              <div className="sc-cart-info-left">
                <div>
                  {cartData.length >= 1 ? cartData?.slice(-3).map((item, idx) => {
                    return <span key={item._id + idx}> <img src={item.productId.image[0]} /></span>
                  }) :
                    <HiOutlineShoppingCart />
                  }
                </div>
                <div>
                  <p>View Cart</p>
                  <span>{cartData?.length} Items</span>
                </div>
              </div>
              <div className="sc-cart-info-right">
                <FaChevronRight />
              </div>
            </div>
          </div>
        }
      </header>
      {isCart &&
        <Cart
          isCart={isCart}
          setIsCart={setIsCart}
          cartData={cartData}
          getCartItem={getCartItem}
          productTotal={productTotal}
          totalSaving={totalSaving}
          setCartData={setCartData}
          handlingCharge={handlingCharge}
        />}
      <div className='overlay' onClick={() => setUserDropDown(!userDropDown)} style={{ "display": userDropDown ? "flex" : "none" }}>
      </div>
    </>
  )
}

export default Header
