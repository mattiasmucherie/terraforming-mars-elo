import { compose, equals, filter, length, map, values } from "ramda"

import validatePlayerStats from "./validate-player-stats"

const validateStats = compose<any, any, any, any, any, boolean>(
  equals(0),
  length,
  filter(equals(false)),
  values,
  map(validatePlayerStats)
)

export default validateStats
