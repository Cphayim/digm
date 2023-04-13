import { ensureObject } from '@cphayim-digm/shared'
import type { FeatureResult } from '../features/BaseFeature'
import type { CloudEvent, CloudEventHandler } from './event-type'

export class RenderEvent {
  private _eventMap = new Map<CloudEvent, Set<CloudEventHandler>>()

  add(name: CloudEvent, handler: CloudEventHandler) {
    let eventSet = this._eventMap.get(name)
    if (!eventSet) this._eventMap.set(name, (eventSet = new Set()))
    eventSet.add(handler)
  }

  remove(name: CloudEvent, handler: CloudEventHandler) {
    const eventSet = this._eventMap.get(name)
    if (eventSet) eventSet.delete(handler)
  }

  globalEventHandler(data: FeatureResult) {
    const obj = ensureObject(data)
    const eventSet = this._eventMap.get(obj.func_name)
    if (eventSet) {
      eventSet.forEach(async (handler) => {
        try {
          await handler(obj)
        } catch (error) {
          console.error(error)
        }
      })
    }
  }
}
