/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Axios from '../utils/axios'
import SummaryApi from '../common/summaryAPI'
import { formatDate } from '../utils/formatDate'
import { useSelector } from 'react-redux'

const AdminOrders = () => {
    const [orders, setOrders] = useState([])
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(3)
    const totalPage = Math.ceil(orders.length / itemPerPage);
    const [users, setUsers] = useState([])
    const address = useSelector((state) => state.address.address)
    // console.log(address)
    const fetchAdminOrders = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.adminOrders,
            })
            if (response.data.success) {
                setOrders(response.data.data)
            }
            // console.log("odr", response.data.data)
        } catch (error) {
            console.error(error)
        }
    }
    const fetchAllUsers = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.allUserDetails
            })
            if (response.data.success) {
                setUsers(response.data.data)
            }
            // console.log(response)
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
        console.log(users)
    }, [])
    useEffect(() => {
        fetchAdminOrders()
    }, [])
    return (
        <div>
            {orders?.slice((page - 1) * itemPerPage, page * itemPerPage).map((item, idx) => {
                const temp = users?.find((u) => u._id === item.userId);
                // console.log(item)
                // console.log(temp)
                // const addr = temp?.address_details?.filter((add) => add == item.delivery_address)
                // const currAddress = address?.filter((a) => a._id === addr);
                const currAddress = address?.find(
                    (a) => a._id === item.delivery_address
                );
                return <div key={item._id + idx}>
                    <p>{temp.name}</p>
                    <p>{item.items.length} Products</p>
                    <p>{formatDate(item.createdAt).split(",")[0]}</p>
                    <p>{currAddress?.address_line}</p>
                    <div>Options</div>
                    <div>
                        <div name="status" id="status"> 
                            <div><button>CONFIRMED</button></div>
                            <div><button>PACKED</button></div>
                            <div><button>OUT FOR DELIVERY</button></div>
                            <div><button>DELIVERED</button></div>
                            <div><button>CANCELLED BY USER</button></div>
                            <div><button>CANCELLED BY ADMIN</button></div>
                            <div><button>CANCELLED OUT OF STOCK</button></div>
                            <div><button>DELIVERY FAILED</button></div>
                            <div><button>RETURN REQUESTED</button></div>
                            <div><button>RETURNED</button></div>
                            <div><button>REFUNDED</button></div>
                        </div>
                    </div>
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
