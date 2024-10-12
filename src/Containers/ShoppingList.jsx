import React, { useEffect, useState } from "react";
import { MealPlan } from "../JavaScript/localStorage";
import { DisplayIngredients } from "../Components/DisplayIngredients";

export function ShoppingList({ meals }) {
    const [ shoppingList, setShoppingList ] = useState([])
    const [ listWorker, setListWorker ] = useState(null)

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
    
    useEffect(() => {
        if (listWorker) {
            listWorker.postMessage({command: 'generateShoppingList', mealList: meals})
        }
    }, [meals])

    return (
        shoppingList.map(meal => <DisplayIngredients key={'shopping-list' + Math.random()} meal={meal} />)
    )
}