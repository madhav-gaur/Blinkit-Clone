import React, { useRef } from 'react';
import HomeProductCard from './HomeProductCard';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import HomeProductLoading from './HomeProductLoading';
import { useSelector } from 'react-redux';

const CategoryWiseProduct = ({ id, name }) => {
    const products = useSelector(state => state.product.product)
    const loading = useSelector(state => state.product.loadingProduct)

    const data = products.filter(product =>
        product.category?.includes(id)
    )
    const containerRef = useRef(null);

    const scroll = (direction) => {
        if (containerRef.current) {
            const scrollAmount = 300; // adjust based on card width
            containerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="category-wise-container">
            <div className="category-wise-header">
                <h3>{name}</h3>
            </div>

            <div className="category-wise-wrapper-layer-2" style={{ position: 'relative' }}>
                {
                    data[0] &&
                    <div className="home-product-scroll-btns">
                        <button onClick={() => scroll('left')}><FaAngleLeft /></button>
                        <button onClick={() => scroll('right')}><FaAngleRight /></button>
                    </div>
                }

                <div className="category-wise-products" ref={containerRef}>
                    {
                        loading && (
                            Array.from({ length: 8 }).map((_, index) => {
                                return <HomeProductLoading key={`home-product-skeleton-${index}`} />
                            })
                        )
                    }
                    {
                        !data[0] && !loading && <p style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', color: '#999' }}> No Matching Products Found !</p>
                    }
                    {
                        data[0] && !loading && (
                            data.map((product, index) => (
                                product ? <HomeProductCard key={product._id + index + 'HomeProductCard'} data={product} /> : 'Not found'
                            ))
                        )
                    }

                </div>
            </div>
        </div>

    );
};

export default CategoryWiseProduct;
