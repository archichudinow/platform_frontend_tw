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

export default function MasonryGrid() {
  const [numCols] = useState(5);

  // Split items evenly across columns
  const createColumns = (numCols) => {
    const cols = Array.from({ length: numCols }, () => []);
    items.forEach((item, index) => {
      cols[index % numCols].push(item);
    });
    return cols;
  };

  const [columns, setColumns] = useState(createColumns(numCols));

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`,
      }}
    >
      {columns.map((col, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-4 min-h-[50px]" >

          {col.map((src, itemIndex) => (
            <div key={src}>
              <img className="h-auto w-full rounded-lg" src={src}/>
            </div>
          ))}

        </div>
      ))}
    </div>
  );
}
