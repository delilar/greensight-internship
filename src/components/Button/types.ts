import { ReactNode, MouseEvent } from "react";

export interface IButtonProps {
    color?: "blue" | "gray"
    children: ReactNode;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}