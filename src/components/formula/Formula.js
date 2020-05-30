import {ExcelComponent} from '../../core/ExcelComponent';
import {$} from '../../core/Dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name : 'Formula',
      listeners : ['input', 'keydown'],
      subscriber : ['currentText'],
      ...options
    })
  }

  init() {
    super.init()

    this.$formulaInput = $(this.$root.querySelector('[data-formula-input]'))

    this.$on('TableText', data => {
      this.$formulaInput.text(data.attr('data-value'))
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" 
        data-formula-input 
        contenteditable 
        spellcheck="false"
      ></div>
    `
  }

  onInput(event) {
    this.$emit('Formula:input', $(event.target).text())
  }

  onKeydown(event) {
    const {key} = event

    if ( key == 'Enter' || key == 'Tab' ) {
      event.preventDefault()

      this.$emit('Formula:Enter', 'Enter')
    }
  }

  storeChanges({currentText}) {
    if ( currentText === '' ) {
      this.$formulaInput.text(' ')
    }

    this.$formulaInput.text(currentText)
  }
}
