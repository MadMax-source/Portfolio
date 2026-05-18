'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ProjectCard from '@/components/project-card'
import ProjectModal from '@/components/project-modal'
import { Project, ProjectCategory } from '@/types/project'
import AnimatedBackground from '@/components/animated-background'

const categories: { id: ProjectCategory | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: 'All Projects', icon: '🎯' },
  { id: 'blockchain', label: 'Blockchain', icon: '⛓️' },
  { id: 'devops', label: 'DevOps', icon: '⚙️' },
  { id: 'ethical-hacking', label: 'Ethical Hacking', icon: '🔐' },
  { id: 'ai', label: 'AI / ML', icon: '🤖' },
  { id: 'web2', label: 'Web2', icon: '🌐' },
]

const projects: Project[] = [
  // Blockchain Projects
  {
    id: '1',
    title: 'DeFi Exchange Platform',
    description: 'A decentralized exchange with automated market making and liquidity pools.',
    longDescription: 'Built a fully functional decentralized exchange platform featuring automated market making (AMM), liquidity pools, yield farming, and staking mechanisms. The platform supports multiple EVM-compatible chains and includes a custom governance token for community voting on protocol changes.',
    category: 'blockchain',
    technologies: ['Solidity', 'Hardhat', 'React', 'Ethers.js', 'The Graph', 'IPFS'],
    image: '/placeholder-defi.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    features: [
      'Automated Market Maker (AMM) with constant product formula',
      'Multi-chain support (Ethereum, Polygon, BSC)',
      'Yield farming and staking pools',
      'Governance token integration',
      'Real-time price charts and analytics',
    ],
    challenges: 'Implementing gas-efficient smart contracts while maintaining security was the primary challenge. Solved through extensive testing and formal verification.',
    duration: '4 months',
    role: 'Lead Blockchain Developer',
  },
  {
    id: '2',
    title: 'NFT Marketplace',
    description: 'Full-featured NFT marketplace with minting, trading, and auction capabilities.',
    longDescription: 'Developed a comprehensive NFT marketplace supporting ERC-721 and ERC-1155 standards. Features include lazy minting, Dutch auctions, and royalty distribution for creators.',
    category: 'blockchain',
    technologies: ['Solidity', 'Next.js', 'Web3.js', 'Pinata', 'MongoDB'],
    image: '/placeholder-nft.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    features: [
      'Lazy minting to reduce gas costs',
      'Dutch and English auction systems',
      'Creator royalties on secondary sales',
      'Collection verification system',
      'Advanced search and filtering',
    ],
    challenges: 'Optimizing metadata storage and retrieval while keeping costs low. Used IPFS with Pinata for decentralized storage.',
    duration: '3 months',
    role: 'Full Stack Developer',
  },
  // DevOps Projects
  {
    id: '3',
    title: 'Kubernetes Auto-Scaling Platform',
    description: 'Custom Kubernetes operator for intelligent workload auto-scaling based on ML predictions.',
    longDescription: 'Built a custom Kubernetes operator that uses machine learning to predict traffic patterns and proactively scale workloads. Integrates with Prometheus for metrics and uses LSTM models for time-series prediction.',
    category: 'devops',
    technologies: ['Go', 'Kubernetes', 'Prometheus', 'TensorFlow', 'Helm', 'ArgoCD'],
    image: '/placeholder-k8s.jpg',
    githubUrl: 'https://github.com',
    features: [
      'ML-based traffic prediction',
      'Custom Kubernetes operator in Go',
      'Prometheus metrics integration',
      'Helm chart for easy deployment',
      'GitOps workflow with ArgoCD',
    ],
    challenges: 'Training accurate prediction models with limited historical data. Implemented transfer learning from similar workloads.',
    duration: '2 months',
    role: 'DevOps Engineer',
  },
  {
    id: '4',
    title: 'CI/CD Pipeline Framework',
    description: 'Reusable CI/CD pipeline templates for microservices deployments.',
    longDescription: 'Created a comprehensive CI/CD framework with reusable pipeline templates, automated testing, security scanning, and multi-environment deployments. Supports Docker, Kubernetes, and serverless deployments.',
    category: 'devops',
    technologies: ['GitHub Actions', 'Docker', 'Terraform', 'AWS', 'SonarQube'],
    image: '/placeholder-cicd.jpg',
    githubUrl: 'https://github.com',
    features: [
      'Reusable workflow templates',
      'Automated security scanning',
      'Infrastructure as Code with Terraform',
      'Blue-green deployments',
      'Automated rollback on failures',
    ],
    challenges: 'Standardizing pipelines across different tech stacks while maintaining flexibility.',
    duration: '6 weeks',
    role: 'DevOps Lead',
  },
  // Ethical Hacking Projects
  {
    id: '5',
    title: 'Vulnerability Scanner',
    description: 'Automated web application vulnerability scanner with AI-powered analysis.',
    longDescription: 'Developed an automated security scanner that identifies OWASP Top 10 vulnerabilities in web applications. Uses machine learning to reduce false positives and prioritize findings based on exploitability.',
    category: 'ethical-hacking',
    technologies: ['Python', 'Selenium', 'TensorFlow', 'PostgreSQL', 'FastAPI'],
    image: '/placeholder-scanner.jpg',
    githubUrl: 'https://github.com',
    features: [
      'OWASP Top 10 vulnerability detection',
      'AI-powered false positive reduction',
      'Automated crawling and endpoint discovery',
      'Detailed remediation reports',
      'API and CLI interfaces',
    ],
    challenges: 'Reducing false positives while maintaining high detection rates. Trained custom ML models on labeled vulnerability data.',
    duration: '3 months',
    role: 'Security Researcher',
  },
  {
    id: '6',
    title: 'Penetration Testing Toolkit',
    description: 'Comprehensive toolkit for network and application penetration testing.',
    longDescription: 'Built a modular penetration testing toolkit with automated reconnaissance, vulnerability assessment, and exploitation capabilities. Includes custom scripts for common attack vectors.',
    category: 'ethical-hacking',
    technologies: ['Python', 'Bash', 'Metasploit', 'Nmap', 'Burp Suite'],
    image: '/placeholder-pentest.jpg',
    githubUrl: 'https://github.com',
    features: [
      'Automated reconnaissance modules',
      'Custom exploitation scripts',
      'Report generation',
      'Integration with Metasploit',
      'Modular plugin architecture',
    ],
    challenges: 'Creating a flexible architecture that supports various engagement types.',
    duration: '4 months',
    role: 'Penetration Tester',
  },
  // AI Projects
  {
    id: '7',
    title: 'AI Code Review Assistant',
    description: 'LLM-powered code review tool that provides intelligent feedback and suggestions.',
    longDescription: 'Built an AI-powered code review assistant that integrates with GitHub and GitLab. Uses fine-tuned language models to provide contextual feedback, identify bugs, and suggest improvements.',
    category: 'ai',
    technologies: ['Python', 'OpenAI API', 'LangChain', 'FastAPI', 'Redis'],
    image: '/placeholder-ai-review.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    features: [
      'Multi-language support',
      'Security vulnerability detection',
      'Performance optimization suggestions',
      'Code style enforcement',
      'Learning from team feedback',
    ],
    challenges: 'Providing accurate suggestions without hallucinating. Implemented RAG with codebase context.',
    duration: '2 months',
    role: 'AI Engineer',
  },
  {
    id: '8',
    title: 'Computer Vision Pipeline',
    description: 'Real-time object detection and tracking system for retail analytics.',
    longDescription: 'Developed a computer vision system for retail stores that tracks customer movement, analyzes shopping patterns, and provides real-time analytics on product interactions.',
    category: 'ai',
    technologies: ['Python', 'PyTorch', 'OpenCV', 'TensorRT', 'Redis', 'Kafka'],
    image: '/placeholder-cv.jpg',
    githubUrl: 'https://github.com',
    features: [
      'Real-time multi-object tracking',
      'Heat map generation',
      'Dwell time analysis',
      'Edge deployment optimization',
      'Privacy-preserving design',
    ],
    challenges: 'Achieving real-time performance on edge devices. Used TensorRT for model optimization.',
    duration: '5 months',
    role: 'ML Engineer',
  },
  // Web2 Projects
  {
    id: '9',
    title: 'E-Commerce Platform',
    description: 'Full-featured e-commerce platform with real-time inventory and payment processing.',
    longDescription: 'Built a scalable e-commerce platform handling thousands of concurrent users. Features include real-time inventory management, multiple payment gateways, and an AI-powered recommendation engine.',
    category: 'web2',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe', 'AWS'],
    image: '/placeholder-ecommerce.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    features: [
      'Real-time inventory management',
      'Multi-currency support',
      'AI product recommendations',
      'Advanced search with filters',
      'Order tracking and notifications',
    ],
    challenges: 'Handling flash sales with high concurrency. Implemented queue-based order processing.',
    duration: '6 months',
    role: 'Full Stack Developer',
  },
  {
    id: '10',
    title: 'SaaS Analytics Dashboard',
    description: 'Real-time analytics dashboard with custom visualization and reporting tools.',
    longDescription: 'Created a comprehensive analytics dashboard for SaaS businesses. Features include custom chart builders, automated reporting, and real-time data streaming.',
    category: 'web2',
    technologies: ['React', 'TypeScript', 'D3.js', 'Node.js', 'ClickHouse', 'WebSocket'],
    image: '/placeholder-dashboard.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    features: [
      'Drag-and-drop chart builder',
      'Real-time data streaming',
      'Custom report scheduling',
      'White-label support',
      'Role-based access control',
    ],
    challenges: 'Handling large datasets with real-time updates. Used ClickHouse for fast aggregations.',
    duration: '4 months',
    role: 'Frontend Lead',
  },
]

