import {$} from '../../core/Dom'
import {Emmiter} from '../../core/Emmiter'
import {StoreSubscriber} from '../../core/StoreSubscriber'
import * as actions from '../../redux/actions'

export class Excel {
  constructor(options) {
    this.components = options.components || []
    this.emmiter = new Emmiter
    this.store = options.store
    this.subscriber = new StoreSubscriber(this.store)
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    const componentOptions = {
      emmiter : this.emmiter,
      store : this.store
    }

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions)
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })

    return $root
  }

  init() {
    this.store.dispatch(actions.date())
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach( Component => Component.init());
  }

  destroy() {
    this.components.forEach( Component => Component.destroy())
  }
}
