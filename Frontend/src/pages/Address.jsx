import React, { useState } from 'react'
import { UploadAddressModal } from '../components/UploadAddressModal'
import SummaryApi from '../common/summaryAPI'
import { useEffect } from 'react'
import Axios from '../utils/axios'

const Address = () => {
  const [isUploadAdd, setIsUploadAdd] = useState(false)
  // const [address, setAddress] = useState([])
  const fetchAddress = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getAddress
      })
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchAddress()
  }, [])
  return (
    <section className='address-section-wrapper'>
      <div className='address-hero'>
        <div className='address-head'>
          <h2>Address</h2>
          <button onClick={() => setIsUploadAdd(true)}>Add Address</button>
        </div>
        <div className='saved-address-wrapper'>
          <div className='saved-address'>

          </div>
        </div>
        {/* <div className='add-address-label'>
          <div>
            <p>Add Address</p>
          </div>
        </div> */}
        {isUploadAdd && <UploadAddressModal setIsUploadAdd={setIsUploadAdd} close={() => setIsUploadAdd(false)} />}
      </div>
    </section>
  )
}
export default Address