// Floating text that moves across the screen
const FloatingText = ({ text, className, duration = 20 }: { text: string; className?: string; duration?: number }) => (
  <motion.div
    className={`absolute whitespace-nowrap text-6xl md:text-8xl font-bold opacity-[0.03] pointer-events-none select-none ${className}`}
    initial={{ x: '-100%' }}
    animate={{ x: '100vw' }}
    transition={{ duration, repeat: Infinity, ease: 'linear' }}
  >
    {text}
  </motion.div>
)

// Animated counter for stats
const AnimatedCounter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [value])
  
  return <span>{count}{suffix}</span>
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95])

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  const projectsByCategory = categories
    .filter((cat) => cat.id !== 'all')
    .map((cat) => ({
      ...cat,
      projects: projects.filter((p) => p.category === cat.id),
    }))
    .filter((cat) => cat.projects.length > 0)

  // Stats
  const totalProjects = projects.length
  const totalCategories = projectsByCategory.length

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Floating Text Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <FloatingText text="BLOCKCHAIN • DEVOPS • AI • SECURITY • WEB" className="top-[15%]" duration={25} />
        <FloatingText text="INNOVATE • CREATE • BUILD • DEPLOY • SCALE" className="top-[45%]" duration={30} />
        <FloatingText text="CODE • DESIGN • DEVELOP • SECURE • OPTIMIZE" className="top-[75%]" duration={22} />
      </div>

      {/* Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[128px]"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px]"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        className="pt-32 pb-16 px-6 relative"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="container mx-auto text-center relative z-10">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-primary font-medium">Portfolio Showcase</span>
          </motion.div>

          {/* Animated Title */}
          <div className="overflow-hidden mb-6">
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold">
                {'My Projects'.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.03 }}
                    whileHover={{ 
                      scale: 1.2, 
                      color: 'hsl(var(--primary))',
                      transition: { duration: 0.1 } 
                    }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </h1>
            </motion.div>
          </div>

          {/* Subtitle with typing effect */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12"
          >
            Explore my work across different domains — from{' '}
            <motion.span
              className="text-primary font-semibold"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              blockchain
            </motion.span>{' '}
            and{' '}
            <motion.span
              className="text-cyan-400 font-semibold"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              AI
            </motion.span>{' '}
            to{' '}
            <motion.span
              className="text-purple-400 font-semibold"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              DevOps
            </motion.span>{' '}
            and{' '}
            <motion.span
              className="text-red-400 font-semibold"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              security
            </motion.span>
            .
          </motion.p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16"
          >
            {[
              { value: totalProjects, label: 'Projects', suffix: '+' },
              { value: totalCategories, label: 'Categories', suffix: '' },
              { value: 50, label: 'Technologies', suffix: '+' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  className="text-4xl md:text-5xl font-bold gradient-text"
                  style={{ textShadow: '0 0 40px hsl(var(--primary) / 0.5)' }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </motion.div>
                <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 border border-primary/20 rounded-lg"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 border border-cyan-500/20 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-40 right-20 w-3 h-3 bg-primary rounded-full"
          animate={{ y: [-10, 10, -10], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-2 h-2 bg-cyan-400 rounded-full"
          animate={{ y: [10, -10, 10], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </motion.section>

      {/* Category Filter */}
      <section className="px-6 pb-8 relative z-10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 + 0.4 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
                {activeCategory === category.id && (
                  <motion.span
                    layoutId="categoryCount"
                    className="ml-1 px-2 py-0.5 text-xs rounded-full bg-white/20"
                  >
                    {category.id === 'all' 
                      ? projects.length 
                      : projects.filter(p => p.category === category.id).length
                    }
                  </motion.span>
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid - Filtered View */}
      {activeCategory !== 'all' ? (
        <section className="px-6 pb-20 relative z-10">
          <div className="container mx-auto">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      ) : (
        /* Projects by Category - All View */
        <section className="px-6 pb-20 relative z-10">
          <div className="container mx-auto space-y-16">
            {projectsByCategory.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <motion.span 
                    className="text-3xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: categoryIndex * 0.2 }}
                  >
                    {category.icon}
                  </motion.span>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {category.label.split('').map((letter, i) => (
                      <motion.span
                        key={i}
                        className="inline-block"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.02 + categoryIndex * 0.1 }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </h2>
                  <motion.span 
                    className="text-sm text-muted-foreground bg-card/50 px-3 py-1 rounded-full border border-border"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + categoryIndex * 0.1 }}
                  >
                    {category.projects.length} projects
                  </motion.span>
                  <motion.div 
                    className="flex-1 h-px bg-gradient-to-r from-border via-primary/30 to-transparent ml-4"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + categoryIndex * 0.1 }}
                    style={{ originX: 0 }}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.projects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      onClick={() => setSelectedProject(project)}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <Footer />
    </main>
  )
}
