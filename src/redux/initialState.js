import {storage} from '../core/utils'
import {defaultStyles} from '../constans'

const defaultState = {
  colState : {},
  rowState : {},
  dataState : {},
  currentText : '',
  currentStyles : defaultStyles,
  stylesState : {},
  headerTitle : 'Новая таблица'
}

export const initialState = storage('excel-table')
      ? storage('excel-table')
      : defaultState
