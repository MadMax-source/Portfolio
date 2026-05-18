'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Twitter, Send, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRef } from 'react'

const Scene3D = dynamic(() => import('@/components/scene-3d'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-secondary/20 to-background" />
  ),
})

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const letterVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.05,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub', color: 'hover:text-white hover:bg-[#333]' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:text-white hover:bg-[#0077B5]' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:text-white hover:bg-[#1DA1F2]' },
  { icon: Send, href: 'https://t.me/', label: 'Telegram', color: 'hover:text-white hover:bg-[#0088cc]' },
  { icon: MessageCircle, href: 'https://wa.me/', label: 'WhatsApp', color: 'hover:text-white hover:bg-[#25D366]' },
]

// Your name - update this
const firstName = "Your"
const lastName = "Name"
const tagline = "Full Stack Developer & Creative Technologist"

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <Scene3D />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30 pointer-events-none" />
      
      <motion.div 
        style={{ y, opacity, scale }}
        className="container mx-auto px-6 pt-20 relative z-10"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center"
        >
          {/* Animated Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.span 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 bg-primary/10 text-sm text-primary backdrop-blur-sm"
              whileHover={{ scale: 1.05, borderColor: 'rgba(20, 184, 166, 0.6)' }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(20, 184, 166, 0.1)',
                  '0 0 40px rgba(20, 184, 166, 0.2)',
                  '0 0 20px rgba(20, 184, 166, 0.1)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Open to new opportunities
            </motion.span>
          </motion.div>

          {/* Greeting */}
          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl text-muted-foreground mb-4"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              Hello, I&apos;m
            </motion.span>
          </motion.p>

          {/* Animated Name */}
          <motion.div variants={itemVariants} className="mb-4">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="block text-balance">
                {firstName.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block"
                    whileHover={{ 
                      scale: 1.2, 
                      color: 'rgb(20, 184, 166)',
                      transition: { duration: 0.2 } 
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
                <span className="inline-block mx-3" />
                {lastName.split('').map((letter, i) => (
                  <motion.span
                    key={i + firstName.length}
                    custom={i + firstName.length}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block gradient-text"
                    whileHover={{ 
                      scale: 1.2,
                      transition: { duration: 0.2 } 
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </h1>
          </motion.div>

          {/* Animated Tagline with typing effect */}
          <motion.div 
            variants={itemVariants}
            className="mb-8 h-8 flex items-center justify-center"
          >
            <motion.p 
              className="text-xl sm:text-2xl text-primary font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {tagline.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 + i * 0.03 }}
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                className="inline-block w-0.5 h-6 bg-primary ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </motion.p>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty leading-relaxed"
          >
            I build exceptional digital experiences that live at the intersection of 
            design and technology. Specializing in blockchain, AI, and modern web applications.
          </motion.p>

          {/* Stats Row */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-8 mb-10"
          >
            {[
              { value: '5+', label: 'Years Experience' },
              { value: '50+', label: 'Projects Completed' },
              { value: '30+', label: 'Happy Clients' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + i * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.span 
                  className="block text-3xl sm:text-4xl font-bold gradient-text"
                  animate={{ 
                    textShadow: [
                      '0 0 20px rgba(20, 184, 166, 0.3)',
                      '0 0 40px rgba(20, 184, 166, 0.5)',
                      '0 0 20px rgba(20, 184, 166, 0.3)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {stat.value}
                </motion.span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/projects">
                <Button size="lg" className="px-8 group relative overflow-hidden">
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                  <span className="relative">View My Work</span>
                  <motion.span
                    className="ml-2 relative"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    &rarr;
                  </motion.span>
                </Button>
              </Link>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/contact">
                <Button variant="outline" size="lg" className="px-8 relative overflow-hidden group">
                  <span className="relative z-10">Get In Touch</span>
                  <motion.span
                    className="absolute inset-0 bg-primary/10 -z-0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3"
          >
            {socialLinks.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + i * 0.1 }}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-full border border-border/50 bg-secondary/30 transition-all duration-300 ${social.color}`}
              >
                <social.icon className="h-5 w-5" />
                <span className="sr-only">{social.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#projects"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <motion.span 
            className="text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll to explore
          </motion.span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="p-2 rounded-full border border-border/50 group-hover:border-primary/50 transition-colors"
          >
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </motion.a>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-20 h-20 border border-primary/20 rounded-lg"
        animate={{ 
          rotate: 360,
          borderColor: ['rgba(20, 184, 166, 0.2)', 'rgba(20, 184, 166, 0.5)', 'rgba(20, 184, 166, 0.2)']
        }}
        transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, borderColor: { duration: 3, repeat: Infinity } }}
      />
      <motion.div
        className="absolute top-1/3 right-16 w-16 h-16 border border-cyan-500/20 rounded-full"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: -360,
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-1/4 left-20 w-12 h-12 bg-primary/5 rounded-full"
        animate={{ 
          y: [0, -30, 0],
          x: [0, 15, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/3 right-24 w-24 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        animate={{ 
          scaleX: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </section>
  )
}
