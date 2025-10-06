// Search.jsx
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { TypeAnimation } from 'react-type-animation'
import { IoIosArrowRoundBack } from "react-icons/io";

const Search = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isSearchPage, setIsSearchPage] = useState(false)

  useEffect(() => {
    setIsSearchPage(location.pathname === "/search");
  }, [location.pathname]);

  return (
    <div
      className={`header-item search-wrapper ${isSearchPage ? 'expanded-search' : ''}`}
      onClick={() => !isSearchPage && navigate('/search')}
    >
      <button className='search'>
        <HiMiniMagnifyingGlass className={isSearchPage? "displayNone": ""} />
        <IoIosArrowRoundBack onClick={()=>navigate('/')} className={`backArrowSearch ${!isSearchPage? "displayNone": ""}`} />
      </button>

      {!isSearchPage ? (
        <div className='placeholder'>
          <TypeAnimation
            sequence={[
              'Search "Milk"', 1000,
              'Search "Chips"', 1000,
              'Search "Butter"', 1000,
              'Search "Maggie"', 1000,
              'Search "Bread"', 1000,
              'Search "Chocolate"', 1000,
              'Search "Atta"', 1000,
              'Search "Sugar"', 1000,
              'Search "Hair Oil"', 1000,
            ]}
            wrapper="span"
            speed={150}
            repeat={Infinity}
          />
        </div>
      ) : (
        <div className='input-search'>
          <input type="text" autoFocus placeholder='Search for atta dal and more' />
        </div>
      )}
    </div>
  )
}

export default Search
