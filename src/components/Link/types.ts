import { ReactNode } from "react";

export interface ILinkProps {
    type?: 'standart' | 'underlined';
    iconPosition: 'none' | 'left' | 'right';
    link?: string;
    icon?: ReactNode;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}