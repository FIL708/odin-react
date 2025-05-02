import { FC } from 'react'
import './Button.css'

interface ButtonProps {
    accept?: boolean
    text: string
    disabled?: boolean
}
const Button: FC<ButtonProps> = ({ accept, text, disabled = false }) => {
    const className = accept ? 'button accept' : 'button'

    return (
        <button
            className={className}
            disabled={disabled}
        >
            {text}
        </button>
    )
}

export default Button
