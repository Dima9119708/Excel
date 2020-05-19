import {$} from '../../core/Dom'
import {Emmiter} from '../../core/Emmiter'

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
    this.emmiter = new Emmiter
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    const componentEmmiter = {
      emmiter : this.emmiter
    }

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentEmmiter)
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())

    this.components.forEach( Component => Component.init());
  }

  destroy() {
    this.components.forEach( Component => Component.destroy())
  }
}
