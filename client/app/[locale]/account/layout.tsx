'use client';

import Header from "../../components/header";
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next-intl/client';
import { ProtectedRoute } from '../../components/protectedroute';
import "../../styles/form.css"


export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();
  const currentPathname = usePathname();
  const locale = useLocale();

  return (
    <ProtectedRoute router={router}>
      <div className="outerGrid" >
        <Header router={router} currentPathname={currentPathname} locale={locale} />
        <section>{children}</section>
      </div>
    </ProtectedRoute>

  );
}
