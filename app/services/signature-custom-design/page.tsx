"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function SignatureCustomDesignPage() {
  const [parallaxOffset, setParallaxOffset] = useState(0)
  const [videoMargin, setVideoMargin] = useState(0)
  const splitSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Calculate responsive video margin based on viewport
  useEffect(() => {
    const updateVideoMargin = () => {
      const vh = window.innerHeight
      const vw = window.innerWidth
      
      // Smaller overlap on mobile, larger on desktop
      if (vw < 768) {
        const margin = Math.min(vw * 0.15, vh * 0.2, 150)
        setVideoMargin(margin)
        return
      }
      
      // Desktop overlap
      const margin = Math.min(vw * 0.25, vh * 0.45, 500)
      setVideoMargin(margin)
    }
    
    updateVideoMargin()
    window.addEventListener('resize', updateVideoMargin)
    return () => window.removeEventListener('resize', updateVideoMargin)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (splitSectionRef.current) {
        const rect = splitSectionRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const windowWidth = window.innerWidth
        
        // Smaller parallax on mobile, larger on desktop
        const maxOffset = windowWidth < 768 
          ? Math.min(windowHeight * 0.1, 80) 
          : Math.min(windowHeight * 0.2, windowWidth * 0.12, 200)
        
        if (rect.top < windowHeight && rect.bottom > 0) {
          const progress = 1 - (rect.top / windowHeight)
          const clampedProgress = Math.min(Math.max(progress, 0), 1)
          const offset = clampedProgress * -maxOffset
          setParallaxOffset(offset)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="w-full bg-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,300;1,400;1,600;1,700&display=swap');

        .script-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-style: italic;
          font-weight: 700;
        }
      `}</style>

      <Navbar />

      {/* Porsche-style Editorial Layout */}
      <section className="pt-24 md:pt-28 overflow-visible">
        
        {/* White background area with title */}
        <div className="bg-white">
          {/* Script Title */}
          <div style={{ padding: 'clamp(1.5rem, 3vw, 3rem) 0 clamp(2rem, 4vw, 3.5rem) 0' }} className="flex justify-center">
            <h1 
              className="script-title text-black"
              style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
            >
              Signature Custom Design
            </h1>
          </div>
        </div>

        {/* Image that overlaps white and black sections */}
        <div className="relative">
          {/* White top portion - 70% of image height */}
          <div className="absolute top-0 left-0 right-0 h-[70%] bg-white" />
          {/* Black bottom portion - 30% of image height */}
          <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-black" />
          
          {/* The image itself - centered, responsive width using clamp */}
          <div className="relative flex justify-center py-0">
            <div style={{ width: 'clamp(70%, 75vw, 72%)' }} className="relative z-10">
              <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                <Image
                  src="/signature-showcase-1.png"
                  alt="Breathtaking custom designed home"
                  fill
                  className="object-cover object-center rounded-[8px] md:rounded-[10px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* === BLACK FRAME CONTAINER - continues below image === */}
        <div className="bg-black overflow-visible relative">
          
          {/* Small gap before parallax section - scales with viewport */}
          <div style={{ height: 'clamp(15px, 3vw, 40px)' }} />

          {/* Row 2: Split section - stacked on mobile, side by side on desktop */}
          <div ref={splitSectionRef} className="flex justify-center overflow-visible">
            <div className="w-full md:w-[82%] lg:w-[78%] xl:w-[75%] flex flex-col md:flex-row md:items-start overflow-visible">
              {/* Text block - on black background */}
              <div className="w-full md:w-[45%] lg:w-[42%] order-1 px-5 md:px-0" style={{ padding: 'clamp(1.5rem, 3vw, 3rem) clamp(0.5rem, 2vw, 1.5rem)' }}>
                <h2 
                  className="font-normal text-white leading-[1.1] italic"
                  style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}
                >
                  More drive. For<br />
                  ambitious<br />
                  destinations.
                </h2>
                <p style={{ fontSize: 'clamp(14px, 1.1vw, 17px)' }} className="text-gray-200 leading-[1.85] max-w-[520px]">
                  The reason most people never live in their true dream home isn't money, terrain, or logistics. It's a lack of bold imagination.
                </p>
                <p style={{ fontSize: 'clamp(14px, 1.1vw, 17px)', marginTop: 'clamp(1rem, 1.5vw, 1.25rem)' }} className="text-gray-200 leading-[1.85] max-w-[520px]">
                  We've built our reputation on proving the doubters wrong—transforming visionary sketches into breathtaking, one-of-a-kind realities that defy limits.
                </p>
                <p style={{ fontSize: 'clamp(14px, 1.1vw, 17px)', marginTop: 'clamp(1rem, 1.5vw, 1.25rem)' }} className="text-gray-200 leading-[1.85] max-w-[520px]">
                  If your dream demands creativity that breaks the mold, extraordinary craftsmanship, and fearless execution, we're the team that makes it happen.
                </p>
                <p style={{ fontSize: 'clamp(14px, 1.1vw, 17px)', marginTop: 'clamp(1rem, 1.5vw, 1.25rem)' }} className="text-gray-200 leading-[1.85] max-w-[520px]">
                  Dream bigger. We'll design it, engineer it, and build it—exactly where you envision it.
                </p>
              </div>

              {/* === MOBILE ONLY: Video then Image === */}
              
              {/* Mobile Video - LEFT aligned, bigger */}
              <div className="block md:hidden w-[70%] mr-auto order-2 mt-4">
                <div className="relative w-full" style={{ aspectRatio: '16/10' }}>
                  <video
                    src="/renovation-showcase.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover rounded-r-[8px] rounded-l-none"
                  />
                </div>
              </div>

              {/* Mobile Second Image - RIGHT aligned, smaller, overlaps video */}
              <div 
                className="block md:hidden w-[55%] ml-auto order-3 -mt-20 relative z-20"
                style={{ 
                  transform: `translateY(${parallaxOffset}px)`,
                  transition: 'transform 0.05s linear'
                }}
              >
                <div className="relative w-full aspect-[3/4]">
                  <Image
                    src="/signature-showcase-2.png"
                    alt="Custom home lifestyle"
                    fill
                    className="object-cover object-center rounded-l-[8px] rounded-r-none"
                  />
                </div>
              </div>

              {/* === DESKTOP ONLY: Image on right side (video is separate section below) === */}
              <div 
                className="hidden md:block md:w-[50%] lg:w-[52%] md:ml-auto md:-mr-[1%] lg:-mr-[2%] relative z-20"
                style={{ 
                  transform: `translateY(${parallaxOffset}px)`,
                  transition: 'transform 0.05s linear'
                }}
              >
                <div className="relative w-full md:aspect-[1/1] lg:aspect-[3/3.5] xl:aspect-[3/4]">
                  <Image
                    src="/signature-showcase-2.png"
                    alt="Custom home lifestyle"
                    fill
                    className="object-cover object-center rounded-[10px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Thin black separator */}
          <div className="h-[8px] md:h-[10px] lg:h-[12px]" />

        </div>
        {/* === END BLACK FRAME CONTAINER === */}

      </section>

      {/* Video Section - DESKTOP ONLY, overlaps second image, 50/50 black/white */}
      <section 
        className="relative hidden md:block"
        style={{ marginTop: `-${videoMargin}px` }}
      >
        {/* Split backgrounds - each takes exactly 50% */}
        <div className="absolute inset-0 flex flex-col">
          <div className="flex-1 bg-black" />
          <div className="flex-1 bg-[#f9f8f6]" />
        </div>
        
        {/* Video - centered-left on desktop */}
        <div className="relative z-50 flex justify-center" style={{ padding: 'clamp(30px, 6vh, 100px) 0' }}>
          <div 
            className="w-[52%] lg:w-[50%] xl:w-[48%] relative mr-[clamp(3%,6vw,9%)]"
          >
            <div className="relative w-full" style={{ aspectRatio: '1.78/1' }}>
              <video
                src="/renovation-showcase.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover rounded-[10px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile: 50/50 black/white transition section */}
      <section className="relative block md:hidden">
        <div className="absolute inset-0 flex flex-col">
          <div className="flex-1 bg-black" />
          <div className="flex-1 bg-[#f9f8f6]" />
        </div>
        <div className="relative z-10 h-[80px]" />
      </section>

      {/* Begin Your Vision CTA Section */}
      <section className="bg-[#f9f8f6]" style={{ padding: 'clamp(4rem, 8vw, 9rem) 0' }}>
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <p 
            className="text-gray-400 uppercase tracking-[0.2em]"
            style={{ fontSize: 'clamp(11px, 0.9vw, 14px)', marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}
          >
            Signature Custom Design
          </p>
          <h2 
            className="script-title text-black leading-tight"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 3.5rem)', marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}
          >
            "Imagination Isn't Limited.<br />Neither Are We."
          </h2>
          <p 
            className="text-gray-600 leading-relaxed max-w-xl mx-auto"
            style={{ fontSize: 'clamp(14px, 1.1vw, 16px)', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}
          >
            If your dream demands creativity that breaks the mold, extraordinary craftsmanship, and fearless execution, we're the team that makes it happen.
          </p>
          <a 
            href="/contact"
            className="inline-flex items-center gap-3 bg-black text-white tracking-[0.15em] uppercase hover:bg-[#c6912c] transition-colors duration-300"
            style={{ padding: 'clamp(0.75rem, 1.5vw, 1rem) clamp(1.5rem, 3vw, 2.5rem)', fontSize: 'clamp(11px, 0.9vw, 13px)' }}
          >
            Begin Your Vision
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
