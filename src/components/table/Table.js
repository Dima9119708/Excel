import {ExcelComponent} from '../../core/ExcelComponent'
import {createTable} from './table.template'
import {tableResize} from '../table/table.resizer'
import {shouldResize} from '../table/shouldResize'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name : 'Table',
      listeners : ['mousedown']
    })
  }

  toHTML() {
    return createTable(200)
  }

  onMousedown(event) {
    if (shouldResize()) {
      tableResize(this.$root, event)
    }
  }
}
