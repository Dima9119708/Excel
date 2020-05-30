import {ExcelComponent} from '../../core/ExcelComponent';
import * as actions from '../../redux/actions'
import {debounce} from '../../core/utils';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name : 'Header',
      listeners : ['input'],
      ...options
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 500)
  }

  toHTML() {
    const title = this.store.getState().headerTitle
    return `
      <input type="text" class="input" 
      data-header-input value="${title}" />

      <div>

        <div class="button">
          <i class="material-icons">delete</i>
        </div>

        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>

      </div>
    `
  }

  onInput(event) {
    this.$dispatch(actions.headerTittle(event.target.value))
  }
}
