'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

interface Bubble {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  vx: number
  vy: number
  depth: number
}

export default function BubbleBackground() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Generate bubbles with varying depths for parallax
    const newBubbles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 80 + 20,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 3,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      depth: Math.random() * 3,
    }))
    setBubbles(newBubbles)

    // Track mouse position for parallax
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />

      {/* Parallax grid */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"
        style={{
          x: mousePos.x ? (mousePos.x - window.innerWidth / 2) * 0.02 : 0,
          y: mousePos.y ? (mousePos.y - window.innerHeight / 2) * 0.02 : 0,
        }}
      />

      {/* Animated bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full border-2 border-primary/30"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: bubble.size,
            height: bubble.size,
            zIndex: Math.floor(bubble.depth),
          }}
          animate={{
            x: [0, bubble.vx * 100, 0],
            y: [0, bubble.vy * 80 + (bubble.depth * 20), 0],
            scale: [1, 1.1, 0.95, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: 'easeInOut',
          }}
          whileHover={{
            scale: 0.8,
            opacity: 1,
            transition: { duration: 0.3 },
          }}
        >
          {/* Inner glow */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5"
            animate={{
              boxShadow: [
                `0 0 20px rgba(59, 130, 246, 0.3)`,
                `0 0 40px rgba(59, 130, 246, 0.5)`,
                `0 0 20px rgba(59, 130, 246, 0.3)`,
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: bubble.delay,
            }}
          />
        </motion.div>
      ))}

      {/* Floating accent spheres with parallax */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-primary/15 via-primary/5 to-transparent blur-3xl"
        style={{
          left: '10%',
          top: '20%',
          x: mousePos.x ? (mousePos.x - window.innerWidth / 2) * 0.05 : 0,
          y: mousePos.y ? (mousePos.y - window.innerHeight / 2) * 0.05 : 0,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-80 h-80 rounded-full bg-gradient-to-tl from-accent/10 via-primary/5 to-transparent blur-3xl"
        style={{
          right: '15%',
          bottom: '10%',
          x: mousePos.x ? (mousePos.x - window.innerWidth / 2) * -0.03 : 0,
          y: mousePos.y ? (mousePos.y - window.innerHeight / 2) * -0.03 : 0,
        }}
        animate={{
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-40 h-40 border-l-2 border-t-2 border-primary/10 rounded-tl-3xl" />
      <div className="absolute top-0 right-0 w-40 h-40 border-r-2 border-t-2 border-primary/10 rounded-tr-3xl" />
      <div className="absolute bottom-0 left-0 w-40 h-40 border-l-2 border-b-2 border-primary/10 rounded-bl-3xl" />
      <div className="absolute bottom-0 right-0 w-40 h-40 border-r-2 border-b-2 border-primary/10 rounded-br-3xl" />
    </div>
  )
}
