import React, { useEffect, useState } from "react";
import { SearchBox } from "../Components/SearchBox";
import { useNavigate } from "react-router-dom";
  
export function Discover() {
    const [ userSearch, setUserSearch ] = useState('');
    const navigate = useNavigate();

    function redirectToList() {
        navigate('/recipelist/' + userSearch)
    }   

    return (
        <>
            <h1>Enter A Recipe Name</h1>
            <p>Search far and wide for all kinds of recipes.</p>
            <SearchBox searchResult={userSearch} updateSearch={setUserSearch} redirectToList={redirectToList} />
        </>
    )
}