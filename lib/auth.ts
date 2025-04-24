import {NextAuthOptions} from 'next-auth';
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import {prisma} from '@/lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Email & Password',
            credentials: {
                email: {label: 'Email', type: 'email'},
                password: {label: 'Password', type: 'password'},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error('Missing credentials');
                }
                // 1) Look up the user by email
                const user = await prisma.user.findUnique({
                    where: {email: credentials.email},
                });
                if (!user || !user.passwordHash) {
                    throw new Error('No user found');
                }
                // 2) Verify the password
                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.passwordHash
                );
                if (!isValid) {
                    throw new Error('Invalid password');
                }
                // 3) Return the user object → NextAuth creates a session
                return user;
            },
        }),

        // …you can drop in OAuth providers here (Google, GitHub, etc.)…
    ],
    callbacks: {
        // 1) When the JWT is created/updated, stash your user.id & role
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        // 2) Each time `useSession()` or `getServerSession()` is called,
        //    merge those token fields into the session object
        async session({session, token}) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as 'USER' | 'ADMIN';
                session.user.isAdmin = token.role === 'ADMIN';
            }
            return session;
        },
    },
}