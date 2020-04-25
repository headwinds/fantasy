import { initialParty, initialEnemies } from "../config/config";
import { Machine, assign } from "xstate";
import { reduceEnemy } from "../reducers/enemy-reducer";
import { reduceHero } from "../reducers/hero-reducer";
import { PARTY_FIGHT } from "../constants";
import produce from "immer";

function updateContext(produceFn) {
  return assign((context, action) =>
    produce(context, (draft) => {
      produceFn(draft, action);
    })
  );
}


export const ffMachine = Machine(
  {
    id: "finalfantasy",
    initial: "travelling",
    context: {
      turnCount: 0,
      enemies: initialEnemies,
      party: initialParty,
      phase: "start",
      selectedAction: PARTY_FIGHT,
      selectedEnemy: initialEnemies[0],
      selectedHero: initialParty[0],
      experience: 0,
      round: [
        {
          order: 1,
          attacker: {},
          defender: {},
          result: {}
        }
      ],
      roundResolved: false, 
      hereosActedCount: 0,
      hereosTotal: initialParty.length,
    },
    states: {
      travelling: {
        on: {
          INCREMENT: {
            actions: updateContext((context) => context.turnCount++),
          },
          DECREMENT: {
            actions: updateContext((context) => context.turnCount--),
          },
          INC_HERO_ACTED_COUNT: {
            actions: updateContext((context) => {
              if (context.hereosActedCount < context.hereosTotal) {
                return context.hereosActedCount++
              }
            }),
          },
          ENEMY_ATTACK: {
            actions: updateContext((context) => context.turnCount--),
          },
          PARTY_FIGHT: {
            actions: updateContext(reduceEnemy),
          },
          PARTY_RUN: {
            actions: updateContext(reduceEnemy),
          },
          MOVE_HERO: {
            actions: updateContext(reduceHero),
          },
          UPDATE_PHASE: {
            actions: updateContext(
              (context, action) => (context.phase = action.phase)
            ),
          },
          SELECTED_ACTION: {
            actions: updateContext(
              (context, action) =>
                (context.selectedAction = action.selectedAction)
            ),
          },
          SELECTED_ENEMY: {
            actions: updateContext(
              (context, action) =>
                (context.selectedEnemy = action.selectedEnemy)
            ),
          },
          SELECTED_HERO: {
            actions: updateContext(
              (context, action) =>
                (context.selectedHero = action.selectedHero)
            ),
          },
          REWARD_EXPERIENCE: {
            actions: assign({
              experience: 100
            })
          }
        }
      },
      results: { type: "final" },
      gameover: { type: "final" },
    },
  },
  {
    guards: {
      didPlayerWin: (context, event) => {
        // check if player won
        return context.experience > 99;
      },
      didPlayerLose: (context, event) => {
        // check if player lost
        return context.experience < 0;
      },
    },
  }
);
