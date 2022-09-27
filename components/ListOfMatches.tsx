import { Box } from "@chakra-ui/react"
import { Badge, Flex, Stack, Stat, StatArrow } from "@chakra-ui/react"
import { Corporation, Match, MatchRanking, User } from "@prisma/client"
import format from "date-fns/format"
import Link from "next/dist/client/link"
import { FC, useCallback } from "react"

import NextAvatar from "./NextAvatar"

interface ListOfMatchesProps {
  matches: (Match & {
    matchRankings: (MatchRanking & {
      user: User
      corporation?: Corporation | null
    })[]
  })[]
}

const ListOfMatches: FC<ListOfMatchesProps> = ({ matches }) => {
  const getRankDiff = useCallback(
    (matchRanking: MatchRanking) =>
      Math.round(matchRanking.newRank - matchRanking.prevRank),
    []
  )

  return (
    <>
      {matches.map((m) => {
        return (
          <Link href={`/match/${m.id}`} key={m.id}>
            <Box borderWidth="1px" borderRadius="lg" mb="3" p="4">
              <Flex justifyContent="space-between">
                <Stack>
                  {m.matchRankings.map((mr) => (
                    <Flex key={mr.id} alignItems="center" gap={2}>
                      <Flex flexShrink={0} alignItems="center">
                        <NextAvatar
                          width="24px"
                          height="24px"
                          alt={mr.user.name}
                          src={mr.user.image || ""}
                        />
                      </Flex>
                      <Badge>{mr.corporation?.name}</Badge>

                      <Stat>
                        <StatArrow
                          type={getRankDiff(mr) > 0 ? "increase" : "decrease"}
                        />
                        {getRankDiff(mr)}
                      </Stat>
                    </Flex>
                  ))}
                </Stack>

                <time>{format(new Date(m.createdAt), "dd MMM")}</time>
              </Flex>
            </Box>
          </Link>
        )
      })}
    </>
  )
}

export default ListOfMatches
