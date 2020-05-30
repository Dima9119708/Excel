import {isEqual} from './utils'

export class StoreSubscriber {
  constructor(store) {
    this.store = store
    this.sub = null
    this.prevState = {}
  }

  subscribeComponents(components) {
    this.prevState = this.store.getState()

    this.sub = this.store.subscribe(state => {
      Object.keys(state).forEach(key => {
        if ( !isEqual(this.prevState[key], state[key]) ) {
          components.forEach( component => {
            if (component.subscriber.includes(key)) {
              const changes = {[key] : state[key]}
              component.storeChanges(changes)
            }
          })
        }
      })
      this.prevState = this.store.getState()
    })
  }

  unsubscriber() {
    this.sub.unsubscribe()
  }
}
