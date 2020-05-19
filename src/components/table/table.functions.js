import {range} from '../../core/utils'

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function idCell(event) {
  return event.target.dataset.cell
}

export function matrix($target, $current) {
  const current = $target.id(true)
  const target = $current.id(true)

  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${col}:${row}`))
    return acc
  }, [])
}


export function nextSelector(key, {col, row}) {
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowLeft':
      if ( col > 0 ) {
        col--
      }
      break
    case 'ArrowUp':
      if ( row > 0 ) {
        row--
      }
      break
  }

  return `[data-id="${col}:${row}"]`
}
