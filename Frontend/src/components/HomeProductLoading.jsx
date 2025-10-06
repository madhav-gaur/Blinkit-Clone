import React from 'react';
import '../components/stylesheets/HomeProductLoading.css';

const HomeProductLoading = () => {
  return (
    <div className="home-product-loading">
      <div className="home-product-loading__image shimmer" />
      <div className="home-product-loading__line shimmer" />
      <div className="home-product-loading__line short shimmer" />
      <div className="home-product-loading__price shimmer" />
      <div className="home-product-loading__button shimmer" />
    </div>
  );
};

export default HomeProductLoading;
