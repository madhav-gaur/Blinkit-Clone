import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { FaCheckCircle } from "react-icons/fa";
import '../pages/stylesheets/OrderSuccess.css'
const OrderSuccess = () => {
  const navigate = useNavigate()
  const orderId = useParams()
  const location = useLocation()
  console.log(orderId)
  useEffect(() => {
    // If user didn't come via navigate(..., { state: { fromCheckout: true}})
    if (!location.state?.fromCheckout) {
      navigate("/", { replace: true });   // kick them to home
    }
  }, [location.state, navigate]);
  return (
    <div className='order-placed-wrapper'>
      <div className='order-placed-container'>
        <span className='success-check'><FaCheckCircle /></span>
        <h3>Thankyou for your Purchase</h3>
        <p>Your Order has been successfully placed</p>
        <b>Order Id: {orderId.order}</b>
        <p>Click below to view Order Details</p>
        <div className='order-placed-btns'>
          <button onClick={() => navigate("/account/orders")}>View Order Details</button>
          <button onClick={() => navigate("/")}>Back Home</button>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess
