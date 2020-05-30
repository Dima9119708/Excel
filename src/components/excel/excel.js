import {$} from '../../core/Dom'
import {Emmiter} from '../../core/Emmiter'
import {StoreSubscriber} from '../../core/StoreSubscriber'

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
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

  render() {
    this.$el.append(this.getRoot())

    this.subscriber.subscribeComponents(this.components)
    this.components.forEach( Component => Component.init());
  }

  destroy() {
    this.components.forEach( Component => Component.destroy())
  }
}
