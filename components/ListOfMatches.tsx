import { Corporation, Match, MatchRanking, User } from "@prisma/client"
import { FC, useCallback, useMemo } from "react"
import { Avatar, AvatarGroup, Box } from "@chakra-ui/react"
import Link from "next/dist/client/link"
import { Flex, Badge, Stack, Stat, StatArrow } from "@chakra-ui/react"
import Moment from "react-moment"
import { find, propEq } from "ramda"

interface ListOfMatchesProps {
  matches: (Match & { matchRankings: (MatchRanking & { user: User })[] })[]
  corporations: Corporation[]
}

const ListOfMatches: FC<ListOfMatchesProps> = ({ matches, corporations }) => {
  const getCorp = useCallback(
    (corpId: any) => find(propEq("id", corpId), corporations),
    [corporations]
  )

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
                    <Flex key={mr.id} alignItems="center">
                      <Avatar
                        size="xs"
                        name={mr.user.name}
                        src={mr.user.image || undefined}
                        mr="2"
                      />

                      <Badge mr="2">{getCorp(mr.corporationId)?.name}</Badge>

                      <Stat>
                        <StatArrow
                          type={getRankDiff(mr) > 0 ? "increase" : "decrease"}
                        />
                        {getRankDiff(mr)}
                      </Stat>
                    </Flex>
                  ))}
                </Stack>

                <Moment date={m.createdAt} format="D MMM" />
              </Flex>
            </Box>
          </Link>
        )
      })}
    </>
  )
}

export default ListOfMatches
