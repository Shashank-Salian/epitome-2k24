type EventType = {
  title: string;
  eventName: string;
  coordinator: {
    name: string;
    phone?: string;
    picture?: string;
  }[];
  eventHeads: {
    name: string;
    phone: string;
    picture?: string;
  }[];
  rules: string[];
  modelName: string;
  description: string;
}[];

const EventList: EventType = [
  {
    title: "Binary Universe",
    eventName: "Coding",
    coordinator: [
      {
        name: "Dr Santhosh B",
      },
    ],
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
    description:
      "A thrilling fusion of logic, creativity, and precision, where minds tackle intricate algorithms and innovative problem-solving to push the boundaries of code and technology.",
  },
  {
    title: "Quasar Invictus",
    eventName: "IT Manager",
    coordinator: [
      {
        name: "Dr Jeevan Pinto",
      },
    ],
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
    description:
      "A simulation of real-world business challenges, where participants showcase their management, leadership, and decision-making skills through a series of tech-oriented tasks.",
  },
  {
    title: "Matrix Minds",
    eventName: "IT Quiz",
    coordinator: [
      {
        name: "Dr. Ruban S",
        phone: "+91 9741965134",
      },
    ],
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
    description: `A surprising event where participants answer a mix of general knowledge and IT-based questions, testing their broad understanding and technical expertise.`,
  },
  {
    title: "Cosmic Webcraft",
    eventName: "Web Designing",
    coordinator: [
      {
        name: "Dr Srinivas B.L",
      },
    ],
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
    description:
      "A Competition where participants demonstrate their creativity and technical skills by designing innovative and user-friendly websites within a set time frame.",
  },
  {
    title: "Rhythmic Resonance",
    eventName: "Dance",
    coordinator: [
      {
        name: "Dr Rakesh Kumar B",
      },
    ],
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
    description:
      "A vibrant showcase of rhythm and expression, where participants captivate the audience with their unique choreography and energetic performances.",
  },
  {
    title: "Battle of the Bytes",
    eventName: "Debate",
    coordinator: [
      {
        name: "Mrs. Annapoorna Shetty",
        phone: "+91 9731850981",
      },
    ],
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
    description:
      "A dynamic platform where participants engage in thoughtful discussions, presenting compelling arguments and showcasing their eloquence on various contemporary topics.",
  },
  {
    title: "Cosmic Creatives",
    eventName: "Mad Ad",
    coordinator: [
      {
        name: "Ms Nausheeda B.S",
        phone: "+91 9591520632",
      },
    ],
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
    description:
      "A creative challenge where participants craft innovative and entertaining advertisements, combining humor and impact to capture attention and leave a lasting impression.",
  },
  {
    title: "Meme Mania",
    eventName: "AI Meme Generator",
    coordinator: [
      {
        name: "Mrs Manimozhi R",
        phone: "+91 9449365781 ",
      },
    ],
    eventHeads: [
      {
        name: "Yashaswi",
        phone: "+91 8748966783 ",
      },
      {
        name: "Sonali",
        phone: "+91 9746278256",
      },
      {
        name: "Shreya",
        phone: "+91 6364218734 ",
      },
    ],
    rules: [
      "No of participant is 1",
      "Participant must get their own laptop. ",
      "There will be 2 rounds.",
      "It will be performed using AI tools and elimination will done in round 1.",
      "No usage of offensive words, Should not hurt any religious beliefs. ",
    ],
    description:
      "A fun and creative challenge where participants use AI tools to generate humorous and unique memes, combining technology with entertainment.",
    modelName: "meme_gen.glb",
  },
  {
    title: "Eliptica",
    eventName: "Treasure Hunt",
    coordinator: [
      {
        name: "Mr Aravinda Prabhu S",
        phone: "+91 9986263916 ",
      },
    ],
    eventHeads: [
      {
        name: "Soujanya",
        phone: "+91 9061752785 ",
      },
      {
        name: "Pawana",
        phone: "+91 9731957420",
      },
    ],
    rules: [
      "Teams consist of two members.",
      "Event rounds will be announced on the spot, but it's advisable to be prepared with puzzle-solving skills, knowledge of riddles, and technologies. ",
      "Missing any one round or causing damage to property will result in team disqualification.",
      "Elimination will be based on participation and time duration.",
    ],
    description:
      "An exciting adventure where participants solve clues and navigate challenges, racing against time to find hidden treasures and reach the final destination.",
    modelName: "treasure_hunt.glb",
  },
  {
    title: "Galactic Frames",
    eventName: "Videography and Photography",
    coordinator: [
      {
        name: "Ms. Vanitha",
        phone: "+91 9964412532",
      },
    ],
    eventHeads: [
      {
        name: "Vinayak V K",
        phone: "+91 8590483586 ",
      },
      {
        name: "Maeve Fernandes",
        phone: "+91 8308756771",
      },
    ],
    rules: [
      "There is only one participant.",
      "The participant has to know how to edit videos and take pictures ",
      "On the day of the event, the theme will be provided.",
      "Drones are not permitted.",
      "Bring your own USB cords and any relevant devices.",
      "Bring your own laptops. cameras, smartphones.",
      "It is forbidden to edit using AI websites and software.",
    ],
    description:
      " A platform for participants to showcase their storytelling and technical skills, capturing moments through cinematic visuals and creative editing.",
    modelName: "photography.glb",
  },
  {
    title: "Ultimate Showdown",
    eventName: "Gaming",
    coordinator: [
      {
        name: "Dr Shine P Varkey",
        phone: "+91 9497492972 ",
      },
    ],
    eventHeads: [
      {
        name: "Alister Dsouza",
        phone: "+91 8073629738",
      },
      {
        name: "Vivek Pattar",
        phone: "+91 9916032250",
      },
    ],
    rules: [
      "Each team can have maximum of 4 members",
      "All the contesting members are to be present in the venue before the game starts from each team, only one group can perform. ",
      "All the teams are requested to use their own data connection.",
      "The coordinators decision is final",
      "Account level should be above 25",
      "Map: Erangel, Sanhok, Miramar, Vikendi. ",
      "Room ID and password will be provided at the event.",
      "No use of hacks",
      "No use of triggers (Can Use Finger Gloves)",
      "Screenshot the results after each match.",
      "No using emergency pickup and self-revive kit",
    ],
    description:
      "A thrilling contest where participants compete in fast-paced video games, showcasing their strategic thinking, quick reflexes, and teamwork under pressure.",
    modelName: "gaming.glb",
  },
  {
    title: "Surprise Event",
    eventName: "SURPRISE",
    coordinator: [
      {
        name: "Ms. Christina",
        phone: "+91 9606582375",
      },
      {
        name: "Ms. Shilpa",
        phone: "+91 8105324479",
      },
      {
        name: "Ms. Gana",
        phone: "+91 9995259225",
      },
    ],
    eventHeads: [
      {
        name: "Nireeksha M",
        phone: "+91 8197652325",
      },
      {
        name: "Meghna",
        phone: "+91 8494998893",
      },
    ],
    rules: [
      "Team consists of 2 members.",
      "No mobile phones or laptops allowed.",
      "Additional rules will be announced at the event.",
    ],
    description:
      "A surprising event where the details remain unknown, keeping participants on their toes with unexpected challenges.",
    modelName: "surprise.glb",
  },
];

