import TodoCard from "./TodoCard";
import { useTodos } from "../api/useTodos";

export default function TodoGrid() {

    const { data, isLoading, isPending, isError, isSuccess, error } = useTodos({period:"current_day"});

    if (isLoading) {
        return <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-3 bg-pink-500"></div>;
    };

    if (isError) {
        return <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-3 bg-pink-500"></div>;
    };

    const openTodos = data.filter(todoItem => todoItem.status === false)

    return (
        <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-3 px-4 column-rule column-rule-pink-500">
            {data.map(todoItem => (
                <TodoCard key={todoItem.id} todoItem={todoItem}/>
            ))}
        </div>
    );
}