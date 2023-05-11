export interface iButton {
    children: any
    color?: 'green' | 'blue' | 'red' | 'gray' | 'purple'
    colorVariant?: '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950'
    className?: string
    icon?: any
    onClick?: () => void
    disabled?: boolean
}