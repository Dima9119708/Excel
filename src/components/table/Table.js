import {ExcelComponent} from '../../core/ExcelComponent'
import {createTable} from './table.template'
import {tableResize} from '../table/table.resizer'
import {TableSelection} from './TableSelection'
import {$} from '../../core/Dom'
import {
  idCell,
  shouldResize,
  matrix,
  nextSelector} from './table.functions'
import * as actions from '../../redux/actions'
import {defaultStyles} from '../../constans'
import {parse} from '../../core/parse'

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
    return createTable(50, this.store.getState())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    this.selectCell(this.$root.querySelector('[data-id="0:0"]'))

    this.$on('Formula:input', data => {
      this.selection.current.attr('data-value', data)
      this.selection.current.text(parse(data))
      this.updateTextInStore(data)
    })

    this.$on('Formula:Enter', () => this.selection.current.focus())

    this.$on('toolbar:styles', styles => {
      this.selection.applyStyles(styles)
      this.$dispatch(actions.applyStyles({
        value : styles,
        ids : this.selection.selectedIds
      }))
    })
  }

  selectCell($cell) {
    this.$emit('TableText', $($cell))
    this.selection.select($($cell))

    const styles = $($cell).getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }

  async resultResize($root, event) {
    const data = await tableResize($root, event)
    this.$dispatch(actions.tableResize(data))
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resultResize(this.$root, event)
    } else if (idCell(event)) {
      if (event.shiftKey) {
        const $elements = matrix($(event.target), this.selection.current)
            .map(id => $(this.$root.querySelector(`[data-id="${id}"]`)))
        this.selection.selectGroup($elements)
      } else {
        this.selectCell(event.target)
      }
    }
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

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id : this.selection.current.id(),
      text : value
    }))
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text())
  }
}
