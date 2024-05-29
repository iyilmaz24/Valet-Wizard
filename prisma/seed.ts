import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const cars = [
  {
    name: "Bentley",
    ownerName: "John Doe",
    imageUrl:
      "https://images.unsplash.com/photo-1631827741430-98c01f33e84f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    age: 2019,
    notes: "Full interior service.",
  },
  {
    name: "Toyota",
    ownerName: "Frank Doe",
    imageUrl:
      "https://images.unsplash.com/photo-1638618164682-12b986ec2a75?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    age: 2022,
    notes: "Clean the carpets only.",
  },
  {
    name: "BMW",
    ownerName: "Josephine Dane",
    imageUrl:
      "https://images.unsplash.com/flagged/photo-1553505192-acca7d4509be?q=80&w=1790&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    age: 2020,
    notes: "Allergic to certain chemicals.",
  },
];

async function main() {
  console.log(`Start seeding ...`);

  for (const car of cars) {
    const result = await prisma.car.create({
      data: car,
    });
    console.log(`Created car with id: ${result.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
