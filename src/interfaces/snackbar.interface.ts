export interface iSnackbar {
    open: boolean,
    closeSnackbar: () => void,
    type: 'error' | 'warning' | 'info' | 'success',
    message: string,
    className?: string
}