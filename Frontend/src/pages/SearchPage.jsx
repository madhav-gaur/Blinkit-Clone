// import React, { useState } from 'react'

import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { smartSearch } from "../utils/Search/smartSearch"
import { useSelector } from "react-redux"
import HomeProductCard from "../components/HomeProductCard"

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const products = useSelector(state => state.product.product);
  const allCategory = useSelector(state => state.product.allCategory);

  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      return;
    }

    setIsSearching(true);

    const timer = setTimeout(() => {
      const res = smartSearch(query, products, allCategory);
      setResults(res);
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, products, allCategory]);

  return (
    <div className="search-result-wrapper">
      <div className="search-result-container">
        {!isSearching && results.map((item, idx) => {
          return <HomeProductCard key={item._id + idx + 'HomeProductCard'} data={item} />
        })
        }
      </div>
    </div>
  )
}

export default SearchPage
