'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import AnimatedBackground from '@/components/animated-background';
import { useRef, useState, useEffect } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Award,
  Quote,
  Star,
  Code2,
  Database,
  Cloud,
  Shield,
  Brain,
  Blocks,
  Sparkles,
  Zap,
  Trophy,
  BookOpen,
} from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/yourusername',
    color: 'hover:bg-gray-800 hover:text-white',
    hoverGlow: 'hover:shadow-gray-500/50',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/in/yourusername',
    color: 'hover:bg-[#0A66C2] hover:text-white',
    hoverGlow: 'hover:shadow-blue-500/50',
  },
  {
    name: 'X (Twitter)',
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    href: 'https://x.com/yourusername',
    color: 'hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black',
    hoverGlow: 'hover:shadow-gray-500/50',
  },
  {
    name: 'Discord',
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
    href: 'https://discord.com/users/yourusername',
    color: 'hover:bg-[#5865F2] hover:text-white',
    hoverGlow: 'hover:shadow-indigo-500/50',
  },
  {
    name: 'Telegram',
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    href: 'https://t.me/yourusername',
    color: 'hover:bg-[#26A5E4] hover:text-white',
    hoverGlow: 'hover:shadow-cyan-500/50',
  },
  {
    name: 'WhatsApp',
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    href: 'https://wa.me/yourphonenumber',
    color: 'hover:bg-[#25D366] hover:text-white',
    hoverGlow: 'hover:shadow-green-500/50',
  },
  {
    name: 'Gmail',
    icon: Mail,
    href: 'mailto:your.email@gmail.com',
    color: 'hover:bg-[#EA4335] hover:text-white',
    hoverGlow: 'hover:shadow-red-500/50',
  },
  {
    name: 'Upwork',
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
      </svg>
    ),
    href: 'https://www.upwork.com/freelancers/yourusername',
    color: 'hover:bg-[#14A800] hover:text-white',
    hoverGlow: 'hover:shadow-green-500/50',
  },
  {
    name: 'Fiverr',
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h1.527v1.316zm-6.786 1.501h-3.359c.088.546.43.858 1.006.858.43 0 .732-.175.937-.508l1.306.586c-.41.81-1.22 1.319-2.243 1.319-1.659 0-2.67-1.128-2.67-2.612 0-1.47 1.011-2.612 2.612-2.612 1.556 0 2.476 1.054 2.476 2.583 0 .147-.03.386-.065.386zm-2.44-1.696c-.508 0-.82.234-.937.77h1.815c-.088-.536-.371-.77-.878-.77zm-4.124-.205v3.558H7.07v-3.558h-.82v-1.316h.82v-.63c0-1.128.615-1.795 1.885-1.795h1.054v1.316h-.645c-.41 0-.615.176-.615.586v.523h1.26v1.316h-1.26zm-3.617 3.558H3.454v-4.874h1.587v4.874zm-.82-5.553a.937.937 0 0 1-.937-.938c0-.513.424-.937.937-.937.528 0 .952.424.952.937 0 .514-.424.938-.952.938zm-2.437 5.553H.196v-3.558H0v-1.316h.196v-.63C.196 9.143.81 8.476 2.081 8.476h1.054v1.316h-.644c-.41 0-.616.176-.616.586v.523h1.26v1.316h-1.26v3.558z" />
      </svg>
    ),
    href: 'https://www.fiverr.com/yourusername',
    color: 'hover:bg-[#1DBF73] hover:text-white',
    hoverGlow: 'hover:shadow-emerald-500/50',
  },
];

