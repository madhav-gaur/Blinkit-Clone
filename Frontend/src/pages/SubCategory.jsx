import React, { useState } from 'react'
import Axios from '../utils/axios'

import SummaryApi from '../common/summaryAPI'
import './stylesheets/Category.css'
import ConfirmBox from '../components/ConfirmBox';
import UploadSubCategoryModal from '../components/UploadSubCategoryModal';
import SubCategoryTable from '../components/SubCategoryTable';
import EditSubCategoryModal from '../components/EditSubCategoryModal';
import { toast } from 'react-toastify';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoadedSubCategory } from '../store/productSlice';

const SubCategory = () => {
  
  const subCategory = useSelector(state => state.product.subCategory)
  
  const [openUploadSubCategory, setOpenUploadSubCategory] = useState(false)
  const [openEditSubCategory, setOpenEditSubCategory] = useState(false)
  const [selectedSubCategory, setSelectedSubCategory] = useState(null)
  
  const [confirmBox, setConfirmBox] = useState(false)
  const [selectDrop, setSelectDrop] = useState(false)
  
  const [page, setPage] = useState(1)
  const [itemPerPage, setItemPerPage] = useState(10)
  const totalPage = Math.ceil(subCategory.length / itemPerPage);
  
  const dispatch = useDispatch();
  const handleDelete = async (item) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: {
          _id: item._id
        }
      })
      console.log(response)
      if (response.data.success) {
        toast.success(response.data.message)
        dispatch(setIsLoadedSubCategory(false))
      }
    } catch (err) {
      toast.error(err)
    }
  }

  return (
    <section className='category-wrapper'>
      <div className='category'>
        <div className='category-head'>
          <h2>Sub Category</h2>
          <div style={{ display: "flex", gap: "10px", width: "100%" }}>
            <button onClick={() => setOpenUploadSubCategory(true)}>+ Add Sub Category</button>
            <div className='item-per-page-container'>
              <button className='item-per-page-btn' onClick={() => setSelectDrop(!selectDrop)}>{itemPerPage}<IoMdArrowDropdown /> </button>
              {selectDrop && <div className='item-per-page-menu'>
                <button onClick={() => {
                  setItemPerPage(10)
                  setPage(1)
                  setSelectDrop(false)
                }}>10</button>
                <button onClick={() => {
                  setItemPerPage(20)
                  setPage(1)
                  setSelectDrop(false)
                }}>20</button>
                <button onClick={() => {
                  setItemPerPage(50)
                  setPage(1)
                  setSelectDrop(false)
                }}>50</button>
                <button onClick={() => {
                  setItemPerPage(100)
                  setPage(1)
                  setSelectDrop(false)
                }}>100</button>
              </div>
              }
            </div>
          </div>
        </div>
        <div className='category-item-wrapper'>
          <SubCategoryTable
            page={page}
            setPage={setPage}
            itemPerPage={itemPerPage}
            totalPage={totalPage}
            subCategory={subCategory}
            onEdit={(item) => {
              setSelectedSubCategory(item);
              setOpenEditSubCategory(true);
            }}
            onDelete={(item) => {
              setConfirmBox(true)
              setSelectedSubCategory(item)

            }}
          />


        </div>
      </div>

      {openUploadSubCategory && (
        <UploadSubCategoryModal fetchData={() => dispatch(setIsLoadedSubCategory(false))} close={() => setOpenUploadSubCategory(false)} />
      )}

      {openEditSubCategory && selectedSubCategory && (
        <EditSubCategoryModal
          fetchData={() => dispatch(setIsLoadedSubCategory(false))}
          data={selectedSubCategory}
          close={() => {
            setOpenEditSubCategory(false);
            setSelectedSubCategory(null);
          }}
        />
      )}
      {confirmBox && selectedSubCategory && (
        <ConfirmBox
          close={() => setConfirmBox(false)}
          cancel={() => {
            setConfirmBox(false);
            setSelectedSubCategory(null);
          }}
          confirm={() => {
            setConfirmBox(false);
            setSelectedSubCategory(null);
            handleDelete(selectedSubCategory)
            dispatch(setIsLoadedSubCategory(false))
          }}
        />
      )}

    </section>
  )
}

export default SubCategory
