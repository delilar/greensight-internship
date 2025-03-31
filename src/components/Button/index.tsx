import { FC } from "react"

import "@styles/components/Button.scss"
import { ButtonProps } from "./types"
import classNames from "classnames"

const Button: FC<ButtonProps> = ({ color, onClick, children, className }) => {

    const buttonClassName = classNames(
        "button",
        {
            [`button_${color}`]: color,
        },
        className
    )

    return <button className={buttonClassName} onClick={onClick}>{children}</button>
}

export default Button