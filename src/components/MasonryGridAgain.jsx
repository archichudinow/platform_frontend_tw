import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function MasonryGridMotion() {
  const [numCols] = useState(5);
  const [draggingId, setDraggingId] = useState(null);

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

  const handleDragEnd = () => {
    setDraggingId(null);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDropOnItem = (targetColIndex, targetItemIndex) => {
    if (!draggingId) return;

    const newCols = columns.map((col) => [...col]);
    const draggedItem = newCols[draggingId.colIndex][draggingId.itemIndex];
    newCols[draggingId.colIndex].splice(draggingId.itemIndex, 1);
    newCols[targetColIndex].splice(targetItemIndex, 0, draggedItem);
    setColumns(newCols);
    setDraggingId(null);
  };

  const handleDropOnColumn = (targetColIndex) => {
    if (!draggingId) return;

    const newCols = columns.map((col) => [...col]);
    const draggedItem = newCols[draggingId.colIndex][draggingId.itemIndex];
    newCols[draggingId.colIndex].splice(draggingId.itemIndex, 1);
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
          className="flex flex-col gap-4 min-h-[50px]"
          onDragOver={handleDragOver}
          onDrop={() => {
            if (col.length === 0) handleDropOnColumn(colIndex);
          }}
        >
          <AnimatePresence>
            {col.map((src, itemIndex) => (
              <motion.div
                key={src}
                draggable
                layout
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                onDragStart={() => handleDragStart(colIndex, itemIndex)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={() => handleDropOnItem(colIndex, itemIndex)}
                className={`cursor-grab transition-transform ${
                  draggingId?.colIndex === colIndex &&
                  draggingId?.itemIndex === itemIndex
                    ? "opacity-50 scale-95"
                    : ""
                }`}
                whileDrag={{ scale: 1.05, zIndex: 50 }}
              >
                <img
                  className="h-auto w-full rounded-lg"
                  src={src}
                  alt={`Image ${src}`}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
