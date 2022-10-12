import { useEffect, useState } from 'react'

export default function DevicePixelRatio() {
  const [devicePixelRatio, setDevicePixelRatio] = useState(1)

  useEffect(() => {
    setDevicePixelRatio(window.devicePixelRatio || -1)
  }, [])

  return <span>{devicePixelRatio}</span>
}
