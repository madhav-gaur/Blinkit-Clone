import React, { useState } from 'react'
import { UploadAddressModal } from '../components/UploadAddressModal'

const Address = () => {
  const [isUploadAdd, setIsUploadAdd] = useState(false)
  return (
    <section className='address-section-wrapper'>
      <div className='address-hero'>
        <div className='address-head'>
          <h2>Address</h2>
          <button onClick={()=>setIsUploadAdd(true)}>Add Address</button>
        </div>
        <div className='add-address-label'>
          <div>
            <p>Add Address</p>
          </div>
        </div>
        {isUploadAdd && <UploadAddressModal setIsUploadAdd={setIsUploadAdd} close={() => setIsUploadAdd(false)} />}
      </div>
    </section>
  )
}
export default Address
