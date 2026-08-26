import React, { createContext, useContext, useState, useEffect } from "react";
import initialRequests from "../data/dummyRequests";

const RequestsContext = createContext();

export function RequestsProvider({ children }) {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setRequests(initialRequests);
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const updateRequestStatus = (id, status, decisionNote) => {
        setRequests((prev) =>
            prev.map((item) => 
                item.id === id ? { ...item, status, confirmedAt: new Date().toISOString(), decisionNote: decisionNote || "" } : item
            )
        );
    };

    const pendingRequests = requests.filter((item) => !item.status || item.status === "pending");
    const historyRequests = requests.filter((item) => item.status && item.status !== "pending");

    return (
        <RequestsContext.Provider value={{ requests, updateRequestStatus, pendingRequests, historyRequests, isLoading }}>
            {children}
        </RequestsContext.Provider>
    );
}

export function useRequests() {
    return useContext(RequestsContext);
}