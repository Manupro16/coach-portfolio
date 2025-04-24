// app/admin/layout.tsx
import {ReactNode} from 'react';
import {getServerSession} from 'next-auth/next';
import {authOptions} from '@/lib/auth';
import {redirect} from 'next/navigation';

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({
  children,
}: AdminLayoutProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    redirect('/');
  }
  return <>{children}</>;
}
