'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

const footerLinks = {
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  social: [
    { icon: Github, href: 'https://github.com/MadMax-source', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/jobinsonmaxchain', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/job135458229139', label: 'Twitter' },
  ],
};

export default function Footer() {
  return (
    <footer className="py-12 border-t border-border/50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <Link href="/" className="text-2xl font-bold tracking-tight mb-2 inline-block">
              <span className="gradient-text">Portfolio</span>
            </Link>
            <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-start gap-1">
              Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> by Job
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {footerLinks.navigation.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </motion.nav>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            {footerLinks.social.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-full border border-border/50 bg-secondary/30 hover:bg-secondary hover:border-primary/50 transition-colors"
              >
                <social.icon className="h-4 w-4" />
                <span className="sr-only">{social.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
