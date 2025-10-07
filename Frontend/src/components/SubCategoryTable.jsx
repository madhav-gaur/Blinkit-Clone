import React, { useState } from 'react';
import './stylesheets/SubCategoryTable.css';
import { MdEdit, MdDelete } from 'react-icons/md';
import { ImEnlarge } from "react-icons/im";
import ViewImage from './ViewImage';

export const SubCategoryTable = ({ subCategory, onEdit, onDelete }) => {
    const [viewImageUrl, setViewImageUrl] = useState('');

    return (
        <div className="subcategory-table-wrapper">
            <table className="subcategory-table">
                <thead>
                    <tr>
                        <th>Sr.No</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {subCategory?.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>
                                <img src={item.image} alt={item.name} className="subcategory-img" />
                                <span
                                    onClick={() => setViewImageUrl(item.image)}
                                    className='enlarge-subcat-img'
                                    title="View larger"
                                >
                                    <ImEnlarge />
                                </span>
                            </td>
                            <td>
                                {item.category?.map(cat => cat.name).join(', ')}
                            </td>
                            <td className="action-buttons">
                                <button onClick={() => onEdit(item)} className="edit-btn"><MdEdit /> </button>
                                <button onClick={() => onDelete(item)} className="delete-btn"><MdDelete /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {viewImageUrl && (
                <ViewImage
                    url={viewImageUrl}
                    close={() => setViewImageUrl('')}
                />
            )}
        </div>
    );
};

export default SubCategoryTable;
