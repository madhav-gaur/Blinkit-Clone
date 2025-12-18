import React from 'react'
import { HandleQntUpdate } from './handleQntUpdate'

export const QntControls = ({ localQty, cartData, setLocalQty, item }) => {
    // console.log(localQty, cartData, item)
    return (
        <div className='quantity-controls'>
            <div className='qnt-control-hero'>
                <button
                    onClick={() =>
                        HandleQntUpdate({
                            updationType: "remove",
                            localQty,
                            cartData,
                            setLocalQty,
                            setLoading: null,
                            id: item.productId._id
                        })}>-</button>

                <span>{localQty}</span>

                <button
                    onClick={() => HandleQntUpdate({
                        updationType: "add",
                        localQty,
                        cartData,
                        setLocalQty,
                        setLoading: "",
                        id: item?.productId._id
                    })}
                    disabled={localQty >= 9}
                >
                    +
                </button>
            </div>
        </div>
    )
}

