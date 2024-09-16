import React, { useEffect, useState } from "react";
import { SearchBox } from "../Components/SearchBox";
import { useNavigate, useSearchParams } from "react-router-dom";
  
export function Discover() {
    const [ userSearch, setUserSearch ] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (userSearch != '') {
            navigate(`/recipelist?recipe=${userSearch}&page=1`);
        }
    }, [userSearch])

    return (
        <>
            <h1>Enter A Recipe Name</h1>
            <p>Search far and wide for all kinds of recipes.</p>
            <SearchBox updateSearch={setUserSearch} />
        </>
    )
}