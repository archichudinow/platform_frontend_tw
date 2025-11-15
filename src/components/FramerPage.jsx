import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const initialItems = [
  { id: "01", color: "bg-pink-200" },
  { id: "02", color: "bg-blue-200" },
  { id: "03", color: "bg-green-200" },
  { id: "04", color: "bg-yellow-200" },
  { id: "05", color: "bg-red-200" },
  { id: "06", color: "bg-gray-200" },
];

// Helper: swap positions
const moveItem = (arr, from, to) => {
  const updated = [...arr];
  const [moved] = updated.splice(from, 1);
  updated.splice(to, 0, moved);
  return updated;
};

export default function FramerPage() {
  const [items, setItems] = useState(initialItems);
  const [dragging, setDragging] = useState(null);

  return (
    <div className="grid grid-cols-3 gap-4 p-8 justify-items-center">
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            drag
            dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
            dragElastic={1}
            whileDrag={{ scale: 1.1, zIndex: 10 }}
            onDragStart={() => setDragging(item.id)}
            onDragEnd={(e, info) => {
              setDragging(null);
              // Calculate which position it’s closest to
              const x = e.target.getBoundingClientRect().x + info.offset.x;
              const y = e.target.getBoundingClientRect().y + info.offset.y;
              const elements = Array.from(document.querySelectorAll(".draggable"));
              const positions = elements.map((el) => {
                const rect = el.getBoundingClientRect();
                return {
                  id: el.dataset.id,
                  x: rect.x + rect.width / 2,
                  y: rect.y + rect.height / 2,
                };
              });
              // Find nearest target position
              const distances = positions.map((p) => ({
                id: p.id,
                dist: Math.hypot(p.x - x, p.y - y),
              }));
              const nearest = distances.sort((a, b) => a.dist - b.dist)[0];
              if (nearest && nearest.id !== item.id) {
                const fromIndex = items.findIndex((i) => i.id === item.id);
                const toIndex = items.findIndex((i) => i.id === nearest.id);
                setItems(moveItem(items, fromIndex, toIndex));
              }
            }}
            className={`draggable w-20 h-20 ${item.color} rounded-md flex items-center justify-center text-lg font-semibold cursor-grab`}
            data-id={item.id}
            transition={{ layout: { duration: 0.25 } }}
          >
            {item.id}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
