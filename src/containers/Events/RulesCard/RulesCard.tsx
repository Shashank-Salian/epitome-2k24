import Container from "@/containers/Container/Container";

import classes from "./RulesCard.module.css";
import Head from "next/head";
type Head = {
  name: string;
  phone: string;
  picture?: string;
};
type Props = {
  rules: string[];
  title: string;
  eventName: string;
  Heads: Head[];
  onCloseClick: () => void;
};

const RulesCard = ({ rules, onCloseClick, title, eventName, Heads }: Props) => {
  return (
    <>
      <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center font-oxanium py-5">
        <div
          className="w-full h-full fixed left-0 top-0 z-30 bg-black bg-opacity-90"
          onClick={onCloseClick}
        ></div>
        <div
          className={`w-full max-w-2xl h-full px-10 py-9 max-h-max relative z-40 ${classes.container}`}
          data-augmented-ui="bl-clip tr-clip border border-bg"
        >
          <div className="h-full max-h-max overflow-y-scroll">
            <div className="flex flex-col items-center gap-y-1 mb-6">
              <h1 className="text-3xl font-bold">{title}</h1>
              <h2>{eventName}</h2>
            </div>
            <ul className="list-disc pl-4">
              {rules.map((rule, index) => (
                <li key={index} className="mb-2">
                  {rule}
                </li>
              ))}
            </ul>
            <div className="list-disc mt-4">
              Event Heads:
              {Heads.map(({ name, phone }) => (
                <li className="mb-2">
                  {name} : {phone}
                </li>
              ))}
            </div>
            <button
              data-augmented-ui="bl-clip tr-clip border"
              className="font-iceland text-2xl px-9 py-1 mt-6 float-end"
              onClick={onCloseClick}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RulesCard;
