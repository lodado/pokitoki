import { InputRule, inputRules } from 'prosemirror-inputrules'
import { keymap } from 'prosemirror-keymap'
import { Node as ProsemirrorNode, NodeSpec, NodeType, Schema } from 'prosemirror-model'
import { Command, Plugin } from 'prosemirror-state'

export default abstract class BaseNode {
  schema!: Schema
  type!: NodeType

  abstract get name(): string

  get createSchema(): NodeSpec {
    return {}
  }

  setMetadata({ type, schema }: { type: NodeType; schema: Schema<any, any> }) {
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

  keys(): Record<string, Command> {
    return {}
  }

  commands() {
    return (attrs: any) => {}
  }
}
