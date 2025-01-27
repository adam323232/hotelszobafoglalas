import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        const is = Boolean(Number(localStorage.getItem('isLoggedIn')));

        setIsLoggedIn(is);
    }, []);

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;