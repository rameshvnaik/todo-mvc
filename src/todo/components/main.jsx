import { useMemo, useCallback,useState,useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Item } from "./item";
import classnames from "classnames";

import { TOGGLE_ALL } from "../constants";

export function Main({ todos, dispatch }) {
    const { pathname: route } = useLocation();
    const [recentlyCompleted, setRecentlyCompleted] = useState([]);


    const visibleTodos = useMemo(
        () =>
            todos.filter((todo) => {
                if (route === "/active")
                    return !todo.completed;

                if (route === "/completed")
                    return todo.completed;

                return todo;
            }),
        [todos, route]
    );

    const getRecentlyCompleted = () => {
        return todos
            .filter((todo) => todo.completed)
            .sort((a, b) => b.completedAt - a.completedAt) // Sort by most recent first
            .slice(0, 3); // Get the last 3 completed todos
    };

    useEffect(() => {
        const recentlyComplete = getRecentlyCompleted();
        setRecentlyCompleted(recentlyComplete);
    }, [todos]);

    const getColorForIndex = (index) => {
        switch (index) {
            case 0:
                return 'green';            
            case 1:
                return 'magenta'; 
            case 2:
                return 'yellow';            
             default:
                return 'black'; 
        }
    };

    const toggleAll = useCallback((e) => dispatch({ type: TOGGLE_ALL, payload: { completed: e.target.checked } }), [dispatch]);

    return (
        <main className="main" data-testid="main">
            {visibleTodos.length > 0 ? (
                <div className="toggle-all-container">
                    <input className="toggle-all" type="checkbox" id="toggle-all" data-testid="toggle-all" checked={visibleTodos.every((todo) => todo.completed)} onChange={toggleAll} />
                    <label className="toggle-all-label" htmlFor="toggle-all">
                        Toggle All Input
                    </label>
                </div>
            ) : null}
            

            <ul className={classnames("todo-list")} data-testid="todo-list">
                {visibleTodos.map((todo, index) => {
                    const recentIndex = recentlyCompleted.findIndex((item) => item.id === todo.id);
                    
                    const color = recentIndex !== -1 ? getColorForIndex(recentIndex) : 'black';

                    return (
                        <li key={todo.id} >
                            <Item todo={todo} key={todo.id} dispatch={dispatch} index={index} color={color} />
                        </li>
                    );
                })}
            </ul>

        </main>
    );
}