export default EventList;

// Event Register List
export type EventRegType = {
  title: string;
  category: string;
  participants: {
    name: string;
    phone: string;
  }[];
  participantCount: number;
};

export const eventRegisterList: EventRegType[] = [
  {
    title: "Binary Universe",
    category: "Coding",
    participants: [
      {
        name: "",
        phone: "",
      },
      {
        name: "",
        phone: "",
      },
    ],
    participantCount: 2,
  },
  {
    title: "Rhythmic Resonance",
    category: "Dance",
    participants: [
      {
        name: "",
        phone: "",
      },
      {
        name: "",
        phone: "",
      },
      {
        name: "",
        phone: "",
      },
      {
        name: "",
        phone: "",
      },
      {
        name: "",
        phone: "",
      },
    ],
    participantCount: 5,
  },
  {
    title: "Battle of Bytes",
    category: "Debate",
    participants: [
      {
        name: "",
        phone: "",
      },
    ],
    participantCount: 1,
  },
  {
    title: "Matrix Minds",
    category: "IT Quiz",
    participants: [
      {
        name: "",
        phone: "",
      },
      {
        name: "",
        phone: "",
      },
    ],
    participantCount: 2,
  },
  {
    title: "Galactic Frames",
    category: "Videography",
    participants: [
      {
        name: "",
        phone: "",
      },
    ],
    participantCount: 1,
  },
  {
    title: "Quasar Invictus",
    category: "IT Manager",
    participants: [
      {
        name: "",
        phone: "",
      },
    ],
    participantCount: 1,
  },
  {
    title: "Cosmic Creatives",
    category: "Mad Ads",
    participants: [
      {
        name: "",
        phone: "",
      },
      {
        name: "",
        phone: "",
      },
      {
        name: "",
        phone: "",
      },
      {
        name: "",
        phone: "",
      },
    ],
    participantCount: 4,
  },
  {
    title: "Cosmic Webcraft",
    category: "Web Design",
    participants: [
      {
        name: "",
        phone: "",
      },
      {
        name: "",
        phone: "",
      },
    ],
    participantCount: 2,
  },
  {
    title: "Ultimate Showdown",
    category: "Gaming",
    participants: [
      {
        name: "",
        phone: "",
      },
      {
        name: "",
        phone: "",
      },
      {
        name: "",
        phone: "",
      },
      {
        name: "",
        phone: "",
      },
    ],
    participantCount: 4,
  },
  {
    title: "Eliptica",
    category: "Treasure Hunt",
    participants: [
      {
        name: "",
        phone: "",
      },
      {
        name: "",
        phone: "",
      },
    ],
    participantCount: 2,
  },
  {
    title: "Meme Mania",
    category: "AI Meme Gen",
    participants: [
      {
        name: "",
        phone: "",
      },
    ],
    participantCount: 1,
  },
  {
    title: "Surprise Event",
    category: "Surprise",
    participants: [
      {
        name: "",
        phone: "",
      },
      {
        name: "",
        phone: "",
      },
    ],
    participantCount: 2,
  },
];
