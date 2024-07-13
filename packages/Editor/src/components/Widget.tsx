import { Plugin } from 'prosemirror-state'

let id = 0

const generateID = () => {
  id += 1
  return id
}

export default abstract class Widget {
  key = generateID()

  public abstract render(): JSX.Element

  public plugin(): Plugin[] {
    return []
  }
}
