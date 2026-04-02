import { useEffect, useRef } from "react";
import Plotly from "plotly.js-dist-min";

export default function GraphSection({ graph }) {
  const plotRef = useRef(null);

  useEffect(() => {
    if (!graph) return;

    const traces = [
      {
        x: graph.x,
        y: graph.y,
        mode: "markers",
        type: "scatter",
        name: "Data Points",
        marker: {
          color: "#333333",
          size: 7,
        },
        hoverlabel: {
          bgcolor: "#333333",
          font: { color: "#f9fafb" },
        },
      },
      {
        x: graph.x_smooth,
        y: graph.y_smooth,
        mode: "lines",
        type: "scatter",
        name: "Interpolation Curve",
        line: {
          color: "rgba(51,51,51,0.6)",
          width: 2.5,
          shape: "spline",
        },
        hoverlabel: {
          bgcolor: "#333333",
          font: { color: "#f9fafb" },
        },
        hovertemplate: "(%{x}, %{y})<extra>%{fullData.name}</extra>",
      },
      ...(graph.target_x !== undefined
        ? [
            {
              x: [graph.target_x],
              y: [graph.target_y],
              mode: "markers",
              type: "scatter",
              name: "Target",
              marker: {
                color: "#333333",
                size: 10,
                symbol: "diamond",
              },
            },
          ]
        : []),
    ];

    const layout = {
      title: {
        text: "Interpolation Graph",
        font: { color: "#333333", size: 14 },
      },
      paper_bgcolor: "#f9fafb",
      plot_bgcolor: "#f9fafb",

      xaxis: {
        color: "#333333",
        gridcolor: "rgba(51,51,51,0.08)",
      },
      yaxis: {
        color: "#333333",
        gridcolor: "rgba(51,51,51,0.08)",
      },

      legend: {
        orientation: "h",
        y: -0.25,
        x: 0.5,
        xanchor: "center",
        font: { color: "#333333", size: 11 },
      },

      margin: { t: 40, l: 40, r: 20, b: 70 },

      hovermode: "closest",

      shapes: [], // dynamic
    };

    Plotly.newPlot(plotRef.current, traces, layout, {
      responsive: true,
      displaylogo: false,
    });

    const plot = plotRef.current;

    // 🔥 HOVER CROSSHAIR
    plot.on("plotly_hover", (event) => {
      const x = event.points[0].x;
      const y = event.points[0].y;

      Plotly.relayout(plot, {
        shapes: [
          {
            type: "line",
            x0: x,
            x1: x,
            y0: plot.layout.yaxis.range?.[0] ?? 0,
            y1: plot.layout.yaxis.range?.[1] ?? y,
            line: {
              color: "rgba(51,51,51,0.3)",
              width: 1,
              dash: "dot",
            },
          },
          {
            type: "line",
            x0: plot.layout.xaxis.range?.[0] ?? 0,
            x1: plot.layout.xaxis.range?.[1] ?? x,
            y0: y,
            y1: y,
            line: {
              color: "rgba(51,51,51,0.3)",
              width: 1,
              dash: "dot",
            },
          },
        ],
      });
    });

    // 🔥 REMOVE CROSSHAIR ON LEAVE
    plot.on("plotly_unhover", () => {
      Plotly.relayout(plot, { shapes: [] });
    });

    // 🔥 CLICK → INTERPOLATION VALUE
    plot.on("plotly_click", (event) => {
      const clickedX = event.points[0].x;

      // nearest smooth point
      let closestIndex = 0;
      let minDiff = Infinity;

      graph.x_smooth.forEach((val, i) => {
        const diff = Math.abs(val - clickedX);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = i;
        }
      });

      const interpX = graph.x_smooth[closestIndex];
      const interpY = graph.y_smooth[closestIndex];

      Plotly.addTraces(plot, {
        x: [interpX],
        y: [interpY],
        mode: "markers",
        type: "scatter",
        name: "Clicked Point",
        marker: {
          color: "#333333",
          size: 9,
          symbol: "circle-open",
        },
        hovertemplate: "X: %{x}<br>Interpolated: %{y}<extra>Click</extra>",
      });
    });

    return () => {
      plot.removeAllListeners?.();
    };
  }, [graph]);

  return (
    <div>
      <h3 className="text-lg font-semibold">Graph Visualization</h3>
      <div ref={plotRef} className="w-full h-[400px]" />
    </div>
  );
}
