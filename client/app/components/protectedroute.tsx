'use client';
import { appRoutes, BASE_PATH } from '../constants';
import { useEffect } from 'react'
import { useRouter, usePathname } from "next/navigation";

// Here you would fetch and return the user
const useUser = () => ({ user: 'emelie', loading: false })

interface ProtectedRouteProps {
    children: React.ReactNode;
    router: ReturnType<typeof useRouter>;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ router, children }) => {

    const { user, loading } = useUser();
    const currentPathname = usePathname();

    let unprotectedRoutes = [BASE_PATH, appRoutes.LOGIN_PAGE];

    // Check if the current path is in unprotected routes
    let pathIsProtected = unprotectedRoutes.indexOf(currentPathname) === -1;

    useEffect(() => {
        if (!user && pathIsProtected) {
            router.push('/login')
        }
    }, [user, router]);

    return <>{children}</>;
};

