import { useState } from 'react';
import { useDelTodo, useUpdTodo } from '../api/useTodos';

export default function TodoCard({todoItem}) {
    const [isCompleted, setIsCompleted] = useState(todoItem.status);

    const delTodo = useDelTodo();
    const updTodo = useUpdTodo();
    const loadingState = delTodo.isPending || updTodo.isPending;

    const handleDel = (todoItem) => {
        delTodo.mutate(todoItem);
    };

    const toggleStatus = (todoItem) => {
        const updatedTodoItem = { ...todoItem, status: true, archive: true};
        updTodo.mutate(updatedTodoItem);
        setIsCompleted(true);
    };

    return (
    <>
    {/* CARD */}
    <div className="">
    <div className="group w-full h-auto mb-5 inline-block card-wrapper break-inside-avoid" key={todoItem.id}>
    <div className={`perspective-near transform-3d delay-1000 duration-2000 ${isCompleted ? "rotate-y-180" : ""} shadow-md/5 relative`}>


        {/* FRONT FACE */}
        <div className="bg-panel border border-primary/0 hover:border-primary/30 duration-1000 backface-hidden rounded-md overflow-hidden">

        {/* FRONT BACKGROUND */}
        <img
            className="relative opacity-5 grayscale block w-full min-h-32 h-full mask-alpha mask-center mask-cover not-even:mask-[url(/mask_inv.png)]"
            src={todoItem.image}
            alt="card cover image"
        />

        {/* FRONT CONTENT */}
        <div className="absolute inset-0">
            <div className="h-full w-full flex flex-col">

            {/* FC HEAD */}
            <div className="flex justify-end items-start">
            <button
                className="m-3 h-7 w-7 border rounded-md border-primary/10 opacity-10"
                onClick={() => handleDel(todoItem)}
                disabled={loadingState}
            >
                ×
            </button>
            </div>

            {/* FC MAIN */}
            <div className="flex grow items-end">
                <div className="flex flex-row items-center mx-4 gap-4">
                    <input 
                        type="checkbox" 
                        className="flex-none w-5 h-5 border rounded-md border-primary/30 appearance-none
                                    checked:bg-pink-600 checked:border-panel"
                        checked={isCompleted}
                        onChange={() => toggleStatus(todoItem)}
                    />
                    <p className={` text-primary/50 text-balance break-all ${isCompleted ? "line-through" : ""}`}>{todoItem.title}</p>
                </div>

            </div>

            {/* FC FOOTER */}
            <div className="flex justify-end items-end mt-4">
                <p className="m-3 text-xs text-primary/10">{todoItem.date_created}</p>
            </div>

            </div>
        </div>
        </div>

        {/* BACK FACE */}
        <div className="bg-panel absolute backface-hidden inset-0 rotate-y-180 rounded-sm overflow-hidden border border-pink-300/0 hover:border-pink-300/30 duration-1000">

        {/* BACK BACKGROUND */}
        <img
            className="relative block w-full h-auto min-h-32 opacity-75"
            src={todoItem.image}
            alt="card cover image"
        />

        {/* BACK CONTENT */}
        <div className="absolute inset-0 p-4">
            <div className="h-full w-full flex flex-col">

            {/* BC HEAD */}
            <div className="flex justify-end items-start">
            <button
                className="m-3 h-7 w-7 border rounded-md border-primary/10 opacity-10"
                onClick={() => handleDel(todoItem)}
                disabled={loadingState}
            >
                ×
            </button>
            </div>

            {/* BC MAIN */}
            <div className="flex grow items-end">
            </div>

            {/* BC FOOTER */}
            <div className="flex justify-end items-end mt-4">
            </div>

            </div>
        </div>
        </div>
    </div>
    </div>
    </div>
    </>
    );
}