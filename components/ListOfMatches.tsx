import { Box, Tag, Text } from "@chakra-ui/react"
import { Flex, Stack, Stat, StatArrow } from "@chakra-ui/react"
import {
  Corporation,
  Match,
  MatchRanking,
  Tournament,
  User,
} from "@prisma/client"
import format from "date-fns/format"
import Link from "next/dist/client/link"
import { FC, useCallback } from "react"

import CorporationLogo from "./CorporationLogo"
import NextAvatar from "./NextAvatar"

interface ListOfMatchesProps {
  matches: (Match & {
    matchRankings: (MatchRanking & {
      user: User
      corporation?: Corporation | null
      tournament?: Tournament | null
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
            <Box
              display="flex"
              flexDirection="column"
              borderWidth="1px"
              borderRadius="lg"
              mb="3"
              p="4"
              pb="5"
              pt="3"
            >
              <Flex
                gap={4}
                alignItems="center"
                justifyContent="space-between"
                mb={4}
              >
                <Text fontWeight="bold">
                  Match{" - "}
                  <time>
                    {format(new Date(m.createdAt || 0), "dd MMM, yyyy")}
                  </time>
                </Text>
                {m.matchRankings[0].tournament && (
                  <Tag size="sm" borderRadius="full">
                    {m.matchRankings[0].tournament.name}
                  </Tag>
                )}
              </Flex>
              <Stack spacing={3}>
                {m.matchRankings.map((mr) => (
                  <Flex
                    key={mr.id}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Flex flexShrink={0} alignItems="center" mr={3}>
                      <Flex flexShrink={0} alignItems="center" mr={3}>
                        <NextAvatar
                          width="28px"
                          height="28px"
                          alt={mr.user.name}
                          src={mr.user.image || ""}
                        />
                      </Flex>

                      <CorporationLogo id={mr.corporation?.id} size={24} />
                    </Flex>

                    <Box>
                      <Stat>
                        <StatArrow
                          type={getRankDiff(mr) > 0 ? "increase" : "decrease"}
                        />
                        {getRankDiff(mr)}
                      </Stat>
                    </Box>
                  </Flex>
                ))}
              </Stack>
            </Box>
          </Link>
        )
      })}
    </>
  )
}

export default ListOfMatches
