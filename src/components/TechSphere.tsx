import React, { useState, useEffect } from 'react'

interface TechIcon {
  name: string
  symbol: string
  color: string
}

const techIcons: TechIcon[] = [
  { name: 'JavaScript', symbol: 'JS', color: '#F7DF1E' },
  { name: 'TypeScript', symbol: 'TS', color: '#3178C6' },
  { name: 'React', symbol: '⚛️', color: '#61DAFB' },
  { name: 'Node.js', symbol: '🟢', color: '#339933' },
  { name: 'HTML5', symbol: '🌐', color: '#E34F26' },
  { name: 'CSS3', symbol: '🎨', color: '#1572B6' },
  { name: 'Git', symbol: '📦', color: '#F05032' },
  { name: 'MongoDB', symbol: '🍃', color: '#47A248' },
  { name: 'Firebase', symbol: '🔥', color: '#FFCA28' },
  { name: 'Tailwind', symbol: '💨', color: '#06B6D4' },
  { name: 'Next.js', symbol: '▲', color: '#000000' },
  { name: 'Vue', symbol: '🔺', color: '#4FC08D' },
  { name: 'Angular', symbol: '🔶', color: '#DD0031' },
  { name: 'Python', symbol: '🐍', color: '#3776AB' },
  { name: 'Java', symbol: '☕', color: '#ED8B00' },
  { name: 'Docker', symbol: '🐳', color: '#2496ED' },
  { name: 'AWS', symbol: '☁️', color: '#FF9900' },
  { name: 'GraphQL', symbol: '📊', color: '#E10098' }
]

export const TechSphere = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!isHovered) {
      // Auto rotation when not hovered
      const interval = setInterval(() => {
        setRotation(prev => ({
          x: prev.x + 0.5,
          y: prev.y + 0.3
        }))
      }, 50)

      return () => clearInterval(interval)
    }
  }, [isHovered])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return

    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const x = (e.clientX - centerX) / (rect.width / 2)
    const y = (e.clientY - centerY) / (rect.height / 2)
    
    setMousePos({ x, y })
    setRotation({
      x: y * 20,
      y: x * 20
    })
  }

  // Calculate positions for icons on sphere
  const getIconPosition = (index: number, total: number) => {
    const phi = Math.acos(-1 + (2 * index) / total)
    const theta = Math.sqrt(total * Math.PI) * phi
    
    return {
      x: Math.cos(theta) * Math.sin(phi),
      y: Math.sin(theta) * Math.sin(phi), 
      z: Math.cos(phi)
    }
  }

  return (
    <div className="relative w-full max-w-md mx-auto aspect-square">
      {/* Sphere Container */}
      <div 
        className="relative w-full h-full rounded-full cursor-pointer"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Sphere */}
        <div
          className="relative w-full h-full transition-all duration-300 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.05 : 1})`,
            filter: `blur(${isHovered ? '0px' : '1px'})`
          }}
        >
          {/* Sphere Background */}
          <div className="absolute inset-0 rounded-full bg-gradient-radial opacity-20 animate-pulse"></div>
          
          {/* Tech Icons */}
          {techIcons.map((tech, index) => {
            const pos = getIconPosition(index, techIcons.length)
            const radius = 140
            
            return (
              <div
                key={tech.name}
                className="absolute flex items-center justify-center w-12 h-12 rounded-full glass text-white font-bold text-sm transition-all duration-300 hover:scale-125 hover:shadow-glow group"
                style={{
                  transform: `
                    translate3d(
                      ${pos.x * radius + radius}px,
                      ${pos.y * radius + radius}px,
                      ${pos.z * radius}px
                    ) 
                    rotateX(${-rotation.x}deg) 
                    rotateY(${-rotation.y}deg)
                  `,
                  backgroundColor: `${tech.color}20`,
                  borderColor: `${tech.color}40`,
                  color: tech.color,
                  zIndex: Math.round(pos.z * 100) + 100
                }}
              >
                <span className="group-hover:animate-bounce">
                  {tech.symbol}
                </span>
                
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="glass px-2 py-1 rounded text-xs whitespace-nowrap text-foreground">
                    {tech.name}
                  </div>
                </div>
              </div>
            )
          })}

          {/* Central Core */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-primary opacity-30 animate-pulse blur-sm"></div>
          
          {/* Orbiting Rings */}
          <div 
            className="absolute inset-0 rounded-full border border-primary/20"
            style={{
              animation: 'spin 20s linear infinite',
              transform: `rotateX(${rotation.x * 0.5}deg) rotateZ(${rotation.y * 0.3}deg)`
            }}
          ></div>
          
          <div 
            className="absolute inset-4 rounded-full border border-secondary/20"
            style={{
              animation: 'spin 15s linear infinite reverse',
              transform: `rotateY(${rotation.y * 0.4}deg) rotateX(${rotation.x * 0.2}deg)`
            }}
          ></div>
        </div>

        {/* Glow Effects */}
        <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
          isHovered ? 'shadow-glow opacity-60' : 'opacity-20'
        }`}></div>

        {/* Particle Effects */}
        {isHovered && (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full opacity-60 animate-ping"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 200}ms`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Interactive Hint */}
      {!isHovered && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center animate-pulse">
          <p className="text-sm text-muted-foreground">
            Mouse ile etkileşim kurun
          </p>
        </div>
      )}
    </div>
  )
}