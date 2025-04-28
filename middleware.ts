import { withAuth } from 'next-auth/middleware';
import { Role }     from "@prisma/client";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => token?.role === Role.ADMIN,
  }
});

export const config = { matcher: ['/admin/:path*'] };
