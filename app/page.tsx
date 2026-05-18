import Navbar from '@/components/navbar'
import HeroSection from '@/components/hero-section'
import ProjectsSection from '@/components/projects-section'
import TechStackSection from '@/components/tech-stack-section'
import AboutSection from '@/components/about-section'
import ContactSection from '@/components/contact-section'
import Footer from '@/components/footer'
import AnimatedBackground from '@/components/animated-background'

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <AnimatedBackground />
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <TechStackSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
