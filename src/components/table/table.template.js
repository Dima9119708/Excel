import {toInlineStyles} from '../../core/utils'
import {defaultStyles} from '../../constans'
import {parse} from '../../core/parse'

const CODES = {
  A : 65,
  Z : 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function withWidthfrom(state) {
  return function(col, index) {
    const width = getWidth(state.colState, index)
    return {
      col, index, width
    }
  }
}

function toCell(row, state) {
  return function(_, col) {
    const id = `${col}:${row}`
    const dataState = state.dataState[id] ? state.dataState[id] : ''
    const width = getWidth(state.colState, col)
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    })
    return `
    <div 
    class="cell" 
    contenteditable 
    data-cell="cell"
    data-value="${dataState}"
    data-id=${id}
    style="${styles}; width:${width}"
    >
    ${parse(dataState)}
    </div>
    `
  }
}

function toColumn({col, index, width}) {
  return `
   <div class="column" data-resizer data-id=${index} style="width:${width}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
   </div>
  `
}

function createRow(content, count, state) {
  const resize = count ? '<div class="row-resize" data-resize="row"></div>' : ''
  const dataRowData = count ? 'data-row-data' : ''
  const dataRowCount = count ? count : ''

  const stateRow = state ? state.rowState : ''
  const height = getHeight(stateRow, count)

  return `
    <div class="row" 
        data-resizer 
        data-id-row="${dataRowCount}" 
        style="height:${height}">
    
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

export function createTable(rowCount = 15, state) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthfrom(state))
      .map(toColumn)
      .join('')

  rows.push(createRow(cols))

  for ( let row = 0; row < rowCount; row++ ) {
    const cell = new Array(colsCount)
        .fill('')
        .map(toCell(row, state))
        .join('')
    rows.push(createRow(cell, row + 1, state))
  }

  return rows.join('')
}
