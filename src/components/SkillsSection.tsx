import React from 'react'
import { Code, Database, Globe, Smartphone, Zap, Cpu } from 'lucide-react'

interface Skill {
  icon: React.ElementType
  name: string
  level: number
  color: string
}

const skills: Skill[] = [
  { icon: Code, name: "JavaScript", level: 90, color: "from-yellow-400 to-orange-500" },
  { icon: Globe, name: "React", level: 85, color: "from-blue-400 to-cyan-500" },
  { icon: Database, name: "Node.js", level: 75, color: "from-green-400 to-emerald-500" },
  { icon: Smartphone, name: "React Native", level: 70, color: "from-purple-400 to-pink-500" },
  { icon: Zap, name: "TypeScript", level: 80, color: "from-indigo-400 to-blue-500" },
  { icon: Cpu, name: "Next.js", level: 75, color: "from-gray-400 to-gray-600" }
]

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const cardRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 200)
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={cardRef}
      className={`group relative glass rounded-2xl p-6 hover:shadow-glow transition-all duration-500 transform hover:-translate-y-2 ${
        isVisible ? 'animate-[slide-up_0.6s_ease-out]' : 'opacity-0'
      }`}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-primary"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div className="p-3 rounded-full bg-gradient-primary">
            <skill.icon className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Skill Name */}
        <h3 className="text-xl font-semibold text-center mb-4 gradient-text">
          {skill.name}
        </h3>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Seviye</span>
            <span>{skill.level}%</span>
          </div>
          
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-primary transition-all duration-1000 ease-out ${
                isVisible ? 'w-full' : 'w-0'
              }`}
              style={{
                width: isVisible ? `${skill.level}%` : '0%',
                transitionDelay: `${index * 200 + 300}ms`
              }}
            />
          </div>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/30 transition-all duration-300"></div>
      </div>

      {/* Floating Orb */}
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
    </div>
  )
}

export const SkillsSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Teknik <span className="gradient-text">Yeteneklerim</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Modern web teknolojileri ve programlama dilleri konusunda edindiğim bilgi ve deneyimler
          </p>
          
          {/* Animated Line */}
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-primary rounded-full"></div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        {/* Additional Tech Stack */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-8 gradient-text">
            Kullandığım Teknolojiler
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "HTML5", "CSS3", "Tailwind CSS", "Sass", "Git", "GitHub", 
              "VS Code", "Figma", "MongoDB", "PostgreSQL", "Firebase", "Vercel"
            ].map((tech, index) => (
              <span
                key={tech}
                className="glass px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}