import { DigmV, useDigm, useDigmReady } from '@cphayim-digm/react'
import { useEffect } from 'react'

import './App.css'

const url = import.meta.env.VITE_APP_RENDER_SERVER
const order = import.meta.env.VITE_APP_RENDER_ORDER

export default function App() {
  const { isReady } = useDigm()
  useEffect(() => {
    if (isReady) console.log('isReady')
  }, [isReady])

  useDigmReady((digm) => {
    console.log('DIGM is ready')
  })

  useDigmReady((digm) => {
    console.log('DIGM is ready2')
  })
  return (
    <div>
      <DigmV url={url} order={order} />
    </div>
  )
}
