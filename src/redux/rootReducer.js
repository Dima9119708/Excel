import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  CHANGE_STYLE,
  APPLY_STYLES,
  HEADER_TITTLE
} from './types'

export function rootReducer(state, action) {
  let field
  let val
  switch (action.type) {
    case TABLE_RESIZE:

      field = action.data.type === 'col' ? 'colState' : 'rowState'
      return {...state, [field] : value(state, field, action)}

    case CHANGE_TEXT:
      field = 'dataState'
      return {
        ...state,
        currentText : action.data.text,
        [field] : value(state, field, action)
      }

    case CHANGE_STYLE:

      return {...state, currentStyles : action.data}

    case APPLY_STYLES:
      field = 'stylesState'
      val = state[field] || {}
      action.data.ids.forEach( id => {
        val[id] = {...state.currentStyles, ...action.data.value}
      });
      return {
        ...state,
        [field]: val,
        currentStyles: {...state.currentStyles, ...action.data.value}
      }

    case HEADER_TITTLE: {
      return {
        ...state,
        ['headerTitle'] : action.data
      }
    }
    default: return JSON.parse(JSON.stringify(state))
  }
}

function value(state, fild, action) {
  const val = state[fild] || {}
  val[action.data.id] = action.data.value || action.data.text
  return val
}
