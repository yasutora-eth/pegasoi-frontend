'use client'

import React, { useEffect, useRef } from 'react'

interface EnhancedBackgroundProps {
  intensity?: 'subtle' | 'normal' | 'enhanced'
  className?: string
}

export function EnhancedBackground({ 
  intensity = 'subtle', 
  className = '' 
}: EnhancedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Ultra-subtle particle system
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      opacity: number
      size: number
      hue: number
    }> = []

    const intensitySettings = {
      subtle: { count: 15, maxOpacity: 0.008, speed: 0.1 },
      normal: { count: 25, maxOpacity: 0.015, speed: 0.2 },
      enhanced: { count: 35, maxOpacity: 0.025, speed: 0.3 }
    }

    const settings = intensitySettings[intensity]

    // Initialize particles
    for (let i = 0; i < settings.count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * settings.speed,
        vy: (Math.random() - 0.5) * settings.speed,
        opacity: Math.random() * settings.maxOpacity,
        size: Math.random() * 1.5 + 0.5,
        hue: Math.random() * 60 + 180 // Cyan to purple range
      })
    }

    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.01
      
      // Clear with ultra-low opacity
      ctx.fillStyle = 'rgba(10, 10, 15, 0.02)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        // Update position with micro-movements
        particle.x += particle.vx + Math.sin(time + index) * 0.05
        particle.y += particle.vy + Math.cos(time + index * 0.7) * 0.05

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Subtle opacity fluctuation
        particle.opacity = settings.maxOpacity * (0.5 + 0.5 * Math.sin(time * 2 + index))

        // Draw particle with gradient
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        )
        gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`)
        gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 60%, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [intensity])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[-2] ${className}`}
      style={{
        mixBlendMode: 'screen',
        opacity: 0.4
      }}
    />
  )
}

// Micro-texture overlay component
export function MicroTextureOverlay() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[-1]"
      style={{
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(0, 255, 255, 0.003) 1px, transparent 1px),
          radial-gradient(circle at 75% 75%, rgba(255, 0, 255, 0.002) 1px, transparent 1px),
          radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.001) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px, 80px 80px, 40px 40px',
        backgroundPosition: '0 0, 30px 30px, 20px 20px',
        animation: 'micro-texture-drift 120s ease-in-out infinite alternate',
        opacity: 0.8
      }}
    />
  )
}

// CSS for micro-texture animation
const microTextureStyles = `
@keyframes micro-texture-drift {
  0% {
    background-position: 0 0, 30px 30px, 20px 20px;
    transform: translate(0, 0);
  }
  25% {
    background-position: 2px 1px, 32px 29px, 21px 19px;
    transform: translate(0.5px, -0.3px);
  }
  50% {
    background-position: 1px 3px, 29px 32px, 19px 22px;
    transform: translate(-0.3px, 0.5px);
  }
  75% {
    background-position: 3px 2px, 33px 31px, 22px 21px;
    transform: translate(0.2px, 0.2px);
  }
  100% {
    background-position: 2px 2px, 31px 31px, 21px 21px;
    transform: translate(-0.1px, -0.1px);
  }
}
`

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = microTextureStyles
  document.head.appendChild(styleSheet)
}