const skills = [
  {
    category: 'Frontend',
    icon: Code2,
    color: 'from-cyan-500 to-blue-500',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
  },
  {
    category: 'Backend',
    icon: Database,
    color: 'from-green-500 to-emerald-500',
    items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL'],
  },
  {
    category: 'DevOps',
    icon: Cloud,
    color: 'from-orange-500 to-red-500',
    items: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform', 'Linux'],
  },
  {
    category: 'Blockchain',
    icon: Blocks,
    color: 'from-purple-500 to-pink-500',
    items: ['Solidity', 'Web3.js', 'Ethers.js', 'Hardhat', 'Smart Contracts', 'DeFi'],
  },
  {
    category: 'Security',
    icon: Shield,
    color: 'from-red-500 to-rose-500',
    items: [
      'Penetration Testing',
      'OWASP',
      'Burp Suite',
      'Metasploit',
      'Network Security',
      'Cryptography',
    ],
  },
  {
    category: 'AI/ML',
    icon: Brain,
    color: 'from-violet-500 to-purple-500',
    items: ['TensorFlow', 'PyTorch', 'OpenAI API', 'LangChain', 'Computer Vision', 'NLP'],
  },
];

const certificates = [
  {
    title: 'AWS Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2024',
    credentialId: 'AWS-SAA-XXXXX',
    color: 'from-orange-500 to-yellow-500',
  },
  {
    title: 'Certified Ethical Hacker (CEH)',
    issuer: 'EC-Council',
    date: '2023',
    credentialId: 'CEH-XXXXX',
    color: 'from-red-500 to-pink-500',
  },
  {
    title: 'Certified Kubernetes Administrator',
    issuer: 'CNCF',
    date: '2023',
    credentialId: 'CKA-XXXXX',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Blockchain Developer Certificate',
    issuer: 'Blockchain Council',
    date: '2022',
    credentialId: 'BDC-XXXXX',
    color: 'from-purple-500 to-violet-500',
  },
];

const education = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University Name',
    period: '2018 - 2022',
    description: 'Specialized in Software Engineering and Cybersecurity. Graduated with honors.',
    achievements: ["Dean's List", 'Best Capstone Project', 'Coding Club President'],
  },
  {
    degree: 'Full Stack Web Development Bootcamp',
    institution: 'Tech Academy',
    period: '2021',
    description: 'Intensive 12-week program covering modern web development technologies.',
    achievements: ['Top Graduate', 'Built 10+ Full Stack Projects'],
  },
];

const testimonials = [
  {
    name: 'John Smith',
    role: 'CEO at TechStartup',
    rating: 5,
    text: 'Exceptional work on our blockchain platform. Delivered ahead of schedule with outstanding code quality.',
    project: 'DeFi Exchange Platform',
  },
  {
    name: 'Sarah Johnson',
    role: 'CTO at FinanceApp',
    rating: 5,
    text: 'Incredible attention to detail and security expertise. Our penetration testing revealed zero critical vulnerabilities.',
    project: 'Banking Security Audit',
  },
  {
    name: 'Michael Chen',
    role: 'Founder at AI Labs',
    rating: 5,
    text: 'Built an amazing AI-powered dashboard. The 3D visualizations and real-time data handling exceeded expectations.',
    project: 'AI Analytics Dashboard',
  },
  {
    name: 'Emily Davis',
    role: 'Product Manager at CloudCorp',
    rating: 5,
    text: 'Outstanding DevOps implementation. Our deployment time reduced by 80% and infrastructure costs dropped significantly.',
    project: 'Cloud Infrastructure Setup',
  },
];

const floatingTechItems = [
  { name: 'React', x: '10%', y: '20%', delay: 0 },
  { name: 'Node.js', x: '85%', y: '15%', delay: 0.5 },
  { name: 'Python', x: '5%', y: '60%', delay: 1 },
  { name: 'AWS', x: '90%', y: '55%', delay: 1.5 },
  { name: 'Docker', x: '15%', y: '85%', delay: 2 },
  { name: 'Solidity', x: '80%', y: '80%', delay: 2.5 },
];

