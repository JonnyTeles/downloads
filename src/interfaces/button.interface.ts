export interface iButton {
    children: any
    color?: 'green' | 'blue' | 'red' | 'gray' | 'purple'
    className?: string
    icon?: any
    onClick?: () => void
    disabled?: boolean
}