import {storage} from '../core/utils'

function toHTML(key) {
  const model = storage(key)
  const id = key.split(':')[1]
  return `
    <li class="db__record">
      <a href="#excel/${id}">${model.headerTitle}</a>
      <strong>${model.date}</strong>
    </li>
  `
}

export function getAllKeys() {
  const keys = []
  for ( let i = 0; i < localStorage.length; i++ ) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }

  return keys
}

export function createRecords() {
  const keys = getAllKeys()

  if ( !keys.length ) {
    return `<p>Таблицы не созданы</p>`
  }

  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>

    <ul class="db__list">
      ${keys.map(toHTML).join('')}
    </ul>
  `
}

