import TodoInputBar from "./TodoInputBar";
import MasonryGrid from "./MasonryGrid";

export default function TodoPage() {
    return (
        <div className="mb-96">
            <TodoInputBar />
            <MasonryGrid period="current_day"/>
        </div>
    );
}