import prisma from "../lib/prisma"

const userData = [
  { name: "Mattias" },
  { name: "Anton" },
  { name: "Cornelius" },
  { name: "Rikard" },
  { name: "Patrik" },
  { name: "Leo" },
]
const corporationData = [
  { name: "Credicor" },
  { name: "Ecoline" },
  { name: "Helion" },
  { name: "Mining Guild" },
  { name: "Interplanetary Cinematics" },
  { name: "Inventrix" },
  { name: "Phobolog" },
  { name: "Tharsis Republic" },
  { name: "Thorgate" },
  { name: "United Nations Mars Initiative" },
  { name: "Teractor" },
  { name: "Saturn Systems" },
  { name: "Cheung Shing Mars" },
  { name: "Point Luna" },
  { name: "Robinson Industries" },
  { name: "Valley Trust" },
  { name: "Vitor" },
]
async function main() {
  console.log(`Start seeding ...`)
  await prisma.user.createMany({ data: userData })
  await prisma.corporation.createMany({
    data: corporationData,
  })
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
