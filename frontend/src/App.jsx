import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

import InputPanel from "./components/InputPanel";
import ProblemBlock from "./components/ProblemBlock";
import ProblemTabs from "./components/ProblemTabs";
import { solveInterpolation } from "./services/api";
import { FaGithub, FaTelegramPlane } from "react-icons/fa";
import { FaMedium } from "react-icons/fa6";

function App() {
  useEffect(() => {
    fetch(import.meta.env.VITE_API_BASE_URL);
  }, []);

  const [problems, setProblems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSolve = async (data) => {
    try {
      const d = await solveInterpolation(data);

      const newProblem = {
        title: `Problem ${problems.length + 1}`,
        x: data.x,
        y: data.y,
        target: data.target,
        result: d.result,
        poly: d.poly,
        method: d.method,
        table: d.table,
        axisX: d.axisX,
        axisY: d.axisY,
        formula: d.formula,
        steps: d.steps,
        polyEq: d.poly_eq,
        graph: d.graph,
      };

      const updated = [...problems, newProblem];

      setProblems(updated);
      setActiveIndex(updated.length - 1);
      setIsDrawerOpen(false);
    } catch (error) {
      console.error(error);

      toast.error("Server error!!!", {
        style: {
          background: "#333333",
          color: "#f9fafb",
        },
      });
    }
  };

  const handleDelete = (index) => {
    setProblems((prev) => {
      const filtered = prev.filter((_, i) => i !== index);

      const updated = filtered.map((p, i) => ({
        ...p,
        title: `Problem ${i + 1}`,
      }));

      let newActive = activeIndex;

      if (updated.length === 0) {
        newActive = null;
      } else if (index === activeIndex) {
        newActive = Math.max(0, activeIndex - 1);
      } else if (index < activeIndex) {
        newActive = activeIndex - 1;
      }

      setActiveIndex(newActive);

      return updated;
    });
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#333333",
            color: "#f9fafb",
          },
        }}
      />

      {/* MAIN */}
      <div className="h-screen flex flex-col lg:flex-row bg-[var(--color-base)] text-[var(--color-primary)] math-font">
        {/* OVERLAY */}
        {isDrawerOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={() => setIsDrawerOpen(false)}
          />
        )}
        {/* LEFT PANEL (DRAWER ON MOBILE) */}
        <div
          className={`
    fixed lg:static top-0 left-0 h-full z-50
    w-[90%] sm:w-[80%] lg:w-3/10
    bg-[var(--color-base)]
    transform transition-transform duration-300
    ${isDrawerOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    flex flex-col overflow-y-auto
    border-b lg:border-b-0 lg:border-r border-[var(--color-primary)]/20
  `}
        >
          {/* 🔹 TOP: NAME (STATIC) */}
          <div className="px-4 sm:px-6 py-4 border-b border-[var(--color-primary)]/20 flex justify-between items-center shrink-0">
            <a
              href="https://interpsim.vercel.app"
              className="text-xl sm:text-2xl font-semibold tracking-tight hover:opacity-80 transition"
            >
              InterpSim
            </a>

            <button
              className="lg:hidden"
              onClick={() => setIsDrawerOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* 🔹 MIDDLE (FLEXIBLE INPUT) */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md px-4 sm:px-6 md:px-8 py-6">
              <InputPanel onSolve={handleSolve} />
            </div>
          </div>

          {/* 🔹 BOTTOM (ALL STATIC) */}
          <div className="shrink-0 border-t border-[var(--color-primary)]/20">
            {/* INFO */}
            <div className="px-4 sm:px-6 md:px-8 py-4 border-b border-[var(--color-primary)]/20">
              <p className="text-sm font-semibold mb-3">
                Interpolation (Equal Interval)
              </p>

              <p className="text-xs sm:text-sm opacity-70 leading-relaxed">
                Interpolation estimates unknown values between known data
                points. This system focuses on equal interval interpolation,
                where the spacing between consecutive x-values is uniform.
              </p>

              <div className="mt-4 text-xs opacity-60">
                <p className="mb-1">Example:</p>
                <p>x: 1, 2, 3, 4</p>
                <p>y: 2, 4, 6, 8</p>
              </div>

              <div className="my-4 h-px bg-[var(--color-primary)]/20" />

              <div className="space-y-2 text-xs opacity-70">
                <p>• Enter equally spaced X and Y values</p>
                <p>• Provide a target value</p>
                <p>• System selects method automatically</p>
                <p>• Results + graph generated instantly</p>
              </div>
            </div>

            {/* TEAM */}
            <div className="p-4 border-b border-[var(--color-primary)]/20">
              <p className="text-sm font-semibold mb-4 text-center">
                Team Adrenaline
              </p>

              <div className="space-y-2 text-[12px] sm:text-[12.5px]">
                {[
                  {
                    name: "Md. Shaid Hasan",
                    email: "shaid241-15-360@diu.edu.bd",
                  },
                  {
                    name: "Md. Fazle Rabbi",
                    email: "fazle241-15-364@diu.edu.bd",
                  },
                  {
                    name: "Md. Afsahul Arefin Talukder",
                    email: "arefin241-15-377@diu.edu.bd",
                  },
                  {
                    name: "Atkia Galiba Rifah",
                    email: "galiba241-15-076@diu.edu.bd",
                  },
                  {
                    name: "Sormili Akter Nowshin",
                    email: "akter241-15-404@diu.edu.bd",
                  },
                ].map((m, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-start px-2 sm:px-4 gap-2"
                  >
                    <p className="font-medium text-[10px] sm:text-[13px]">
                      {m.name}
                    </p>

                    <a
                      href={`mailto:${m.email}`}
                      className="text-[10px] sm:text-[12.5px] opacity-70 hover:opacity-100 hover:underline transition break-all text-right"
                    >
                      {m.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* SOCIAL */}
            <div className="px-6 py-2">
              <div className="flex justify-evenly items-center">
                <a
                  href="https://github.com/imshaid"
                  target="_blank"
                  className="flex items-center justify-center hover:opacity-70 transition"
                >
                  <FaGithub size={20} />
                </a>

                <a
                  href="https://imshaid.medium.com"
                  target="_blank"
                  className="flex items-center justify-center hover:opacity-70 transition"
                >
                  <FaMedium size={20} />
                </a>

                <a
                  href="https://t.me/imsurjo"
                  target="_blank"
                  className="flex items-center justify-center hover:opacity-70 transition"
                >
                  <FaTelegramPlane size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* RIGHT PANEL */}
        <div className="w-full lg:w-7/10 flex flex-col">
          {/* MOBILE HEADER */}
          <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-[var(--color-primary)]/20">
            <button onClick={() => setIsDrawerOpen(true)}>☰</button>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight opacity-90">
              <a
                href="https://interpsim.vercel.app"
                className="hover:opacity-80 transition duration-200"
              >
                InterpSim
              </a>
            </h1>
          </div>

          {/* EMPTY */}
          {problems.length === 0 && (
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 py-6">
              <div className="w-full max-w-xs sm:max-w-sm text-center space-y-4 sm:space-y-5">
                {/* Site Name */}
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight opacity-90">
                  <a
                    href="https://interpsim.vercel.app"
                    className="hover:opacity-80 transition duration-200"
                  >
                    InterpSim
                  </a>
                </h1>

                {/* Subtle description */}
                <p className="text-xs sm:text-sm opacity-65 leading-relaxed">
                  Explore interpolation visually and numerically. Start by
                  entering your data points.
                </p>

                {/* Example */}
                <div className="text-[11px] sm:text-xs opacity-60 border border-[var(--color-primary)]/60 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 bg-[var(--color-primary)]/4">
                  <p className="mb-1">Example:</p>
                  <p>x: 1, 2, 3, 4</p>
                  <p>y: 2, 4, 6, 8</p>
                </div>

                {/* Hint */}
                <p className="text-[10px] sm:text-xs opacity-50">
                  Results will appear here after computation
                </p>
              </div>
            </div>
          )}

          {problems.length > 0 && (
            <>
              {/* STICKY TABS */}
              <div className="sticky top-0 z-30 bg-[var(--color-base)] px-4 sm:px-6 md:px-8 pt-4 pb-2 border-b border-[var(--color-primary)]/20 overflow-x-auto">
                <ProblemTabs
                  problems={problems}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                  onDelete={handleDelete}
                />
              </div>

              <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-6">
                {activeIndex !== null && problems[activeIndex] && (
                  <ProblemBlock
                    data={problems[activeIndex]}
                    index={activeIndex}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
