import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingListDisplay } from "../Containers/ShoppingListDisplay";
import styles from '../Styles/ShoppingList.module.css'

/**
 * @component Displays a modal containing the list of all ingredients needed for the meals passed in . Meals are displayed separately and all of their ingredients are displayed in a list.
 * @param {array} meals - All meals that will be displayed within the modal.
 */
export function ShoppingList({ meals }) {
    const [ shoppingList, setShoppingList ] = useState([])
    const [ listWorker, setListWorker ] = useState(null)
    const navigate = useNavigate();

    // Upon first component render, a worker is created via the webworker file that will be used to generate the grocery list in which each meal is separated and their ingredients
    // are listed to make it easier to view.
    useEffect(() => {
        const worker = new Worker(new URL('../JavaScript/WebWorker.js', import.meta.url));

        worker.addEventListener('message', ({data}) => {
            if (data.command == 'generateShoppingList') {
                setShoppingList(data.groceryList)
            }
        })

        setListWorker(worker);

        return () => {
            worker.terminate
        }
    }, [])
    
    // Rerenders when the meals argument changes or the listWorker is initialized.
    // Checks if the listWorker is initialized and if so a message is sent to the worker to generate the shopping list.
    useEffect(() => {
        if (listWorker) {
            listWorker.postMessage({command: 'generateShoppingList', mealList: meals})
        }
    }, [meals, listWorker])

    /**
     * @function Removes the shopping list from view by returning the user to the planner page via navigating them to the appropriate path.
     * @param {type} variable - description .
     */
    function returnToPlanner() {
        navigate('/planner')
    }

    return (
        <div className={styles.shoppingList}>
            <h2>Shopping List</h2>
            <ShoppingListDisplay list={shoppingList} />
            <button onClick={returnToPlanner} className={styles.closeList}>Close</button>
        </div>
    )
}