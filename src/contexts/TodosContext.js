import { createContext, useState } from 'react';

const TodosContext = createContext();

const TodosProvider = ({ children }) => {
    const [profile, setProfile] = useState([]);

    const refreshTodos = async () => {
        try {
            const res = await fetch('/api/getTodos');
            const latestTodos = await res.json();
            setProfile(latestTodos);
        } catch (err) {
            console.error(err);
        }
    };

    const getTodosK = async ( profile ) => {
        try {
            const res = await fetch('/api/getTodos');
            const latestTodos = await res.json();
            //setTodos(latestTodos);
            return latestTodos;
        } catch (err) {
            console.error(err);
        }
    };

    const addTodo = async ( profile ) => {
        try {
            const res = await fetch('/api/createTodo', {
                method: 'POST',
                body: JSON.stringify({ profile }),
                headers: { 'Content-Type': 'application/json' },
            });
            const newTodo = await res.json();
            setProfile((prevTodos) => {
                return [newTodo, ...prevTodos];
            });
        } catch (err) {
            console.error(err);
        }
    };

    const updateTodo = async (updatedTodo) => {
        try {
            const res = await fetch('/api/updateTodo', {
                method: 'PUT',
                body: JSON.stringify(updatedTodo),
                headers: { 'Content-Type': 'application/json' },
            });
            await res.json();
            setProfile((prevTodos) => {
                const existingTodos = [...prevTodos];
                const existingTodo = existingTodos.find(
                    (todo) => todo.id === updatedTodo.id
                );
                existingTodo.fields = updatedTodo.fields;
                return existingTodos;
            });
        } catch (err) {
            console.error(err + "ded");
        }
    };

    const deleteTodo = async (id) => {
        try {
            await fetch('/api/deleteTodo', {
                method: 'Delete',
                body: JSON.stringify({ id }),
                headers: { 'Content-Type': 'application/json' },
            });

            setProfile((prevTodos) => {
                return prevTodos.filter((todo) => todo.id !== id);
            });
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <TodosContext.Provider
            value={{
                profile,
                setProfile,
                refreshTodos,
                updateTodo,
                deleteTodo,
                addTodo,
                getTodosK,
            }}
        >
            {children}
        </TodosContext.Provider>
    );
};

export { TodosProvider, TodosContext };