'use client';
import Header from "../components/header";
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '../components/protectedroute';


export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  return (
    <ProtectedRoute router={router}>
      <div>
        <Header />
        <section style={{ padding: "0px 20px" }}>{children}</section>
      </div>
    </ProtectedRoute>

  );
}
