import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import Axios from '../utils/axios'
import SummaryApi from '../common/summaryAPI'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

export const UploadAddressModal = ({ close }) => {
    const user = useSelector((state) => state.user);

    const [address, setAddress] = useState({
        address_line: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
        mobile: "",
        userId: user._id
    })
    const [loading, setLoading] = useState("Save Address");
    const handleChange = (e) => {
        const { name, value } = e.target
        setAddress((prev) => {
            return { ...prev, [name]: value }
        })
    }
    const handleSubmit = async (e) => {
        try {
            if (address.address_line == "" || address.city == "" || address.state == "" || address.pincode == "" || !address.country || !address.mobile) return;
            e.preventDefault()
            setLoading("Saving Data...")
            const response = await Axios({
                ...SummaryApi.createAddress,
                data: address
            })
            if (response.data.success) {
                toast.success("Address added sucessfully")
                setLoading("Address Added")
            }
            console.log(response)
        } catch (error) {
            console.error(error)
        } finally {
            setAddress({
                address_line: "",
                city: "",
                state: "",
                pincode: "",
                country: "",
                mobile: "",
            })
            close()
            setLoading("Save Address")
        }
    }
    return (
        <section className='upload-category-modal-wrapper' onClick={close}>
            <div className='upload-category-modal' onClick={(e) => e.stopPropagation()}>
                <div className='category-model-head'>
                    <h1>
                        Add Address
                    </h1>
                    <button onClick={close}>
                        <IoClose />
                    </button>
                </div>
                <div className='catgory-form-wrapper'>
                    <form className='catgory-form' onSubmit={handleSubmit}>
                        <label htmlFor="address_line">
                            Address Line
                            <input
                                type="text"
                                name='address_line'
                                placeholder='Enter Address Line'
                                value={address.address_line}
                                id='address_line'
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="city">
                            City
                            <input
                                type="text"
                                name='city'
                                placeholder='Enter City'
                                value={address.city}
                                id='city'
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="state">
                            State
                            <input
                                type="text"
                                name='state'
                                placeholder='Enter State'
                                value={address.state}
                                id='state'
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="pincode">
                            Pincode
                            <input
                                type="text"
                                name='pincode'
                                placeholder='Enter Pincode'
                                value={address.pincode}
                                id='pincode'
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="country">
                            Country
                            <input
                                type="text"
                                name='country'
                                placeholder='Enter Country'
                                value={address.country}
                                id='country'
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="mobile">
                            Mobile
                            <input
                                type="text"
                                name='mobile'
                                placeholder='Enter Mobile'
                                value={address.mobile}
                                id='mobile'
                                onChange={handleChange}
                            />
                        </label>

                        <button disabled={address.address_line == "" || address.city == "" || address.state == "" || address.pincode == "" || !address.country || !address.mobile ? true : false}>{loading}</button>
                    </form>
                </div>
            </div>
        </section >
    )
}

