import Digm from './Digm'

export function createDigm(...args: ConstructorParameters<typeof Digm>) {
  return new Digm(...args)
}
