import React, { createContext, useState } from 'react';

export const UserContext = createContext({
    myId: "",
    setMyIdHandler: (myId) => {},
});

export const UserProvider = ({ children }) => {
    const [myId, setMyId] = useState('');

    const setMyIdHandler = () => {
        setMyId(localStorage.getItem("myId"));
        console.log("MyId핸들러 호출");
    }

    return (
        <UserContext.Provider value={{myId, setMyIdHandler}}>
            {children}
        </UserContext.Provider>
    );
}