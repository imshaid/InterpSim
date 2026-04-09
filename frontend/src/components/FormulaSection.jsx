import katex from "katex";
import "katex/dist/katex.min.css";

export default function FormulaSection({ formula }) {
  if (!formula) return null;

  // STRING CASE
  if (typeof formula === "string") {
    return (
      <div className="mt-4 sm:mt-6">
        <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 opacity-80">
          Interpolation Info
        </h3>

        <div
          className="p-4 sm:p-5 rounded-xl
                     border border-[var(--color-primary)]/20
                     bg-[var(--color-primary)]/5 
                     text-xs sm:text-sm opacity-80 break-words"
        >
          {formula}
        </div>
      </div>
    );
  }

  if (!Array.isArray(formula) || formula.length === 0) {
    return (
      <div className="mt-4 sm:mt-6 text-xs sm:text-sm opacity-60">
        No formula available
      </div>
    );
  }

  const renderKatex = (expr, display = false) => {
    try {
      return katex.renderToString(expr, {
        throwOnError: false,
        displayMode: display,
      });
    } catch {
      return "<span style='color:red'>Invalid</span>";
    }
  };

  return (
    <div className="mt-4 sm:mt-6">
      <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
        Interpolation Formulas
      </h3>

      <div
        className="p-4 sm:p-5 rounded-xl space-y-4 sm:space-y-5
                   border border-[var(--color-primary)]/20
                   bg-[var(--color-primary)]/5 
                   overflow-x-auto"
      >
        {/* FIRST LINE */}
        <div className="flex justify-center items-center gap-4 sm:gap-8 text-sm sm:text-base whitespace-nowrap">
          {formula.slice(0, 3).map((f, i) => (
            <div key={i} className="flex items-center gap-3 sm:gap-8">
              <span
                dangerouslySetInnerHTML={{
                  __html: renderKatex(f),
                }}
              />

              {i !== Math.min(2, formula.length - 1) && (
                <span className="opacity-60 text-base sm:text-lg">•</span>
              )}
            </div>
          ))}
        </div>

        {/* MAIN FORMULA */}
        {formula[3] && (
          <div className="text-center">
            <div
              className="text-sm sm:text-base leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: renderKatex(formula[3], true),
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
