import React from "react";
import { SearchBox } from "../Components/SearchBox";

export function NavBar() {
    return (
        <>
            <div className="page-links">
                <h2><a href="#">Home</a></h2>
                <h2><a href="#">Discover</a></h2>
                <h2><a href="#">Recipe Book</a></h2>
            </div>

            <div className="recipe-search">
                <SearchBox />
            </div>
        </>
    )
}