/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './stylesheets/SubCategoryTable.css';
import { MdEdit, MdDelete } from 'react-icons/md';
import { ImEnlarge } from "react-icons/im";
import ViewImage from './ViewImage';
import { GrPrevious } from 'react-icons/gr';

export const SubCategoryTable = ({ subCategory, onEdit, onDelete, page, totalPage, setPage, itemPerPage}) => {
    const [viewImageUrl, setViewImageUrl] = useState('');

    const handlePage = (type) => {
        if (type == "back" && page != 1)
            setPage(page - 1)
        if (type == "next" && page != totalPage) setPage(page + 1)
    }
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
                    {subCategory?.slice((page - 1) * itemPerPage, page * itemPerPage).map((item, index) => (
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
            <div className='admin-product-pagination'>
                <button
                    className='admin-pagination-btn'
                    disabled={page == 1}
                    onClick={() => handlePage("back")}>
                    <GrPrevious />
                    <p>Previous</p>
                </button>
                <span className='pagination-type2' style={{ display:'flex' }}>{`Page ${page}  of  ${totalPage}`}</span>
                <button
                    className='admin-pagination-btn'
                    disabled={page == totalPage}
                    onClick={() => handlePage("next")}>
                    <p>Next</p>
                    <GrPrevious
                        style={{ transform: 'rotate(180deg)' }}
                    />
                </button>

            </div>

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
