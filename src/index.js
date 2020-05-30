import './scss/index.scss'
import '@babel/polyfill'

import {Excel} from './components/excel/excel'
import {Header} from './components/header/Header'
import {Toolbar} from './components/toolbar/Toolbar'
import {Formula} from './components/formula/Formula'
import {Table} from './components/table/Table'
import {Store} from './core/CreateStore'
import {rootReducer} from './redux/rootReducer'
import {storage, debounce} from './core/utils'
import {initialState} from './redux/initialState'

const store = new Store(rootReducer, initialState)

const stateListener = debounce(state => {
  storage('excel-table', state)
}, 500)

store.subscribe(stateListener)

const excel = new Excel('#app', {
  components : [Header, Toolbar, Formula, Table],
  store
})

excel.render()
