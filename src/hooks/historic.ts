import { useState, useEffect } from "react";

export default function useHistoric() {
    const [historic, setHistoric] = useState([])

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('historico') || '[]');
        setHistoric(history);
    }, []);

    function getHistoric() {
        return historic;
    }

    return {
        historic,
        getHistoric,
    }

}