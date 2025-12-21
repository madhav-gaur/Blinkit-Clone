import React, { useEffect } from 'react'
import Axios from '../utils/axios'
import SummaryApi from '../common/summaryAPI'

const AdminOrders = () => {
    const fetchAdminOrders = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.adminOrders,
            })
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(()=>{
        fetchAdminOrders()
    }, [])
    return (
        <div>

        </div>
    )
}

export default AdminOrders
