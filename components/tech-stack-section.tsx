'use client'

import { motion } from 'framer-motion'
import { 
  Code2, 
  Database, 
  Palette, 
  Cloud,
  Smartphone,
  Cog
} from 'lucide-react'

const techStacks = [
  {
    category: 'Frontend',
    icon: Code2,
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'hover:border-blue-500/50',
  },
  {
    category: 'Backend',
    icon: Database,
    skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis'],
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'hover:border-green-500/50',
  },
  {
    category: 'Design',
    icon: Palette,
    skills: ['Figma', 'Adobe XD', 'Blender', 'After Effects', 'Spline'],
    color: 'from-pink-500/20 to-rose-500/20',
    borderColor: 'hover:border-pink-500/50',
  },
  {
    category: 'DevOps',
    icon: Cloud,
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Vercel'],
    color: 'from-orange-500/20 to-amber-500/20',
    borderColor: 'hover:border-orange-500/50',
  },
  {
    category: 'Mobile',
    icon: Smartphone,
    skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo'],
    color: 'from-indigo-500/20 to-violet-500/20',
    borderColor: 'hover:border-indigo-500/50',
  },
  {
    category: 'Tools',
    icon: Cog,
    skills: ['Git', 'VS Code', 'Postman', 'Jira', 'Notion'],
    color: 'from-gray-500/20 to-slate-500/20',
    borderColor: 'hover:border-gray-500/50',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export default function TechStackSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5Mzk0YjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            Tech Stack
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            I work with a diverse set of modern technologies to bring ideas to life. 
            Here are the tools and frameworks I use daily.
          </p>
        </motion.div>

        {/* Tech Stack Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {techStacks.map((stack) => (
            <motion.div
              key={stack.category}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              className={`group relative p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-300 ${stack.borderColor}`}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stack.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                {/* Icon and Title */}
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className="p-3 rounded-xl bg-secondary/50 group-hover:bg-secondary transition-colors"
                  >
                    <stack.icon className="h-6 w-6 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-semibold">{stack.category}</h3>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {stack.skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 text-sm rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
