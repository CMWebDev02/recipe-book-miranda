import React from "react";
import { Link } from "react-router-dom";
import { SearchBox } from "../Components/SearchBox";

export function NavBar() {
    return (
        <>
            <div className="page-links">
                <h1>Recipe Book Project</h1>
                <Link to="/">Home</Link>
                <Link to="/discover">Discover</Link>
                <Link to="/recipelist/booklet">Recipe Book</Link>                
            </div>
            {/* <div className="recipe-search">
                <SearchBox />
            </div> */}
        </>
    )
}