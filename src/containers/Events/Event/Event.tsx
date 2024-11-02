"use client";

type Props = {
  eventName?: string;
};

const Event = (props: Props) => {
  return (
    <div className="mt-12">
      <h1 className="font-iceland text-6xl font-bold">Rhythmic Resonance</h1>
      <h2 className="font-iceland text-2xl font-bold">Dance Competition</h2>
      <p className="max-w-2xl mt-6 font-oxanium">
        A simulation of real-world business challenges, where participants
        showcase their management, leadership, and decision-making skills
        through a series of tech-oriented tasks.
      </p>
    </div>
  );
};

export default Event;
