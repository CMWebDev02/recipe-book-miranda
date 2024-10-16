import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../Styles/ShoppingList.module.css'
import { ShoppingListDisplay } from "../Containers/ShoppingListDisplay";

export function ShoppingList({ meals }) {
    const [ shoppingList, setShoppingList ] = useState([])
    const [ listWorker, setListWorker ] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const worker = new Worker(new URL('../JavaScript/WebWorker.js', import.meta.url));

        worker.addEventListener('message', ({data}) => {
            if (data.command == 'generateShoppingList') {
                console.log(data.groceryList)
                setShoppingList(data.groceryList)
            }
        })

        setListWorker(worker);

        return () => {
            worker.terminate
        }
    }, [])
    
    useEffect(() => {
        if (listWorker) {
            listWorker.postMessage({command: 'generateShoppingList', mealList: meals})
            console.log(meals)
        }
    }, [meals, listWorker])

    function returnToPlanner() {
        navigate('/planner')
    }

    return (
        <div className={styles.shoppingList}>
            <h1>Shopping List</h1>
            <ShoppingListDisplay list={shoppingList} />
            <button onClick={returnToPlanner} className={styles.closeList}>Close</button>
        </div>
    )
}