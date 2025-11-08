import TodoGridCollection from "./TodoGridCollection";
import { useState } from "react"

export default function TodoCollection() {
    const [weeksLoaded,setWeeksLoaded] = useState(1);

    const handleLoadMore = () => {
        setWeeksLoaded(prevWeeksLoaded => prevWeeksLoaded + 1);
    };


    return (
        <>

        <div className="mb-10 text-primary/50">
            <div className="flex justify-between px-4 pb-2">
                <h1>Week 1</h1>
                <h1>5/20</h1>
            </div>
            <div className="mx-4 mb-10 border-b  border-primary/50"></div>
            <TodoGridCollection period={"current_day"}/>
        </div>

        <div className="mb-10 text-primary/50">
            <div className="flex justify-between px-4 pb-2">
                <h1>Week 2</h1>
                <h1>4/20</h1>
            </div>
            <div className="mx-4 mb-10 border-b border-primary/50"></div>
            <TodoGridCollection period={"history_day_1"}/>
        </div>

        </>

    );
}