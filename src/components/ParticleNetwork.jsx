import { useEffect, useRef } from 'react'

export default function ParticleNetwork({ isDark }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let animationId
    let particles = []
    let mouse = { x: null, y: null }
    let lastMouseUpdate = 0
    const accent = isDark ? '#818CF8' : '#4F46E5'
    const maxDistance = 120
    const cursorDistance = 150

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const createParticles = () => {
      const count = window.innerWidth < 768 ? 40 : 80
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() * 0.8 - 0.4) * 0.75,
        vy: (Math.random() * 0.8 - 0.4) * 0.75,
        radius: 1.5 + Math.random() * 1.5,
        opacity: 0.3 + Math.random() * 0.4,
      }))
    }

    const onMouseMove = (event) => {
      const now = performance.now()
      if (now - lastMouseUpdate < 16) return
      lastMouseUpdate = now

      const rect = canvas.getBoundingClientRect()
      mouse = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      }
    }

    const onMouseLeave = () => {
      mouse = { x: null, y: null }
    }

    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i]

        p.x += p.vx
        p.y += p.vy

        if (p.x <= 0 || p.x >= canvas.width) p.vx *= -1
        if (p.y <= 0 || p.y >= canvas.height) p.vy *= -1

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.hypot(dx, dy)

          if (dist < cursorDistance && dist > 0) {
            p.vx += dx * 0.002
            p.vy += dy * 0.002
            p.vx *= 0.96
            p.vy *= 0.96
          }
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${accent}${Math.round(p.opacity * 255)
          .toString(16)
          .padStart(2, '0')}`
        ctx.fill()
      }

      if (particles.length > 10) {
        for (let i = 0; i < particles.length; i += 1) {
          for (let j = i + 1; j < particles.length; j += 1) {
            const p1 = particles[i]
            const p2 = particles[j]
            const dx = p1.x - p2.x
            const dy = p1.y - p2.y
            const distance = Math.hypot(dx, dy)

            if (distance < maxDistance) {
              const opacity = (1 - distance / maxDistance) * 0.15
              ctx.beginPath()
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.strokeStyle = `rgba(${isDark ? '129, 140, 248' : '79, 70, 229'}, ${opacity})`
              ctx.lineWidth = 0.8
              ctx.stroke()
            }
          }
        }
      }

      if (mouse.x !== null && mouse.y !== null) {
        for (let i = 0; i < particles.length; i += 1) {
          const p = particles[i]
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const distance = Math.hypot(dx, dy)

          if (distance < cursorDistance) {
            const opacity = (1 - distance / cursorDistance) * 0.25
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y)
            ctx.lineTo(p.x, p.y)
            ctx.strokeStyle = `rgba(${isDark ? '129, 140, 248' : '79, 70, 229'}, ${opacity})`
            ctx.lineWidth = 1.2
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(drawFrame)
    }

    resizeCanvas()
    createParticles()
    drawFrame()

    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('resize', createParticles)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseout', onMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('resize', createParticles)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseout', onMouseLeave)
    }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
