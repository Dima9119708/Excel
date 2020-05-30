class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
             ? document.querySelector(selector)
             : selector
  }

  html(html) {
    if ( typeof html === 'string' ) {
      this.$el.innerHTML = html
      return this
    }

    return this.$el.innerHTML.trim()
  }

  text(text) {
    if (text) {
      this.$el.textContent = text
      return this
    }
    return this.$el.textContent
  }

  clear() {
    this.html('')
    return this
  }

  append(node) {
    if ( node instanceof Dom ) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }

    return this
  }

  remove() {
    this.$el.remove()
  }

  on(eventType, fn) {
    this.$el.addEventListener(eventType, fn)
  }

  off(eventType, fn) {
    this.$el.removeEventListener(eventType, fn)
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value)
      return this
    }
    return this.$el.getAttribute(name)
  }

  closest(parent) {
    return $( this.$el.closest(parent) )
  }

  position() {
    return this.$el.getBoundingClientRect()
  }

  querySelector(selector) {
    return this.$el.querySelector(selector)
  }

  querySelectorAll(elements) {
    return this.$el.querySelectorAll(elements)
  }

  css(styles = {}) {
    Object.keys(styles).forEach( key => {
      this.$el.style[key] = styles[key]
    })
  }

  getStyles(styles = []) {
    return styles.reduce((res, s) => {
      res[s] = this.$el.style[s]
      return res
    }, {})
  }

  addClass(classEl) {
    return this.$el.classList.add(classEl)
  }

  removeClass(classEl) {
    return this.$el.classList.remove(classEl)
  }

  id(parse) {
    if (parse) {
      const elem = this.id().split(':')
      return {
        col : +elem[0],
        row : +elem[1]
      }
    }
    return this.$el.dataset.id
  }

  getAttribute(attribute) {
    return this.$el.dataset[attribute]
  }

  removeDom() {
    this.$el.remove()
  }

  focus() {
    return this.$el.focus()
  }

  blur() {
    return this.$el.blur()
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, ClassName = '') => {
  const el = document.createElement(tagName)
  if (ClassName) {
    el.classList.add(ClassName)
    el.setAttribute(`data-${ClassName}`, '')
  }

  return $(el)
}
