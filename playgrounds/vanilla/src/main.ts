import './style.css'

import { createDigm, getStatusLabel, RenderStatus } from '@cphayim-digm/core'

const digmViewEle = document.querySelector('.digm-view') as HTMLDivElement
const digmMaskEle = document.querySelector('.digm-mask') as HTMLDivElement

const digm = createDigm()

updateMask(digm.status)
digm.addStatusSubscriber(updateMask)

digm.init(digmViewEle)
digm.startEngine({
  url: import.meta.env.VITE_APP_RENDER_SERVER,
  order: import.meta.env.VITE_APP_RENDER_ORDER,
  width: digmViewEle.clientWidth,
  height: digmViewEle.clientHeight,
  enableLog: false,
})

function updateMask(status: RenderStatus) {
  digmMaskEle.innerHTML = getStatusLabel(status)
  if (status === RenderStatus.RENDER_MODEL_FINISHED) {
    digmMaskEle.style.display = 'none'
  }
}