const marqueeWords = ['INNOVATOR', 'DEVELOPER', 'ENGINEER', 'CREATOR', 'BUILDER', 'HACKER'];

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const firstName = 'Lawal';
  const lastName = 'Job';

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground />
      <Navbar />

      {/* Floating Tech Items */}
      {floatingTechItems.map((item, index) => (
        <motion.div
          key={item.name}
          className="fixed text-xs font-mono text-primary/20 pointer-events-none z-0 hidden lg:block"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [0.8, 1.2, 0.8],
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 6,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {item.name}
        </motion.div>
      ))}

      {/* Marquee Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-[0.03]">
        <motion.div
          className="whitespace-nowrap text-[20vw] font-black absolute top-1/4"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {marqueeWords.map((word, i) => (
            <span key={i} className="mx-8">
              {word}
            </span>
          ))}
          {marqueeWords.map((word, i) => (
            <span key={`dup-${i}`} className="mx-8">
              {word}
            </span>
          ))}
        </motion.div>
        <motion.div
          className="whitespace-nowrap text-[15vw] font-black absolute top-2/3"
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          {marqueeWords.map((word, i) => (
            <span key={i} className="mx-8">
              {word}
            </span>
          ))}
          {marqueeWords.map((word, i) => (
            <span key={`dup-${i}`} className="mx-8">
              {word}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-32 pb-20 px-4 relative overflow-hidden min-h-screen flex items-center"
      >
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-6xl mx-auto relative z-10 w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row items-center gap-12"
          >
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <motion.div
                className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-primary/20 relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                <div className="w-full h-full bg-muted flex items-center justify-center text-6xl font-bold text-muted-foreground">
                  YN
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-4 border-2 border-dashed border-primary/30 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-8 border border-dashed border-accent/20 rounded-full"
              />

              {/* Floating badges around profile */}
              <motion.div
                className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 inline mr-1" />
                Available
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium"
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              >
                <Zap className="w-4 h-4 inline mr-1" />
                5+ Years
              </motion.div>
            </motion.div>

            {/* Info */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
              >
                <motion.span
                  className="w-2 h-2 rounded-full bg-green-500"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm font-medium text-primary">Open for opportunities</span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-primary font-mono mb-2 text-lg"
              >
                Hello, I am
              </motion.p>

              {/* Animated Name */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-5xl lg:text-7xl font-bold mb-4"
              >
                <span className="inline-flex overflow-hidden">
                  {firstName.split('').map((letter, index) => (
                    <motion.span
                      key={index}
                      initial={{ y: 100, opacity: 0, rotateX: -90 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      transition={{
                        delay: 0.5 + index * 0.05,
                        duration: 0.5,
                        type: 'spring',
                        stiffness: 100,
                      }}
                      whileHover={{
                        scale: 1.2,
                        color: 'hsl(var(--primary))',
                        textShadow: '0 0 30px hsl(var(--primary))',
                      }}
                      className="inline-block cursor-default"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>{' '}
                <span className="inline-flex overflow-hidden text-primary">
                  {lastName.split('').map((letter, index) => (
                    <motion.span
                      key={index}
                      initial={{ y: 100, opacity: 0, rotateX: -90 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      transition={{
                        delay: 0.7 + index * 0.05,
                        duration: 0.5,
                        type: 'spring',
                        stiffness: 100,
                      }}
                      whileHover={{
                        scale: 1.2,
                        textShadow: '0 0 30px hsl(var(--primary))',
                      }}
                      className="inline-block cursor-default"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="text-xl lg:text-2xl text-muted-foreground mb-6"
              >
                <motion.span
                  animate={{
                    color: [
                      'hsl(var(--muted-foreground))',
                      'hsl(var(--primary))',
                      'hsl(var(--muted-foreground))',
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  Full Stack Developer
                </motion.span>
                {' | '}
                <motion.span
                  animate={{
                    color: [
                      'hsl(var(--muted-foreground))',
                      'hsl(var(--accent))',
                      'hsl(var(--muted-foreground))',
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1.3 }}
                >
                  Blockchain Engineer
                </motion.span>
                {' | '}
                <motion.span
                  animate={{
                    color: [
                      'hsl(var(--muted-foreground))',
                      'hsl(190, 95%, 39%)',
                      'hsl(var(--muted-foreground))',
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 2.6 }}
                >
                  Security Researcher
                </motion.span>
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-muted-foreground max-w-xl mb-8 text-pretty text-lg"
              >
                Passionate about building secure, scalable, and innovative solutions. With expertise
                spanning Web2, Web3, DevOps, and Cybersecurity, I bring ideas to life through clean
                code and modern technologies.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="flex flex-wrap justify-center lg:justify-start gap-8 mb-8"
              >
                {[
                  { value: 5, suffix: '+', label: 'Years Experience' },
                  { value: 50, suffix: '+', label: 'Projects Completed' },
                  { value: 30, suffix: '+', label: 'Happy Clients' },
                ].map((stat, index) => (
                  <motion.div key={stat.label} className="text-center" whileHover={{ scale: 1.1 }}>
                    <motion.p
                      className="text-3xl lg:text-4xl font-bold text-primary"
                      style={{ textShadow: '0 0 20px hsl(var(--primary) / 0.5)' }}
                    >
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </motion.p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex flex-wrap justify-center lg:justify-start gap-3"
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 1.3 + index * 0.05 }}
                    whileHover={{ scale: 1.15, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-xl bg-card border border-border transition-all duration-300 shadow-lg ${social.color} ${social.hoverGlow} hover:shadow-xl`}
                    title={social.name}
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-40 left-10 w-20 h-20 border border-primary/20 rounded-lg hidden lg:block"
          animate={{ rotate: 360, y: [0, 20, 0] }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
            y: { duration: 5, repeat: Infinity },
          }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-16 h-16 border border-accent/20 rounded-full hidden lg:block"
          animate={{ scale: [1, 1.2, 1], rotate: -360 }}
          transition={{
            scale: { duration: 4, repeat: Infinity },
            rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
          }}
        />
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Code2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">My Expertise</span>
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              {'Technical Skills'.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="inline-block"
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground max-w-2xl mx-auto text-lg"
            >
              Technologies and tools I use to bring ideas to life
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                variants={{
                  hidden: { opacity: 0, y: 30, rotateX: -15 },
                  visible: { opacity: 1, y: 0, rotateX: 0 },
                }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 relative overflow-hidden group"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                <motion.div
                  className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${skill.color} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                />
                <motion.div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center mb-4 shadow-lg`}
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <skill.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-4">{skill.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, i) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                      whileHover={{ scale: 1.1, backgroundColor: 'hsl(var(--primary) / 0.2)' }}
                      className="px-3 py-1.5 text-sm bg-muted/50 rounded-full text-muted-foreground cursor-default transition-colors"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Achievements</span>
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              {'Certifications'.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="inline-block"
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground max-w-2xl mx-auto text-lg"
            >
              Professional certifications that validate my expertise
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="grid md:grid-cols-2 gap-6"
          >
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.title}
                variants={{
                  hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                  visible: { opacity: 1, x: 0 },
                }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 flex items-start gap-4 group relative overflow-hidden"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${cert.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                <motion.div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center shadow-lg flex-shrink-0`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Trophy className="w-8 h-8 text-white" />
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-primary" />
                    <span className="text-sm text-primary font-mono">{cert.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{cert.title}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground font-mono">
                    Credential ID: {cert.credentialId}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg bg-primary/10 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Learning Journey</span>
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              {'Education'.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="inline-block"
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground max-w-2xl mx-auto text-lg"
            >
              My academic background and continuous learning
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
            }}
            className="space-y-6"
          >
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ x: 10 }}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 relative overflow-hidden group"
              >
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <motion.div
                    className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                  >
                    <BookOpen className="w-8 h-8 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-primary font-mono">{edu.period}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{edu.degree}</h3>
                    <p className="text-muted-foreground mb-2">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground mb-3">{edu.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {edu.achievements.map((achievement, i) => (
                        <motion.span
                          key={achievement}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * i }}
                          whileHover={{ scale: 1.1 }}
                          className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full"
                        >
                          {achievement}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Quote className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">What Clients Say</span>
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              {'Client Reviews'.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="inline-block"
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground max-w-2xl mx-auto text-lg"
            >
              Feedback from clients I have worked with
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid md:grid-cols-2 gap-6"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 relative group"
              >
                <motion.div
                  className="absolute top-4 right-4 text-6xl text-primary/10 font-serif"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  &ldquo;
                </motion.div>
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shadow-lg"
                    whileHover={{ scale: 1.1 }}
                  >
                    {testimonial.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </motion.div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 relative z-10">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <motion.div
                  className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-xs text-primary"
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="w-3 h-3" />
                  {testimonial.project}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
