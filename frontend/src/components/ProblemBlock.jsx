import { useEffect } from "react";
import toast from "react-hot-toast";

import DifferenceTable from "./DifferenceTable";
import FormulaSection from "./FormulaSection";
import StepsSection from "./StepsSection";
import GraphSection from "./GraphSection";

export default function ProblemBlock({ data, index }) {
  const hasResult = typeof data.result === "number" && !isNaN(data.result);

  const isExact = data.x.includes(data.target) && hasResult;

  useEffect(() => {
    if (isExact) {
      toast.dismiss();

      toast.success(
        <div className="leading-snug">
          <div>No interpolation needed</div>
          <div>
            f({data.target}) = {data.result.toFixed(6)}
          </div>
        </div>,
        {
          id: `exact-${index}`,
          style: {
            background: "#333333",
            color: "#f9fafb",
          },
        },
      );
    }
  }, [isExact, index]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* HEADER */}
      <div className="space-y-2 sm:space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">
          Problem {index + 1}
        </h2>

        <div className="text-xs sm:text-sm opacity-80 space-y-1 leading-relaxed break-words">
          <p>
            <b>X:</b> {data.x.map((v) => Number(v).toFixed(2)).join(", ")}
          </p>

          <p>
            <b>Y:</b> {data.y.map((v) => Number(v).toFixed(2)).join(", ")}
          </p>

          <p>
            <b>Find:</b>{" "}
            <span className="font-semibold">
              f({Number(data.target).toFixed(2)})
            </span>
          </p>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-[var(--color-primary)]/20"></div>

      {/* EXACT MATCH */}
      {isExact ? (
        <div className="flex items-center justify-center py-8 sm:py-10">
          <div
            className="
              text-center space-y-3 
              px-6 sm:px-10 md:px-16 lg:px-20 
              py-6 sm:py-8 
              rounded-xl
              border border-[var(--color-primary)]/20
              bg-[var(--color-primary)]/5
              w-full max-w-md
            "
          >
            <p className="font-semibold text-base sm:text-lg">
              Exact Match Found
            </p>

            <p className="text-xs sm:text-sm opacity-60">
              No interpolation required
            </p>

            <p className="text-lg sm:text-xl font-bold break-words">
              f({data.target}) = {hasResult ? data.result.toFixed(6) : "N/A"}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-8 sm:space-y-10">
          {/* TABLE */}
          <div className="space-y-3 overflow-x-auto">
            <DifferenceTable
              xValues={data.axisX}
              yValues={data.axisY}
              table={data.table}
              mode={data.method}
              type="X→Y"
            />
          </div>

          {/* FORMULA */}
          <div className="space-y-3 overflow-x-auto">
            <FormulaSection formula={data.formula} />
          </div>

          {/* STEPS */}
          <div className="space-y-3 overflow-x-auto">
            <StepsSection steps={data.steps} polyEq={data.polyEq} />
          </div>

          {/* GRAPH */}
          {data.graph && (
            <>
              <div className="space-y-3 overflow-x-auto">
                <GraphSection graph={data.graph} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
