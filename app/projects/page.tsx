'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ProjectCard from '@/components/project-card';
import ProjectModal from '@/components/project-modal';
//import { Project, ProjectCategory } from '@/types/project';
import AnimatedBackground from '@/components/animated-background';
import { useProjects } from '@/context/project-context';

const categories = [
  { id: 'all', label: 'All Projects', icon: '🎯' },
  { id: 'blockchain', label: 'Blockchain', icon: '⛓️' },
  { id: 'devops', label: 'DevOps', icon: '⚙️' },
  { id: 'ethical-hacking', label: 'Ethical Hacking', icon: '🔐' },
  { id: 'ai', label: 'AI / ML', icon: '🤖' },
  { id: 'web2', label: 'Web2', icon: '🌐' },
];
// Floating text that moves across the screen
const FloatingText = ({
  text,
  className,
  duration = 20,
}: {
  text: string;
  className?: string;
  duration?: number;
}) => (
  <motion.div
    className={`absolute whitespace-nowrap text-6xl md:text-8xl font-bold opacity-[0.03] pointer-events-none select-none ${className}`}
    initial={{ x: '-100%' }}
    animate={{ x: '100vw' }}
    transition={{ duration, repeat: Infinity, ease: 'linear' }}
  >
    {text}
  </motion.div>
);

// Animated counter for stats
const AnimatedCounter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);
  const { projects, loading, fetchProjects } = useProjects();

  useEffect(() => {
    fetchProjects();
  }, []);
  /*
  const filteredProjects =
    activeCategory === 'all' ? projects : projects.filter((p) => p.category === activeCategory);
*/
  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p: any) => p.category === activeCategory);

  const projectsByCategory = categories
    .filter((cat) => cat.id !== 'all')
    .map((cat) => ({
      ...cat,
      projects: projects.filter((p: any) => p.category === cat.id),
    }))
    .filter((cat) => cat.projects.length > 0);

  // Stats
  const totalProjects = projects.length;
  const totalCategories = projectsByCategory.length;

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Floating Text Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <FloatingText
          text="BLOCKCHAIN • DEVOPS • AI • SECURITY • WEB"
          className="top-[15%]"
          duration={25}
        />
        <FloatingText
          text="INNOVATE • CREATE • BUILD • DEPLOY • SCALE"
          className="top-[45%]"
          duration={30}
        />
        <FloatingText
          text="CODE • DESIGN • DEVELOP • SECURE • OPTIMIZE"
          className="top-[75%]"
          duration={22}
        />
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
                      transition: { duration: 0.1 },
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
              <motion.div key={stat.label} className="text-center" whileHover={{ scale: 1.1 }}>
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
                      : projects.filter((p) => p.category === category.id).length}
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
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project._id}
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
                      key={project._id}
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
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      <Footer />
    </main>
  );
}
