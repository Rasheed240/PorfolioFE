"use client";

import { useEffect } from "react";

const KeepAlive = () => {
    useEffect(() => {
        const pingValues = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/health/`
                );
                if (!response.ok) {
                    console.warn("Keep-alive ping failed:", response.statusText);
                }
            } catch (error) {
                // Silently fail to avoid console checks
                console.warn("Keep-alive ping error", error);
            }
        };

        // Initial ping
        pingValues();

        // Ping every 5 minutes (300,000ms)
        const intervalId = setInterval(pingValues, 300000);

        return () => clearInterval(intervalId);
    }, []);

    return null;
};

export default KeepAlive;
