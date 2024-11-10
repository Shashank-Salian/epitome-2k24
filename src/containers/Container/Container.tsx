import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  className?: string;
  parentClassName?: string;
  children: ReactNode;
};

const Container = ({ children, className, parentClassName }: Props) => {
  return (
    <div className={cn("w-full h-dvh", parentClassName)}>
      <div
        className={cn(
          "w-full max-w-screen m-auto sm:px-2 md:px-4 lg:px-6 xl:px-8 2xl:px-12",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
