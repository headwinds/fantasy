import { MOVE_HERO } from "../constants";

export const reduceHero = (context, action) => {
  switch (action.type) {
    case MOVE_HERO:
      //context.turnCount++;
      let hero;
      const foundHero = context.party.find(hero => hero.id === action.targetHeroId);
      hero = foundHero || {currentPosition: "here"};
      hero.currentPosition = action.targetPosition;
      return context;
    default:
      return context;
  }
};

export default {};