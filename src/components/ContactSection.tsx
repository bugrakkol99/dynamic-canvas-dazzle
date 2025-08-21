import React from 'react'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react'
import { AnimatedButton } from './ui/animated-button'

export const ContactSection = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic here
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "E-posta",
      value: "ahmet@example.com",
      href: "mailto:ahmet@example.com"
    },
    {
      icon: Phone,
      label: "Telefon",
      value: "+90 555 123 45 67",
      href: "tel:+905551234567"
    },
    {
      icon: MapPin,
      label: "Konum",
      value: "İstanbul, Türkiye",
      href: "#"
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      name: "GitHub",
      href: "#",
      color: "hover:text-gray-400"
    },
    {
      icon: Linkedin,
      name: "LinkedIn", 
      href: "#",
      color: "hover:text-blue-400"
    },
    {
      icon: Twitter,
      name: "Twitter",
      href: "#", 
      color: "hover:text-blue-400"
    }
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-background"></div>
        <div className="absolute inset-0 bg-gradient-radial opacity-30"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">İletişime</span> Geçin
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Yeni projeler, iş birlikleri veya sadece merhaba demek için
            benimle iletişime geçmekten çekinmeyin.
          </p>
          
          {/* Animated Line */}
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-primary rounded-full"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="space-y-8">
            <div className="glass rounded-3xl p-8 hover:shadow-glow transition-all duration-300">
              <h3 className="text-2xl font-bold mb-6 gradient-text">
                Mesaj Gönder
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    İsim
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl glass border border-glass-border focus:outline-none focus:border-primary transition-all duration-300 placeholder:text-muted-foreground"
                    placeholder="Adınız Soyadınız"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    E-posta
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl glass border border-glass-border focus:outline-none focus:border-primary transition-all duration-300 placeholder:text-muted-foreground"
                    placeholder="email@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Mesaj
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl glass border border-glass-border focus:outline-none focus:border-primary transition-all duration-300 placeholder:text-muted-foreground resize-none"
                    placeholder="Mesajınızı buraya yazın..."
                    required
                  />
                </div>

                <AnimatedButton 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Mesaj Gönder
                </AnimatedButton>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold gradient-text">
                İletişim Bilgileri
              </h3>
              
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group flex items-center gap-4 p-4 glass rounded-2xl hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                    style={{
                      animationDelay: `${index * 200}ms`
                    }}
                  >
                    <div className="p-3 bg-gradient-primary rounded-full group-hover:shadow-glow transition-all duration-300">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="glass rounded-3xl p-8">
              <h3 className="text-xl font-semibold mb-6 gradient-text">
                Sosyal Medya
              </h3>
              
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`group p-4 glass rounded-2xl hover:scale-110 transition-all duration-300 ${social.color}`}
                    aria-label={social.name}
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <div className="glass rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                <span className="font-medium text-accent">Müsait</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Yeni projeler ve iş birlikleri için açığım. 
                24 saat içinde geri dönüş yapıyorum.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="glass rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              Birlikte Çalışalım
            </h3>
            <p className="text-muted-foreground mb-6">
              Harika projeler yaratmak için bir araya gelelim. 
              Size nasıl yardımcı olabileceğimi konuşalım.
            </p>
            <AnimatedButton variant="glow" size="xl">
              Hemen İletişime Geç
            </AnimatedButton>
          </div>
        </div>
      </div>
    </section>
  )
}