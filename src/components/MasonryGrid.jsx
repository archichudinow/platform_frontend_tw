import { useState, useMemo, useEffect } from "react";

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
  const [numCols, setNumCols] = useState(5);

  // --- Responsive screen-size handler ---
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;

      if (width <= 640) {
        setNumCols(2); // sm
      } else if (width >= 1024) {
        setNumCols(5); // lg
      } else if (width >= 768) {
        setNumCols(3); // md
      }
    };

    updateColumns(); // run initially
    window.addEventListener("resize", updateColumns);

    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Create columns when numCols changes
  const columns = useMemo(() => {
    const cols = Array.from({ length: numCols }, () => []);
    items.forEach((item, index) => {
      cols[index % numCols].push(item);
    });
    return cols;
  }, [numCols]);

  return (
    <>
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))` }}
      >
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-4 min-h-[50px]">
            {col.map((src) => (
              <img key={src} className="h-auto w-full rounded-lg" src={src} />
            ))}
          </div>
        ))}
      </div>

    </>
  );
}
