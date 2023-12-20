import React, { useEffect, useState } from 'react'
import './SearchBar.scss'
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, TextField } from '@mui/material';

export const SearchBar = ({onInputChange, onSearch}) => {
  const [searchText, setSearchText] = useState(null);
  const [serchOptions, setSearchOptions] = useState(["pizza", "nigerian Jollof"])

  const handleChange = (event) => {
    const input = event.target.value;
    // Call the callback function from the parent component
    onInputChange(input);
    
  };

  const search = async(e) =>{
    e.preventDefault();
    onSearch();
  }
  return (
    <div className='searchBarCont'>
        <div className="searchBar">
            <SearchIcon/>
            <form action='' onSubmit={search}>
            <input
              placeholder='Recipes, food, people, etc'
              onChange={handleChange}
              
            />
            </form>
        </div>
    </div>
  )
}
