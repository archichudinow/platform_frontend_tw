import { useState } from "react";

const items = [
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg",
];

export default function MasonryGridAgain() {
  const [numCols] = useState(5);
  const [draggingId, setDraggingId] = useState(null);

  // Split items evenly across columns
  const createColumns = (numCols) => {
    const cols = Array.from({ length: numCols }, () => []);
    items.forEach((item, index) => {
      cols[index % numCols].push(item);
    });
    return cols;
  };

  const [columns, setColumns] = useState(createColumns(numCols));

  const handleDragStart = (colIndex, itemIndex) => {
    setDraggingId({ colIndex, itemIndex });
  };

  const handleDragOver = (e) => e.preventDefault();

  // Drop on a specific item
  const handleDropOnItem = (targetColIndex, targetItemIndex) => {
    if (!draggingId) return;

    const newCols = columns.map((col) => [...col]);
    const draggedItem = newCols[draggingId.colIndex][draggingId.itemIndex];

    // Remove from source column
    newCols[draggingId.colIndex].splice(draggingId.itemIndex, 1);

    // Insert before target item
    newCols[targetColIndex].splice(targetItemIndex, 0, draggedItem);

    setColumns(newCols);
    setDraggingId(null);
  };

  // Drop on empty column
  const handleDropOnColumn = (targetColIndex) => {
    if (!draggingId) return;

    const newCols = columns.map((col) => [...col]);
    const draggedItem = newCols[draggingId.colIndex][draggingId.itemIndex];

    // Remove from source column
    newCols[draggingId.colIndex].splice(draggingId.itemIndex, 1);

    // Append to empty column
    newCols[targetColIndex].push(draggedItem);

    setColumns(newCols);
    setDraggingId(null);
  };

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`,
      }}
    >
      {columns.map((col, colIndex) => (
        <div
          key={colIndex}
          className="flex flex-col gap-4 min-h-[50px]" // ensures empty column is droppable
          onDragOver={handleDragOver}
          onDrop={() => {
            // only drop on column if empty
            if (col.length === 0) handleDropOnColumn(colIndex);
          }}
        >
          {col.map((src, itemIndex) => (
            <div
              key={src}
              draggable
              onDragStart={() => handleDragStart(colIndex, itemIndex)}
              onDragOver={handleDragOver}
              onDrop={() => handleDropOnItem(colIndex, itemIndex)}
              className={`transition-transform ${
                draggingId?.colIndex === colIndex &&
                draggingId?.itemIndex === itemIndex
                  ? "opacity-50 scale-95"
                  : ""
              }`}
            >
              <img
                className="h-auto w-full rounded-lg"
                src={src}
                alt={`Image ${src}`}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
