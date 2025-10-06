import React, { useRef, useState } from "react";
import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  onDelete?: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete }) => {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<any | null>(null);
  const HOLD_TIME = 3000;

  const hold = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    const start = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const newProgress = Math.min((elapsed / HOLD_TIME) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(intervalRef.current!);
        if (onDelete) {
          onDelete();
        } else {
          alert("Deleted!");
        }
        setProgress(0);
      }
    }, 20);
  };

  const stop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setProgress(0);
  };

  return (
    <button
      type="button"
      onMouseDown={hold}
      onMouseUp={stop}
      onMouseLeave={stop}
      className="relative flex items-center justify-center gap-2 w-40 rounded-xl border-2 border-red-700 text-black py-2 font-semibold overflow-hidden hover:opacity-90 transition"
    >
   
      <div
        className="absolute top-0 left-0 h-full bg-red-700"
        style={{ width: `${progress}%`, transition: "width 0.05s linear" }}
      ></div>

      
      <span className="relative z-10 flex items-center gap-2">
        <Trash2 size={15} />
        Delete
      </span>
    </button>
  );
};

export default DeleteButton;
