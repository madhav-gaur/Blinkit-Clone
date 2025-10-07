import React, { useEffect, useState } from 'react'
import Axios from '../utils/axios'

import SummaryApi from '../common/summaryAPI'
import './stylesheets/Category.css'
import ConfirmBox from '../components/ConfirmBox';
import UploadSubCategoryModal from '../components/UploadSubCategoryModal';
import SubCategoryTable from '../components/SubCategoryTable';
import EditSubCategoryModal from '../components/EditSubCategoryModal';
import { toast } from 'react-toastify';

const SubCategory = () => {

  const [openUploadSubCategory, setOpenUploadSubCategory] = useState(false)
  const [openEditSubCategory, setOpenEditSubCategory] = useState(false)
  const [subCategory, setSubCategory] = useState([])
  const [selectedSubCategory, setSelectedSubCategory] = useState(null)
  const [confirmBox, setConfirmBox] = useState(false)

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory
      })
      console.log(response)
      if (response.data.success) {
        setSubCategory(response.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchSubCategory()
  }, [])
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
        fetchSubCategory()
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
          <button onClick={() => setOpenUploadSubCategory(true)}>+ Add Sub Category</button>
        </div>
        <div className='category-item-wrapper'>
          <SubCategoryTable
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
        <UploadSubCategoryModal fetchData={() => fetchSubCategory()} close={() => setOpenUploadSubCategory(false)} />
      )}

      {openEditSubCategory && selectedSubCategory && (
        <EditSubCategoryModal
          fetchData={fetchSubCategory}
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
            fetchSubCategory()
          }}
        />
      )}

    </section>
  )
}

export default SubCategory
