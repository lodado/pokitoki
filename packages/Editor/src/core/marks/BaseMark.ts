import { InputRule, inputRules } from 'prosemirror-inputrules'
import { keymap } from 'prosemirror-keymap'
import { MarkSpec, MarkType, Node as ProsemirrorNode, NodeType, Schema } from 'prosemirror-model'
import { Command, EditorState, Plugin } from 'prosemirror-state'

import { getMarksAtRange, uniqueMarks } from './utils'

export default abstract class BaseMark {
  schema!: Schema
  type!: MarkType

  abstract get name(): string

  get createSchema(): MarkSpec {
    return {}
  }

  get defaultOptions() {
    return {}
  }

  setMetadata({ type, schema }: { type: MarkType; schema: Schema<any, any> }) {
    this.schema = schema
    this.type = type
  }

  plugins(): Plugin[] {
    const inputRulesPlugin = inputRules({ rules: this.inputRules() })

    return [keymap(this.keys()), inputRulesPlugin]
  }

  inputRules(): InputRule[] {
    return []
  }

  keys(): Record<string, Command> | Record<string, (...any: any) => boolean> {
    return {}
  }

  commands() {
    return (attrs: any) => {}
  }

  /**
   * Merges marks within the specified range in the editor state.
   *
   * @param state - The editor state.
   * @param match - The regular expression match array.
   * @param start - The start position of the range.
   * @param end - The end position of the range.
   * @returns The updated editor transaction.
   */
  protected updateMark = (state: EditorState, match: RegExpMatchArray, start: number, end: number) => {
    const { tr } = state

    const marks = getMarksAtRange(state, start, end)

    if (match[1]) {
      tr.replaceWith(Math.max(start, 1), end, this.schema.text(match[1], uniqueMarks([this.type.create(), ...marks])))
    }
    return tr
  }
}
