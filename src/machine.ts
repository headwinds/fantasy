import { Machine, assign } from 'xstate'

// The hierarchical (recursive) schema for the states
/*
interface LightStateSchema {
  states: {
    green: {}
    yellow: {}
    red: {
      states: {
        walk: {}
        wait: {}
        stop: {}
      }
    }
  }
}
*/


type Hero = {
  name: "hero",
}

type Enemy = {
  name: "enemy",
}

type Result = {
  score: 1,
}

type Round = {
  order: 1,
  attacker: Hero,
  defender: Enemy,
  result: Result
}

type EnemyCollection = Enemy[];
type HeroCollection = Hero[];
type RoundCollection = Round[];

type GameContext = {
    turnCount: number,
    enemies: EnemyCollection,
    party: HeroCollection,
    phase: string,
    selectedAction: string,
    selectedEnemy: Hero,
    selectedHero: Enemy,
    experience: number,
    round: RoundCollection,
    roundResolved: boolean, 
    hereosActedCount: number,
    hereosTotal: number,
}

// The events that the machine handles
type LightEvent =
  | { type: 'TIMER' }
  | { type: 'POWER_OUTAGE' }
  | { type: 'PED_COUNTDOWN'; duration: number }

// The context (extended state) of the machine
interface LightContext {
  elapsed: number
}

export const myMachine = Machine({
  id: 'finalfantasy',
  initial: 'shipping',
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
    shipping: {
      on: {
        SUBMIT: 'setShipping'
      },
      initial: 'options',
      states: {
        options: {
          on: {
            EDIT: 'form',
            PICKUP: 'guideshops'
          }
        },
        form: {
          on: {
            SAVE: 'options'
          }
        },
        guideshops: {
          on: {
            SELECT: 'options'
          }
        }
      }
    },
    setShipping: {
      on: {
        SUCCESS: 'payment',
        FAILURE: 'shipping'
      }
    },
    payment: {
      on: {
        PREVIOUS: 'shipping',
        SUBMIT: 'setPayment'
      },
      initial: 'credit-card',
      states: {
        'credit-card': {
          on: {
            SWITCH_DEBIT_CARD: 'debit-card',
            SWITCH_BOLETO: 'boleto'
          }
        },
        'debit-card': {
          on: {
            SWITCH_CREDIT_CARD: 'credit-card'
          }
        },
        boleto: {
          on: {
            SWITCH_CREDIT_CARD: 'credit-card'
          }
        },
        'store-credits': {}
      }
    },
    setPayment: {
      on: {
        SUCCESS: 'summary',
        FAILURE: 'payment'
      }
    },
    summary: {
      on: {
        PREVIOUS: 'payment',
        SUBMIT: 'purchase'
      },
      initial: 'gift-message-open',
      states: {
        'gift-message-open': {
          on: {
            CLICK: 'gift-message-close'
          }
        },
        'gift-message-close': {
          on: {
            CLICK: 'gift-message-open'
          }
        }
      }
    },
    purchase: {
      on: {
        SUCCESS: 'confirmation',
        FAILURE: 'summary'
      }
    },
    confirmation: {}
  }
})
