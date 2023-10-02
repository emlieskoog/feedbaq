'use client';
import Header from "../components/header";
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '../components/protectedroute';
import "../styles/form.css";


export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  return (
    <ProtectedRoute router={router}>
      <div className="outerGrid" >
        <Header />
        <section>{children}</section>
      </div>
    </ProtectedRoute>

  );
}
