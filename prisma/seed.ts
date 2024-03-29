import { faker } from "@faker-js/faker"
import { addDays, subDays } from "date-fns"

import prisma from "../lib/prisma"
import { newMatch } from "../pages/api/match/new"

const userData = [
  {
    name: faker.name.firstName(),
    id: "fcefa461-139d-472f-ad61-61dab7db704c",
    image: faker.internet.avatar(),
  },
  {
    name: faker.name.firstName(),
    id: "d5be84c0-bb1a-4255-ac5d-3a6095760d7a",
    image: faker.internet.avatar(),
  },
  {
    name: faker.name.firstName(),
    id: "9c66ffa0-05f9-4ea8-815b-e5c3c39c0299",
    image: faker.internet.avatar(),
  },
  {
    name: faker.name.firstName(),
    id: "09f83fa6-4aca-42f3-aaa2-727e3bf56957",
    image: faker.internet.avatar(),
  },
]
const corporationData = [
  { name: "Credicor", id: "3a0b613c-ac6c-4457-aafb-7a57b0446abf" },
  { name: "Ecoline", id: "00fc0717-e38c-4c9e-aa97-ebe477e0b0e1" },
  { name: "Helion", id: "50689566-ef19-41cf-bdea-4af43d890bc6" },
  { name: "Mining Guild", id: "afe28e1b-75be-4805-a9f1-24612df4c9c8" },
  {
    name: "Interplanetary Cinematics",
    id: "91c5ee0d-afc2-44cd-a690-9758f14f5c5a",
  },
  { name: "Inventrix", id: "04213f5f-c8f4-4039-9be7-7c8f230b9ae1" },
  { name: "Phobolog", id: "2689fd3f-47cb-4cb4-8090-7b697be962d7" },
  { name: "Tharsis Republic", id: "9d478013-8e0a-43c2-8275-f89e97fbb23d" },
  { name: "Thorgate", id: "db4eef05-5c5e-4df9-b808-ceae8842c673" },
  {
    name: "United Nations Mars Initiative",
    id: "d80c3aea-ce29-486b-a490-62f40850444d",
  },
  { name: "Teractor", id: "59e59119-9128-4509-a585-35e73508a0cc" },
  { name: "Saturn Systems", id: "b178e9c6-5ad1-42c8-aef5-1c62a00b63ff" },
  { name: "Cheung Shing Mars", id: "e6279941-c902-4a68-88b9-2463113d81e5" },
  { name: "Point Luna", id: "31167f7b-4775-45da-a8a9-90be61e713f3" },
  { name: "Robinson Industries", id: "b42fbf82-500e-4630-9b11-0f699b017269" },
  { name: "Valley Trust", id: "fb2d2492-e9b2-4cdd-a31c-4722ad1cab65" },
  { name: "Vitor", id: "1a0844c3-1ee9-4487-a26d-272456887224" },
  { name: "Aphrodite", id: "a4d9f9d2-325f-4bff-b47c-81000de26377" },
  { name: "Celestic", id: "bf10a5f5-6175-4159-bd67-18fba336b1fa" },
  { name: "Manutech", id: "8294b249-bc12-4849-a673-64cd5489d0e2" },
  { name: "Morning Star Inc.", id: "efb93916-6555-4c3d-8a10-38d584b5f65a" },
  { name: "Viron", id: "1bf85fd9-8820-4e69-b8da-ca673d3a6ee1" },
  { name: "Aridor", id: "cabed5b8-597d-4e1a-8ce2-b8f53f474d6c" },
  { name: "Arklight", id: "339cd86a-606e-435f-a490-34f23879751f" },
  { name: "Polyphemos", id: "9eaba334-75e6-4a56-9fe3-9c80369ba3bc" },
  { name: "Poseidon", id: "08e5c833-372f-48dc-9732-071b220e318b" },
  {
    name: "Stormcraft Incoporation",
    id: "2c785940-0818-4350-a14a-83842a182859",
  },
]
async function main() {
  // eslint-disable-next-line no-console
  console.log(`Start seeding ...`)
  await prisma.user.createMany({ data: userData })
  await prisma.corporation.createMany({
    data: corporationData,
  })
  const tournament = await prisma.tournament.create({
    data: {
      name: "Test tournament 🦥",
      startDate: subDays(new Date(), 10),
      endDate: addDays(new Date(), 10),
    },
  })
  await newMatch([
    {
      userId: userData[0].id,
      corporationId: corporationData[0].id,
      victoryPoints: 57,
      tournamentId: tournament.id,
    },
    {
      userId: userData[1].id,
      corporationId: corporationData[1].id,
      victoryPoints: 58,
      tournamentId: tournament.id,
    },
    {
      userId: userData[2].id,
      corporationId: corporationData[2].id,
      victoryPoints: 61,
      tournamentId: tournament.id,
    },
    {
      userId: userData[3].id,
      corporationId: corporationData[11].id,
      victoryPoints: 59,
      tournamentId: tournament.id,
    },
  ])
  await newMatch([
    {
      userId: userData[1].id,
      corporationId: corporationData[0].id,
      victoryPoints: 59,
    },
    {
      userId: userData[0].id,
      corporationId: corporationData[1].id,
      victoryPoints: 58,
    },
    {
      userId: userData[2].id,
      corporationId: corporationData[2].id,
      victoryPoints: 61,
    },
  ])
  await newMatch([
    {
      userId: userData[0].id,
      corporationId: corporationData[10].id,
      victoryPoints: 59,
    },
    {
      userId: userData[1].id,
      corporationId: corporationData[6].id,
      victoryPoints: 58,
    },
    {
      userId: userData[2].id,
      corporationId: corporationData[3].id,
      victoryPoints: 61,
    },
  ])
  await newMatch([
    {
      userId: userData[3].id,
      corporationId: corporationData[3].id,
      victoryPoints: 59,
      tournamentId: tournament.id,
    },
    {
      userId: userData[2].id,
      corporationId: corporationData[6].id,
      victoryPoints: 57,
      tournamentId: tournament.id,
    },
    {
      userId: userData[0].id,
      corporationId: corporationData[5].id,
      victoryPoints: 61,
      tournamentId: tournament.id,
    },
  ])
  // eslint-disable-next-line no-console
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
