import React from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

const ImageWrapper = ({ selectedImage, containerRef, productData, setSelectedImage, mouseEvent, openLarge }) => {
    const scroll = (direction) => {
        if (containerRef.current) {
            const scrollAmount = 200;
            containerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };


    return (
        <div className='main-product-image-wrapper'>
            <div className='main-product-image-show-btn'>
                <button onClick={() => {
                    const currentIndex = productData.image.indexOf(selectedImage);
                    const prevIndex = currentIndex === 0 ? productData.image.length - 1 : currentIndex - 1;
                    setSelectedImage(productData.image[prevIndex]);
                }}><FaAngleLeft /></button>
                <button onClick={() => {
                    const currentIndex = productData.image.indexOf(selectedImage);
                    const nextIndex = currentIndex === productData.image.length - 1 ? 0 : currentIndex + 1;
                    setSelectedImage(productData.image[nextIndex]);
                }}><FaAngleRight /></button>
            </div>
            <div className='main-product-image-show' onClick={openLarge}>
                {selectedImage && <img src={selectedImage} alt="Product Preview" />}
            </div>
            <div className='product-image-gallery-wrapper   '>
                <div className='product-image-gallery-button displayNone850px'>
                    <button onClick={() => scroll('left')}><FaAngleLeft /></button>
                    <button onClick={() => scroll('right')}><FaAngleRight /></button>
                </div>
                <div className='product-image-gallery displayNone850px' ref={containerRef}>
                    {productData?.image.map((img, index) => (
                        <img
                            onMouseEnter={mouseEvent === 'hover' ? () => setSelectedImage(img) : undefined}
                            onClick={mouseEvent === 'click' ? () => setSelectedImage(img) : undefined}
                            style={{ border: selectedImage === img ? '1px solid #0c831f' : null }}
                            key={img + index + 'product-image-gallery'}
                            src={img}
                            alt="Product Thumbnail"
                        />
                    ))}
                </div>

                <div className='product-image-carousel-btn'>
                    {productData.image.map((img, index) => (
                        <div
                            onClick={mouseEvent === 'click' ? () => setSelectedImage(img) : undefined}
                            key={img + index + 'product-image-carousel-btn'}
                            style={{ backgroundColor: selectedImage === img ? 'black' : null }}
                        >
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ImageWrapper
