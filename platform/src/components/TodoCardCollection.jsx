import { useState } from 'react';
import { useDelTodo } from '../api/useTodos';

export default function TodoCardCollection({todoItem}) {
    const [isCompleted, setIsCompleted] = useState(todoItem.status);

    const delTodo = useDelTodo();
    const loadingState = delTodo.isPending;

    const handleDel = (todoItem) => {
        delTodo.mutate(todoItem);
    };

    return (
    <>
    {/* CARD */}
    <div className="group w-full h-fit mb-5 break-inside-avoid" key={todoItem.id} onClick={() => setIsCompleted(!isCompleted)}>
    <div className={`perspective-near transform-3d duration-2000 ${isCompleted ? "rotate-y-180" : ""} rounded-lg shadow-md/5 border border-primary/1 relative`}>


        {/* FRONT FACE */}
        <div className="bg-panel backface-hidden rounded-md overflow-hidden">

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
            <button className="m-3 h-7 w-7 border rounded-md border-primary/10 opacity-0 transition duration-300 group-hover:group-focus:opacity-70 focus:hover:bg-red-300/50
                                disabled:bg-primary/50 disabled:opacity-70"
                    onClick={() => handleDel(todoItem)}
                    disabled={loadingState}
            >×</button>
            </div>

            {/* FC MAIN */}
            <div className="flex grow items-end">
                <div className="flex flex-row items-center mx-4 gap-4">
                    <p className={` text-primary/50 text-balance break-all ${isCompleted ? "line-through" : ""}`}>{todoItem.title}</p>
                </div>
            </div>

            {/* FC FOOTER */}
            <div className="flex justify-end items-end">
                <p className="m-3 text-xs text-primary/10">{todoItem.date_created}</p>
            </div>

            </div>
        </div>
        </div>

        {/* BACK FACE */}
        <div className="bg-panel absolute backface-hidden inset-0 rotate-y-180 rounded-md overflow-hidden">

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
            <button className="m-3 h-7 w-7 border rounded-md border-primary/10 opacity-0 transition duration-300 group-hover:group-focus:opacity-70 focus:hover:bg-red-300/50
                                disabled:bg-primary/50 disabled:opacity-70"
                    onClick={() => handleDel(todoItem)}
                    disabled={loadingState}
            >×</button>
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
    </>
    );
}