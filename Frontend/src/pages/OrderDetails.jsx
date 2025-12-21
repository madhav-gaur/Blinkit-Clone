import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { calcBill } from '../components/calcBill'
import { RiEBike2Fill, RiFileList2Fill } from 'react-icons/ri'
import { GiShoppingBag } from 'react-icons/gi'
const OrderDetails = () => {

    const param = useParams()

    const tempOrders = useSelector((state) => state.orders.orderSliceData)
    const temp = tempOrders.filter((item) => item.orderId == param.orderId)
    const order = temp[0]

    const { totalSaving, totalPayblePrice, productTotal, handlingCharge } = calcBill(order?.items)

    const tempAddrress = useSelector((state) => state.address.address)
    const temp2 = tempAddrress.filter((item) => item._id == order?.delivery_address)
    const address = temp2[0]
    // const st = order.order_status;
    const statusFinder = (status) => {
        switch (status) {
            case "CONFIRMED":
                return "Order confirmed";
            case "PACKED":
                return "Order Packed";
            case "OUT_FOR_DELIVERY":
                return "Order Out of Delivery";
            case "DELIVERED":
                return "Order Successfully Delivered";
            case "CANCELLED_BY_USER":
                return "Order Cancelled By You";
            case "CANCELLED_BY_ADMIN":
                return "Order Cancelled due to technical issues";
            case "CANCELLED_OUT_OF_STOCK":
                return "Items Out of Stock, Order Cancelled"

            case "DELIVERY_FAILED":
                return "Delvery Failed Will attempt ASAP";
            case "RETURN_REQUESTED":
                return "You Requested To return items";
            case "RETURNED":
                return "Ordered Returned";
            case "REFUNDED":
                return "Refund Completed"
            default:
                return "Unknown Status";
        }

    }

    // console.log(address)
    console.log(order)
    return (
        <div className='order-detail-wrapper'>
            <div className='order-detail-hero'>
                <h2 className='order-head'>Order Summary</h2>
                <div className='order-summary-container'>
                    <div>
                        Status: {statusFinder(order?.order_status)}
                    </div>
                    <div className='order-item-bill'>
                        <div className='bill-wrapper'>
                            <div className='bill-hero'>
                                <h2>Bill Details</h2>
                                <div className='bill-details'>
                                    <div className='bill-detail-item'>
                                        <p>
                                            <RiFileList2Fill />
                                            <span>Items Total</span>
                                        </p>
                                        <b>
                                            <s>₹{totalSaving + productTotal}</s>
                                            <span>₹{productTotal}</span>
                                        </b>
                                    </div>
                                    <div className='bill-detail-item'>
                                        <p>
                                            <RiEBike2Fill />
                                            <span>Delivery Charge</span>
                                        </p>
                                        <b>
                                            <span>{productTotal > 99 ? <p style={{ color: "#256fef" }}><s>₹25</s> FREE</p> : "₹25"}</span>
                                        </b>
                                    </div>
                                    <div className='bill-detail-item'>
                                        <p>
                                            <GiShoppingBag />
                                            <span>Handling Charge</span>
                                        </p>
                                        <b>
                                            <span>₹ {handlingCharge}</span>
                                        </b>
                                    </div>
                                    <div className='bill-detail-item grand-total'>
                                        <p>
                                            <span>Grand Total</span>
                                        </p>
                                        <b>
                                            <span>₹{totalPayblePrice}</span>
                                        </b>
                                    </div>
                                </div>
                            </div>
                            <div className='cart-savings saving-curve-box'>
                                <p>Your Total Savings</p>
                                <p>₹{totalSaving}</p>
                            </div>
                        </div>
                    </div>
                    <div className='order-details-imp'>
                        <h2 className=''>Order Details</h2>
                        <div className='order-details-sub'>
                            <div>
                                <p>Order Id</p>
                                <span>{order?.orderId}</span>
                            </div>
                            <div>
                                <p>Mode Of Payment</p>
                                <span>{order?.payment_status == "COD_PENDING" ? "Pending Cash On Delivery" : "Paid Online"}</span>
                            </div>
                            <div>
                                <p>Deliver To</p>
                                <span className='addres-item'>
                                    <p>{address?.address_line}, {address?.city} </p>
                                    <p>{address?.state} {address?.pincode} </p>
                                    <span>{address?.country}, </span>
                                    <span>Mobile: {address?.mobile}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='items-ordered-wrapper'>
                        <h3>{order?.items.length} items in this Order</h3>
                        <div className='items-ordered-container'>
                            {order?.items.map((item, idx) => {
                                const product = item.product_details
                                return <div key={item._id + idx} className='ordered-item'>
                                    <img src={product?.image[0]} alt="" width={100} />
                                    <div className='ordered-item-details'>
                                        <div>
                                            <p>{product?.name}</p>
                                            <span>Quantity: {item.quantity}</span>
                                        </div>
                                        <p>Price: ₹{Math.round(product?.price * (1 - product?.discount / 100))} Per Unit</p>

                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                    <div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default OrderDetails
