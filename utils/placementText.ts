export const placementText = (pos: number) => {
  if (pos === 1) return "First place 🥇"
  if (pos === 2) return "Second place 🥈"
  if (pos === 3) return "Third place 🥉"
  if (pos === 4) return "Fourth place"
  if (pos === 5) return "Fifth place"
  return `${pos}th place`
}
