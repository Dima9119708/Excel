const CODES = {
  A : 65,
  Z : 90
}

function createCell() {
  return `
   <div class="cell" contenteditable></div>
  `
}

function createColumn(content) {
  return `
   <div class="column">${content}</div>
  `
}

function createRow(content, count) {
  return `
    <div class="row">
        <div class="row-info">${count || ''}</div>
        <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function rowCount() {
  let count = 1

  return function() {
    return count++
  }
}

const count = rowCount()

export function createTable(rowCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(createColumn)
      .join('')

  const cell = new Array(colsCount)
      .fill('')
      .map(createCell)
      .join('')

  rows.push(createRow(cols))

  for ( let i = 0; i < rowCount; i++ ) {
    rows.push(createRow(cell, count()))
  }

  return rows.join('')
}
