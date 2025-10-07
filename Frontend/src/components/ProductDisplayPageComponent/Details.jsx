import React, { useEffect, useState } from 'react'

import platformFeatureImg1 from '../../assets/platform-feature-img1.png'
import platformFeatureImg2 from '../../assets/platform-feature-img2.png'
import platformFeatureImg3 from '../../assets/platform-feature-img3.png'
import Axios from '../../utils/axios'
import SummaryApi from '../../common/summaryAPI'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { UpdateCartItemQty } from "../../components/UpdateCartItemQuantity"
const Details = ({ productData }) => {
    const user = useSelector((state) => state.user)
    const data = useSelector((state) => state.cart.cartSliceData)
    // eslint-disable-next-line no-unused-vars
    const [cartData, setCartData] = useState(data)
    useEffect(() => {
        console.log(user)
        console.log(data)
    }, [])
    const currProduct = data.find((item) => item.productId._id === productData._id)
    const getCartItem = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.getCartItem
            })
            setCartData(response.data.data || [])
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getCartItem()
    }, [])
    const addToCart = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.addTocart,
                data: {
                    productId: productData._id,
                    userId: user._id
                }
            })
            // console.log(response)
            if (response.data.success) await getCartItem()
        } catch (error) {
            console.error(error)
            toast.error(error.message || "Something went Wrong !")
        }
    }
    const handleUpdate = (updation, id) => {
        UpdateCartItemQty(updation, id, cartData, getCartItem);
        getCartItem()
    };
    return (
        <div className="main-product-detail">

            <h1 className="product-title">{productData.name}</h1>
            <div className="product-price-stock">

                <p className="stock-info">
                    {productData.stock === 0 ? (
                        <span style={{ color: 'red' }}>Out of Stock</span>
                    ) : productData.stock < 5 ? (
                        <span style={{ color: 'red' }}>Only {productData.stock} items left!!</span>
                    ) : (
                        "In Stock"
                    )}

                </p>
                <p className="unit-info">{productData.unit}</p>
                <div className='price-addToCart'>
                    <div className="price-section">
                        <span className="current-price">₹{Math.round(productData.price * (1 - productData.discount / 100))}</span>
                        {productData.discount > 0 && (
                            <>
                                {productData.discount > 2 && <span className="original-price">₹{productData.price}</span>}
                                {productData.discount > 2 && <span className="discount">{productData.discount}% OFF</span>}
                            </>
                        )}
                    </div>
                    {/* <div style={{ width: "8rem", height: "2.5rem", padding:"1rem 8px", display: "flex", justifyContent: "center", alignItems: "center" }}> */}
                    {!currProduct ? <button className='main-product-add-to-cart' onClick={addToCart}>Add to cart</button> :
                        <div className='quantity-controls'>
                            <div className='qnt-control-hero' style={{ width: "106px", height: "38px", marginLeft: "-2rem", fontSize:"110%",}}>
                                <button onClick={() => handleUpdate("remove", currProduct.productId._id)}>-</button>
                                <span>{currProduct.quantity}</span>
                                <button onClick={() => handleUpdate("add", currProduct.productId._id)} disabled={currProduct.quantity == 9 ? true : false}>+</button>
                            </div>
                        </div>
                    }
                    {/* </div> */}



                </div>

            </div>

            <div className='platform-feature-section'>
                <h2>Why Shop from Blinkit?</h2>
                <div className='platform-feature'>
                    <div className='platform-feature-img'><img src={platformFeatureImg1} alt="" /></div>
                    <div className='platform-feature-details'>
                        <h3>Superfast Delivery</h3>
                        <p>Get your order delivered to your doorstep at the earliest from dark stores near you.</p>
                    </div>
                </div>
                <div className='platform-feature'>
                    <div className='platform-feature-img'><img src={platformFeatureImg2} alt="" /></div>
                    <div className='platform-feature-details'>
                        <h3>Best Prices & Offers</h3>
                        <p>Best price destination with offers directly from the manufacturers.
                        </p>
                    </div>
                </div>
                <div className='platform-feature'>
                    <div className='platform-feature-img'><img src={platformFeatureImg3} alt="" /></div>
                    <div className='platform-feature-details'>
                        <h3>Wide Assortment</h3>
                        <p>Choose from 5000+ products across food, personal care, household & other categories.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details
