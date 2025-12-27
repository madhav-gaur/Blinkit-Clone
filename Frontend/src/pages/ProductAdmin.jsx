/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import SummaryApi from '../common/summaryAPI'
import Axios from '../utils/axios'
import Loading from '../components/Loading'
import { GrPrevious } from "react-icons/gr";
import ProductCardAdmin from '../components/ProductCardAdmin'
import './stylesheets/ProductAdmin.css'
import { GoSearch } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import AdminProductLoading from '../components/AdminProductLoading';
import { useSelector } from 'react-redux';
import { IoMdArrowDropdown } from 'react-icons/io';
const ProductAdmin = () => {
  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  const [itemPerPage, setItemPerPage] = useState(10)
  const totalPage = Math.ceil(productData.length / itemPerPage);
  const [search, setSearch] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  const [openMenuId, setOpenMenuId] = useState(null)
  const [selectDrop, setSelectDrop] = useState(false)
  const prod = useSelector(state => state.product.product)
  let temp = prod
  useEffect(() => {
    if (prod?.length) {
      const reversed = [...prod].reverse()
      setProductData(reversed)
    }
  }, [prod])
  // const fetchProductData = async () => {
  //   try {
  //     setLoading(true)
  //     const response = await Axios({
  //       ...SummaryApi.getProduct,
  //       data: {
  //         page: page,
  //         limit: 10,
  //         search: search
  //       }
  //     })
  //     if (response.data.success) {
  //       setTotalPageCount(response.data.totalNoPage)
  //       setProductData(response.data.data)
  //       setIsLoaded(true)
  //     }

  //   } catch (error) {
  //     console.log(error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  const handlePage = (type) => {
    if (type == "back" && page != 1)
      setPage(page - 1)
    if (type == "next" && page != totalPage) setPage(page + 1)
  }
  const handleSearch = (e) => {
    const { value } = e.target
    setSearch(value)
    setPage(1)
  }
  return (
    <section className='upload-product-wrapper'>
      <div className='product-admin-head'>
        <h2>Products</h2>
        <div className='product-admin-head-left'>

          {!isSearch && (
            <div
              className='product-admin-search-btn'
              style={{ cursor: 'pointer' }}
              onClick={() => setIsSearch(true)}
            >
              <GoSearch size={20} />
            </div>
          )}
          {isSearch && (
            <div className={`product-admin-search show`}>
              <GoSearch size={20} />
              <input
                type="text"
                value={search}
                autoFocus
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(1)
                }}
                placeholder='Search Products here...'
              />
              <IoClose
                size={20}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setSearch('')
                  setPage(1)
                  setIsSearch(false)
                }}
              />
            </div>
          )}

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


      <div className='admin-product-wrapper'>
        <div className='admin-product'>
          {
            productData?.slice((page - 1) * itemPerPage, page * itemPerPage).map((p, index) => {
              return <ProductCardAdmin key={p._id + index} data={p} openMenuId={openMenuId} setOpenMenuId={setOpenMenuId} />
            })
          }
        </div>
        <div className='admin-product-pagination'>
          <button
            className='admin-pagination-btn'
            disabled={page == 1}
            onClick={() => handlePage("back")}>
            <GrPrevious />
            <p>Previous</p>
          </button>
          {!search.length > 0 && totalPage <= 5 && totalPage != 1 && (
            <div className='admin-product-page-no'>
              {
                [...Array(totalPage)].map((_, i) => {
                  const pageNumber = i + 1
                  return (
                    <button
                      key={pageNumber}
                      className={`${page === pageNumber ? 'active-page' : ''}`}
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  )
                })
              }
            </div>
          )}
          <span className='pagination-type2' style={{ display: totalPage > 5 || totalPage == 1 ? 'flex' : 'none' }}>{`Page ${page}  of  ${totalPage}`}</span>
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
        {/* {
          loading && <AdminProductLoading />
        } */}
      </div>
    </section>
  )
}

export default ProductAdmin
