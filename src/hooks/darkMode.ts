import { useState, useEffect } from 'react';

export default function DarkMode() {
    const [darkMode, setDarkMode] = useState(
        typeof window !== 'undefined' && window.localStorage.getItem('darkMode') === 'true'
    );

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('darkMode', darkMode.toString());
        }
    }, [darkMode]);

    function handleDarkMode() {
        window.location.reload()
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    }

    return {
        darkMode,
        handleDarkMode,
        setDarkMode
    }
}