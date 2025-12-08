import React, { useState } from 'react'
import { UploadAddressModal } from '../components/UploadAddressModal'
import SummaryApi from '../common/summaryAPI'
import { useEffect } from 'react'
import { MdEdit, MdDelete } from 'react-icons/md';
import Axios from '../utils/axios'
import "../pages/stylesheets/Address.css"
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import "../components/Loading"
import Loading from '../components/Loading';
import ConfirmBox from '../components/ConfirmBox';
const Address = () => {
  const [isUploadAdd, setIsUploadAdd] = useState(false)
  const [isMenu, setIsMenu] = useState("");
  const [address, setAddress] = useState([])
  const [isConfirmBox, setIsConfirmBox] = useState("")
  const fetchAddress = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getAddress
      })
      console.log(response)
      if (response.data.success) {
        setAddress(response.data.data)
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
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log(isConfirmBox)
    fetchAddress()
  }, [])
  return (
    <section className='address-section-wrapper'>
      <div className='address-hero'>
        <div className='address-head category-head'>
          <h2>Address</h2>
          <button onClick={() => setIsUploadAdd(true)}>+ Add Address</button>
        </div>
        <div className='saved-address-wrapper'>
          <div className='saved-address-hero'>
            {!address[0] && <Loading />}
            {
              address.map((item, idx) => {
                return <div key={item._id + idx} className='address-item'>
                  <span>{item.address_line}, {item.city}</span>
                  <br />
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
    </section>
  )
}
export default Address
