import {ExcelComponent} from '../../core/ExcelComponent';
import * as actions from '../../redux/actions'
import {debounce} from '../../core/utils';
import {$} from '../../core/Dom'
import {ActiveRoute} from '../../core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name : 'Header',
      listeners : ['input', 'click'],
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

        <div class="button" data-delete="delete">
          <i class="material-icons" data-delete="delete">delete</i>
        </div>

        <div class="button" data-exit="exit">
          <i class="material-icons" data-exit="exit">exit_to_app</i>
        </div>

      </div>
    `
  }

  onInput(event) {
    this.$dispatch(actions.headerTittle(event.target.value))
  }

  onClick(event) {
    if ( $(event.target).getAttribute('exit')) {
      ActiveRoute.exit
    } else if ($(event.target).getAttribute('delete')) {
      const params = ActiveRoute.param
      localStorage.removeItem(`excel:${params}`)
      ActiveRoute.exit
    }
  }
}
