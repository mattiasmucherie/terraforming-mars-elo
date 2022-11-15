import { ChartOptions, TooltipItem } from "chart.js"

const footer = (tooltipItems: TooltipItem<"line">[]) => {
  const winner = tooltipItems.find(
    (t) => (t.raw as { x: number; y: number; standing: number }).standing === 1
  )
  if (winner) {
    const isRikardPlayingAndNotTheWinner =
      !!tooltipItems.find((t) => t.dataset.label === "Rikard") &&
      winner.dataset.label !== "Rikard"
    return (
      "Winner: " +
      winner.dataset.label +
      (isRikardPlayingAndNotTheWinner ? " 🥳" : "")
    )
  }
  return "Cannot see the winner in this game"
}

const title = (t: TooltipItem<"line">[]) => {
  return "Game: " + t[0].label
}

interface RawTooltip {
  x: number
  y: number
  standing: number
}

export const Config: ChartOptions<"line"> = {
  animation: false,
  plugins: {
    legend: {
      position: "bottom",
    },
    tooltip: {
      itemSort: (a, b) =>
        (a.raw as RawTooltip).standing - (b.raw as RawTooltip).standing,
      callbacks: {
        footer: footer,
        title: title,
      },
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
    y: { display: true },
  },
  elements: { point: { radius: 0 } },
}
