// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // 1. 設定你的密碼 (這裡範例是用 123456)
  const password = await bcrypt.hash('Yaho@1234', 10)

  // 2. 建立使用者
  const user = await prisma.user.upsert({
    where: { email: 'admin@zcstcl.com' },
    update: { role: 'admin',
      password: password, }, // 更新時也更新密碼
    create: {
      email: 'admin@zcstcl.com',
      name: 'Admin User',
      password: password, // 存入加密後的密碼
      role: 'admin',
    },
  })

  console.log({ user })
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