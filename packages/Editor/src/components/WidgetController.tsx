import React from 'react'

import DropdownWidget from './Dropdown/widget'

const WIDGET_REGISTER = [new DropdownWidget()]

class _WidgetController {
  widgets = WIDGET_REGISTER

  getPlugins() {
    return this.widgets.flatMap((widget) => widget.plugin())
  }

  Widgets = () => {
    return (
      <>
        {this.widgets.map((widget) => {
          return <widget.render key={widget.key} />
        })}
      </>
    )
  }
}

const WidgetController = new _WidgetController()
export default WidgetController
