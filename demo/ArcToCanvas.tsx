import { useEffect, useRef } from 'react'

export default function ArcToCanvas() {
  const canvasBoxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasBoxRef.current!.querySelector('#canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')!
    const CH = 350
    let CW = 400

    new ResizeObserver((entries) => {
      CW = entries[0].contentRect.width
      fixCanvas()
      initDraw()
    }).observe(canvasBoxRef.current!)

    function drawArc(x: number, y: number) {
      // 绘制虚线
      ctx.beginPath()
      ctx.strokeStyle = '#95a5a6'
      ctx.setLineDash([5, 3])
      ctx.moveTo(150, 50)
      ctx.lineTo(x, y)
      ctx.lineTo(200, 300)
      ctx.stroke()
      ctx.closePath()
      // 绘制曲线
      ctx.beginPath()
      ctx.strokeStyle = '#34495e'
      ctx.setLineDash([])
      ctx.moveTo(150, 50)
      ctx.arcTo(x, y, 200, 300, 30)
      ctx.stroke()
      ctx.closePath()
    }

    function fixCanvas() {
      // 调整Canvas
      canvas.style.height = `${CH}px`
      canvas.style.width = `${CW}px`
      canvas.height = CH * window.devicePixelRatio
      canvas.width = CW * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      // Canvas基础样式
      ctx.lineWidth = 2
      ctx.font = 'normal 600 12px "Merriweather"'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.lineJoin = 'round'
    }

    function mouseUp() {
      canvas.removeEventListener('mousemove', mouseMove)
      canvas.removeEventListener('mouseup', mouseUp)
    }

    function mouseOut() {
      canvas.removeEventListener('mousemove', mouseMove)
      canvas.removeEventListener('mouseout', mouseOut)
    }

    function mouseMove(e: MouseEvent) {
      const [x, y] = getMousePos(canvas, e)
      // 清理画布
      ctx.fillStyle = '#f6f8fa'
      ctx.fillRect(0, 0, CW, CH)
      // 绘制arc
      drawArc(x, y)
      drawPoint(x, y, undefined, undefined, '控制点1')
      drawPoint(150, 50, undefined, '#34495e', '基础点')
      drawPoint(200, 300, undefined, undefined, '控制点2')
    }

    function mouseDown() {
      canvas.addEventListener('mousemove', mouseMove)
      canvas.addEventListener('mouseup', mouseUp)
      canvas.addEventListener('mouseout', mouseOut)
    }

    function getMousePos(c: HTMLCanvasElement, e: MouseEvent) {
      const rect = c.getBoundingClientRect()
      return [Math.round(e.clientX - rect.left), Math.round(e.clientY - rect.top)]
    }

    function drawPoint(x: number, y: number, r = 4, c = '#27ae60', m = '') {
      // 绘制新的点
      ctx.beginPath()
      ctx.fillStyle = c
      ctx.fillText(`${m}(${x},${y})`, x, y - 15)
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
      ctx.closePath()
    }

    function initDraw() {
      ctx.fillStyle = '#f6f8fa'
      ctx.fillRect(0, 0, CW, CH)
      drawArc(300, 50)
      drawPoint(300, 50, undefined, undefined, '控制点1')
      drawPoint(150, 50, undefined, '#34495e', '基础点')
      drawPoint(200, 300, undefined, undefined, '控制点2')
    }

    canvas.addEventListener('mousedown', mouseDown)
    fixCanvas()
    initDraw()
  }, [])

  return (
    <div ref={canvasBoxRef}>
      <canvas id="canvas"></canvas>
    </div>
  )
}
