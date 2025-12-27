import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import HomeProductCard from '../components/HomeProductCard';
import '../pages/stylesheets/ProductListPage.css'
const ProductListPage = () => {
  const params = useParams();
  console.log(params)
  const { category, subCategory } = useParams();
  const navigate = useNavigate()
  const categoryId = category.split("-").pop();
  const subCategoryList = useSelector(state => state.product.subCategory);
  const [activeSubCategory, setActiveSubcategory] = useState(subCategory || categorySubCategories[0]?._id)
  // console.log(category)
  // console.log(subCategoryList)
  const categorySubCategories = subCategoryList.filter(sc =>
    sc.category?.some(cat => cat._id === categoryId)
  );

  // const activeSubCategoryId =

  const products = useSelector(state => state.product.product);

  const filteredProducts = products.filter(p =>
    p.subCategory?.includes(activeSubCategory)
  );

  console.log(categorySubCategories)
  console.log(filteredProducts)
  return (
    <section className='product-list-wrapper'>
      <div className='product-list-hero'>
        <div className='subcategory-sidebar-wrapper'>
          <div className='subcategory-sidebar'>
            {categorySubCategories.map((item, idx) => {
              return <div
                className={`subcategory-sidebar-item ${activeSubCategory === item._id ? "active-subcategory" : ""}`}
                key={item._id + idx}
                onClick={() => {
                  setActiveSubcategory(item._id)
                  navigate(`/${category}/${item._id}`)
                }}>
                <img src={item.image} alt="" />
                <p>{item.name}</p>
              </div>
            })}
          </div>
        </div>
        <div className='product-list-container'>
          <div className='product-list-container-2'>
            {filteredProducts.map((item) => {
              return <HomeProductCard data={item} />
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductListPage
