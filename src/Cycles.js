export const cycles = [
  {
    title: "Backlog",
    color: "#A2622D",
    defaultItems: ["Go shopping", "Make the dinner"],
  },
  {
    title: "In Progress",
    color: "#1B6161",
    defaultItems: ["Working hard", "Learning new things"],
  },
  {
    title: "Complete",
    color: "#248224",
    defaultItems: [
      "Created portfolio",
      "Created some side projects",
      "Got my first developer job",
    ],
  },
  {
    title: "On Hold",
    color: "#A22D22",
    defaultItems: [],
  },
].map((cycle) => ({
  ...cycle,
  defaultItems: cycle.defaultItems.map((content, index) => ({
    id: index,
    content,
  })),
}));
