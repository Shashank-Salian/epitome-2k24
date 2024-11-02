type EventType = {
  title: string;
  eventName: string;
  coordinator: {
    name: string;
    phone?: string;
    picture?: string;
  };
  eventHeads: {
    name: string;
    phone: string;
    picture?: string;
  }[];
  rules: string[];
  modelName: string;
}[];

const EventList: EventType = [
  {
    title: "Binary Universe",
    eventName: "Coding",
    coordinator: {
      name: "Dr Santhosh B",
    },
    eventHeads: [
      { name: "Vinayaka D", phone: "+91 9999999999" },
      { name: "Sachin Hadimani", phone: "+91 9999999999" },
    ],
    rules: [
      "Each team must consist of one members.",
      "No offensive language or personal attacks. Teams must respect the moderator, judges, and other participants at all times.",
      "The moderator will ensure that participants stay on topic, adhere to time limits, and maintain decorum during the debate.",
      "Exceeding time limits will result in point deductions. Teams should manage their time effectively.",
      "In case of a tie, an additional 2-minute round will be held where both teams make closing arguments on a key point of contention.",
    ],
    modelName: "gaming.glb",
  },
  {
    title: "Battle of the Bytes",
    eventName: "Debate",
    coordinator: {
      name: "Mrs. Annapoorna Shetty",
      phone: "+91 9731850981",
      picture: "URL",
    },
    eventHeads: [
      {
        name: "Preetham N",
        phone: "+91 8296139725",
        picture: "URL",
      },
      {
        name: "Suyash Naik",
        phone: "+91 9767860988",
        picture: "URL",
      },
    ],
    rules: [
      "Each team must consist of one members.",
      "No offensive language or personal attacks. Teams must respect the moderator, judges, and other participants at all times.",
      "The moderator will ensure that participants stay on topic, adhere to time limits, and maintain decorum during the debate.",
      "Exceeding time limits will result in point deductions. Teams should manage their time effectively.",
      "In case of a tie, an additional 2-minute round will be held where both teams make closing arguments on a key point of contention.",
    ],
    modelName: "mad_ads.glb",
  },
  //   {
  //     title: "Cosmic Creatives",
  //     eventName: "Mad Ad",
  //     coordinator: {
  //       name: "Ms Nausheeda B.S",
  //       phone: "+91 9591520632",
  //       picture: "URL",
  //     },
  //     eventHeads: [
  //       {
  //         name: "Shravya C",
  //         phone: "+91 7975012184",
  //         picture: "URL",
  //       },
  //       {
  //         name: "Dheeraj Shetty",
  //         phone: "+91 8296957498",
  //         picture: "URL",
  //       },
  //     ],
  //     rules: [
  //       "Performance theme will be given on the spot",
  //       "From each team, only one group can perform.",
  //       "Each team must consist of minimum 4 members and maximum of 6 members.",
  //       "Time limit for each performance is 4+1 minutes.",
  //       "Inappropriate or vulgar costumes are not allowed.",
  //       "The use of fireworks, explosives, water, or any kind of spray is not allowed.",
  //       "Participants engaging in obscene acts or showing disrespect towards religions, politics, or individuals will lead to immediate disqualification.",
  //       "Judging criteria include creativity, costumes, expressions, coordination, theme interpretation, intent, and the overall quality of the performance.",
  //       "Judges decision are final.",
  //     ],
  //     modelName: "URL",
  //   },
  //   {
  //     title: "Matrix Minds",
  //     eventName: "IT Quiz",
  //     coordinator: {
  //       name: "Dr. Ruban S",
  //       phone: "+91 9741965134",
  //       picture: "URL",
  //     },
  //     eventHeads: [
  //       {
  //         name: "Sharath Acharya",
  //         phone: "+91 7353892347",
  //         picture: "URL",
  //       },
  //       {
  //         name: "Kushali",
  //         phone: "+91 7259760702",
  //         picture: "URL",
  //       },
  //     ],
  //     rules: [
  //       "Number of participants is 2.",
  //       "There will be 2 rounds.",
  //       "Participants cannot be replaced/changed once registered.",
  //       "The quiz will be based on the current events in the IT Sector.",
  //     ],
  //     modelName: "URL",
  //   },
];

export default EventList;
