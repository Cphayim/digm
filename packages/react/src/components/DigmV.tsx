import { useRef, useEffect, MutableRefObject } from 'react'
import classNames from 'classnames'
import { noop } from '@cphayim/digm-shared'
import type { RenderStatus } from '@cphayim/digm-core'
import { useDigm } from '../hooks/digm'
import DigmMask from './DigmMask'
import './DigmMask.css'

type Props = {
  /**
   * 渲染服务器 baseUrl
   */
  url: string
  /**
   * 渲染口令
   */
  order: string
  /**
   * 是否启用渲染器日志
   *
   * 默认值: `false`
   */
  enableLog?: boolean
  /**
   * 渲染器完成延迟（防止闪屏）
   *
   * 默认值: `5000`
   */
  sleepTime?: number
  /**
   * 是否显示调试面板
   *
   * 默认值: `false`
   */
  debugPanel?: boolean
  /**
   * 组件显示大小
   *
   * - `viewport`: 撑满视口，即 100vw,100vh
   * - `container`: 撑满父容器，即 100%,100%
   *
   * 默认值: `viewport`
   */
  size?: 'viewport' | 'container'
  /**
   * 是否使用默认的等待遮罩层
   *
   * 默认值: true
   */
  mask?: boolean

  /**
   * 状态改变时，执行的回调函数
   */
   onStatusChange?: (status: RenderStatus) => void

  /**
   * 当准备就绪时，执行的回调函数
   */
  onReady?: () => void
}

export type DigmVProps = Props

export const DigmV = (props: Props) => {
  const digmRef = useRef<HTMLDivElement | null>(null)
  const {
    enableLog = false,
    sleepTime = 5000,
    size = 'viewport',
    mask = true,
    onStatusChange = noop,
    onReady = noop
  } = props

  const { status, isReady } = useDigm({
    autoStart: true,
    target: digmRef as MutableRefObject<HTMLElement>,
    url: props.url,
    order: props.order,
    enableLog,
    sleepTime,
  })

  useEffect(() => {
    onStatusChange(status)
  }, [status, onStatusChange])

  useEffect(() => {
    if (isReady) {
      onReady()
    }
  }, [isReady, onReady])

  return (
    <>
      <div className={classNames(['digm-v', `digm-v__${size}`])} ref={digmRef}></div>
      {mask && <DigmMask />}
    </>
  )
}

export default DigmV
