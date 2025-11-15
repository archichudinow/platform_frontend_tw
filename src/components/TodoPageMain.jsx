import TodoInputBar from "./TodoInputBar";
import TodoGrid from "./TodoGrid";

export default function TodoPage() {
    return (
        <div className="mb-96">
            <TodoInputBar />
            <TodoGrid />
        </div>
    );
}