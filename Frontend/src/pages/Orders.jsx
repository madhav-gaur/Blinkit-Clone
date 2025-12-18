import React, { useEffect, useState } from 'react'
import Axios from '../utils/axios'
import SummaryApi from '../common/summaryAPI'
import '../pages/stylesheets/Orders.css'
const Orders = () => {
  const [orders, setOrders] = useState([])
  const fetchOrders = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getOrderItems,
      })
      if (response.data.success) {
        const temp = response.data.data.reverse()
        setOrders(temp)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const formatDate = (date) =>
    new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  useEffect(() => {
    fetchOrders()
    console.log(orders)
  }, [])
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

              return <div className='order-item' key={orderItem._id + idx1}>
                  <p className='order-date'>Ordered on {orderDate}</p>
                  <span className='order-price'>₹{orderItem.totalAmt}</span>
                  <div className='order-status'>{}</div>
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
