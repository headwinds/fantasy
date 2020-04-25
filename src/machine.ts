import { Machine, assign } from 'xstate'

// The hierarchical (recursive) schema for the states
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
