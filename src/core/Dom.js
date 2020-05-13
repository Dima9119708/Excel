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

  on(eventType, fn) {
    this.$el.addEventListener(eventType, fn)
  }

  off(eventType, fn) {
    this.$el.removeEventListener(eventType, fn)
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, ClassName = '') => {
  const el = document.createElement(tagName)
  if (ClassName) {
    el.classList.add(ClassName)
  }

  return $(el)
}
