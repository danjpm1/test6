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

export default function SignatureCustomDesignPage() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setShowScrollIndicator(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full overflow-x-hidden bg-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,300;1,400&display=swap');
        
        @keyframes scroll-wheel {
          0% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.5; transform: translateY(10px); }
          100% { opacity: 0; transform: translateY(14px); }
        }
        
        @keyframes chevron-fade-1 {
          0%, 100% { opacity: 0.8; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(6px); }
        }
        
        @keyframes chevron-fade-2 {
          0%, 100% { opacity: 0.5; transform: translateY(0); }
          50% { opacity: 0.9; transform: translateY(6px); }
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

        .script-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-style: italic;
          font-weight: 300;
        }
      `}</style>

      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-screen">
        <Image
          src="/signature-hero.jpg"
          alt="Signature custom designed luxury home"
          fill
          className="object-cover object-center"
          priority
        />
        
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.4) 100%)'
          }}
        />
        
        <div className="absolute bottom-[22%] right-[5%] md:right-[8%]">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight"
            style={{ textShadow: '0 4px 40px rgba(0,0,0,0.5)' }}
          >
            SIGNATURE CUSTOM DESIGN
          </h1>
        </div>

        <ScrollIndicator show={showScrollIndicator} />
      </section>

      {/* Porsche-style Editorial Section */}
      <section className="bg-white">
        
        {/* Script Title - Centered */}
        <div className="py-8 md:py-12 flex justify-center">
          <h2 className="script-title text-3xl sm:text-4xl md:text-5xl text-black">
            Signature Custom Design
          </h2>
        </div>

        {/* Main Image with Black Side Bars */}
        <div className="relative w-full">
          <div className="flex">
            {/* Left black bar */}
            <div className="w-[4%] md:w-[8%] bg-black flex-shrink-0" />
            
            {/* Center image */}
            <div className="flex-1 relative aspect-[16/10] md:aspect-[16/9]">
              <Image
                src="/signature-showcase-1.jpg"
                alt="Breathtaking custom designed home"
                fill
                className="object-cover object-center"
              />
            </div>
            
            {/* Right black bar */}
            <div className="w-[4%] md:w-[8%] bg-black flex-shrink-0" />
          </div>
        </div>

        {/* Thin black separator */}
        <div className="w-full h-[6px] md:h-[10px] bg-black" />

        {/* Split Section: Text Left, Image Right */}
        <div className="grid md:grid-cols-2">
          {/* Left - Text Content */}
          <div className="px-6 md:px-12 lg:px-16 py-10 md:py-16 lg:py-20 flex flex-col justify-center bg-white">
            <h3 className="text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.75rem] font-normal text-black leading-[1.15] mb-6 md:mb-8">
              More drive. For<br />
              ambitious<br />
              destinations.
            </h3>
            <p className="text-[13px] md:text-[14px] text-gray-600 leading-relaxed max-w-md">
              The reason most people never live in their true dream home isn't money, terrain, or logistics. It's a lack of bold imagination.
            </p>
            <p className="text-[13px] md:text-[14px] text-gray-600 leading-relaxed max-w-md mt-4">
              We've built our reputation on proving the doubters wrong—transforming visionary sketches into breathtaking, one-of-a-kind realities that defy limits.
            </p>
          </div>

          {/* Right - Image */}
          <div className="relative aspect-[4/3] md:aspect-auto">
            <Image
              src="/signature-showcase-2.jpg"
              alt="Custom home lifestyle"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Thin black separator */}
        <div className="w-full h-[6px] md:h-[10px] bg-black" />

        {/* Wide Cinematic Autoplay Video */}
        <div className="relative w-full aspect-[21/7] md:aspect-[21/6] bg-black">
          <video
            src="/signature-showcase-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

      </section>

      {/* Philosophy / Text Section */}
      <section className="bg-white py-16 md:py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <p className="text-[15px] md:text-base lg:text-lg text-gray-700 leading-relaxed mb-6">
            The reason most people never live in their true dream home isn't money, terrain, or logistics. It's a lack of bold imagination.
          </p>
          <p className="text-[15px] md:text-base lg:text-lg text-gray-700 leading-relaxed mb-6">
            We've built our reputation on proving the doubters wrong—transforming visionary sketches into breathtaking, one-of-a-kind realities that defy limits.
          </p>
          <p className="text-[15px] md:text-base lg:text-lg text-gray-700 leading-relaxed mb-6">
            If your dream demands creativity that breaks the mold, extraordinary craftsmanship, and fearless execution, we're the team that makes it happen.
          </p>
          <p className="text-[15px] md:text-base lg:text-lg text-gray-700 leading-relaxed mb-10">
            Dream bigger. We'll design it, engineer it, and build it—exactly where you envision it.
          </p>
          <p className="text-base md:text-lg lg:text-xl text-black font-semibold">
            "Imagination Isn't Limited. Neither Are We."
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
