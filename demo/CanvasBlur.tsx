import { useEffect, useRef } from 'react'

type Props = {
  fixed: boolean
}

export default function CanvasBlur({ fixed = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const CTX = canvasRef.current!.getContext('2d')!
    const CH = 200
    const CW = canvasRef.current!.parentElement!.clientWidth
    CTX.lineWidth = 1
    if (fixed) {
      canvasRef.current!.style.height = `${CH}px`
      canvasRef.current!.style.width = `${CW}px`
      canvasRef.current!.height = CH * window.devicePixelRatio
      canvasRef.current!.width = CW * window.devicePixelRatio
      CTX.scale(window.devicePixelRatio, window.devicePixelRatio)
    } else {
      canvasRef.current!.height = CH
      canvasRef.current!.width = CW
    }
    CTX.arc(81, CH / 2, 80, 0, 2 * Math.PI)
    CTX.stroke()
    CTX.beginPath()
    CTX.arc(211, CH / 2, 60, 0, 2 * Math.PI)
    CTX.stroke()
    CTX.beginPath()
    CTX.arc(321, CH / 2, 20, 0, 2 * Math.PI)
    CTX.stroke()
    CTX.beginPath()
    CTX.rect(CW - 61, CH / 2, 60, 60)
    CTX.stroke()
    CTX.font = '30px sans-serif'
    CTX.fillText(`👀 YOUR DPR: ${window.devicePixelRatio}`, CW / 2, CH / 2)
  }, [fixed])

  return (
    <div style={{ overflow: 'auto' }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}
