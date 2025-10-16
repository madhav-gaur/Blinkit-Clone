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
const ProductAdmin = () => {
  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  const [totalPageCount, setTotalPageCount] = useState(1)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  const [openMenuId, setOpenMenuId] = useState(null)
  // const 
  const fetchProductData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 10,
          search: search
        }
      })
      if (response.data.success) {
        setTotalPageCount(response.data.totalNoPage)
        setProductData(response.data.data)
      }

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    let flag = true
    const interval = setTimeout(() => {
      if (flag) {
        fetchProductData()
        flag = false
      }
    }, 300)
    return () => {
      clearTimeout(interval)
    }
  }, [search])

  const handleNext = () => {
    if (page != totalPageCount) {
      setPage(prev => prev + 1)

    }
  }
  const handlePrevious = () => {
    if (page > 1) {
      setPage(prev => prev - 1)
    }
  }
  const handleSearch = (e) => {
    const { value } = e.target
    setSearch(value)
    setPage(1)
  }
  useEffect(() => {
    fetchProductData()
  }, [page, search])

  return (
    <section className='upload-product-wrapper'>
      <div className='product-admin-head'>
        <h2>Products</h2>
        {
          !isSearch && <div className='product-admin-search-btn' style={{ cursor: 'pointer' }} onClick={() => setIsSearch(true)}><GoSearch size={20} /></div>
        }
        {
          isSearch && (
            <div className={`product-admin-search ${isSearch ? 'show' : ''}`}>
              <GoSearch size={20} />
              <input
                type="text"
                value={search}
                autoFocus
                onChange={handleSearch}
                placeholder='Search Products here...'
              />
              <IoClose size={20} style={{ cursor: 'pointer' }} onClick={() => {
                setSearch('')
                setIsSearch(false)
              }}
              />
            </div>
          )
        }

      </div>

      <div className='admin-product-wrapper'>
        <div className='admin-product'>
          {
            productData.map((p, index) => {
              return <ProductCardAdmin key={p._id + index} data={p} openMenuId={openMenuId} setOpenMenuId={setOpenMenuId} fetchProductData={fetchProductData} />
            })
          }
        </div>
        <div className='admin-product-pagination'>
          <button
            className='admin-pagination-btn'
            disabled={page == 1}
            onClick={handlePrevious}>
            <GrPrevious />
            <p>Previous</p>
          </button>
          {!search.length > 0 && totalPageCount < 5 && (
            <div className='admin-product-page-no'>
              {
                [...Array(totalPageCount)].map((_, i) => {
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
          <span className='pagination-type2' style={{ display: totalPageCount > 5 ? 'flex' : 'none' }}>{`Page ${page}  of  ${totalPageCount}`}</span>
          <button
            className='admin-pagination-btn'
            disabled={page == totalPageCount}
            onClick={handleNext}>
            <p>Next</p>
            <GrPrevious
              style={{ transform: 'rotate(180deg)' }}
            />
          </button>

        </div>
        {
          loading && <AdminProductLoading />
        }
      </div>
    </section>
  )
}

export default ProductAdmin
