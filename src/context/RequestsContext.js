import React, { createContext, useContext, useState } from "react";
import initialRequests from "../data/dummyRequests";

const RequestsContext = createContext();

export function RequestsProvider({ children }) {
    const [requests, setRequests] = useState(initialRequests);

    const updateRequestStatus = (id, status) => {
        setRequests((prev) =>
            prev.map((item) => 
                item.id === id ? { ...item, status, confirmedAt: new Date().toISOString() } : item
            )
        );
    };

    const pendingRequests = requests.filter((item) => !item.status || item.status === "pending");
    const historyRequests = requests.filter((item) => item.status === "approved" || item.status === "rejected");

    return (
        <RequestsContext.Provider value={{ requests, updateRequestStatus, pendingRequests, historyRequests }}>
            {children}
        </RequestsContext.Provider>
    );
}

export function useRequests() {
    return useContext(RequestsContext);
}