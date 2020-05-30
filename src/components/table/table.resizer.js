import {$} from '../../core/Dom'

export function tableResize($root, event) {
  return new Promise(resolve => {
    const $parent = $(event.target)
    const $resizer = $parent.closest('[data-resizer]')
    const $position = $resizer.position()
    const $getID = $resizer.getAttribute('id') || $resizer.getAttribute('idRow')
    const type = event.target.dataset.resize
    let delta
    let value

    if ( type == 'col' ) {
      $parent.css({
        opacity : 1,
        bottom : '-5000px'
      })
    } else {
      $parent.css({
        opacity : 1,
        width : $root.$el.clientWidth + 'px'
      })
    }

    document.onmousemove = e => {
      if ( type == 'col') {
        delta = e.pageX - $position.right
        value = ($position.width + delta)
        $parent.css({
          right : -delta + 'px'
        })
      } else {
        delta = e.y - $position.bottom
        value = ($position.height + delta)
        $parent.css({
          bottom : -delta + 'px',
          opacity : 1,
          width : $root.$el.clientWidth + 'px'
        })
      }

      return value
    }

    document.onmouseup = e => {
      document.onmousemove = null
      document.onmouseup = null
      if ( type == 'col' ) {
        $parent.css({
          opacity : 0,
          bottom : 0,
          right : 0
        })
        $resizer.css({
          width : value + 'px'
        })
        $root.querySelectorAll('[data-row-data]')
            .forEach(elem => $(elem.children[$getID]).css({
              width : value + 'px'
            }))
      } else {
        $resizer.css({
          height : value + 'px'
        })
        $parent.css({
          bottom : 0,
          opacity : 0,
          width : 100 + '%'
        })
      }

      resolve({
        value,
        type,
        id : +$getID
      })
    }
  })
}
