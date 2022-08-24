import React from "react";

const Search = (props) => {
    // отправляем полученный в input запрос в функцию search через props
    return (
        <div className="search">
            <input onChange={({ target: { value } }) => props.search(value)} type="text" placeholder='Поиск задания...' />
        </div>
    )
}
export default Search;