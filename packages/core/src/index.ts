import { ensureObject } from '@cphayim/digm-shared'
import Digm from './digm'

export function createDigm(...args: ConstructorParameters<typeof Digm>) {
  return new Digm(...args)
}

console.log(ensureObject('{ "name": "Cphayim" }'))
