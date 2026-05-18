'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'
import { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
  index: number
  onClick: () => void
}

const categoryColors: Record<string, string> = {
  blockchain: 'from-purple-500/20 to-blue-500/20 border-purple-500/30',
  devops: 'from-orange-500/20 to-red-500/20 border-orange-500/30',
  'ethical-hacking': 'from-green-500/20 to-emerald-500/20 border-green-500/30',
  ai: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30',
  web2: 'from-pink-500/20 to-rose-500/20 border-pink-500/30',
}

const categoryBadgeColors: Record<string, string> = {
  blockchain: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  devops: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'ethical-hacking': 'bg-green-500/20 text-green-400 border-green-500/30',
  ai: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  web2: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
}

export default function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div
        className={`relative h-full rounded-2xl border bg-gradient-to-br ${categoryColors[project.category]} backdrop-blur-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10`}
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        </div>

        {/* Image Placeholder */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0.5 }}
              whileHover={{ scale: 1, opacity: 0.8 }}
              transition={{ duration: 0.5 }}
              className="text-6xl opacity-30"
            >
              {project.category === 'blockchain' && '⛓️'}
              {project.category === 'devops' && '⚙️'}
              {project.category === 'ethical-hacking' && '🔐'}
              {project.category === 'ai' && '🤖'}
              {project.category === 'web2' && '🌐'}
            </motion.div>
          </div>
          
          {/* Overlay on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent flex items-end justify-center pb-4"
          >
            <span className="flex items-center gap-1 text-sm font-medium text-primary">
              View Details <ArrowUpRight className="w-4 h-4" />
            </span>
          </motion.div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryBadgeColors[project.category]}`}
            >
              {project.category.replace('-', ' ')}
            </span>
          </div>

          {/* Quick Links */}
          <div className="absolute top-4 right-4 flex gap-2">
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-colors"
              >
                <Github className="w-4 h-4" />
              </motion.a>
            )}
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 relative">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded-md bg-muted/50 border border-border/50"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 text-xs rounded-md bg-muted/50 border border-border/50 text-muted-foreground">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Bottom Gradient Line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent"
          initial={{ scaleX: 0, originX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  )
}
