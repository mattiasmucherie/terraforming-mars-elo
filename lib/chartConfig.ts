import { ChartOptions } from "chart.js"

export const Config: ChartOptions<"line"> = {
  animation: false,
  plugins: {
    legend: {
      position: "right",
    },
  },
  parsing: false,
  maintainAspectRatio: true,
  responsive: true,
  interaction: {
    mode: "nearest",
    axis: "x",
    intersect: false,
  },
  scales: {
    x: {
      type: "linear",
      ticks: { precision: 0 },
      display: true,
      title: { display: true, text: "Game #" },
    },
    y: { display: true, title: { display: true, text: "Elo" } },
  },
  elements: { point: { radius: 0 } },
}
