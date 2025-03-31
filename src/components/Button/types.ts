import { ReactNode, MouseEvent } from "react";

export interface ButtonProps {
    color?: "blue" | "gray"
    children: ReactNode;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}