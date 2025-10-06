import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../pages/stylesheets/ProductDisplayPage.css'
import ImageWrapper from '../components/ProductDisplayPageComponent/ImageWrapper';
import MoreDetails from '../components/ProductDisplayPageComponent/MoreDetails';
import Details from '../components/ProductDisplayPageComponent/Details';
import LargeViewImage from '../components/ProductDisplayPageComponent/LargeViewImage';
import isAdmin from '../utils/isAdmin';
import { MdEdit } from 'react-icons/md';
import EditProductAdminModel from '../components/EditProductAdminModel';
const ProductDisplayPage = () => {
  const params = useParams();
  const productId = params.product?.split('-')[1];
  const [editProductAdminModel, setEditProductAdminModel] = useState(null)
  const allProducts = useSelector(state => state.product.product);
  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [isMoreDetail, setIsMoreDetail] = useState(false)
  const [isLargeView, setIsLargeView] = useState(false)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (allProducts && allProducts.length && productId) {
      const found = allProducts.find(p => p._id === productId);
      setProductData(found || null);
    }
  }, [productId, allProducts]);


  useEffect(() => {
    if (productData?.image?.length) {
      setSelectedImage(productData.image[0]);
    }
  }, [productData]);

  const containerRef = useRef(null);

  const renderContent = () => {
    if (!productData) {
      return <div className='product-not-found-wrapper'>
        <div className='product-not-found'>
          <p>Sorry, we couldn’t load this product.</p>
          <Link to='/'>Back Home</Link>
        </div>
      </div>;
    }
    return (
      <section className='main-product-wrapper'>
        <div className='main-product-container displayNone850px'>
          {/* {isAdmin(user.role) && <div onClick={() => setEditProductAdminModel(productData)} style={{position:'absolute',top: '4rem',right: 0, zIndex: 100}}><MdEdit /></div>} */}
          <div className='main-product-left' style={{ position: 'relative' }}>
            {isAdmin(user.role) && <div className='product-page-edit' onClick={() => setEditProductAdminModel(productData)} ><MdEdit /></div>}

            <ImageWrapper mouseEvent='hover' selectedImage={selectedImage} scroll={scroll} containerRef={containerRef} productData={productData} setSelectedImage={setSelectedImage} />
            <MoreDetails productData={productData} isMoreDetail={isMoreDetail} setIsMoreDetail={setIsMoreDetail} />
          </div>

          <div className="main-product-detail-wrapper">
            <Details productData={productData} />
          </div>

        </div>

        <div className='main-product-container main-product-container-mobile'>
          <ImageWrapper mouseEvent='click' openLarge={() => setIsLargeView(true)} selectedImage={selectedImage} scroll={scroll} containerRef={containerRef} productData={productData} setSelectedImage={setSelectedImage} />
          <div className="main-product-detail-wrapper">
            <Details productData={productData} />
          </div>
          <MoreDetails productData={productData} isMoreDetail={isMoreDetail} setIsMoreDetail={setIsMoreDetail} />

        </div>
        {isLargeView && <LargeViewImage mouseEvent='click' close={() => setIsLargeView(false)} selectedImage={selectedImage} scroll={scroll} containerRef={containerRef} productData={productData} setSelectedImage={setSelectedImage} />}

        {editProductAdminModel &&
          <EditProductAdminModel
            data={editProductAdminModel}
            setEditProductAdminModel={setEditProductAdminModel}
            close={() => {
              setEditProductAdminModel(null)
            }}
          />}
      </section>
    );
  };

  return renderContent();
};

export default ProductDisplayPage;
