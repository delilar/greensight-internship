import { FC } from "react";
import classNames from "classnames";

import { ILinkProps } from "./types";

import "@styles/components/Link.scss";

const Link: FC<ILinkProps> = ({ type="standart", onClick, icon, iconPosition="none", className, children }) => {
  
    const linkClassName = classNames(
        "link",
        {
            [`link_${type}`]: type,
            [`link_${iconPosition}`]: iconPosition,
        },
        className
    );
  
    return (
        <div className="link-wrapper">
            {iconPosition === "left" && icon}
            <a onClick={onClick} className={linkClassName}>
                {children}
            </a>
            {iconPosition === "right" && icon}
        </div>
    );
};

export default Link;