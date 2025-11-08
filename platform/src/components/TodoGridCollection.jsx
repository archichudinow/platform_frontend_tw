import TodoCardCollection from "./TodoCardCollection";
import { useTodos } from "../api/useTodos";


export default function TodoGridCollection({period}) {
    const params = {
        period: period,
        status: true,
    }

    const { data, isLoading, isPending, isError, isSuccess, error } = useTodos(params);

    if (isLoading) {
        return <div className="columns-2 sm:columns-3 md:columns-5 lg:columns-5 gap-3 px-4 "></div>;
    };

    if (isError) {
        return <div className="columns-2 sm:columns-3 md:columns-5 lg:columns-5 gap-3 px-4 "></div>;
    };

    return (
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-3 px-4 ">
            {data.map(todoItem => (
                <TodoCardCollection key={todoItem.id} todoItem={todoItem}/>
            ))}
        </div>
    );
}