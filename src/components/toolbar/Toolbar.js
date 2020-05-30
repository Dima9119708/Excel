import {$} from '../../core/Dom';
import {ExcelStateComponent} from '../../core/ExcelStateComponent';
import {createToolbarButton} from './toolbar.template';
import {defaultStyles} from '../../constans';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name : 'ToolBar',
      listeners : ['click'],
      subscriber : ['currentStyles'],
      ...options
    })
  }

  prepare() {
    this.initState(defaultStyles)
  }

  get template() {
    return createToolbarButton(this.state)
  }

  storeChanges(changes) {
    this.setState(changes.currentStyles)
  }

  toHTML() {
    return this.template
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.getAttribute('type') === 'button') {
      const value = JSON.parse($target.getAttribute('value'))

      this.$emit('toolbar:styles', value)

      // const key = Object.keys(value)[0]
      // this.setState({[key]: value[key]})
    }
  }
}
