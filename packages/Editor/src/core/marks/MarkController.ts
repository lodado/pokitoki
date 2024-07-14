/* eslint-disable no-param-reassign */
import { MarkSpec, Schema } from 'prosemirror-model'
import React from 'react'

import Bold from './Bold'
import Highlight from './Highlight'
import InlineCodeSnippet from './InlineCodeSnippet'
import Italic from './Italic'
import Strike from './Strike'
import Underline from './Underline'

const MARK_REGISTER = [
  new Bold(),
  new Italic(),
  new Underline(),
  new Highlight(),
  new Strike(),
  new InlineCodeSnippet(),
]

class _MarkController {
  marks = MARK_REGISTER

  getPlugins(schema: Schema) {
    return this.marks.flatMap((mark) => {
      const type = schema.marks[mark.name]

      mark.setMetadata({ type, schema })
      return mark.plugins()
    })
  }

  getMarks() {
    return this.marks.reduce((obj: { [key in string]: MarkSpec }, mark) => {
      obj[mark.name] = mark.createSchema
      return obj
    }, {})
  }
}

const MarkController = new _MarkController()
export default MarkController
