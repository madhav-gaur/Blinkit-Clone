import React from 'react'
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const MoreDetails = ({productData, isMoreDetail, setIsMoreDetail}) => {
    return (
        <div className='main-product-more-details-wrapper'>
            <div className='main-product-more-details'>
                <h2>Product Details</h2>
                <div className='main-product-more-detail-item'>
                    <span>Description</span>
                    <p>{productData.description}</p>
                </div>
                {isMoreDetail &&
                    <>
                        {Object.entries(productData.more_details).map(([key, value], index) => {
                            if (!value?.trim()) return null;
                            return (
                                <div className='main-product-more-detail-item' key={index}>
                                    <span>{key}</span>
                                    <p>{value}</p>
                                </div>
                            );
                        })}
                    </>
                }

            </div>
            {Object.keys(productData.more_details)[0] && <button onClick={() => setIsMoreDetail(!isMoreDetail)}> {isMoreDetail ? <p>View less Details <FaCaretUp /></p> : <p>View more Details <FaCaretDown /></p>} </button>}
        </div>
    )
}

export default MoreDetails
