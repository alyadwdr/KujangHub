import React, { createContext, useContext, useState, useEffect } from "react";
import initialRequests from "../data/dummyRequests";

const RequestsContext = createContext();
const SIMULATE_ERROR = false;

export function RequestsProvider({ children }) {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRequests = () => {
        setIsLoading(true);
        setError(null);
        setTimeout(() => {
            if (SIMULATE_ERROR) {
                setError("Gagal memuat data. Periksa koneksi internet kamu.");
                setIsLoading(false);
                return;
            }
            setRequests(initialRequests);
            setIsLoading(false);
        }, 800);
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const SIMULATE_UPDATE_ERROR = false;

    const updateRequestStatus = (id, status, decisionNote) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (SIMULATE_UPDATE_ERROR) {
                    reject(new Error("Gagal memperbarui status. Coba lagi."));
                    return;
                }
                setRequests((prev) =>
                    prev.map((item) =>
                        item.id === id
                            ? { ...item, status, confirmedAt: new Date().toISOString(), decisionNote: decisionNote || ""}
                            : item
                    )
                );
                resolve();
            }, 500);
        });
    };

    const pendingRequests = requests.filter((item) => !item.status || item.status === "pending");
    const historyRequests = requests.filter((item) => item.status && item.status !== "pending");

    return (
        <RequestsContext.Provider value={{ requests, updateRequestStatus, pendingRequests, historyRequests, isLoading, error, retry: fetchRequests }}>
            {children}
        </RequestsContext.Provider>
    );
}

export function useRequests() {
    return useContext(RequestsContext);
}