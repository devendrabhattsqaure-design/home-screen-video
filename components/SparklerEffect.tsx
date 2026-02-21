"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  hue: string
  rotation: number
  shape: 'circle' | 'star' | 'spark'
}

interface SparklerEffectProps {
  isActive: boolean
  x?: number
  y?: number
}

export default function SparklerEffect({
  isActive,
  x = 0,
  y = 0,
}: SparklerEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isActive || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size with device pixel ratio for sharpness
    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`
    ctx.scale(dpr, dpr)

    // Enhanced color palette with more variations
    const colors = [
      "#F8843F", // saffron
      "#FF9933", // brighter saffron
      "#FFA500", // orange
      "#FFD700", // gold
      "#FFB347", // lighter orange
      "#D2B48C", // sandal
      "#E6B422", // marigold
      "#A03A13", // deep maroon
      "#B85C3A", // lighter maroon
      "#FF6B4A", // coral orange
      "#FF8C42", // pumpkin
      "#FFC857", // sunset yellow
    ]

    const createParticles = () => {
      particlesRef.current = []
      const particleCount = 80 // Increased particle count
      
      // Create burst particles
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5
        const velocity = 3 + Math.random() * 6
        const shape = Math.random() > 0.6 ? 'star' : Math.random() > 0.5 ? 'spark' : 'circle'
        
        particlesRef.current.push({
          x: x || window.innerWidth / 2,
          y: y || window.innerHeight / 2,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity - 1.5,
          life: 0.8 + Math.random() * 0.5,
          maxLife: 1,
          size: 2 + Math.random() * 4,
          hue: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * Math.PI * 2,
          shape: shape as 'circle' | 'star' | 'spark'
        })
      }

      // Add some delayed particles for a trailing effect
      setTimeout(() => {
        for (let i = 0; i < 30; i++) {
          const angle = (Math.PI * 2 * i) / 30 + Math.random() * 0.3
          const velocity = 1.5 + Math.random() * 3
          
          particlesRef.current.push({
            x: x || window.innerWidth / 2,
            y: y || window.innerHeight / 2,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity - 1,
            life: 0.9 + Math.random() * 0.4,
            maxLife: 1,
            size: 1.5 + Math.random() * 3,
            hue: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * Math.PI * 2,
            shape: Math.random() > 0.5 ? 'circle' : 'spark'
          })
        }
      }, 50)
    }

    createParticles()

    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      
      const spikes = 5
      const outerRadius = size
      const innerRadius = size * 0.4
      
      ctx.beginPath()
      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius
        const angle = (Math.PI / spikes) * i
        const xPos = Math.cos(angle) * radius
        const yPos = Math.sin(angle) * radius
        
        if (i === 0) ctx.moveTo(xPos, yPos)
        else ctx.lineTo(xPos, yPos)
      }
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    const drawSpark = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      
      ctx.beginPath()
      ctx.moveTo(0, -size)
      ctx.lineTo(size * 0.7, size * 0.3)
      ctx.lineTo(0, size * 0.5)
      ctx.lineTo(-size * 0.7, size * 0.3)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    const animate = () => {
      // Clear canvas with fade effect for trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
      
      // Alternative: clear with subtle gradient background
      // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.life -= 0.015
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += 0.08 // gravity
        particle.rotation += 0.02 // rotation for shapes

        if (particle.life > 0) {
          ctx.save()
          ctx.globalAlpha = particle.life * 0.8
          ctx.fillStyle = particle.hue
          ctx.shadowColor = particle.hue
          ctx.shadowBlur = 10 * particle.life
          
          // Different shapes based on particle type
          switch (particle.shape) {
            case 'star':
              drawStar(ctx, particle.x, particle.y, particle.size, particle.rotation)
              break
            case 'spark':
              drawSpark(ctx, particle.x, particle.y, particle.size, particle.rotation)
              break
            default:
              ctx.beginPath()
              ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
              ctx.fill()
          }
          
          ctx.restore()
          return true
        }
        return false
      })

      ctx.globalAlpha = 1
      ctx.shadowBlur = 0

      if (particlesRef.current.length > 0) {
        animationIdRef.current = requestAnimationFrame(animate)
      }
    }

    animationIdRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [isActive, x, y])

  if (!isActive) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      aria-hidden="true"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}