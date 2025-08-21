import React from 'react'
import { HeroSection } from '@/components/HeroSection'
import { SkillsSection } from '@/components/SkillsSection'
import { ProjectsSection } from '@/components/ProjectsSection'
import { ContactSection } from '@/components/ContactSection'

const Index = () => {
  return (
    <main className="relative">
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="relative py-12 mt-20">
        <div className="absolute inset-0 bg-gradient-to-t from-muted/20 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center space-y-4">
            <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
              <span>© 2024 Ahmet Portfolio</span>
              <span>•</span>
              <span>Tüm hakları saklıdır</span>
            </div>
            <p className="text-xs text-muted-foreground">
              React ve TypeScript ile ❤️ ile geliştirildi
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default Index