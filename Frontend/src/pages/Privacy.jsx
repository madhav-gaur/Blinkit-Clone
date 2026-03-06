import React from 'react'
import { FaAngleRight } from 'react-icons/fa'
import { FaRegTrashAlt } from "react-icons/fa";

const Privacy = () => {
  return (
    <div className='privacy-page-wrapper'>
      <h2>Account privacy and policy</h2>
      <p>We i.e. "Blink Commerce Private Limited", are committed to protecting the privacy and security of your personal information. Your privacy is important to us and maintaining your trust is paramount.
        This privacy policy explains how we collect, use, process and disclose information about you. By using our website/ app/ platform and affiliated services, you consent to the terms of our privacy policy (“Privacy Policy”) in addition to our ‘Terms of Use.’ We encourage you to read this privacy policy to understand the collection, use, and disclosure of your information from time to time, to keep yourself updated with the changes and updates that we make to this policy. This privacy policy describes our privacy practices for all websites, products and services that are linked to it. However this policy does not apply to those affiliates and partners that have their own privacy policy. In such situations, we recommend that you read the privacy policy on the applicable site. Should you have any clarifications regarding this privacy policy, please write to us at info@blinkit.com
      </p>
      <div className='delete-account-wrapper'>
        <div>
          <FaRegTrashAlt />
          <span>
            <b>Request to delete Account</b>
            <p>Request to closure of your account</p>
          </span>
        </div>
        <FaAngleRight />
      </div>
    </div>
  )
}

export default Privacy
