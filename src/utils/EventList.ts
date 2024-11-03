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
      { name: "Vinayaka D", phone: "+91 9483121037" },
      { name: "Sachin Hadimani", phone: "+91 9110232822" },
    ],
    rules: [
      "Number of participants: 2",
      "Number of rounds: 2",
      "Languages allowed: C, C++, Java.",
      "No electronic gadgets are allowed.",
      "Systems will be provided without internet connection.",
    ],
    modelName: "coding.glb",
  },
  {
    title: "Quasar Invictus",
    eventName: "IT Manager",
    coordinator: {
      name: "Dr Jeevan Pinto",
    },
    eventHeads: [
      {
        name: "Riya G",
        phone: "+91 7676284121",
      },
      {
        name: "Arpitha Sharon",
        phone: "+91 9110841425",
      },
    ],
    rules: [
      "The IT Manager event will consist of multiple rounds, with one participant per round.",
      "Specific details regarding each round will be disclosed during the event.",
      "Participants are required to adhere to a formal dress code.",
      "Participants must bring three copies of their resume.",
      "Participants are required to bring their personal laptops.",
    ],
    modelName: "it_manager.glb",
  },
  {
    title: "Matrix Minds",
    eventName: "IT Quiz",
    coordinator: {
      name: "Dr. Ruban S",
      phone: "+91 9741965134",
    },
    eventHeads: [
      {
        name: "Sharath Acharya",
        phone: "+91 7353892347",
      },
      {
        name: "Kushali",
        phone: "+91 7259760702",
      },
    ],
    rules: [
      "Number of participants is 2.",
      "There will be 2 rounds.",
      "Participants cannot be replaced/changed once registered.",
      "The quiz will be based on the current events in the IT Sector.",
    ],
    modelName: "quiz.glb",
  },
  {
    title: "Cosmic Webcraft",
    eventName: "Web Designing",
    coordinator: {
      name: "Dr Srinivas B.L",
    },
    eventHeads: [
      {
        name: "Harishri",
        phone: "+91 9207241215",
      },
      {
        name: "Shashank",
        phone: "+91 9986753917",
      },
    ],
    rules: [
      "Each team must consist of 2 participants.",
      "Participants should have knowledge of HTML, CSS, and JavaScript.",
      "No personal electronic devices such as laptops, smartwatches, mobile phones, tablets, etc., are allowed during the competition.",
      "The competition will consist of multiple rounds. The details of each round, such as time limits and tasks, will be provided at the beginning of each round.",
    ],
    modelName: "webdev_new.glb",
  },
  {
    title: "Rhythmic Resonance",
    eventName: "Dance",
    coordinator: {
      name: "Dr Rakesh Kumar B",
    },
    eventHeads: [
      {
        name: "Shravya S",
        phone: "+91 7204097056",
      },
      {
        name: "Sharanya Shetty",
        phone: "+91 7483495875",
      },
    ],
    rules: [
      "Theme: Thematic Fusion",
      "From each team, only one group can perform.",
      "Each team must consist of minimum 5 members and maximum of 10 members.",
      "Time limit for each performance is 5 + 1 minutes.",
      "The music track should be provided to the event head one day prior to the event.",
      "Inappropriate or vulgar costumes are not allowed.",
      "The use of fireworks, explosives, water, or any kind of spray is not allowed.",
      "Participants engaging in obscene acts or showing disrespect towards religions, politics, or individuals will lead to immediate disqualification.",
      "Judging criteria include creativity, costumes, expressions, coordination, theme interpretation, intent, and the overall quality of the performance.",
      "Judges decision is final.",
    ],
    modelName: "dance.glb",
  },
  {
    title: "Battle of the Bytes",
    eventName: "Debate",
    coordinator: {
      name: "Mrs. Annapoorna Shetty",
      phone: "+91 9731850981",
    },
    eventHeads: [
      {
        name: "Preetham N",
        phone: "+91 8296139725",
      },
      {
        name: "Suyash Naik",
        phone: "+91 9767860988",
      },
    ],
    rules: [
      "Each team must consist of one members.",
      "No offensive language or personal attacks. Teams must respect the moderator, judges, and other participants at all times.",
      "The moderator will ensure that participants stay on topic, adhere to time limits, and maintain decorum during the debate.",
      "Exceeding time limits will result in point deductions. Teams should manage their time effectively.",
      "In case of a tie, an additional 2-minute round will be held where both teams make closing arguments on a key point of contention.",
    ],
    modelName: "debate.glb",
  },
  {
    title: "Cosmic Creatives",
    eventName: "Mad Ad",
    coordinator: {
      name: "Ms Nausheeda B.S",
      phone: "+91 9591520632",
    },
    eventHeads: [
      {
        name: "Shravya C",
        phone: "+91 7975012184",
      },
      {
        name: "Dheeraj Shetty",
        phone: "+91 8296957498",
      },
    ],
    rules: [
      "Performance theme will be given on the spot.",
      "From each team, only one group can perform.",
      "Each team must consist of minimum 4 members and maximum of 6 members.",
      "Time limit for each performance is 4 + 1 minutes.",
      "Inappropriate or vulgar costumes are not allowed.",
      "The use of fireworks, explosives, water, or any kind of spray is not allowed.",
      "Participants engaging in obscene acts or showing disrespect towards religions, politics, or individuals will lead to immediate disqualification.",
      "Judging criteria include creativity, costumes, expressions, coordination, theme interpretation, intent, and the overall quality of the performance.",
      "Judges decision are final.",
    ],
    modelName: "mad_ads.glb",
  },
];

export default EventList;

// Event Register List
export type EventRegType = {
  title: string,
  category: string,
  participants: number,
}

export const eventRegisterList: EventRegType[] = [
  {
    title: "Binary Universe",
    category: "Coding",
    participants: 2,
  },
  {
    title: "Rhythmic Resonance (5-10)",
    category: "Dance",
    participants: 5,
  },
  {
    title: "Battle of Bytes",
    category: "Debate",
    participants: 1,
  },
  {
    title: "Matrix Minds",
    category: "Quiz",
    participants: 2,
  },
  {
    title: "Galactic Frames",
    category: "Videography",
    participants: 1,
  },
  {
    title: "Quasar Invictus",
    category: "IT Manager",
    participants: 1,
  },
  {
    title: "Cosmic Creatives (4-6)",
    category: "Mad Ads",
    participants: 4,
  },
  {
    title: "Cosmic Webcraft",
    category: "Web Design",
    participants: 2,
  },
  {
    title: "Ultimate Showdown",
    category: "Gaming",
    participants: 4,
  },
  {
    title: "Eliptica",
    category: "Treasure Hunt",
    participants: 2,
  },
  {
    title: "Meme Mania",
    category: "AI Meme Gen",
    participants: 1,
  },
  {
    title: "Surprise Event",
    category: "Surprise",
    participants: 2,
  }
]