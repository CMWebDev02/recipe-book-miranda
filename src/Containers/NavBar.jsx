import React, { useState } from "react";
import { Link } from "react-router-dom";

export function NavBar({APIKey, setKey}) {
    const [ userKey, setUserKey ] = useState('');

    function updateKey() {
        if (userKey == '') {
            alert('Enter a valid API Key...');
        } else if (APIKey == userKey) {
            alert('Update Failed, Key Unchanged...');
        } else {
            alert('Key Updated');
            setKey(userKey);
        }
    }

    return (
        <>
            <div className="page-links">
                <h1>Recipe Book Project</h1>
                <Link to="/">Home</Link>
                <Link to="/discover">Discover</Link>
                <Link to="/booklet?recipe=booklet&page=1">Recipe Book</Link>     
            </div>
            <div className="user-key">
                <button onClick={updateKey}>Update</button>
                <input type="password" placeholder="Enter API Key for service..." value={userKey} 
                    onChange={(e) => setUserKey(e.target.value)} />
            </div>
        </>
    )
}