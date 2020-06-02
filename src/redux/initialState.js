import {defaultStyles} from '../constans'

const defaultState = {
  colState : {},
  rowState : {},
  dataState : {},
  currentText : '',
  currentStyles : defaultStyles,
  stylesState : {},
  headerTitle : 'Новая таблица',
  date : ''
}

const normalize = state => ({
  ...state,
  currentStyles : defaultStyles,
  currentText : ''
})

export function normalizeInitialState(state) {
  return state ? normalize(state) : defaultState
}
