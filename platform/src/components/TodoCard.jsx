import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDelTodo, useUpdTodo } from '../api/useTodos';

export default function TodoCard({ todoItem }) {
  const [isCompleted, setIsCompleted] = useState(todoItem.status);
  const [showParticles, setShowParticles] = useState(false);

  const delTodo = useDelTodo();
  const updTodo = useUpdTodo();
  const loadingState = delTodo.isPending || updTodo.isPending;

  const handleDel = (todoItem) => {
    delTodo.mutate(todoItem);
  };

    const toggleStatus = (todoItem) => {
    const updatedTodoItem = { ...todoItem, status: true, archive: true };
    updTodo.mutate(updatedTodoItem);
    setIsCompleted(true);

    // show sparkles for longer
    setShowParticles(true);
    setTimeout(() => setShowParticles(false), 7000); // 7 seconds
    };


  // Particle generator
  const particles = Array.from({ length: 120 });

  return (
    <div className="group w-full h-auto mb-5 inline-block card-wrapper break-inside-avoid" key={todoItem.id}>
      <div className={`relative perspective-near transform-3d duration-5000 transition-transform ${isCompleted ? 'rotate-y-180' : ''}`}>
        
        {/* FRONT FACE */}
        <div className="bg-panel border border-primary/0 hover:border-primary/30 duration-700 backface-hidden rounded-md overflow-hidden relative">
          <img
            className="relative opacity-5 grayscale block w-full min-h-32 h-full mask-alpha mask-center mask-cover not-even:mask-[url(/mask_inv.png)]"
            src={todoItem.image}
            alt="card cover image"
          />
          <div className="absolute inset-0 flex flex-col">

            {/* HEADER */}
            <div className="flex justify-end items-start">
              <button
                className="m-3 h-7 w-7 border rounded-md border-primary/10 opacity-10"
                onClick={() => handleDel(todoItem)}
                disabled={loadingState}
              >
                ×
              </button>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex grow items-end">
              <div className="flex flex-row items-center mx-4 gap-4">
                <input
                  type="checkbox"
                  className="flex-none w-5 h-5 border rounded-md border-primary/30 appearance-none checked:bg-pink-600 checked:border-panel"
                  checked={isCompleted}
                  onChange={() => toggleStatus(todoItem)}
                />
                <p className={`text-primary/50 text-balance break-all ${isCompleted ? 'line-through' : ''}`}>
                  {todoItem.title}
                </p>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end items-end mt-4">
              <p className="m-3 text-xs text-primary/10">{todoItem.date_created}</p>
            </div>
          </div>
        </div>

        {/* BACK FACE */}
        <div className="bg-panel absolute backface-hidden inset-0 rotate-y-180 rounded-sm overflow-hidden border border-pink-300/0 hover:border-pink-300/30 duration-700">
          <img
            className="relative block w-full h-auto min-h-32 opacity-75"
            src={todoItem.image}
            alt="card cover image"
          />
        </div>


{/* PARTICLE EFFECT */}
<AnimatePresence>
  {showParticles && (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 150 }).map((_, i) => {
        // Randomly pick an edge: 0=top,1=right,2=bottom,3=left
        const edge = Math.floor(Math.random() * 4);
        let startX, startY;

        switch (edge) {
          case 0: startX = Math.random() * 100; startY = 0; break;
          case 1: startX = 100; startY = Math.random() * 100; break;
          case 2: startX = Math.random() * 100; startY = 100; break;
          case 3: startX = 0; startY = Math.random() * 100; break;
        }

        const size = Math.random() * 5 + 0.5;
        const driftX = (Math.random() - 0.5) * 30; // wider drift
        const driftY = -Math.random() * 50; // higher rise
        const duration = 4 + Math.random() * 3; // longer duration

        const isGlowing = Math.random() < 0.25; // 25% glowy

        return (
          <motion.span
            key={i}
            className={`absolute rounded-full bg-white/50 ${
              isGlowing ? 'shadow-[0_0_4px_2px_rgba(255,255,255,0.4)]' : ''
            }`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${startX}%`,
              top: `${startY}%`,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              left: `${startX + driftX}%`,
              top: `${startY + driftY}%`,
              opacity: [1, 0.7, 0],
              scale: [0.5, 1, 0.8],
            }}
            transition={{
              duration: duration,
              ease: 'easeOut',
              delay: Math.random() * 0.5,
            }}
          />
        );
      })}
    </div>
  )}
</AnimatePresence>





      </div>
    </div>
  );
}
