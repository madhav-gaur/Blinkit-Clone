import React from 'react'
import { IoClose } from 'react-icons/io5'

const AddFieldComponent = ({ close, value, onChange, submit }) => {
    return (
        <section className='add-field-wrapper'>
            <div className='add-field'>
                <div className='add-field-head'>
                    <h1>Add Field</h1>
                    <button onClick={close}><IoClose /></button>
                </div>
                <form className='add-field-area'>
                    <input
                        autoFocus
                        value={value}
                        type="text"
                        onChange={onChange}
                        placeholder='Enter field name'
                    />
                    <button onClick={(e) => {
                        e.preventDefault()
                        submit()

                    }} disabled={!value} className='add-field-btn'>
                        + Add Field
                    </button>
                </form>
            </div>
        </section>
    )
}

export default AddFieldComponent
