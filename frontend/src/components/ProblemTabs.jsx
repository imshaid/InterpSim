import { Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProblemTabs({
  problems,
  activeIndex,
  setActiveIndex,
  onDelete,
}) {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [tooltip, setTooltip] = useState({ x: 0, y: 0 });
  const [isOnDelete, setIsOnDelete] = useState(false);

  const safeHoverIndex =
    hoverIndex !== null && problems[hoverIndex] ? hoverIndex : null;

  return (
    <>
      <div className="relative">
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-3 sm:pb-4 pt-3 px-1 sm:px-2">
          {problems.map((p, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex(i)}
              onMouseEnter={(e) => {
                setHoverIndex(i);
                setTooltip({ x: e.clientX, y: e.clientY });
              }}
              onMouseMove={(e) => setTooltip({ x: e.clientX, y: e.clientY })}
              onMouseLeave={() => setHoverIndex(null)}
              className={`relative min-w-[90px] sm:min-w-[100px] flex-shrink-0 px-2 sm:px-3 py-2 rounded-lg border cursor-pointer transition-all duration-200
                ${
                  i === activeIndex
                    ? "bg-[var(--color-primary)] text-[var(--color-base)]"
                    : "border-[var(--color-primary)]/20 hover:bg-[var(--color-primary)]/5"
                }`}
            >
              {/* 🔥 DELETE BUTTON */}
              <div
                className={`absolute left-0 translate-x-[-35%] -top-3 transition-all duration-200
                ${
                  safeHoverIndex === i
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3 pointer-events-none"
                }`}
                style={{ zIndex: 30 }}
              >
                <button
                  onMouseEnter={() => setIsOnDelete(true)}
                  onMouseLeave={() => setIsOnDelete(false)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setHoverIndex(null);

                    const title = problems[i].title || `Problem ${i + 1}`;

                    toast(
                      (t) => (
                        <div className="flex flex-col gap-3 w-[200px] sm:w-[220px]">
                          <p className="text-sm font-medium leading-snug">
                            Delete{" "}
                            <span className="font-semibold">{title}</span>?
                          </p>

                          <div className="flex justify-end gap-2 pt-1">
                            <button
                              onClick={() => toast.dismiss(t.id)}
                              className="px-3 py-1 text-xs rounded-md border border-[var(--color-primary)]/20 hover:bg-[var(--color-primary)]/5 transition"
                            >
                              Cancel
                            </button>

                            <button
                              onClick={() => {
                                onDelete(i);
                                toast.dismiss(t.id);

                                toast.success(`${title} deleted`, {
                                  duration: 2000,
                                  style: {
                                    background: "#333333",
                                    color: "#f9fafb",
                                  },
                                });
                              }}
                              className="px-3 py-1 text-xs rounded-md bg-[var(--color-primary)] text-[var(--color-base)] hover:opacity-90 transition"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ),
                      {
                        duration: 5000,
                        style: {
                          background: "#f9fafb",
                          color: "#333333",
                          border: "1px solid rgba(51,51,51,0.2)",
                          borderRadius: "10px",
                          padding: "12px",
                        },
                      },
                    );
                  }}
                  className="p-1 rounded text-[var(--color-primary)] 
                  bg-[var(--color-base)] 
                  border border-[var(--color-primary)]/20 
                  shadow 
                  hover:bg-[var(--color-primary)]/10 
                  transition-transform duration-200"
                >
                  <Trash2 size={12} className="sm:w-[13px] sm:h-[13px]" />
                </button>
              </div>

              {/* 🔹 CONTENT */}
              <p className="text-xs sm:text-sm font-semibold truncate">
                {p.title || `Problem ${i + 1}`}
              </p>

              <p className="text-[11px] sm:text-[12px] opacity-80">
                f({Number(p.target).toFixed(2)})
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 FLOATING PREVIEW (disable on small screens automatically by hover absence) */}
      {safeHoverIndex !== null && !isOnDelete && (
        <div
          style={{
            top: tooltip.y + 12,
            left: tooltip.x + 12,
          }}
          className="hidden sm:block fixed z-50 w-56 sm:w-60 p-3 rounded-lg border 
                     border-[var(--color-primary)]/20
                     bg-[var(--color-base)]
                     text-[var(--color-primary)]
                     shadow-lg pointer-events-none"
        >
          <p className="text-xs break-words">
            <span className="font-semibold">X: </span>
            {problems[safeHoverIndex].x
              .map((v) => Number(v).toFixed(2))
              .join(", ")}
          </p>

          <p className="text-xs break-words mt-2">
            <span className="font-semibold">Y: </span>
            {problems[safeHoverIndex].y
              .map((v) => Number(v).toFixed(2))
              .join(", ")}
          </p>
        </div>
      )}
    </>
  );
}
