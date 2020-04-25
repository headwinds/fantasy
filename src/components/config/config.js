export const initialParty = [
  {
    id: 0,
    name: "gish",
    class: "warrior",
    health: 35,
    attack: 5,
    url: "ff_warrior.png",
    type: "hero",
    currentPosition: 0
  },
  {
    id: 1,
    name: "day9",
    class: "mage",
    health: 9,
    attack: 15,
    url: "ff_mage.png",
    type: "hero",
    currentPosition: 1
  },
  {
    id: 2,
    name: "Scar",
    class: "cleric",
    health: 23,
    attack: 10,
    url: "ff_cleric.png",
    type: "hero",
    currentPosition: 2
  },
  {
    id: 3,
    name: "rasa",
    class: "archer",
    health: 18,
    attack: 10,
    url: "ff_archer.png",
    type: "hero",
    currentPosition: 3
  }
];

const enemy = {
  id: 0,
  name: "enemy",
  health: 10,
  attack: 10,
  url: "ff_imp.png",
  type: "enemy",
  currentPosition: 3
};
export const initialEnemies = [...Array(6).keys()].map(idx => ({
  ...enemy,
  name: "imp",
  currentPosition: idx,
  id: idx
}));
