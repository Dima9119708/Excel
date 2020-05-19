import {ExcelComponent} from '../../core/ExcelComponent'
import {createTable} from './table.template'
import {tableResize} from '../table/table.resizer'
import {TableSelection} from './TableSelection'
import {$} from '../../core/Dom'
import {idCell, shouldResize, matrix, nextSelector} from './table.functions'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name : 'Table',
      listeners : ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  toHTML() {
    return createTable(50)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    this.selectCell(this.$root.querySelector('[data-id="0:0"]'))

    this.$on('Formula:input', data => {
      this.selection.current.text(data)
    })

    this.$on('Formula:Enter', () => this.selection.current.focus())
  }

  selectCell($cell) {
    this.$emit('TableText', $($cell).text())
    this.selection.select($($cell))
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      tableResize(this.$root, event)
    } else if (idCell(event)) {
      if (event.shiftKey) {
        const $elements = matrix($(event.target), this.selection.current)
            .map(id => $(this.$root.querySelector(`[data-id="${id}"]`)))
        this.selection.selectGroup($elements)
      } else {
        this.selection.select($(event.target))
      }
    }

    this.$emit('TableText', $(event.target).text())
  }

  onKeydown(event) {
    const arrKey = [
      'Enter',
      'Tab',
      'ArrowUp',
      'ArrowDown',
      'ArrowRight',
      'ArrowLeft'
    ]

    const {key} = event

    if ( arrKey.includes(key) && !event.shiftKey ) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const elementID = this.$root.querySelector(nextSelector(key, id))
      if (elementID) {
        elementID.focus()
        this.selectCell(elementID)
      }
    }
  }

  onInput(event) {
    this.$emit('TableText', $(event.target).text())
  }
}
