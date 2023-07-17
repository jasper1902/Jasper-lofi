// Todo.tsx
import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';

export interface TodoItemType {
    id: number;
    title: string;
    complete: boolean;
    edit: boolean;
}

type TodoInput = {
    title: string;
};

const Todo = () => {
    const [todos, setTodos] = useState<TodoItemType[]>([]);
    const [todoInput, setTodoInput] = useState<TodoInput>({
        title: '',
    });

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        } else {
            setTodos([]);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleTodoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTodoInput((prevTodoInput) => ({
            ...prevTodoInput,
            [name]: value,
        }));
    };

    const addTodo = () => {
        const newTodo: TodoItemType = {
            id: Date.now(),
            ...todoInput,
            complete: false,
            edit: false,
        };
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        setTodoInput({ title: '' });
    };

    const removeTodo = (id: number) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const toggleTodoProperty = (id: number, property: keyof TodoItemType) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        [property]: !todo[property],
                    };
                }
                return todo;
            })
        );
    };

    const handleUpdateTitle = (id: number, newTitle: string) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        title: newTitle,
                    };
                }
                return todo;
            })
        );
    };

    return (
        <div className="bg-slate-700 bg-opacity-80 h-fit max-w-lg w-full rounded-lg p-6 absolute z-10 mt-32">
            <div className="flex gap-4">
                <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-md"
                    name="title"
                    value={todoInput.title}
                    onChange={handleTodoInputChange}
                />
                <button className="btn btn-info" onClick={addTodo}>
                    Add
                </button>
            </div>

            <div className="flex flex-col gap-4 mt-4">
                {todos.map((item) => (
                    <TodoItem
                        key={item.id}
                        item={item}
                        onRemove={removeTodo}
                        onToggleComplete={(id) => toggleTodoProperty(id, 'complete')}
                        onToggleEdit={(id) => toggleTodoProperty(id, 'edit')}
                        onUpdateTitle={handleUpdateTitle}
                    />
                ))}
            </div>
        </div>
    );
};

export default Todo;
