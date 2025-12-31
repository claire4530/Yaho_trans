// prisma/seed.js
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

(async () => {
  const passwordHash = await bcrypt.hash("123456", 10);

  await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Admin",
      password: passwordHash,
      role: "ADMIN",
    },
  });

  console.log("管理員帳號建立完成");
  await prisma.$disconnect();
})();
