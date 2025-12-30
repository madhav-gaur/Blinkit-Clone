/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Axios from '../utils/axios'
import SummaryApi from '../common/summaryAPI'
import { formatDate } from '../utils/formatDate'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAllAddressLoaded } from '../store/addressSlice'
import { IoClose } from "react-icons/io5";
import '../pages/stylesheets/AdminOrders.css'
const AdminOrders = () => {
    const [orders, setOrders] = useState([])
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(10)
    const totalPage = Math.ceil(orders.length / itemPerPage);
    const [users, setUsers] = useState([])
    const [isUpdateStatus, setIsUpdateStatus] = useState("")
    const address = useSelector((state) => state.address.allAddress)
    const dispatch = useDispatch()
    const [localUpdate, setLocalUpdate] = useState("")
    const fetchAdminOrders = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.adminOrders,
            })
            if (response.data.success) {
                setOrders(response.data.data)
                dispatch(setIsAllAddressLoaded(false))
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchAdminOrders()
    }, [])
    console.log(localUpdate)
    // const updateStatus = async (id, status) => {
    //     setLocalUpdate(status.replaceAll("_", " "))
    //     try {
    //         const response = await Axios({
    //             ...SummaryApi.updateOrderStatus,
    //             data: { id, status }
    //         })
    //         console.log(response)
    //         if (response.data.success) {
    //             setIsUpdateStatus('')
    //             setLocalUpdate(response.data.data.order_status.replaceAll("_", " "))
    //             // fetchAdminOrders()
    //         }
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }
    const updateStatus = async (id, orderStatus) => {
        setOrders(prev =>
            prev.map(o =>
                o._id === id
                    ? { ...o, order_status: orderStatus }
                    : o
            )
        );
        setIsUpdateStatus("");
        try {
            const res = await Axios({
                ...SummaryApi.updateOrderStatus,
                data: { id, orderStatus },
            });
            console.log(res)
        } catch (error) {
            console.error(error);
        }
    };

    const fetchAllUsers = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.allUserDetails
            })
            if (response.data.success) {
                setUsers(response.data.data)
            }
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
    return (
        <div className='order-page-wrapper'>
            <div className='order-page-hero'>
                <div className='order-filter-wrapper'>
                </div>
                <div className='order-list-container'>
                    <div className='order-list-head'>
                        <div className='order-list-head-item'><h3>Order Id</h3></div>
                        <div className='order-list-head-item'><h3>Date</h3></div>
                        <div className='order-list-head-item'><h3>Customer</h3></div>
                        <div className='order-list-head-item'><h3>Payment status</h3></div>
                        <div className='order-list-head-item'><h3>Total</h3></div>
                        <div className='order-list-head-item'><h3>Items</h3></div>
                        <div className='order-list-head-item'><h3>Delivery Address</h3></div>
                        <div className='order-list-head-item'><h3>Status</h3></div>
                        <div className='order-list-head-item'><h3>Action</h3></div>
                    </div>
                    <div className='order-list-details-wrapper'>
                        {orders?.slice((page - 1) * itemPerPage, page * itemPerPage).map((item, idx) => {
                            const temp = users?.find((u) => u._id === item.userId);
                            const currAddressId = temp?.address_details?.find(
                                (a) => a === item.delivery_address
                            );
                            const currAddress = address?.find((item) => item._id == currAddressId)
                            const address_line = currAddress?.address_line.split(" ")
                            return <div key={item._id + idx} className='order-list-detail-item'>
                                <b>#{item.orderId}</b>
                                <p>{formatDate(item.createdAt).split(",")[0]}</p>
                                <p>{temp?.name}</p>
                                <p>{item.payment_status == "COD_PENDING" ? <a>Pending</a> : <u>Success</u>}</p>
                                <p>{item.items.length} Products</p>
                                <p>{item.totalAmt} Rs</p>
                                <p>{address_line?.slice(0, 3).map((i, idx) => {
                                    return <span key={idx}>{i}{idx == 2 ? "" : " "}</span>
                                })}... {currAddress?.city}</p>
                                <p>{item.order_status.replaceAll("_", " ")}</p>
                                <div
                                    className='order-update-action-btn'
                                    onClick={() => {
                                        if (isUpdateStatus == "") setIsUpdateStatus(item._id)
                                        else setIsUpdateStatus("")
                                    }}>
                                    {isUpdateStatus == item._id ? "Close" : "Action"}
                                    {isUpdateStatus == item._id && <div className='order-status-update-menu' onClick={(e) => e.stopPropagation()}>
                                        <div onClick={() => setIsUpdateStatus('')} ><IoClose /></div>
                                        <div onClick={() => updateStatus(item._id, "CONFIRMED")}><button>CONFIRMED</button></div>
                                        <div onClick={() => updateStatus(item._id, "PACKED")}><button>PACKED</button></div>
                                        <div onClick={() => updateStatus(item._id, "OUT_FOR_DELIVERY")}><button>OUT FOR DELIVERY</button></div>
                                        <div onClick={() => updateStatus(item._id, "DELIVERED")}><button>DELIVERED</button></div>
                                        <div onClick={() => updateStatus(item._id, "CANCELLED_BY_USER")}><button>CANCELLED BY USER</button></div>
                                        <div onClick={() => updateStatus(item._id, "CANCELLED_BY_ADMIN")}><button>CANCELLED BY ADMIN</button></div>
                                        <div onClick={() => updateStatus(item._id, "CANCELLED_OUT_OF_STOCK")}><button>CANCELLED OUT OF STOCK</button></div>
                                        <div onClick={() => updateStatus(item._id, "DELIVERY_FAILED")}><button>DELIVERY FAILED</button></div>
                                        <div onClick={() => updateStatus(item._id, "RETURN_REQUESTED")}><button>RETURN REQUESTED</button></div>
                                        <div onClick={() => updateStatus(item._id, "RETURNED")}><button>RETURNED</button></div>
                                    </div>}
                                </div>

                            </div>

                        })}
                    </div>
                </div>
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
        </div>
    )
}

export default AdminOrders
