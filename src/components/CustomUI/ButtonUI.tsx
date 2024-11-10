import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const ButtonUI = (props: ButtonProps) => {
  const { value, type = "button", disabled = false, className } = props;
  return (
    <button
      {...props}
      type={type}
      disabled={disabled}
      className={cn(
        `bg-primary font-iceland text-white font-bold px-10 py-2 clip_Btn rounded-md`,
        className
      )}
    >
      {value}
    </button>
  );
};

export default ButtonUI;
