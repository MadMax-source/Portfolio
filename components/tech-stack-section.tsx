'use client';

import { motion, type Variants } from 'framer-motion';
import {
  Code2,
  Database,
  Palette,
  Cloud,
  Smartphone,
  Cog,
  Brain,
  Blocks,
  BlocksIcon,
} from 'lucide-react';

const techStacks = [
  {
    category: 'Web Development',
    icon: Code2,
    skills: [
      'JavaScript',
      'Next.js',
      'TypeScript',
      'React',
      'Golang',
      'Node.js',
      'Express',
      'MongoDB',
      'PostgreSQL',
      'REST APIs',
      'NestJS',
      'GraphQL',
    ],
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'hover:border-blue-500/50',
  },

  {
    category: 'Ethereum Blockchain',
    icon: Blocks,
    skills: [
      'Solidity',
      'Hardhat',
      'Ethers.js',
      'WalletConnect',
      'Layer 2 Networks',
      'ERC-20',
      'ERC-721',
      'ERC-1155',
      'smartcontract audits',
    ],
    color: 'from-indigo-500/20 to-violet-500/20',
    borderColor: 'hover:border-indigo-500/50',
  },
  {
    category: 'Solana Blockchain',
    icon: BlocksIcon,
    skills: [
      'Rust Smart Contracts',
      'Anchor',
      'Solana CLI',
      'solana-web3.js',
      'Metaplex',
      'NFT Standards',
      'DeFi Protocols',
      'DApp Development',
      'smartcontract security',
    ],
    color: 'from-pink-500/20 to-rose-500/20',
    borderColor: 'hover:border-pink-500/50',
  },
  {
    category: 'DevOps Engineering',
    icon: Cloud,
    skills: [
      'AWS',
      'Docker',
      'Kubernetes',
      'CI/CD',
      'Containers',
      'Images',
      'Volumes',
      'Registries',
      'Networks',
      'CloudFormation',
      'Terraform',
    ],
    color: 'from-orange-500/20 to-amber-500/20',
    borderColor: 'hover:border-orange-500/50',
  },

  {
    category: 'AI',
    icon: Brain,
    skills: [
      'Python',
      'Maths',
      'PyTorch',
      'Pandas',
      'NumPy',
      'Jupyter Notebook',
      'TensorFlow',
      'NLP (Chatbots, LLMs)',
      'Machine Learning',
      'Computer Vision',
      'Deep Learning',
      'MLOps / Model Deployment',
      'Data Analysis',
    ],
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'hover:border-green-500/50',
  },
  {
    category: 'Ethical Hacking',
    icon: Cog,
    skills: [
      'Kali Linux',
      'Bash Scripting',
      'Python Scripting',
      'Penetration Testing',
      'Wireshark',
      'Metasploit',
      'Burp Suite',
      'Nmap',
      'Malware Analysis',
      'SOC Analysis',
      'Reverse Engineering',
    ],
    color: 'from-gray-500/20 to-slate-500/20',
    borderColor: 'hover:border-gray-500/50',
  },
];
const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function TechStackSection() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Tech Stack
          </span>

          <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
            Skills &{' '}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>

          <p className="mx-auto max-w-2xl leading-relaxed text-muted-foreground">
            I work with modern technologies across software engineering, blockchain, AI,
            cybersecurity, and cloud infrastructure.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {techStacks.map((stack, i) => {
            const Icon = stack.icon;

            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                }}
                className={`group relative rounded-2xl border border-border/50 bg-card/40 p-6 backdrop-blur-sm transition-all duration-300 ${stack.borderColor}`}
              >
                {/* Hover Gradient */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stack.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />

                <div className="relative z-10">
                  {/* Title */}
                  <div className="mb-5 flex items-center gap-4">
                    <motion.div
                      whileHover={{ rotate: 8 }}
                      className="rounded-xl bg-secondary/50 p-3 transition-colors group-hover:bg-secondary"
                    >
                      <Icon className="h-6 w-6 text-primary" />
                    </motion.div>

                    <h3 className="text-xl font-semibold leading-tight">{stack.category}</h3>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {stack.skills.map((skill, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: index * 0.03,
                        }}
                        whileHover={{ scale: 1.05 }}
                        className="cursor-default rounded-lg border border-border/50 bg-background/50 px-3 py-1.5 text-sm transition-all hover:border-primary/30 hover:bg-primary/5"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
