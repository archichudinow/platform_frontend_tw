import { useState, useMemo, useEffect } from "react";
import TodoCard from "./TodoCard";
import { useTodos } from "../api/useTodos";

export default function MasonryGrid() {
  // 1. Always call hooks at the top
  const {
    data,
    isLoading,
    isPending,
    isError,
  } = useTodos({ period: "current_day" });

  const [numCols, setNumCols] = useState(5);

  // 2. Resize handler (hook always runs)
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;

      if (width <= 640) {
        setNumCols(2);
      } else if (width >= 1024) {
        setNumCols(5);
      } else if (width >= 768) {
        setNumCols(3);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // 3. Prepare todos list (safe even when loading/error)
  const todos = data ?? [];

  // 4. Memoized columns (always runs)
  const columns = useMemo(() => {
    const cols = Array.from({ length: numCols }, () => []);
    todos.forEach((todo, index) => {
      cols[index % numCols].push(todo);
    });
    return cols;
  }, [numCols, todos]);

  // 5. Render (safe to condition here!)
  if (isLoading || isPending) {
    return <div className="grid gap-4"></div>;
  }

  if (isError) {
    return <div className="grid gap-4"></div>;
  }

  return (
    <div
      className="grid gap-4 px-4"
      style={{ gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))` }}
    >
      {columns.map((col, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-4">
          {col.map((todoItem) => (
            <TodoCard key={todoItem.id} todoItem={todoItem} />
          ))}
        </div>
      ))}
    </div>
  );
}
