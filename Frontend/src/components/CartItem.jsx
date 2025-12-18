import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validUrlConvert } from '../utils/ValidUrlConvert'
import { UpdateCartItemQty } from './UpdateCartItemQuantity'
import { HandleQntUpdate } from './handleQntUpdate'

export const CartItem = ({ item, cartData, product, setIsCart }) => {
    const navigate = useNavigate()

    const url = (name, id) => `/product/${validUrlConvert(name)}-${id}`

    const [localQty, setLocalQty] = useState(item?.quantity || 0)
    useEffect(() => {
        if (item?.quantity != null) {
            setLocalQty(item.quantity)
        }
    }, [item?.quantity])


    // const handleQntUpdate = async (type) => {
    //     let newQty = type === "add" ? localQty + 1 : localQty - 1
    //     setLocalQty(newQty)
    //     if (type == "remove" && localQty === 1) {
    //         setLocalQty(0)
    //         try {
    //             await UpdateCartItemQty("remove", item.productId._id, cartData)
    //         } catch (err) {
    //             console.error(err)
    //             setLocalQty(localQty)
    //         }

    //         return
    //     }
    //     if (newQty < 1 || newQty > 9) return

    //     try {
    //         await UpdateCartItemQty(type, item.productId._id, cartData)
    //     } catch (err) {
    //         console.error(err)
    //         setLocalQty(item.quantity)
    //     }
    // }

    return (
        <div className='cart-product'>
            <div
                className='cart-product-hero'
                onClick={() => {
                    navigate(url(product._name, product._id))
                    setIsCart(false)
                }}
            >
                <div className='cart-product-img'>
                    <img src={product?.image[0]} alt={product?.name} />
                </div>

                <div className='cart-product-details'>
                    <p>{product?.name}</p>
                    <span>{product?.unit}</span>
                    <legend>
                        <strong>
                            ₹{Math.floor(product?.price - product?.price * product?.discount / 100)}
                        </strong>
                        <strike>₹{product?.price}</strike>
                    </legend>
                </div>
            </div>

            <div className='quantity-controls'>
                <div className='qnt-control-hero'>
                    <button
                        onClick={() =>
                            HandleQntUpdate({
                                updationType: "remove",
                                localQty,
                                cartData,
                                setLocalQty,
                                setLoading: "",
                                id: item?.productId._id
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
        </div>
    )
}
