import React from 'react';
import { IoClose } from 'react-icons/io5';

const ViewImage = ({ url, close }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 120,
        }}>
            <div style={{
                position: 'relative',
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '10px',
                boxShadow: '0 0 15px rgba(0,0,0,0.5)',
                maxWidth: '30rem',
                width: '100%'

            }}>
                <IoClose
                    onClick={close}
                    style={{
                        position: 'absolute',
                        right: '1rem',
                        fontSize: '2rem',
                        zIndex: 120,
                        cursor: 'pointer',
                    }}
                />
                <img
                    src={url}
                    alt="subcategory"
                    style={{
                        objectFit: 'contain',
                        width: '100%',
                        borderRadius: '8px',
                    }}
                />
            </div>
        </div>
    );
};

export default ViewImage;
