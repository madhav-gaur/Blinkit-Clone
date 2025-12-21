import React, { useEffect } from 'react'
import Axios from '../utils/axios'
import SummaryApi from '../common/summaryAPI'
import '../pages/stylesheets/Orders.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { formatDate } from '../utils/formatDate'
const Orders = () => {
  const navigate = useNavigate()
  const orders = useSelector((state) => state.orders.orderSliceData)

  // console.log(orders)

  useEffect(() => {
    console.log(orders)
  }, [orders])
  return (
    <div className='order-page-wrapper'>
      <div className='order-page-container'>
        <h2 className='order-head'> My Orders</h2>
        {/* <hr /> */}
        <div className='order-list'>
          {
            orders.map((orderItem, idx1) => {
              const orderDate = formatDate(orderItem.createdAt)
              // const temptDate = orderDate[1] + "/" + orderDate[0] + "/" + orderDate[2]

              // if

              return <div
                className='order-item'
                key={orderItem._id + idx1}
                onClick={() => navigate(`/account/orders/${orderItem.orderId}`)}
              >
                <p className='order-date'>Ordered on {orderDate}</p>
                <span className='order-price'>₹{orderItem.totalAmt}</span>
                <div className='order-status'>{ }</div>
                <div className='order-images' >
                  {orderItem.items.slice(0, 7).map((productItem, idx2) => {
                    return <div className='order-image-item' key={productItem._id + idx1 + idx2}>
                      <img src={productItem.product_details.image[0]} alt={productItem.product_details.name} />
                    </div>
                  })
                  }
                </div>
              </div>
            })
          }
        </div>
      </div>
    </div >
  )
}

export default Orders
