const CODES = {
  A : 65,
  Z : 90
}

function createCell(row) {
  return function(_, col) {
    return `
    <div 
    class="cell" 
    contenteditable 
    data-cell="cell" 
    data-id=${col}:${row}
    >
    </div>
    `
  }
}

function createColumn(content, index) {
  return `
   <div class="column" data-resizer data-id=${index}>
      ${content}
      <div class="col-resize" data-resize="col"></div>
   </div>
  `
}

function createRow(content, count) {
  const resize = count ? '<div class="row-resize" data-resize="row"></div>' : ''
  const dataRowData = count ? 'data-row-data' : ''
  return `
    <div class="row" data-resizer>
        <div class="row-info">
          ${count || ''}
          ${resize}
        </div>
        <div class="row-data" ${dataRowData}>
            ${content}
        </div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(createColumn)
      .join('')

  rows.push(createRow(cols))

  for ( let row = 0; row < rowCount; row++ ) {
    const cell = new Array(colsCount)
        .fill('')
        .map(createCell(row))
        .join('')
    rows.push(createRow(cell, row + 1))
  }

  return rows.join('')
}
