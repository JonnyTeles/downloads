export interface iInput {
    texto: string
    value: string
    placeholder?: string,
    changeValue?: (value: any) => void
    handleKeyPress?: (value: any) => void
}