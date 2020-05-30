import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {} ) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emmiter = options.emmiter
    this.store = options.store
    this.subscriber = options.subscriber || []
    this.unsubscribers = []
    this.unSub = null

    this.prepare()
  }

  prepare() {
  }

  $emit(event, ...args) {
    this.emmiter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emmiter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  // State ( redux )
  $dispatch(action) {
    this.store.dispatch(action)
  }

  storeChanges() {}

  toHTML() {
    return ''
  }

  init() {
    this.initDomListener()
  }

  destroy() {
    this.removeDomListener()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
