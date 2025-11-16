import TodoInputBar from "./TodoInputBar";
import TodoGrid from "./TodoGrid";
import MasonryGrid from "./MasonryGrid";

export default function TodoPage() {
    return (
        <div className="mb-96">
            <TodoInputBar />
            <MasonryGrid />
        </div>
    );
}