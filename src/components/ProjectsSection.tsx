import React from 'react'
import { ExternalLink, Github, Play } from 'lucide-react'
import { AnimatedButton } from './ui/animated-button'

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Ticaret Platformu",
    description: "React ve Node.js kullanarak geliştirdiğim full-stack e-ticaret uygulaması. Modern tasarım ve kullanıcı dostu arayüz ile kapsamlı alışveriş deneyimi sunuyor.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: 2,
    title: "Görev Yönetim Uygulaması",
    description: "TypeScript ve React kullanarak oluşturduğum modern görev yönetim sistemi. Drag & drop özelliği ve gerçek zamanlı güncellemeler içeriyor.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&q=80",
    technologies: ["TypeScript", "React", "Firebase", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 3,
    title: "Hava Durumu Uygulaması",
    description: "React Native ile geliştirdiğim mobil hava durumu uygulaması. Animasyonlu arayüz ve detaylı hava durumu bilgileri sunuyor.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&q=80",
    technologies: ["React Native", "JavaScript", "OpenWeather API"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "Kişisel portfolio websitem. Modern animasyonlar, responsive tasarım ve interaktif elementler içeriyor.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "#",
    githubUrl: "#"
  }
]

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = React.useState(false)
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
      className={`group relative glass rounded-3xl overflow-hidden hover:shadow-glow transition-all duration-700 transform hover:-translate-y-4 ${
        isVisible ? 'animate-[slide-up_0.8s_ease-out]' : 'opacity-0'
      } ${project.featured ? 'md:col-span-2' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-20 bg-gradient-primary text-white px-3 py-1 rounded-full text-sm font-medium">
          Öne Çıkan
        </div>
      )}

      {/* Image */}
      <div className="relative overflow-hidden h-64 md:h-80">
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-60'
        }`} />

        {/* Hover Actions */}
        <div className={`absolute inset-0 flex items-center justify-center gap-4 transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          {project.liveUrl && (
            <AnimatedButton variant="hero" size="lg">
              <Play className="w-4 h-4 mr-2" />
              Demo
            </AnimatedButton>
          )}
          
          {project.githubUrl && (
            <AnimatedButton variant="glass" size="lg">
              <Github className="w-4 h-4 mr-2" />
              Kod
            </AnimatedButton>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold mb-3 gradient-text">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, techIndex) => (
            <span
              key={tech}
              className="glass px-3 py-1 rounded-full text-sm font-medium hover:bg-primary/10 transition-all duration-300"
              style={{
                animationDelay: `${techIndex * 100}ms`
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          {project.liveUrl && (
            <a 
              href={project.liveUrl}
              className="flex items-center gap-2 text-primary hover:text-primary-glow transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Canlı Demo</span>
            </a>
          )}
          
          {project.githubUrl && (
            <a 
              href={project.githubUrl}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Kaynak Kod</span>
            </a>
          )}
        </div>
      </div>

      {/* Animated Border */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/30 transition-all duration-500"></div>
    </div>
  )
}

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/10 via-transparent to-muted/10"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Son <span className="gradient-text">Projelerim</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Geliştirdiğim projeler arasından seçtiklerim. Modern teknolojiler kullanarak
            oluşturduğum web ve mobil uygulamalar.
          </p>
          
          {/* Animated Line */}
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-primary rounded-full"></div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-16">
          <AnimatedButton variant="glow" size="xl">
            Tüm Projelerimi Gör
          </AnimatedButton>
        </div>
      </div>
    </section>
  )
}