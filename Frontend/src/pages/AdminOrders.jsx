/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Axios from '../utils/axios'
import SummaryApi from '../common/summaryAPI'
import { formatDate } from '../utils/formatDate'

const AdminOrders = () => {
    const [orders, setOrders] = useState([])
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(3)
    const totalPage = Math.ceil(orders.length / itemPerPage);
    const fetchAdminOrders = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.adminOrders,
            })
            if (response.data.success) {
                setOrders(response.data.data)
            }
            // console.log(orders)
        } catch (error) {
            console.error(error)
        }
    }
    const fetchAllUsers = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.allUserDetails
            })
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }
    const handlePage = (type) => {
        if (type == "back" && page != 1)
            setPage(page - 1)
        if (type == "next" && page != totalPage) setPage(page + 1)
    }
    useEffect(() => {
        fetchAllUsers()
    }, [])
    useEffect(() => {
        fetchAdminOrders()
    }, [])
    return (
        <div>
            {orders?.slice((page - 1) * itemPerPage, page * itemPerPage).map((item, idx) => {
                return <div key={item._id + idx}>
                    <p>{item.items.length} Products</p>
                    <p>{formatDate(item.createdAt)}</p>
                    <br />
                </div>
            })}
            <div>
                <span onClick={() => handlePage("back")}>
                    prev {"   "}
                </span>
                {/* <span>
                    {
                        [...Array(totalPage)].map((_, i) => {
                            return <b onClick={() => setPage(i + 1)} key={i}>{i + 1}{"   "}</b>
                        })
                    }
                </span> */}
                <span>{"   "}
                    {page}/{totalPage}
                    {"   "}
                </span>
                <span onClick={() => handlePage("next")}>
                    next
                </span>
            </div>
        </div>
    )
}

export default AdminOrders
