import { useState, useEffect } from "react";

export default function DifferenceTable({
  xValues = [],
  yValues = [],
  table = [],
  mode = "forward",
  type = "X→Y",
}) {
  const [activeTooltip, setActiveTooltip] = useState(null);

  useEffect(() => {
    const handleClickOutside = () => setActiveTooltip(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  if (!xValues.length || !table.length) return null;

  const n = xValues.length;
  const totalRows = 2 * n - 1;

  const symbol = mode === "forward" ? "Δ" : "∇";
  const variable = type === "X→Y" ? "y" : "x";

  function formatNumber(num) {
    if (num === undefined || num === null) return "-";

    const fixed = Number(num).toFixed(6);
    return Number(fixed) < 0 ? `(${fixed})` : fixed;
  }

  return (
    <div>
      <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
        Difference Table
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-[var(--color-primary)]/20 text-[11px] sm:text-sm">
          {/* HEADER */}
          <thead>
            <tr className="bg-[var(--color-primary)]/10">
              <th className="border px-2 sm:px-3 py-2 whitespace-nowrap">
                {type === "X→Y" ? "x" : "y"}
              </th>
              <th className="border px-2 sm:px-3 py-2 whitespace-nowrap">
                {type === "X→Y" ? "y" : "x"}
              </th>

              {table.slice(1).map((_, i) => {
                const power = i + 1;
                return (
                  <th
                    key={i}
                    className="border px-2 sm:px-3 py-2 whitespace-nowrap"
                  >
                    {power === 1 ? (
                      symbol
                    ) : (
                      <>
                        {symbol}
                        <sup>{power}</sup>
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {Array.from({ length: totalRows }).map((_, rowIndex) => (
              <tr key={rowIndex} className="h-10 sm:h-12">
                {/* FIRST COLUMN */}
                <td className="border px-2 sm:px-3 py-2 text-center">
                  {rowIndex % 2 === 0 &&
                    (() => {
                      const idx = rowIndex / 2;
                      const value =
                        type === "X→Y" ? xValues[idx] : yValues[idx];

                      return (
                        <div className="relative group inline-block">
                          <div className="hidden sm:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 text-xs px-3 py-2 rounded-md bg-[var(--color-primary)] text-[var(--color-base)] opacity-0 scale-95 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 whitespace-pre text-center shadow-lg border border-[var(--color-primary)]/20">
                            {type === "X→Y" ? (
                              <>
                                x<sub>{idx}</sub>
                              </>
                            ) : (
                              <>
                                y<sub>{idx}</sub>
                              </>
                            )}
                          </div>

                          <span className="inline-block min-w-[50px] sm:min-w-[60px] px-1.5 sm:px-2 py-1 rounded-full">
                            {value?.toFixed(2)}
                          </span>
                        </div>
                      );
                    })()}
                </td>

                {/* SECOND COLUMN */}
                <td className="border px-2 sm:px-3 py-2 text-center">
                  {rowIndex % 2 === 0 &&
                    (() => {
                      const idx = rowIndex / 2;
                      const value =
                        type === "X→Y" ? yValues[idx] : xValues[idx];

                      const highlight =
                        (mode === "forward" && idx === 0) ||
                        (mode === "backward" && idx === n - 1);

                      return (
                        <div className="relative group inline-block">
                          <div className="hidden sm:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 text-xs px-3 py-2 rounded-md bg-[var(--color-primary)] text-[var(--color-base)] opacity-0 scale-95 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 whitespace-pre text-center shadow-lg border border-[var(--color-primary)]/20">
                            {type === "X→Y" ? (
                              <>
                                y<sub>{idx}</sub>
                              </>
                            ) : (
                              <>
                                x<sub>{idx}</sub>
                              </>
                            )}
                          </div>

                          <span
                            className={`inline-block min-w-[50px] sm:min-w-[60px] px-1.5 sm:px-2 py-1 rounded-full
                          ${
                            highlight
                              ? "border-[1.5px] border-dashed border-[var(--color-primary)] font-semibold"
                              : ""
                          }`}
                          >
                            {value?.toFixed(2)}
                          </span>
                        </div>
                      );
                    })()}
                </td>

                {/* DIFFERENCE COLUMNS */}
                {table.slice(1).map((col, colIndex) => {
                  let value = "";
                  let highlight = false;
                  let index = -1;

                  const k = colIndex + 1;

                  if ((rowIndex - k) % 2 === 0) {
                    index = (rowIndex - k) / 2;

                    if (index >= 0 && col[index] !== undefined) {
                      value = col[index].toFixed(6);

                      if (mode === "forward" && index === 0) highlight = true;
                      if (mode === "backward" && index === col.length - 1)
                        highlight = true;
                    }
                  }

                  const tooltipKey = `${rowIndex}-${colIndex}`;

                  return (
                    <td
                      key={colIndex}
                      className="border px-2 sm:px-3 py-2 text-center"
                    >
                      {value && (
                        <div
                          className="relative group inline-block"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTooltip(
                              activeTooltip === tooltipKey ? null : tooltipKey,
                            );
                          }}
                        >
                          <div
                            className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 text-xs px-3 py-2 rounded-md bg-[var(--color-primary)] text-[var(--color-base)] 
                            transition-all duration-300 whitespace-pre text-center shadow-lg border border-[var(--color-primary)]/20
                            ${
                              activeTooltip === tooltipKey
                                ? "opacity-100 scale-100 translate-y-0"
                                : "opacity-0 scale-95 translate-y-1 pointer-events-none"
                            }
                            sm:group-hover:opacity-100 sm:group-hover:scale-100 sm:group-hover:translate-y-0
                          `}
                          >
                            {(() => {
                              const baseIndex =
                                mode === "backward"
                                  ? index + colIndex + 1
                                  : index;

                              const prevCol = table[colIndex];

                              const curr = prevCol[index + 1];
                              const prev = prevCol[index];

                              return (
                                <>
                                  {colIndex === 0 ? (
                                    <>
                                      {symbol}
                                      {variable}
                                      <sub>{baseIndex}</sub> =
                                      {mode === "forward" ? (
                                        <>
                                          {variable}
                                          <sub>{baseIndex + 1}</sub> −{" "}
                                          {variable}
                                          <sub>{baseIndex}</sub>
                                        </>
                                      ) : (
                                        <>
                                          {variable}
                                          <sub>{baseIndex}</sub> − {variable}
                                          <sub>{baseIndex - 1}</sub>
                                        </>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      {symbol}
                                      <sup>{colIndex + 1}</sup>
                                      {variable}
                                      <sub>{baseIndex}</sub> ={symbol}
                                      {colIndex === 1 ? (
                                        ""
                                      ) : (
                                        <sup>{colIndex}</sup>
                                      )}
                                      {variable}
                                      <sub>{baseIndex}</sub>
                                      {" − "}
                                      {symbol}
                                      {colIndex === 1 ? (
                                        ""
                                      ) : (
                                        <sup>{colIndex}</sup>
                                      )}
                                      {variable}
                                      <sub>{baseIndex - 1}</sub>
                                    </>
                                  )}
                                  <br />={" "}
                                  {curr !== undefined
                                    ? formatNumber(curr)
                                    : "-"}{" "}
                                  −{" "}
                                  {prev !== undefined
                                    ? formatNumber(prev)
                                    : "-"}
                                  <br />= <b>{value}</b>
                                </>
                              );
                            })()}
                          </div>

                          <span
                            className={`inline-block min-w-[50px] sm:min-w-[60px] px-1.5 sm:px-2 py-1 rounded-full transition-all duration-200 group-hover:bg-[var(--color-primary)]/10
                          ${
                            highlight
                              ? "border-[1.5px] border-dashed border-[var(--color-primary)] font-semibold"
                              : ""
                          }`}
                          >
                            {value}
                          </span>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
