import TodoCardCollection from "./TodoCardCollection";
import { useTodos } from "../api/useTodos";

export default function TodoGridCollection() {

    const { data, isLoading, isPending, isError, isSuccess, error } = useTodos();

    if (isLoading) {
        return <div className="columns-1 sm:columns-3 md:columns-5 lg:columns-5 gap-3 px-4 "></div>;
    };

    if (isError) {
        return <div className="columns-1 sm:columns-3 md:columns-5 lg:columns-5 gap-3 px-4 "></div>;
    };

    const openTodos = data.filter(todoItem => todoItem.status === true)

    return (
        <div className="columns-1 sm:columns-3 md:columns-4 lg:columns-5 gap-3 px-4 ">
            {openTodos.map(todoItem => (
                <TodoCardCollection key={todoItem.id} todoItem={todoItem}/>
            ))}
        </div>
    );
}