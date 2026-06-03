'use client'
import { useEffect, useRef } from 'react'

interface Star {
  bx: number; by: number
  sz: number; op: number
  ts: number; to: number; pf: number
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let stars: Star[] = []
    let tix = 0, tiy = 0, six = 0, siy = 0
    let t = 0
    let raf = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      makeStars()
    }

    const makeStars = () => {
      stars = []
      const n = Math.floor(window.innerWidth * window.innerHeight / 5500)
      for (let i = 0; i < n; i++) {
        stars.push({
          bx: Math.random() * window.innerWidth,
          by: Math.random() * window.innerHeight,
          sz: Math.random() * 1.4 + 0.2,
          op: Math.random() * 0.55 + 0.1,
          ts: Math.random() * 0.018 + 0.004,
          to: Math.random() * Math.PI * 2,
          pf: Math.random() * 0.07 + 0.01,
        })
      }
    }

    const onMouse = (e: MouseEvent) => {
      tix = (e.clientX / window.innerWidth - 0.5) * 2
      tiy = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.016
      six += (tix - six) * 0.035
      siy += (tiy - siy) * 0.035

      for (const s of stars) {
        const tw = Math.sin(t * s.ts * 60 + s.to)
        const op = s.op * (0.72 + 0.28 * tw)
        const x = s.bx + six * s.pf * 38
        const y = s.by + siy * s.pf * 38
        ctx.beginPath()
        ctx.arc(x, y, s.sz, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${s.sz > 1 ? '175,185,255' : '200,210,255'},${op})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    document.addEventListener('mousemove', onMouse)
    raf = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      document.removeEventListener('mousemove', onMouse)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
