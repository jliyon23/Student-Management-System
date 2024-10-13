import { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(() => {
        return localStorage.getItem('role') || null;
    });
    const [nav, setNav] = useState(false);

    useEffect(() => {
        if (role) {
            localStorage.setItem('role', role);
        } else {
            localStorage.removeItem('role');  
        }
    }, [role]);

    return (
        <UserContext.Provider value={{ user, setUser, role, setRole, nav, setNav }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };
