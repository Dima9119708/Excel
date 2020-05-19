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

  clear() {
    this.group.forEach(el => el.removeClass(this.selected))
    this.group = []
  }
}
