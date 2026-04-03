import { useState } from "react";
import toast from "react-hot-toast";

export default function InputPanel({ onSolve }) {
  const [xValues, setXValues] = useState("");
  const [yValues, setYValues] = useState("");
  const [target, setTarget] = useState("");

  const [xRaw, setXRaw] = useState([]);

  const parseArray = (str) =>
    str
      .split(",")
      .map((v) => Number(v.trim()))
      .filter((v) => !isNaN(v));

  const parseSingle = (str) => {
    const num = Number(str.trim());
    return isNaN(num) ? null : num;
  };

  const handleSubmit = () => {
    const xParsed = parseArray(xValues);
    const y = parseArray(yValues);
    const t = parseSingle(target);

    const x = xRaw.length ? xRaw : xParsed;

    if (!xValues || !yValues) {
      toast.error("Enter both X and Y values", {
        style: { background: "#333333", color: "#f9fafb" },
      });
      return;
    }

    if (x.length !== y.length) {
      toast.error("X and Y length must match", {
        style: { background: "#333333", color: "#f9fafb" },
      });
      return;
    }

    if (x.length < 2) {
      toast.error("Provide at least 2 data points", {
        style: { background: "#333333", color: "#f9fafb" },
      });
      return;
    }

    if (t === null) {
      toast.error("Enter a valid target value", {
        style: { background: "#333333", color: "#f9fafb" },
      });
      return;
    }

    const minX = Math.min(...x);
    const maxX = Math.max(...x);

    if (t < minX || t > maxX) {
      toast.error(
        `Target is outside range (${minX.toFixed(2)} to ${maxX.toFixed(2)})`,
        {
          style: { background: "#333333", color: "#f9fafb" },
        },
      );
      return;
    }

    onSolve({
      x,
      y,
      target: t,
    });
  };

  const handleClear = () => {
    setXValues("");
    setYValues("");
    setTarget("");
    setXRaw([]);
  };

  const handleRandom = () => {
    const n = Math.floor(Math.random() * 4) + 7;

    const intervalTypes = [
      () => Math.random() * 0.5 + 0.1,
      () => Math.random() * 2 + 0.5,
      () => Math.random() * 10 + 2,
    ];

    const interval =
      intervalTypes[Math.floor(Math.random() * intervalTypes.length)]();

    const start = Math.random() * 20 - 10;

    const xGenerated = Array.from(
      { length: n },
      (_, i) => start + i * interval,
    );

    const xSorted = [...xGenerated].sort((a, b) => a - b);

    setXRaw(xSorted);

    const A1 = Math.random() * 8 + 4;
    const A2 = Math.random() * 5 + 2;
    const A3 = Math.random() * 3 + 1;

    const f1 = Math.random() * 0.3 + 0.1;
    const f2 = Math.random() * 0.6 + 0.3;
    const f3 = Math.random() * 1.0 + 0.5;

    const phase1 = Math.random() * Math.PI;
    const phase2 = Math.random() * Math.PI;
    const phase3 = Math.random() * Math.PI;

    const trendSlope = Math.random() * 2 - 1;

    const y = xSorted.map((xi) => {
      const wave1 = A1 * Math.sin(f1 * xi + phase1);
      const wave2 = A2 * Math.cos(f2 * xi + phase2);
      const wave3 = A3 * Math.sin(f3 * xi + phase3);

      const trend = trendSlope * xi;
      const noise = Math.random() * 1.5 - 0.75;

      return Number((wave1 + wave2 + wave3 + trend + noise).toFixed(2));
    });

    const minX = xSorted[0];
    const maxX = xSorted[xSorted.length - 1];
    const t = (Math.random() * (maxX - minX) + minX).toFixed(2);

    const xDisplay = xSorted.map((v) => Number(v.toFixed(2)));

    setXValues(xDisplay.join(", "));
    setYValues(y.join(", "));
    setTarget(t);
  };

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-6 space-y-5 sm:space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-base sm:text-lg font-semibold">Input Data</h2>

        <div className="flex gap-2">
          <button
            onClick={handleRandom}
            className="text-xs px-3 py-1.5 border border-[var(--color-primary)]/20 rounded-lg hover:bg-[var(--color-primary)]/5 transition w-full sm:w-auto"
          >
            Random
          </button>

          <button
            onClick={handleClear}
            className="text-xs px-3 py-1.5 border border-[var(--color-primary)]/20 rounded-lg hover:bg-[var(--color-primary)]/5 transition w-full sm:w-auto"
          >
            Clear
          </button>
        </div>
      </div>

      {/* INPUTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* X */}
        <div>
          <label className="text-xs sm:text-sm opacity-70">X Values</label>
          <input
            type="text"
            value={xValues}
            onChange={(e) => {
              setXValues(e.target.value);
              setXRaw([]);
            }}
            placeholder="1, 2, 3, 4"
            className="w-full mt-1 px-3 py-2 text-sm sm:text-base border border-[var(--color-primary)]/20 rounded-lg 
                       focus:outline-none focus:border-[var(--color-primary)] transition"
          />
        </div>

        {/* Y */}
        <div>
          <label className="text-xs sm:text-sm opacity-70">Y Values</label>
          <input
            type="text"
            value={yValues}
            onChange={(e) => setYValues(e.target.value)}
            placeholder="2, 4, 6, 8"
            className="w-full mt-1 px-3 py-2 text-sm sm:text-base border border-[var(--color-primary)]/20 rounded-lg 
                       focus:outline-none focus:border-[var(--color-primary)] transition"
          />
        </div>

        {/* TARGET */}
        <div className="md:col-span-2">
          <label className="text-xs sm:text-sm opacity-70">Find Y at X =</label>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3.5 mt-1">
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="2.5"
              className="w-full sm:w-1/2 px-3 py-2 text-sm sm:text-base border border-[var(--color-primary)]/20 rounded-lg 
                         focus:outline-none focus:border-[var(--color-primary)] transition"
            />

            <button
              onClick={handleSubmit}
              className="w-full sm:w-1/2 px-3 py-2 text-sm sm:text-base rounded-lg bg-[var(--color-primary)] text-[var(--color-base)] 
                         hover:opacity-90 transition"
            >
              Calculate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
