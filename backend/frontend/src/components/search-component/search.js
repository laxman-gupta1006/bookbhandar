import React from 'react';
import './search.css';

const SearchBox = ({ HandleClick }) => {
        return(
        <><input type="search" id='search_box' placeholder='Search Book'/>
        <button id='search_button' onClick={ HandleClick }>Search</button></>
        )
    }
export default SearchBox;