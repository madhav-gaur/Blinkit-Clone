import React, { useEffect } from 'react'
import Axios from '../utils/axios'
import SummaryApi from '../common/summaryAPI'

export const Orders = () => {
  const fetchOrders = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getOrderItems, 
      })
      console.log(response)
    } catch (error) {
        console.log(error)
    }
  }
  useEffect(()=>{
    fetchOrders()
  }, [])
  return (
    <div>

    </div>
  )
}