import React, { useEffect, useState } from 'react'
import './SearchBar.scss'
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, TextField } from '@mui/material';

export const SearchBar = () => {
  const [searchText, setSearchText] = useState(null);
  const [serchOptions, setSearchOptions] = useState(["pizza", "nigerian Jollof"])
  const search = async(e) =>{
    e.preventDefault();
    if(searchText)
    {

    }
  }
  return (
    <div className='searchBarCont'>
        <div className="searchBar">
            <SearchIcon/>
            <form action=''>
            <Autocomplete
              disablePortal
              freeSolo
              
              id="combo-box-demo"
              options={serchOptions}
              renderInput={(params) => <input {...params} placeholder='Recipes, food, people, etc' onChange={(e) => setSearchText(e.target.value)}  className='textField'></input>}
            />
            </form>
        </div>
    </div>
  )
}
