import { FC } from "react"

import "@styles/components/Button.scss"
import { IButtonProps } from "./types"
import classNames from "classnames"

const Button: FC<IButtonProps> = ({ color, onClick, children, className }) => {

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