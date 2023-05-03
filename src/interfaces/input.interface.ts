export interface iInput {
    value: string
    placeholder?: string,
    changeValue?: (value: any) => void
    handleKeyPress?: (value: any) => void
}