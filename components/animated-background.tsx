'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

interface FloatingOrb {
  id: number
  x: number
  y: number
  size: number
  color: string
  duration: number
}

export default function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [orbs, setOrbs] = useState<FloatingOrb[]>([])

  useEffect(() => {
    // Generate particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)

    // Generate floating orbs
    const orbColors = [
      'rgba(20, 184, 166, 0.15)',
      'rgba(6, 182, 212, 0.12)',
      'rgba(59, 130, 246, 0.1)',
      'rgba(139, 92, 246, 0.08)',
    ]
    const newOrbs = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      size: Math.random() * 300 + 200,
      color: orbColors[i % orbColors.length],
      duration: Math.random() * 20 + 15,
    }))
    setOrbs(newOrbs)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_70%)]" />
      
      {/* Floating orbs */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            backgroundColor: orb.color,
          }}
          animate={{
            x: [0, 100, -50, 80, 0],
            y: [0, -80, 60, -40, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Animated particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Moving lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <motion.line
          x1="0%"
          y1="20%"
          x2="100%"
          y2="80%"
          stroke="url(#lineGradient1)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0 }}
        />
        <motion.line
          x1="100%"
          y1="10%"
          x2="0%"
          y2="90%"
          stroke="url(#lineGradient2)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
        <motion.line
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          stroke="url(#lineGradient1)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.3, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
        <defs>
          <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(20, 184, 166)" stopOpacity="0" />
            <stop offset="50%" stopColor="rgb(20, 184, 166)" stopOpacity="1" />
            <stop offset="100%" stopColor="rgb(20, 184, 166)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(6, 182, 212)" stopOpacity="0" />
            <stop offset="50%" stopColor="rgb(6, 182, 212)" stopOpacity="1" />
            <stop offset="100%" stopColor="rgb(6, 182, 212)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Scan line effect */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        animate={{
          top: ['0%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary/20 rounded-tl-3xl" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-primary/20 rounded-tr-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-primary/20 rounded-bl-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary/20 rounded-br-3xl" />
    </div>
  )
}
