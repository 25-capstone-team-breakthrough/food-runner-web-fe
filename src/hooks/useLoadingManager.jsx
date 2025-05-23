import { useState, useCallback } from "react";

export const useLoadingManager = (initialKeys = []) => {
    const initialState = initialKeys.reduce((acc, key) => {
        acc[key] = false;
        return acc;
    }, {});

    const [loading, setLoading] = useState(initialState);

    const startLoading = useCallback((key) => {
        setLoading((prev) => ({ ...prev, [key]: true }));
    }, []);

    const endLoading = useCallback((key) => {
        setLoading((prev) => ({ ...prev, [key]: false }));
    }, []);

    return {
        loading,
        startLoading,
        endLoading,
    };
};