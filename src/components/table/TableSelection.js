export class TableSelection {
  constructor() {
    this.group = []
    this.selected = 'selected'
    this.current = null
  }

  select($el) {
    this.clear()
    this.current = $el
    this.group.push($el)
    $el.addClass(this.selected)
  }

  selectGroup($elements) {
    this.clear()
    this.group = $elements
    this.group.forEach(el => el.addClass(this.selected))
  }

  get selectedIds() {
    return this.group.map($el => $el.id())
  }

  clear() {
    this.group.forEach(el => el.removeClass(this.selected))
    this.group = []
  }

  applyStyles(styles) {
    this.group.forEach( $el => $el.css(styles))
  }
}
