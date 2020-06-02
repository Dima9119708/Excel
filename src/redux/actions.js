import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  CHANGE_STYLE,
  APPLY_STYLES,
  HEADER_TITTLE,
  DATE
} from './types'

export function tableResize(data) {
  return {
    type : TABLE_RESIZE,
    data
  }
}

export function changeText(data) {
  return {
    type : CHANGE_TEXT,
    data
  }
}

export function changeStyles(data) {
  return {
    type : CHANGE_STYLE,
    data
  }
}

export function applyStyles(data) {
  return {
    type : APPLY_STYLES,
    data
  }
}

export function headerTittle(data) {
  return {
    type : HEADER_TITTLE,
    data
  }
}

export function date() {
  return {
    type : DATE
  }
}
