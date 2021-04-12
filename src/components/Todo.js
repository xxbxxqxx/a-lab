import React, { useContext } from 'react';
import { TodosContext } from '../contexts/TodosContext';
export default function Todo({ todo }) {
    const { updateTodo, deleteTodo } = useContext(TodosContext);

    const handleToggleCompleted = () => {
        const updatedFields = {
            ...todo.fields,
            //completed: !todo.fields.completed,
        };
        const updatedTodo = { id: todo.id, fields: updatedFields };
        updateTodo(updatedTodo);
    };
    return (
        <li style={{margin: "12px 0"}} className="sacsdk2978">
            <span style={{width:"140px", display:"inline-block"}}>{todo.id +  " | " + todo.fields.email}</span>
            {/*}<span style={{width:"140px", display:"inline-block"}}>{todo.fields.description}</span>*/}
            {/*}
            <button
                type="button"
                className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded "
                onClick={() => deleteTodo(todo.id)}
            >
                Delete
            </button>
        */}
        </li>
    );
}