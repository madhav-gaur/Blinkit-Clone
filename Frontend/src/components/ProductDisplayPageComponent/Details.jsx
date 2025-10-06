import React from 'react'

import platformFeatureImg1 from '../../assets/platform-feature-img1.png'
import platformFeatureImg2 from '../../assets/platform-feature-img2.png'
import platformFeatureImg3 from '../../assets/platform-feature-img3.png'
const Details = ({productData}) => {
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
                    <button className='main-product-add-to-cart'>Add to cart</button>
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
