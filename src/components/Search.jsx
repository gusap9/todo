import React, { useState } from "react";

const Search = ({search, searchCahange}) => {
    return (
        <div className="search">
            <input onChange={searchCahange} value={search} type="text" placeholder='Поиск задания...' />
        </div>
    )
}
export default Search;