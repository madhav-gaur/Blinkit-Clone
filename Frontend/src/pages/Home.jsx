import banner from '../assets/banner.jpg'
import bannerMobile from '../assets/banner-mobile.jpg'
import './stylesheets/Home.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CategoryWiseProduct from '../components/CategoryWiseProduct'
import { validUrlConvert } from '../utils/ValidUrlConvert'

const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory)
  const categoryData = useSelector((state) => state.product.allCategory)
  const subCategoryData = useSelector((state) => state.product.subCategory)
  const navigate = useNavigate()
  const handleRedirect = (id, cat) => {
    const subCategory = subCategoryData?.find(sub => {
      const filterData = sub?.category?.some(c => {
        return c?._id == id
      })
      return filterData ? true : null
    })
    const url = `/${validUrlConvert(cat)}-${id}/${subCategory?._id}`
    navigate(url)
  }

  return (
    <section className='home-wrapper'>
      <div className='home-container'>
        <div className='home-banner'>
          <Link to='/'><img src={banner} alt="" /></Link>
          <Link to='/'><img src={bannerMobile} alt="" /></Link>
        </div>
        <div className='home-category-wrapper'>
          {
            loadingCategory ? (
              <div className='home-category-skeleton'>
                {Array.from({ length: 18 }).map((_, index) => (
                  <div key={index} className='home-category-skeleton-card'></div>
                ))}
              </div>
            ) : (
              <div className='home-category-container'>
                {categoryData.map((cat, index) => (
                  <div key={cat._id + index} onClick={() => handleRedirect(cat._id, cat.name)} className='home-category-card'>
                    <img src={cat.image} alt="" />
                  </div>
                ))}
              </div>
            )
          }
        </div>
        <div className="category-wise-wrapper">

          {
            categoryData.map((c, index) => {
              return <CategoryWiseProduct key={c._id + index + 'categoryWiseProduct'} id={c._id} name={c.name} />
            })
          }
        </div>
      </div>
    </section>
  )
}

export default Home
