import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import api from '../../axios/api';

const VerifyToken = () => {
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state to prevent premature redirect

    const { setUser, setNav } = useContext(UserContext);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const response = await api.post('/admin/verify', {}, { withCredentials: true });
                const { user } = response.data.data;
                setVerified(true);
                setUser(user); // Set user in context
                setNav(true); // Show sidebar
                localStorage.setItem('user', JSON.stringify(user)); // Store user in localStorage
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false); // Stop loading once verification is done
            }
        };
      
        checkToken();
    }, []);

    // Show loading or fallback content while the token is being verified
    if (loading) {
        return <div>Loading...</div>; // Replace this with a spinner or loading indicator
    }

    // If verified, render the outlet (protected routes), otherwise redirect to login
    return verified ? <Outlet /> : <Navigate to="/" />;
}

export default VerifyToken;
