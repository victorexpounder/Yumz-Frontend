import React, { useEffect, useState } from 'react'
import './SearchBar.scss'
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = () => {
 

  return (
    <div className='searchBarCont'>
        <div className="searchBar">
            <SearchIcon/>
            <form action="">
            <input placeholder='Recipes, food, people, etc'></input>
            </form>
        </div>
    </div>
  )
}
