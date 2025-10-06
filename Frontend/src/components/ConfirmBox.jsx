import React from 'react'
import { IoClose } from 'react-icons/io5'

const ConfirmBox = ({ close, confirm, cancel }) => {
    return (
        <section className='confirm-box-wrapper'>
            <div className='confirm-box'>
                <div>
                    <p style={{ maxWidth: '25rem' }}>Are you sure you want to permanently delete this item?</p>
                    <span>This action cannot be undone.</span>
                    <button onClick={close}><IoClose /></button>
                </div>
                <div>
                    <button onClick={cancel}>Cancel</button>
                    <button onClick={confirm}>Delete</button>
                </div>
            </div>
        </section>
    )
}

export default ConfirmBox
