import prisma from "../lib/prisma"
const getRandomImage = () => {
  const images = [
    "https://ekhaqsvkyqszwbsovncd.supabase.co/storage/v1/object/public/image-terraranking/A%20Van%20gogh%20painting%20of%20an%20astronaut%20planting%20trees%20on%20Mars.png",
    "https://ekhaqsvkyqszwbsovncd.supabase.co/storage/v1/object/public/image-terraranking/A%20Van%20gogh%20painting%20of%20an%20astronaut%20planting%20trees%20on%20Mars2.png",
    "https://ekhaqsvkyqszwbsovncd.supabase.co/storage/v1/object/public/image-terraranking/A%20Van%20gogh%20painting%20of%20an%20astronaut%20swimming%20on%20Mars.png",
  ]
  return images[Math.floor(Math.random() * images.length)]
}
const userData = [
  { name: "Mattias", image: getRandomImage() },
  { name: "Anton", image: getRandomImage() },
  { name: "Cornelius", image: getRandomImage() },
  { name: "Rikard", image: getRandomImage() },
  { name: "Patrik", image: getRandomImage() },
  { name: "Leo", image: getRandomImage() },
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
