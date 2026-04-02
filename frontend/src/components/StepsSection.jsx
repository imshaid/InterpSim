import katex from "katex";
import "katex/dist/katex.min.css";

export default function StepsSection({ steps, polyEq }) {
  if (!Array.isArray(steps) || steps.length === 0) return null;

  const renderKatex = (expr) => {
    try {
      return katex.renderToString(expr, {
        throwOnError: false,
        displayMode: true,
      });
    } catch {
      return "<span style='color:red'>Invalid</span>";
    }
  };

  return (
    <div className="mt-4 sm:mt-6">
      <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
        Solution
      </h3>

      <div
        className="p-4 sm:p-6 rounded-xl
                   border border-[var(--color-primary)]/20
                   bg-[var(--color-primary)]/5
                   space-y-4 sm:space-y-5"
      >
        {/* GIVEN */}
        <div className="space-y-2 sm:space-y-3">
          <p className="text-[10px] sm:text-xs uppercase tracking-wide opacity-50">
            Given
          </p>

          <div className="space-y-1">
            {steps.slice(0, 2).map((step, i) => (
              <div
                key={i}
                className="text-sm sm:text-base leading-relaxed overflow-x-auto"
                dangerouslySetInnerHTML={{
                  __html: renderKatex(step),
                }}
              />
            ))}
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-[var(--color-primary)]/20 pt-3 sm:pt-4" />

        {/* CALCULATION */}
        <div className="space-y-2 sm:space-y-3">
          <p className="text-[10px] sm:text-xs uppercase tracking-wide opacity-50">
            Calculation
          </p>

          <div className="space-y-[-6px] sm:space-y-[-8px] overflow-x-auto">
            {steps.slice(2).map((step, i) => (
              <div key={i}>
                {i === 1 && <div className="h-4 sm:h-6" />}

                <div
                  className={`w-full text-left flex justify-start ${
                    i === steps.length - 1
                      ? "font-semibold text-base sm:text-lg"
                      : "opacity-90 text-sm sm:text-base"
                  }`}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: renderKatex(step),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* POLYNOMIAL */}
        {polyEq && (
          <>
            <div className="border-t border-[var(--color-primary)]/20 pt-3 sm:pt-4" />

            <div className="space-y-1 sm:space-y-2">
              <p className="text-[10px] sm:text-xs uppercase tracking-wide opacity-50">
                Polynomial
              </p>

              <div
                className="text-sm sm:text-base leading-relaxed overflow-x-auto"
                dangerouslySetInnerHTML={{
                  __html: katex.renderToString(`y = ${polyEq}`, {
                    throwOnError: false,
                    displayMode: true,
                  }),
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
