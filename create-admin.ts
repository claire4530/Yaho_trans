// create-admin.ts
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // 1. 設定你想建立的帳號密碼
  const email = 'yaho@example.com'  // 改成你要的 email
  const rawPassword = 'password123'     // 改成你要的密碼

  console.log(`正在建立使用者: ${email}...`)

  // 2. 加密密碼
  const hashedPassword = await bcrypt.hash(rawPassword, 10)

  // 3. 寫入資料庫
  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword, 
        name: 'Admin', // 如果你的 Schema 有 name 欄位，可以取消註解
        role: 'ADMIN', // 如果你有 role 欄位，記得加上
      },
    })
    console.log('✅ 成功建立使用者！')
    console.log(user)
  } catch (e: any) {
    if (e.code === 'P2002') {
      console.log('⚠️ 這個 Email 已經被註冊過了！')
    } else {
      console.error('❌ 發生錯誤:', e)
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })