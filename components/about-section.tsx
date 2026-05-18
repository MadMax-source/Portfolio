'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Download, Sparkles } from 'lucide-react'
import Link from 'next/link'

const stats = [
  { value: '5+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Completed' },
  { value: '30+', label: 'Happy Clients' },
  { value: '10+', label: 'Technologies' },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 via-transparent to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative Elements */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0 rounded-full border border-dashed border-primary/30"
              />
              <motion.div
                animate={{
                  rotate: [360, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-4 rounded-full border border-dashed border-accent/30"
              />
              
              {/* Profile Image Placeholder */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className="relative w-full h-full bg-gradient-to-br from-secondary via-card to-secondary flex items-center justify-center"
                >
                  <span className="text-8xl font-bold gradient-text">JD</span>
                </motion.div>
              </div>

              {/* Floating Badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-4 right-0 px-4 py-2 rounded-xl bg-card border border-border/50 shadow-lg"
              >
                <span className="flex items-center gap-2 text-sm font-medium">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Creative
                </span>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute bottom-4 left-0 px-4 py-2 rounded-xl bg-card border border-border/50 shadow-lg"
              >
                <span className="flex items-center gap-2 text-sm font-medium">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Available
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-4"
            >
              About Me
            </motion.span>
            
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">
              Passionate About Creating{' '}
              <span className="gradient-text">Digital Excellence</span>
            </h2>
            
            <div className="space-y-4 text-muted-foreground mb-8">
              <p className="text-pretty">
                I&apos;m a creative developer with a passion for building beautiful, functional, 
                and user-friendly digital experiences. With over 5 years of experience in 
                full-stack development, I specialize in crafting modern web applications.
              </p>
              <p className="text-pretty">
                My journey in tech started with a curiosity about how things work on the web. 
                Today, I combine technical expertise with creative vision to deliver projects 
                that not only meet requirements but exceed expectations.
              </p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 rounded-xl bg-secondary/30 border border-border/50"
                >
                  <div className="text-2xl sm:text-3xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg">
                  <Link href="#contact">
                    Let&apos;s Work Together
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
