import React from 'react'
import { IoClose } from 'react-icons/io5'

const ConfirmBox = ({ close, confirm, cancel }) => {
    return (
        <section className='confirm-box-wrapper'>
            <div className='confirm-box'>
                <div>
                    <p style={{ maxWidth: '25rem' }}>Are you sure you want to permanently delete this item?</p>
                    <span>This action cannot be undone.</span>
                    <button onClick={(e) => {
                        close()
                        e.stopPropagation()
                    }}><IoClose /></button>
                </div>
                <div>
                    <button onClick={(e) => {
                        cancel()
                        e.stopPropagation()
                    }}>Cancel</button>
                    <button onClick={(e) => {
                        confirm()
                        e.stopPropagation()
                    }}>Delete</button>
                </div>
            </div>
        </section>
    )
}

export default ConfirmBox
