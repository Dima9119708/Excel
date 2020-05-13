import {capitalize} from './utils';

const getMethodName = (eventName) => 'on' + eventName

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root`)
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDomListener() {
    this.listeners.forEach( listener => {
      const method = getMethodName(capitalize(listener))

      if (!this[method]) {
        throw new Error(`Метод ${method} отсутствует у ${this.name}`)
      }

      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method])
    })
  }

  removeDomListener() {
    this.listeners.forEach( listener => {
      const method = getMethodName(capitalize(listener))

      this.$root.off(listener, this[method])
    })
  }
}
