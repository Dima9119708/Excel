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

  closest(parent) {
    return $( this.$el.closest(parent) )
  }

  position() {
    return this.$el.getBoundingClientRect()
  }

  querySelectorAll(elements) {
    return this.$el.querySelectorAll(elements)
  }

  css(styles = {}) {
    Object.keys(styles).forEach( key => {
      this.$el.style[key] = styles[key]
    })
  }

  classListAdd(classEl) {
    return this.$el.classList.add(classEl)
  }

  classListRemove(classEl) {
    return this.$el.classList.remove(classEl)
  }

  getAttribute(attribute) {
    return this.$el.dataset[attribute]
  }

  removeDom() {
    this.$el.remove()
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
