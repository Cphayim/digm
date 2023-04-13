import { useState, useEffect, useCallback, useMemo } from 'react'
import classNames from 'classnames'
import { sleep } from '@cphayim-digm/shared'
import { useDigm } from '../hooks/digm'

import './DigmMask.css'

import loadingImg from '../assets/loading.svg'

export type DigmMaskProps = {
  /**
   * 是否显示加载中的图标
   * @default true
   */
  loading?: boolean
  /**
   * 背景图片
   */
  backgroundImage?: string
}

export const DigmMask = (props: DigmMaskProps) => {
  const { loading = true } = props

  const backgroundImage = useMemo(
    () => props.backgroundImage && `url(${props.backgroundImage})`,
    [props.backgroundImage],
  )

  const { isReady, isError, statusLabel } = useDigm()
  const [showMask, setShowMask] = useState(true)

  const wait = useCallback(async () => {
    if (isReady) {
      await sleep(2000)
      setShowMask(false)
    }
  }, [isReady, setShowMask])

  useEffect(() => {
    wait()
  }, [wait])

  if (!showMask) {
    return <></>
  }

  return (
    <div className="digm-mask" style={{ backgroundImage }}>
      <div className="digm-mask-center">
        {loading && <img className="digm-mask-loading" src={loadingImg} />}
        <div
          className={classNames('digm-mask-status-label', {
            'digm-mask-status-label__error': isError,
          })}
        >
          {statusLabel}
        </div>
        <div className="digm-mask-status-tip">
          （根据服务器及本地性能，载入可能需要数分钟，请您耐心等待）
        </div>
      </div>
    </div>
  )
}

export default DigmMask
