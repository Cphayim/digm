import { useMemo } from 'react'

import './DigmBarrier.css'

export type DigmBarrierProps = {
  /**
   * 是否启用屏障
   * @default false
   */
  enabled?: boolean
  /**
   * 屏障的 z-index
   * @default 5
   */
  zIndex?: number
  /**
   * 点击屏障时的回调
   */
  onBarrierClick?: (...args: any[]) => void | Promise<void>
}

export const DigmBarrier = (props: DigmBarrierProps) => {
  const { zIndex = 5 } = props

  const enabled = useMemo(() => props.enabled ?? false, [props.enabled])

  const handleBarrierClick = () => {
    props.onBarrierClick?.()
  }

  return enabled ? (
    <div className="digm-barrier" style={{ zIndex }} onClick={handleBarrierClick} />
  ) : (
    <></>
  )
}

export default DigmBarrier
