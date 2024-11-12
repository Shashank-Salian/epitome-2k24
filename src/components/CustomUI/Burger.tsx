import { MouseEventHandler } from "react";

type Props = {
  onClick: MouseEventHandler<HTMLDivElement>;
  isOpen: boolean;
};

const Burger = ({ onClick, isOpen }: Props) => {
  return (
    <div
      className={`md:hidden cursor-pointer flex h-6 w-10 flex-col ${
        isOpen ? "justify-center" : "justify-between"
      }`}
      onClick={onClick}
    >
      <div
        className="h-[2px] bg-white w-full origin-center relative"
        style={{
          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          top: isOpen ? "3px" : "0px",
        }}
      ></div>
      <div
        className="h-[2px] bg-white w-full"
        style={{ transform: isOpen ? "scale(0)" : "scale(1)" }}
      ></div>
      <div
        className="h-[2px] bg-white w-full origin-center"
        style={{ transform: isOpen ? "rotate(-45deg)" : "rotate(0deg)" }}
      ></div>
    </div>
  );
};

export default Burger;
