/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useNavigate, useMemo } from 'react'
import Axios from '../utils/axios'
import SummaryApi from '../common/summaryAPI'
import { formatDate } from '../utils/formatDate'
import { useDispatch, useSelector } from 'react-redux'
import { IoClose } from "react-icons/io5";
import { RiArrowUpDownFill } from "react-icons/ri";
import { IoFilterSharp } from "react-icons/io5";
import '../pages/stylesheets/AdminOrders.css'
import { FaSortDown } from "react-icons/fa";
import { GrPrevious } from 'react-icons/gr'
import { setIsAdminOrderLoaded, setIsOrderLoaded } from '../store/orderSlice'
const AdminOrders = () => {
    const [orders, setOrders] = useState([])
    const temp = useSelector(state => state.orders.adminOrderSliceData)
    useEffect(() => {
        if (temp[0]) {
            setOrders([...temp].reverse())
        }
    }, [temp])
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(10)
    const users = useSelector(state => state.orders.allUserSliceData)
    const [isReversed, setIsReversed] = useState(false);

    const [isUpdateStatus, setIsUpdateStatus] = useState("")
    const address = useSelector((state) => state.address.allAddress)
    const [isMenu, setIsMenu] = useState("")
    const [filters, setFilters] = useState({
        orderAmount: null,
        paymentStatus: [],
        orderStatus: [],
    });

    const dispatch = useDispatch()
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
            if (res.data.success) {
                dispatch(setIsAdminOrderLoaded(false))
                dispatch(setIsOrderLoaded(false))
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handlePage = (type) => {
        if (type == "back" && page != 1)
            setPage(page - 1)
        if (type == "next" && page != totalPage) setPage(page + 1)
    }
    const toggleArrayFilter = (key, value) => {
        setFilters(prev => {
            const exists = prev[key].includes(value);

            return {
                ...prev,
                [key]: exists
                    ? prev[key].filter(v => v !== value)
                    : [...prev[key], value],
            };
        });
    };
    const allowedStatuses = useMemo(() => {
        return new Set([
            ...filters.paymentStatus,
            ...filters.orderStatus,
        ]);
    }, [filters]);

    const displayedOrders = useMemo(() => {
        let result = [...orders];
        if (isReversed) {
            result = result.slice().reverse();
        }
        if (filters.orderAmount == "high") {
            result.sort((a, b) => b.totalAmt - a.totalAmt)
        }
        if (filters.orderAmount == "low") {
            result.sort((a, b) => a.totalAmt - b.totalAmt)
        }
        if (allowedStatuses.size > 0) {
            result = result.filter(order =>
                allowedStatuses.has(order.order_status) ||
                allowedStatuses.has(order.payment_status)
            );
        }
        return result;
    }, [orders, isReversed, filters]);
    const totalPage = Math.ceil(displayedOrders.length / itemPerPage);

    return (
        <div className='order-page-wrapper'>
            <div className='order-page-hero'>
                <div className='order-filter-wrapper'>
                    <div className='order-filter-left'>
                        <button>{(filters.orderAmount || filters.paymentStatus[0] || filters.orderStatus[0]) ?
                            <p onClick={() => setFilters({ orderAmount: null, paymentStatus: [], orderStatus: [] })}>
                                Clear Filters</p> : `Showing ${itemPerPage * page > displayedOrders.length ? displayedOrders.length : itemPerPage * page} out of ${displayedOrders.length} entries`}
                        </button>
                        <div className='active-order-filters'>
                            {filters.orderAmount != null && <div className='active-filter-item'>
                                <span>
                                    {filters.orderAmount == "high" && "High to Low"}{filters.orderAmount == "low" && "Low to High"}
                                </span>
                                <div
                                    onClick={() =>
                                        setFilters(prev => ({ ...prev, orderAmount: null, }))}
                                    className='remove-order-filter'><IoClose />
                                </div>
                            </div>}
                            {filters.paymentStatus.map((item, idx) => {
                                return <div key={idx} className='active-filter-item'>
                                    <span>{item.replaceAll("_", " ")}</span>
                                    <div onClick={() =>
                                        setFilters(prev => ({ ...prev, paymentStatus: prev.paymentStatus.filter(ps => ps !== item), }))}
                                        className='remove-order-filter'><IoClose /></div>
                                </div>
                            })}
                            {filters.orderStatus.map((item, idx) => {
                                return <div key={idx} className='active-filter-item'>
                                    <span>{item.replaceAll("_", " ")}</span>
                                    <div onClick={() =>
                                        setFilters(prev => ({ ...prev, orderStatus: prev.orderStatus.filter(ps => ps !== item), }))}
                                        className='remove-order-filter'><IoClose /></div>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className='order-filter-right'>
                        <div className='order-filter-right-container'>
                            <div className='order-filter-right-item'>
                                <button
                                    className='order-filter-right-item-btn'
                                    onClick={() => {
                                        setIsMenu("sort")
                                        if (isMenu == "sort") setIsMenu("")
                                    }}
                                >
                                    {isMenu == "sort" ? <IoClose /> : < IoFilterSharp />}
                                </button>
                                <span className='order-tooltip'>Sort Results</span>
                                {isMenu == "sort" && <div className='order-filter-right-menu'>
                                    <div className='order-filter-menu-item'>
                                        <p>Order Amount</p>
                                        <div className='order-filter-sub-dropdown'>
                                            <button onClick={() =>
                                                setFilters(prev => ({
                                                    ...prev,
                                                    orderAmount: "high",
                                                }))
                                            }>High to Low</button>
                                            <button onClick={() =>
                                                setFilters(prev => ({
                                                    ...prev,
                                                    orderAmount: "low",
                                                }))
                                            }>Low to High</button>
                                        </div>
                                    </div>
                                    <div className='order-filter-menu-item'>
                                        Payment Status
                                        <div className='order-filter-sub-dropdown'>
                                            <button onClick={() =>
                                                toggleArrayFilter("paymentStatus", "SUCCESS")
                                            }>Success</button>
                                            <button onClick={() =>
                                                toggleArrayFilter("paymentStatus", "COD_PENDING")

                                            }>Pending</button>
                                            <button onClick={() =>
                                                toggleArrayFilter("paymentStatus", "CANCELLED_BY_ADMIN")

                                            }>Cancelled by Admin</button>
                                            <button onClick={() =>
                                                toggleArrayFilter("paymentStatus", "CANCELLED_BY_USER")

                                            }>Cancelled by User</button>
                                            <button onClick={() =>
                                                toggleArrayFilter("paymentStatus", "REFUNDED")

                                            }>Refunded</button>
                                            <button onClick={() =>
                                                toggleArrayFilter("paymentStatus", "RETURNED")

                                            }>Returned</button>
                                        </div>
                                    </div>
                                    <div className='order-filter-menu-item'>
                                        Order Status
                                        <div className='order-filter-sub-dropdown'>
                                            <button onClick={() => toggleArrayFilter("orderStatus", "CONFIRMED")}>
                                                Confirmed</button>
                                            <button onClick={() =>
                                                toggleArrayFilter("orderStatus", "PACKED")

                                            }>Packed</button>
                                            <button onClick={() =>
                                                toggleArrayFilter("orderStatus", "OUT_FOR_DELIVERY")

                                            }>Out For Delivery</button>
                                            <button onClick={() =>
                                                toggleArrayFilter("orderStatus", "DELIVERED")

                                            }>Delivered</button>
                                            <button onClick={() =>
                                                toggleArrayFilter("orderStatus", "CANCELLED_BY_USER")

                                            }>Cancelled by User</button>

                                            <button onClick={() =>
                                                toggleArrayFilter("orderStatus", "CANCELLED_BY_ADMIN")

                                            }>Cancelled by Admin</button>
                                            <button onClick={() =>
                                                toggleArrayFilter("orderStatus", "DELIVERY_FAILED")

                                            }>Delivery Failed</button>
                                            <button onClick={() =>
                                                setFilters(prev => ({
                                                    ...prev,
                                                    orderStatus: [...prev.orderStatus, "RETURNED"],
                                                }))
                                            }>Returned</button>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                            <div className='order-filter-right-item'>
                                <button
                                    className='order-filter-right-item-btn'
                                    onClick={() => setIsReversed(prev => !prev)}>
                                    <RiArrowUpDownFill />
                                </button>
                                <span className='order-tooltip'>Reverse Results</span>
                            </div>
                            <div className='order-filter-right-item'>
                                <button
                                    className='order-filter-right-item-btn'
                                    onClick={() => {
                                        setIsMenu("itemQnt")
                                        if (isMenu == "itemQnt") setIsMenu("")
                                    }}>
                                    <span>{itemPerPage} {isMenu == "itemQnt" ? <IoClose /> : <FaSortDown />} </span>
                                </button>
                                <span className='order-tooltip'>Items Per Page</span>
                                {isMenu == "itemQnt" && <div className='order-filter-right-menu'>
                                    <button onClick={() => setItemPerPage(10)}>10</button>
                                    <button onClick={() => setItemPerPage(25)}>25</button>
                                    <button onClick={() => setItemPerPage(50)}>50</button>
                                    <button onClick={() => setItemPerPage(100)}>100</button>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
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
                        {displayedOrders?.slice((page - 1) * itemPerPage, page * itemPerPage).map((item, idx) => {
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

                                <p>{item.payment_status == "SUCCESS" ? <u>Success</u> : <a>{item.payment_status.replaceAll("_", " ")}</a>} </p>

                                <p>{item.totalAmt} Rs</p>

                                <p>{item.items.length} Items</p>
                                <div className='admin-address-area'>
                                    <p>{address_line?.slice(0, 3).map((i, idx) => {
                                        return <span key={idx}>{i}{idx == 2 ? "" : " "}</span>
                                    })}... {currAddress?.city}</p>
                                    <div className='admin-address-tooltip'>
                                        <span>{currAddress?.address_line}, {currAddress?.city}, </span>
                                        <p>{currAddress?.state}, {currAddress?.pincode}, </p>
                                        <span>{currAddress?.country}, </span>
                                        <span>{currAddress?.mobile}</span>
                                    </div>
                                </div>

                                <p>{item.order_status.replaceAll("_", " ")}</p>

                                <div
                                    className='order-update-action-btn'
                                    onClick={() => {
                                        if (isUpdateStatus == "") setIsUpdateStatus(item._id)
                                        else setIsUpdateStatus("")
                                    }}>
                                    {isUpdateStatus == item._id ? "Close" : "Action"}
                                    {/* <div><Link to={`/account/orders/${item.orderId}`}>...</Link></div> */}
                                    {isUpdateStatus == item._id && <div className='order-status-update-menu' onClick={(e) => e.stopPropagation()}>
                                        <div className='order-status-update-menu-close' onClick={() => setIsUpdateStatus('')} ><IoClose /></div>
                                        <div className='order-status-update-menu-sub'>
                                            <div onClick={() => updateStatus(item._id, "CONFIRMED")}><button>CONFIRMED</button></div>
                                            <div onClick={() => updateStatus(item._id, "PACKED")}><button>PACKED</button></div>
                                            <div onClick={() => updateStatus(item._id, "OUT_FOR_DELIVERY")}><button>OUT FOR DELIVERY</button></div>
                                            <div onClick={() => updateStatus(item._id, "DELIVERED")}><button>DELIVERED</button></div>
                                            <div onClick={() => updateStatus(item._id, "CANCELLED_BY_USER")}><button>CANCELLED BY USER</button></div>
                                        </div>
                                        <div className='order-status-update-menu-sub'>

                                            <div onClick={() => updateStatus(item._id, "CANCELLED_BY_ADMIN")}><button>CANCELLED BY ADMIN</button></div>
                                            <div onClick={() => updateStatus(item._id, "CANCELLED_OUT_OF_STOCK")}><button>CANCELLED (STOCK)</button></div>
                                            <div onClick={() => updateStatus(item._id, "DELIVERY_FAILED")}><button>DELIVERY FAILED</button></div>
                                            <div onClick={() => updateStatus(item._id, "RETURN_REQUESTED")}><button>RETURN REQUESTED</button></div>
                                            <div onClick={() => updateStatus(item._id, "RETURNED")}><button>RETURNED</button></div>
                                        </div>
                                    </div>}
                                </div>

                            </div>

                        })}
                    </div>
                </div>
                <div className='admin-product-pagination'>
                    <button
                        className='admin-pagination-btn'
                        disabled={page == 1}
                        onClick={() => handlePage("back")}>
                        <GrPrevious />
                        <p>Previous</p>
                    </button>
                    <span className='pagination-type2' style={{ display: 'flex' }}>{`Page ${page}  of  ${totalPage}`}</span>
                    <button
                        className='admin-pagination-btn'
                        disabled={page == totalPage}
                        onClick={() => handlePage("next")}>
                        <p>Next</p>
                        <GrPrevious
                            style={{ transform: 'rotate(180deg)' }}
                        />
                    </button>

                </div>
            </div>
        </div>
    )
}

export default AdminOrders
