const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function addUser() {
  await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@gmail.com",
      posts: {
        create: {
          title: "Hello World",
          body: "This is a post.",
          slug: "hello-world",
        },
      },
    },
  });
}

async function main() {
  //   await addUser();
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });

  console.dir(allUsers, { depth: null });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
