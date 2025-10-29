// scripts/create-admin.ts
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@example.com'
  const password = process.env.ADMIN_PASSWORD ?? 'ChangeMeNow!'
  const name = process.env.ADMIN_NAME ?? 'Site Admin'

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await prisma.user.upsert({
    where: { email },
    update: { role: 'ADMIN', passwordHash },
    create: { email, name, role: 'ADMIN', passwordHash },
  })

  console.log('Admin ready:', { id: user.id, email: user.email, role: user.role })
}

main().finally(() => prisma.$disconnect())

// $env:ADMIN_EMAIL="you@example.com"; $env:ADMIN_PASSWORD="YourStrongPassword123"; npx ts-node scripts/create-admin.ts