import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState("");
    const [email, setEmailContext] = useState("");

    useEffect(() => {
        // const storedUser = localStorage.getItem("MUSIC_USERNAME");
        // const storedEmail = localStorage.getItem("MUSIC_EMAIL");

        // if (storedUser && storedEmail) {
        //     setUsername(storedUser);
        //     setEmailContext(storedEmail);
        // }
    }, []);

    return (
        <UserContext.Provider value={{ username, setUsername, email, setEmailContext }}>
            {children}
        </UserContext.Provider>
    );
};