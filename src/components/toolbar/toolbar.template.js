function toButton(button) {
  const active = button.active ? 'active' : ''
  const meta = `
  data-type="button"
  data-value='${JSON.stringify(button.value)}'
  `
  return `
    <div class="button ${active}" ${meta}>
        <i ${meta} class="material-icons">${button.icon}</i>
    </div>
  `
}

export function createToolbarButton(state) {
  const buttons = [
    {
      icon: 'format_align_left',
      active : state['textAlign'] === 'left',
      value : {textAlign : 'left'}
    },
    {
      icon: 'format_align_center',
      active : state['textAlign'] === 'center',
      value : {textAlign : 'center'}
    },
    {
      icon: 'format_align_right',
      active : state['textAlign'] === 'right',
      value : {textAlign : 'right'}
    },
    {
      icon: 'format_bold',
      active : state.fontWeight === 'normal' ? false : true,
      value : {fontWeight : state.fontWeight === 'normal' ? 'bold' : 'normal'}
    },
    {
      icon: 'format_italic',
      active : state.fontStyle === 'normal' ? false : true,
      value : {fontStyle : state.fontStyle === 'normal' ? 'italic' : 'normal'}
    },
    {
      icon: 'format_underlined',
      active : state.textDecoration === 'none' ? false : true,
      value : {textDecoration :
                state.textDecoration === 'none'
                    ? 'underline'
                    : 'none'}
    }
  ]

  return buttons.map(toButton).join('')
}
