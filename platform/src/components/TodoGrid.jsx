import TodoCard from "./TodoCard";
import { useTodos } from "../api/useTodos";

export default function TodoGrid() {

    const { data, isLoading, isPending, isError, isSuccess, error } = useTodos();

    if (isLoading) {
        return <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 gap-3 px-4 "></div>;
    };

    if (isError) {
        return <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 gap-3 px-4 "></div>;
    };

    const openTodos = data.filter(todoItem => todoItem.status === false)

    return (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 gap-3 px-4 ">
            {data.map(todoItem => (
                <TodoCard key={todoItem.id} todoItem={todoItem}/>
            ))}
        </div>
    );
}