import React, { useEffect } from 'react'
import Axios from '../utils/axios'
import SummaryApi from '../common/summaryAPI'
import "../components/stylesheets/Cart.css"
import { IoClose } from 'react-icons/io5'
import { RiFileList2Fill } from "react-icons/ri";
import { RiEBike2Fill } from "react-icons/ri";
import { GiShoppingBag } from "react-icons/gi";
import { MdOutlineChevronRight } from "react-icons/md";
import { useSelector } from 'react-redux'
import { UpdateCartItemQty } from './UpdateCartItemQuantity'
import emptyCart from "../assets/emptyCart.png"
import { useNavigate } from 'react-router-dom'
import { CartItem } from './CartItem'
export const Cart = ({ isCart, setIsCart, cartData, totalSaving, handlingCharge, productTotal, setCartData }) => {

    const navigate = useNavigate()
    // const [localQty, setLocalQty] = useState(cartItem.quantity)

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                setIsCart(false);
            }
        };

        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [setIsCart]);


    const totalPayblePrice = useSelector((state) => state.cart.cartPaybleAmount)
    return (
        <section className="cart-wrapper" onClick={() => setIsCart(false)}>
            <div onClick={(e) => {
                e.stopPropagation()
            }}
                className={`cart-hero ${isCart ? "cart-animation" : ""}`}>
                <div className='cart-head'>
                    <h2>My Cart</h2>
                    <button onClick={() => setIsCart(false)}><IoClose /></button>
                </div>
                {cartData[0] && <>
                    <div className='cart-savings'>
                        <p>Your Total Savings</p>
                        <p>₹{totalSaving}</p>
                    </div>
                    <div className='cart-product-wrapper'>
                        {
                            cartData.map((item, index) => {
                                let product = item.productId
                                return <CartItem
                                    key={item._id + index}
                                    item={item}
                                    product={product}
                                    cartData={cartData}
                                    setIsCart={setIsCart}
                                    setCartData={setCartData}
                                />
                            })
                        }
                    </div>
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
                                        <s>{cartData[0] ? (<>₹{totalSaving + productTotal}</>) : " "}</s>
                                        <span>₹{productTotal}</span>
                                    </b>
                                </div>
                                <div className='bill-detail-item'>
                                    <p>
                                        <RiEBike2Fill />
                                        <span>Delivery Charge</span>
                                    </p>
                                    <b>
                                        <span>{cartData[0] ? (productTotal > 99 ? <p style={{ color: "#256fef" }}><s>₹25</s> FREE</p> : "₹25") : "---"}</span>
                                    </b>
                                </div>
                                <div className='bill-detail-item'>
                                    <p>
                                        <GiShoppingBag />
                                        <span>Handling Charge</span>
                                    </p>
                                    <b>
                                        <span>{cartData[0] ? <>₹ {handlingCharge}</> : "---"}</span>
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
                    <div className='cart-cancellation-policy'>
                        <h2>Cancelletion Policy</h2>
                        <p>
                            Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable.
                        </p>
                    </div>
                    <div className='checkout-notch'>
                        <div className='checkout-strip' onClick={() => {
                            navigate("/checkout")
                            setIsCart(false)
                        }}>
                            <div>
                                <span>₹{totalPayblePrice}</span>
                                <p>TOTAL</p>
                            </div>
                            <button>
                                Proceed <MdOutlineChevronRight />
                            </button>
                        </div>
                    </div>
                </>}

                {!cartData[0] && <div className='empty-cart-wrapper'>
                    <div className='empty-cart-hero'>
                        <img src={emptyCart} alt="" />
                        <h2>You don't have any items in your cart</h2>
                        <p>Your favourite items are just a click away</p>
                        <button onClick={() => {
                            navigate("/")
                            setIsCart(false)
                        }}>Start Shopping</button>
                    </div>
                </div>}
            </div>
        </section >
    )
}

