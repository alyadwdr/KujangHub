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

    const pendingRequests = requests.filter((item) => item.status || item.status === "pending");

    return (
        <RequestsContext.Provider value={{ requests, updateRequestStatus, pendingRequests }}>
            {children}
        </RequestsContext.Provider>
    );
}

export function useRequests() {
    return useContext(RequestsContext);
}