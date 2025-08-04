import { TypeAnimation } from 'react-type-animation'
import { Github } from 'lucide-react'
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="pattern relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-orange-900/20 animate-pulse" />
      
      {/* Mouse follower gradient */}
      <div 
        className="absolute pointer-events-none opacity-30 transition-opacity duration-300"
        style={{
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      <div className="relative z-10 flex flex-col gap-8 items-center justify-center min-h-screen px-4">
        {/* Main content with entrance animation */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Main heading with gradient text */}
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-4 bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent animate-pulse">
            WELCOME TO MY
            <br />
            <span className="text-6xl md:text-8xl">PORTFOLIO</span>
          </h1>

          {/* Subtitle with typewriter effect */}
          <div className="text-center mb-8">
            <TypeAnimation
              sequence={[
                'Work in progress... 🚧',
                2000,
                'Building something amazing... ✨',
                2000,
                'Coming soon... 🚀',
                2000,
                'Stay tuned for updates... 💫',
                2000
              ]}
              wrapper="span"
              speed={50}
              className="text-2xl md:text-3xl text-zinc-300 font-medium"
              repeat={Infinity}
            />
          </div>

          {/* Social links with hover animations */}
          <div className="flex gap-6 justify-center mb-8">
            {[
              { icon: Github, href: 'github.com/yasiralamriki', label: 'GitHub' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="group relative p-4 bg-zinc-800/50 backdrop-blur-sm rounded-full border border-zinc-700 hover:border-red-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/25"
                aria-label={label}
              >
                <Icon className="text-zinc-400 group-hover:text-red-400 transition-colors duration-300" size={24} />
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-zinc-800 text-zinc-200 px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {label}
                </div>
              </a>
            ))}
          </div>

          {/* Progress indicator */}
          <div className="flex flex-col items-center gap-4">
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-full px-6 py-3 border border-zinc-700">
              <span className="text-zinc-400 text-sm font-medium">Development Progress</span>
            </div>
            <div className="w-64 bg-zinc-800 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-pulse" style={{ width: '50%' }}></div>
            </div>
            <span className="text-zinc-500 text-sm">50% Complete</span>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-400 rounded-full animate-pulse opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
