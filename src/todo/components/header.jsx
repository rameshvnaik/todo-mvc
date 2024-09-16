import { useCallback,useRef } from "react";
import { Input } from "./input";

import { ADD_ITEM, UPDATE_NEWELY_ADDED } from "../constants";

export function Header({ dispatch }) {

    const timerRef = useRef(null); // To store the timer ID


    const addItem = useCallback((title) => {
       
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
    
        dispatch({ type: ADD_ITEM, payload: { title } })
        timerRef.current = setTimeout(() => {
         
            dispatch({ type: UPDATE_NEWELY_ADDED });
        }, 15000);
     },[dispatch]
    );

   // const addItem = useCallback((title) => dispatch({ type: ADD_ITEM, payload: { title } }), [dispatch]);

    return (
        <header className="header" data-testid="header">
            <h1>todos</h1>
            <Input onSubmit={addItem} label="New Todo Input" placeholder="What needs to be done?" />
        </header>
    );
}
