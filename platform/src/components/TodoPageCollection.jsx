import TodoGridCollection from "./TodoGridCollection";

export default function TodoCollection() {
    return (
        <>
        
        <div className="mb-10 text-primary/50">
            <div className="flex justify-between px-4 pb-2">
                <h1>Week 1 (Oct 13 - 24)</h1>
                <h1>5/20</h1>
            </div>
            <div className="mx-4 mb-10 border-b  border-primary/50"></div>
            <TodoGridCollection />
        </div>

        <div className="mb-10 text-primary/50">
            <div className="flex justify-between px-4 pb-2">
                <h1>Week 2 (Oct 24 - 31)</h1>
                <h1>5/20</h1>
            </div>
            <div className="mx-4 mb-10 border-b border-primary/50"></div>
            <TodoGridCollection />
        </div>

        <div className="mb-10 text-primary/50">
            <div className="flex justify-between px-4 pb-2">
                <h1>Week 2 (Oct 24 - 31)</h1>
                <h1>5/20</h1>
            </div>
            <div className="mx-4 mb-10 border-b border-primary/50"></div>
            <TodoGridCollection />
        </div>

        </>

    );
}