import { DigmV } from '@cphayim/digm-react'

import './App.css'

const url = import.meta.env.VITE_APP_RENDER_SERVER
const order = import.meta.env.VITE_APP_RENDER_ORDER

export default function App() {
  return (
    <div>
      <DigmV url={url} order={order} />
    </div>
  )
}
