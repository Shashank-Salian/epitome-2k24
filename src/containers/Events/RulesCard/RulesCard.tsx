import Container from "@/containers/Container/Container";

import classes from "./RulesCard.module.css";

type Props = {
  rules: string[];
  onCloseClick: () => void;
};

const RulesCard = ({ rules, onCloseClick }: Props) => {
  return (
    <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-90 font-oxanium">
      <div
        className={`w-full max-w-2xl h-max px-6 py-7 ${classes.container}	`}
        data-augmented-ui="bl-clip tr-clip border border-bg"
      >
        <ul className="">
          {rules.map((rule) => (
            <li>{rule}</li>
          ))}
        </ul>

        <button
          data-augmented-ui="bl-clip tr-clip border"
          className="font-iceland text-2xl px-9 py-1 mt-6 float-end"
          onClick={onCloseClick}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RulesCard;
