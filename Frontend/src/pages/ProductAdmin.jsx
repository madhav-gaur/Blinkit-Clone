import React, { useEffect, useState } from 'react'
import SummaryApi from '../common/summaryAPI'
import Axios from '../utils/axios'
import Loading from '../components/Loading'
import { GrPrevious } from "react-icons/gr";
import ProductCardAdmin from '../components/ProductCardAdmin'
import './stylesheets/ProductAdmin.css'
import { GoSearch } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { IoMdArrowDropdown } from 'react-icons/io';
import { smartSearch } from '../utils/Search/smartSearch';
import ButtonLoading from '../components/ButtonLoading';
const ProductAdmin = () => {
  // const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  const [itemPerPage, setItemPerPage] = useState(10)
  const [search, setSearch] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  const [openMenuId, setOpenMenuId] = useState(null)
  const [selectDrop, setSelectDrop] = useState(false)
  const products = useSelector(state => state.product.product);
  const allCategory = useSelector(state => state.product.allCategory);
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const totalPage = Math.ceil(results.length / itemPerPage);

  useEffect(() => {
    if (products?.length) {
      const reversed = [...products].reverse()
      setResults(reversed)
    }
  }, [products])
  useEffect(() => {
    if (!search.trim() || search.length < 2) {
      setResults(products);
      return;
    }

    setIsSearching(true);

    const timer = setTimeout(() => {
      const res = smartSearch(search, products, allCategory);
      setResults(res);
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, products, allCategory])
  const handlePage = (type) => {
    if (type == "back" && page != 1)
      setPage(page - 1)
    if (type == "next" && page != totalPage) setPage(page + 1)
  }
  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <section className='upload-product-wrapper'>
      <div className='product-admin-head'>
        <h2>Products</h2>
        <div className='product-admin-head-left'>
          {isSearch && (
            <div className={`product-admin-search show`}>
              <span>
                <GoSearch />
              </span>
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
              <span>
                <IoClose
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setSearch('')
                    setPage(1)
                    setIsSearch(false)
                  }}
                />
              </span>
            </div>
          )}
          <div
            className='product-admin-search-btn'
            style={{ cursor: 'pointer' }}
            onClick={() => setIsSearch(true)}
          >
            <GoSearch size={20} />
          </div>


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

      {isSearch && (
        <div className={`product-admin-search product-admin-search-sc show`}>
          <div>
            <span>
              <GoSearch />
            </span>
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
          </div>
          <span>
            <IoClose
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setSearch('')
                setPage(1)
                setIsSearch(false)
              }}
            />
          </span>
        </div>
      )}
      <div className='admin-product-wrapper'>
        <div className='admin-product'>
          {
            results?.slice((page - 1) * itemPerPage, page * itemPerPage).map((p, index) => {
              return <ProductCardAdmin key={p._id + index} data={p} openMenuId={openMenuId} setOpenMenuId={setOpenMenuId} />
            })
          }
          {
            isSearching && <Loading />
          }
          {
            search && !isSearching && !results[0] && < p>No Matching Products Found...</p>
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
      </div>
    </section>
  )
}

export default ProductAdmin
