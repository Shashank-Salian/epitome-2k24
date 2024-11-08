import Container from "@/containers/Container/Container";

import classes from "./RulesCard.module.css";

type Props = {
  rules: string[];
  title: string;
  eventName: string;
  onCloseClick: () => void;
};

const RulesCard = ({ rules, onCloseClick, title, eventName }: Props) => {
  return (
    <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-90 font-oxanium">
      <div
        className={`w-full max-w-2xl h-max px-10 py-9  ${classes.container}`}
        data-augmented-ui="bl-clip tr-clip border border-bg"
      >
        <div className="flex flex-col items-center gap-y-1 mb-6">
          <h1 className="text-3xl font-bold">{title}</h1>
          <h2>{eventName}</h2>
        </div>
        <ul className="list-disc">
          {rules.map((rule) => (
            <li className="mb-2">{rule}</li>
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
