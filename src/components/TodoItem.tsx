// TodoItem.tsx
import React from 'react';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { AiTwotoneEdit } from 'react-icons/ai';
import { BsPatchCheckFill } from 'react-icons/bs';
import { TodoItemType } from './Todo';

interface TodoItemProps {
    item: TodoItemType;
    onRemove: (id: number) => void;
    onToggleComplete: (id: number) => void;
    onToggleEdit: (id: number) => void;
    onUpdateTitle: (id: number, newTitle: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
    item,
    onRemove,
    onToggleComplete,
    onToggleEdit,
    onUpdateTitle,
}) => {
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onUpdateTitle(item.id, e.target.value);
    };

    return (
        <div
            className={`${item.complete ? 'bg-green-500/40' : 'bg-slate-300/10'
                } ${item.edit ? 'py-1' : 'py-4'} rounded-lg flex items-center justify-between px-2 gap-4`}
        >
            <div className="flex-1">
                {item.edit ? (
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-md"
                        value={item.title}
                        onChange={handleTitleChange}
                    />
                ) : (
                    <p className="text-black">{item.title}</p>
                )}
            </div>
            <div className="flex items-center gap-3">
                <button onClick={() => onRemove(item.id)}>
                    <RiDeleteBin6Fill className="cursor-pointer" />
                </button>
                <button onClick={() => onToggleComplete(item.id)}>
                    <BsPatchCheckFill className="cursor-pointer" />
                </button>
                <button onClick={() => onToggleEdit(item.id)}>
                    <AiTwotoneEdit className="cursor-pointer" />
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
