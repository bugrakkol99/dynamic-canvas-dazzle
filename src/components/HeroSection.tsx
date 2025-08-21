import React, { useState, useEffect } from 'react'
import { AnimatedButton } from './ui/animated-button'
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react'
import heroImage from '../assets/hero-portrait.jpg'

const TypeWriter = ({ text, delay = 100 }: { text: string; delay?: number }) => {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex])
        setCurrentIndex(prevIndex => prevIndex + 1)
      }, delay)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, delay, text])

  return <span className="gradient-text">{currentText}</span>
}

const FloatingParticle = ({ index }: { index: number }) => {
  const size = Math.random() * 4 + 2
  const left = Math.random() * 100
  const animationDelay = Math.random() * 5

  return (
    <div
      className="absolute rounded-full bg-gradient-primary opacity-20 animate-pulse"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${animationDelay}s`,
        animationDuration: `${3 + Math.random() * 4}s`
      }}
    />
  )
}

export const HeroSection = () => {
  const titles = [
    "MIS Öğrencisi",
    "Frontend Developer", 
    "React Uzmanı",
    "JavaScript Tutkunu"
  ]
  
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex(prev => (prev + 1) % titles.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [titles.length])

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial"></div>
        {Array.from({ length: 50 }).map((_, i) => (
          <FloatingParticle key={i} index={i} />
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 z-10 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8 animate-[slide-up_1s_ease-out]">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Merhaba, Ben{" "}
                <span className="gradient-text">Ahmet</span>
              </h1>
              
              <div className="text-2xl lg:text-3xl font-medium text-muted-foreground min-h-[3rem]">
                <TypeWriter 
                  key={currentTitleIndex}
                  text={titles[currentTitleIndex]} 
                  delay={150} 
                />
              </div>
              
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Modern web teknolojileri ile kullanıcı deneyimini ön planda tutan, 
                yaratıcı ve işlevsel çözümler geliştiren bir yazılım geliştirici adayıyım.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <AnimatedButton 
                variant="hero" 
                size="xl"
                onClick={scrollToProjects}
                className="group"
              >
                Projelerimi İncele
                <ChevronDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </AnimatedButton>
              
              <AnimatedButton variant="glass" size="xl">
                CV İndir
              </AnimatedButton>
            </div>

            {/* Social Links */}
            <div className="flex gap-6 justify-center lg:justify-start">
              {[
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Mail, href: "#", label: "Email" }
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="group p-3 rounded-full glass hover:bg-primary/20 transition-all duration-300 hover:scale-110"
                  aria-label={label}
                >
                  <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div className="relative lg:order-2 animate-[scale-in_1s_ease-out_0.3s_both]">
            <div className="relative z-10">
              <div className="relative overflow-hidden rounded-3xl glow-border">
                <img
                  src={heroImage}
                  alt="Ahmet - MIS Öğrencisi"
                  className="w-full max-w-md mx-auto lg:max-w-lg object-cover aspect-square hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-secondary rounded-full opacity-20 animate-pulse blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-accent rounded-full opacity-20 animate-pulse blur-xl animation-delay-1000"></div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-muted-foreground" />
        </div>
      </div>
    </section>
  )
}