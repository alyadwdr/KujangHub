import React, { createContext, useContext, useState } from "react";
import initialRequests from "../data/dummyRequests";

const RequestsContext = createContext();

export function RequestsProvider({ children }) {
    const [requests, setRequests] = useState(initialRequests);

    const updateRequestStatus = (id, status) => {
        setRequests((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status } : item))
        );
    };

    return (
        <RequestsContext.Provider value={{ requests, updateRequestStatus }}>
            {children}
        </RequestsContext.Provider>
    );
}

export function useRequests() {
    return useContext(RequestsContext);
}