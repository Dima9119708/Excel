import './scss/index.scss'
import '@babel/polyfill'
import {Router} from './core/routes/Router'
import {DashboardPage} from './pages/DashboardPage'
import {ExcelPage} from './pages/ExcelPage'

new Router('#app', {
  dashboard : DashboardPage,
  excel : ExcelPage
})
