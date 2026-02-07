"use client";

import { useEffect } from "react";

const KeepAlive = () => {
    useEffect(() => {
        const pingValues = async () => {
            try {
                // Ensure we don't double up on /api/api
                const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
                // Remove trailing slash if present
                const cleanBase = baseUrl.replace(/\/$/, "");
                // If base ends with /api, we just add /health/ (assuming health is at root of api)
                // If health check IS at /api/health/, then we need to append /health/
                // Based on investigation: backend has `path('health/', ...)` inside `apps/core/urls.py` which is included at `api/`.
                // So full path is `.../api/health/`.
                // If NEXT_PUBLIC_API_URL includes `/api`, we just need to append `/health/`

                const response = await fetch(`${cleanBase}/health/`);
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
