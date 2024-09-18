import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { changeKey } from '../JavaScript/userAPIKey.js'

export function NavBar() {
    const [ userAPIKey, setUserAPIKey ] = useState('');

    useEffect(() => {
        changeKey(userAPIKey)
    }, [userAPIKey])

    return (
        <>
            <div className="page-links">
                <h1>Recipe Book Project</h1>
                <Link to="/">Home</Link>
                <Link to="/discover">Discover</Link>
                <Link to="/recipelist/booklet">Recipe Book</Link>                
            </div>
            <div className="user-key">
                <input type="password" placeholder="Enter API Key for service..." value={userAPIKey} 
                    onChange={(e) => setUserAPIKey(e.target.value)}/>
            </div>
        </>
    )
}