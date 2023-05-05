import { useState } from 'react';

export default function HandleSnackbar() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState<'error' | 'warning' | 'info' | 'success'>('error')

    const openSnackbar = (msg: string, type: 'error' | 'warning' | 'info' | 'success') => {
        setMessage(msg)
        setType(type)
        setOpen(true);
    };

    const closeSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return {
        openSnackbar,
        closeSnackbar,
        message,
        type,
        open
    }

}