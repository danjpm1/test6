"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

function ScrollIndicator({ show }: { show: boolean }) {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <div 
      className={`absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer transition-all duration-1000 ease-out group ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      onClick={scrollToContent}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-9 h-14 border-2 border-white/70 rounded-full flex justify-center group-hover:border-[#c6912c] transition-colors duration-300">
          <div className="w-1.5 h-3 bg-[#c6912c] rounded-full mt-2.5 animate-scroll-wheel" />
          <div className="absolute inset-0 rounded-full bg-[#c6912c]/0 group-hover:bg-[#c6912c]/10 transition-all duration-300" />
        </div>
        
        <div className="flex flex-col items-center -space-y-2">
          <svg 
            className="w-7 h-7 text-white/80 animate-chevron-1 group-hover:text-[#c6912c] transition-colors duration-300" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <svg 
            className="w-7 h-7 text-white/50 animate-chevron-2 group-hover:text-[#c6912c]/70 transition-colors duration-300" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

const remoteBuildsCards = [
  {
    title: "Logistical Challenges",
    description: "We handle complex logistics, permits, and coordination so you don't have to.",
    image: "/remote-card-1.png"
  },
  {
    title: "We Can Build Anywhere",
    description: "From mountain retreats to coastal escapes, no location is too remote.",
    image: "/remote-card-2.png"
  },
  {
    title: "Enjoy Your Oasis",
    description: "Your private sanctuary awaits, crafted with precision and care.",
    image: "/remote-card-3.png"
  }
]

export default function RemoteBuildsPage() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setShowScrollIndicator(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full overflow-x-hidden bg-[#080a0f] relative">
      {/* Main content wrapper */}
      <div className="relative z-0">
        <style jsx global>{`
        @keyframes scroll-wheel {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          50% {
            opacity: 0.5;
            transform: translateY(10px);
          }
          100% {
            opacity: 0;
            transform: translateY(14px);
          }
        }
        
        @keyframes chevron-fade-1 {
          0%, 100% {
            opacity: 0.8;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(6px);
          }
        }
        
        @keyframes chevron-fade-2 {
          0%, 100% {
            opacity: 0.5;
            transform: translateY(0);
          }
          50% {
            opacity: 0.9;
            transform: translateY(6px);
          }
        }
        
        .animate-scroll-wheel {
          animation: scroll-wheel 1.5s ease-in-out infinite;
        }
        
        .animate-chevron-1 {
          animation: chevron-fade-1 1.5s ease-in-out infinite;
        }
        
        .animate-chevron-2 {
          animation: chevron-fade-2 1.5s ease-in-out infinite;
          animation-delay: 0.2s;
        }
      `}</style>

      <Navbar />

      {/* Hero Section - Tesla Style Full Bleed */}
      <section className="relative w-full h-screen">
        <Image
          src="/remote-builds.png"
          alt="Modern luxury remote build"
          fill
          className="object-cover object-center"
          priority
        />
        
        {/* Text positioned in lake reflection area */}
        <div className="absolute top-[45%] sm:top-[42%] md:top-[40%] right-8 md:right-16 lg:right-24">
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            style={{ 
              color: '#7FBDC4',
              textShadow: '0 4px 40px rgba(0,0,0,0.5)',
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            REMOTE BUILDS
          </h1>
        </div>

        <ScrollIndicator show={showScrollIndicator} />
      </section>

      <div className="bg-[#080a0f] h-6 md:h-12" />
      <div className="w-full h-[2px] bg-[#D4A574]/40" />

      {/* Three Cards Section */}
      <section className="relative py-16 sm:py-24 bg-[#080a0f]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {remoteBuildsCards.map((card, index) => (
              <div 
                key={index}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Background Image */}
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-wide uppercase">
                    {card.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#c6912c]/50 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Width Forest Section */}
      <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="/forest.png"
          alt="Remote forest building location"
          fill
          className="object-cover object-center"
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        
        <div className="relative z-10 w-full mx-auto max-w-7xl px-6 sm:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
                BUILD YOUR
                <br />
                <span className="text-[#c6912c]">DREAM ANYWHERE</span>
              </h2>
              
              <div className="space-y-6 max-w-lg">
                <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                  Antova Builders specializes in building homes and structures in the most challenging locations — mountaintops, remote mountain valleys, islands, and sites where conventional contractors refuse to go.
                </p>
                
                <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                  We mobilize helicopters, specialized off-road vehicles, and seasoned crews who excel in extreme conditions. Whether airlifting all materials to an inaccessible peak or pioneering access where no roads exist, we turn impossible sites into reality.
                </p>
                
                <p className="text-lg sm:text-xl font-semibold text-[#c6912c] pt-2">
                  If you can dream the location, we can build it there
                </p>
              </div>
            </div>
            
            {/* Right Image Grid */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer">
                  <Image src="/remote-card-1.png" alt="Mountain location" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300" />
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer">
                  <Image src="/remote-card-2.png" alt="Valley location" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer">
                  <Image src="/remote-card-3.png" alt="Island location" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300" />
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer">
                  <Image src="/forest.png" alt="Forest location" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300" />
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-20 bg-[#080a0f]">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 sm:mb-12">
            <a
              href="/contact"
              className="h-11 min-w-[200px] px-6 bg-[#c6912c] hover:bg-[#a67923] text-black font-semibold rounded-md transition-all flex items-center justify-center"
            >
              Start Your Remote Build
            </a>
            <a
              href="/cost-estimator"
              className="h-11 min-w-[200px] px-6 bg-transparent hover:bg-[#c6912c] text-white hover:text-black font-semibold rounded-md border-2 border-[#c6912c] transition-all flex items-center justify-center"
            >
              AI Estimator
            </a>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl text-white mb-4 sm:mb-6">
            Let's Start Making Your <span className="text-[#c6912c]">Dream Home</span> a Reality
          </h2>
          <p className="font-sans text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            From initial design to final walkthrough, our team delivers exceptional custom homes. Get in touch today.
          </p>
        </div>
      </section>

      <Footer />
      </div>

      {/* Unified atmospheric overlay - sits on TOP of all content */}
      <div 
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: `
            radial-gradient(ellipse 120% 100% at 50% 50%, 
              transparent 0%, 
              transparent 25%,
              rgba(5,10,18,0.15) 50%,
              rgba(3,8,15,0.4) 75%,
              rgba(0,5,12,0.7) 100%
            )
          `,
        }}
      />
      
      {/* Additional corner darkening */}
      <div 
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: `
            conic-gradient(from 0deg at 50% 50%,
              rgba(0,5,15,0.3) 0deg,
              transparent 45deg,
              transparent 135deg,
              rgba(0,5,15,0.3) 180deg,
              transparent 225deg,
              transparent 315deg,
              rgba(0,5,15,0.3) 360deg
            )
          `,
        }}
      />
      
      {/* Subtle blue tint */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 mix-blend-overlay"
        style={{
          background: 'linear-gradient(180deg, rgba(20,40,60,0.08) 0%, rgba(15,30,50,0.05) 100%)',
        }}
      />
    </div>
  )
}
