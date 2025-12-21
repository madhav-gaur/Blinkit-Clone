import React, { useState } from 'react'
import { UploadAddressModal } from '../components/UploadAddressModal'
import SummaryApi from '../common/summaryAPI'
import { useEffect } from 'react'
import { MdEdit, MdDelete, MdHeight } from 'react-icons/md';
import Axios from '../utils/axios'
import "../pages/stylesheets/Address.css"
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import Loading from '../components/Loading';
import ConfirmBox from '../components/ConfirmBox';
import { useDispatch, useSelector } from 'react-redux';
import { setAddressSlice } from '../store/addressSlice';
import isAdmin from '../utils/isAdmin';
const Address = () => {
  const [isUploadAdd, setIsUploadAdd] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isMenu, setIsMenu] = useState("");
  const [address, setAddress] = useState([])
  const [isConfirmBox, setIsConfirmBox] = useState("")
  const dispatch = useDispatch();

  const user = useSelector(state => state.user)

  const fetchAddress = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getAddress
      })
      setIsLoading(true)
      if (response.data.success) {
        let add = (response.data.data).filter(item => item.status)
        dispatch(setAddressSlice(add))
        setAddress(add)
        setIsLoading(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const deleteAddress = async (id) => {
    try {
      const response = await Axios({
        ...SummaryApi.disableAddress,
        data: { _id: id }
      })
      console.log(response)
      if (response.data.success) {
        setIsConfirmBox("")
        setIsMenu("")
        fetchAddress()
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true)
    }, 300);
    fetchAddress()
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <section className='address-section-wrapper'>
      <div className='address-hero'>
        <div className='address-head category-head'>
          <h2>Address</h2>
          <button onClick={() => setIsUploadAdd(true)}>+ Add Address</button>
        </div>
        <div className='saved-address-wrapper'>
          <div className='saved-address-hero' style={{maxHeight: isAdmin(user.role)?"610px": "480px"}}>
            {isLoading && <Loading />}
            {!address[0] && !isLoading && <div className='no-address-msg'>
              <p>No Saved Address</p>
              <button onClick={() => setIsUploadAdd(true)}>+ Add Address</button>
            </div>}
            {
              address.map((item, idx) => {
                return <div key={item._id + idx} className='address-item'>
                  <span>{item.address_line}, {item.city}</span>
                  <span>{item.state}, {item.pincode}</span>
                  <p>{item.country}</p>
                  <p>{item.mobile}</p>
                  <div className='address-controls'>
                    <button className='three-dot-address-control' onClick={() => isMenu == item._id ? setIsMenu("") : setIsMenu(item._id)}>
                      {isMenu == item._id ? <IoClose /> : <BsThreeDotsVertical />}
                    </button>
                    {isMenu == item._id &&
                      <div className='address-control-menu'>
                        <button><MdEdit /> Edit</button>
                        <button onClick={() => setIsConfirmBox(item._id)}><MdDelete /> Delete</button>
                      </div>}
                  </div>
                </div>
              })
            }
          </div>
        </div>
        {/* <div className='add-address-label'>
          <div>
            <p>Add Address</p>
          </div>
        </div> */}
        {isUploadAdd && <UploadAddressModal setIsUploadAdd={setIsUploadAdd} close={() => setIsUploadAdd(false)} fetchAddress={() => fetchAddress()} />}
        {isConfirmBox && <ConfirmBox close={() => setIsConfirmBox("")} cancel={() => setIsConfirmBox("")} confirm={() => deleteAddress(isConfirmBox)} />}
      </div>
    </section >
  )
}
export default Address
