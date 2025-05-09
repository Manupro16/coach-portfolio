# scripts/setup.sh
cp .env.example .env
npm install
npx prisma generate
npx prisma db push
