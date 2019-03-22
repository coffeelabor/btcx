export var InformationType = Object.freeze({
  "ProofOfWork": 1,
  "Version": 2,
  "MerkleField": 3,
  "Underlined": 4,
})

var Information = [];
Information.push(
  {
    id: InformationType.ProofOfWork,
    title: "What is Block Hash?",
    content: "A Block Hash, also known as a Block ID or Proof-of-Work, is the the infomation used to uniquely identify and block on the Bitcoin blockchain."
  },
  {
    id: InformationType.Version,
    title: "What is the Version field?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.MerkleField,
    title: "What is the Merkel Root Field?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id enim at mi vulputate consectetur. Suspendisse eu sapien vestibulum, dignissim enim quis, ornare nisl."
  },
  {
    id: InformationType.Underlined,
    title: "You're a quick learner...",
    content: "Now try a real info block!"
  },
);

export function GetInformation(id) {
  return Information.find(obj => { 
    return obj.id == id 
  });
}