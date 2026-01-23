"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function SignatureCustomDesignPage() {
  const [parallaxOffset, setParallaxOffset] = useState(0)
  const splitSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (splitSectionRef.current) {
        const rect = splitSectionRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        // Start: image at normal position (offset = 0)
        // As section scrolls up, image moves up faster (negative offset)
        // Maximum offset: -220px (image rises 220px into first image)
        
        if (rect.top < windowHeight && rect.bottom > 0) {
          // Progress: 0 when section just enters bottom, 1 when it's at top
          const progress = 1 - (rect.top / windowHeight)
          // Clamp progress between 0 and 1
          const clampedProgress = Math.min(Math.max(progress, 0), 1)
          // Move image up by up to 220px
          const offset = clampedProgress * -220
          setParallaxOffset(offset)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call
    
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
          <div className="pt-6 pb-8 md:pt-10 md:pb-12 lg:pt-12 lg:pb-14 flex justify-center">
            <h1 className="script-title text-[2.25rem] sm:text-[3rem] md:text-[3.75rem] lg:text-[4.5rem] text-black">
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
          
          {/* The image itself - centered, slightly wider ~68% */}
          <div className="relative flex justify-center py-0">
            <div className="w-[92%] sm:w-[82%] md:w-[72%] lg:w-[68%] relative z-10">
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
          
          {/* Small gap before parallax section */}
          <div className="h-[20px] md:h-[30px] lg:h-[40px]" />

          {/* Row 2: Split section - second image has scroll-driven parallax */}
          <div ref={splitSectionRef} className="flex justify-center overflow-visible">
            <div className="w-[92%] sm:w-[85%] md:w-[80%] lg:w-[75%] flex flex-col md:flex-row md:items-start overflow-visible">
              {/* Text block - on black background, aligned with first image left edge */}
              <div className="w-full md:w-[42%] py-8 md:py-10 lg:py-12 md:pl-[3%] lg:pl-[4%]">
                <h2 className="text-[2.2rem] sm:text-[2.8rem] md:text-[2.5rem] lg:text-[3.2rem] xl:text-[3.8rem] font-normal text-white leading-[1.1] mb-8 md:mb-10 italic">
                  More drive. For<br />
                  ambitious<br />
                  destinations.
                </h2>
                <p className="text-[15px] md:text-[16px] lg:text-[17px] text-gray-200 leading-[1.9] max-w-[520px]">
                  The reason most people never live in their true dream home isn't money, terrain, or logistics. It's a lack of bold imagination.
                </p>
                <p className="text-[15px] md:text-[16px] lg:text-[17px] text-gray-200 leading-[1.9] max-w-[520px] mt-5">
                  We've built our reputation on proving the doubters wrong—transforming visionary sketches into breathtaking, one-of-a-kind realities that defy limits.
                </p>
                <p className="text-[15px] md:text-[16px] lg:text-[17px] text-gray-200 leading-[1.9] max-w-[520px] mt-5">
                  If your dream demands creativity that breaks the mold, extraordinary craftsmanship, and fearless execution, we're the team that makes it happen.
                </p>
                <p className="text-[15px] md:text-[16px] lg:text-[17px] text-gray-200 leading-[1.9] max-w-[520px] mt-5">
                  Dream bigger. We'll design it, engineer it, and build it—exactly where you envision it.
                </p>
              </div>

              {/* Image block - parallax transform applied */}
              <div 
                className="w-full md:w-[52%] md:ml-auto md:-mr-[2%] relative z-20"
                style={{ 
                  transform: `translateY(${parallaxOffset}px)`,
                  transition: 'transform 0.05s linear'
                }}
              >
                <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
                  <Image
                    src="/signature-showcase-2.png"
                    alt="Custom home lifestyle"
                    fill
                    className="object-cover object-center rounded-[8px] md:rounded-[10px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Thin black separator */}
          <div className="h-[8px] md:h-[10px] lg:h-[12px]" />

          {/* Row 3: Bottom Video */}
          <div className="flex justify-center">
            <div className="w-[67%] sm:w-[58%] md:w-[50%] lg:w-[47%] relative">
              <div className="relative w-full" style={{ aspectRatio: '2.16/1' }}>
                <video
                  src="/renovation-showcase.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Bottom black bar */}
          <div className="h-[12px] md:h-[16px] lg:h-[20px]" />

        </div>
        {/* === END BLACK FRAME CONTAINER === */}

      </section>

      {/* Begin Your Vision CTA Section */}
      <section className="bg-[#f9f8f6] py-20 md:py-28 lg:py-36">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <p className="text-[13px] md:text-sm text-gray-400 uppercase tracking-[0.2em] mb-6">
            Signature Custom Design
          </p>
          <h2 
            className="script-title text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-black leading-tight mb-8"
          >
            "Imagination Isn't Limited.<br />Neither Are We."
          </h2>
          <p className="text-[15px] md:text-base text-gray-600 leading-relaxed max-w-xl mx-auto mb-12">
            If your dream demands creativity that breaks the mold, extraordinary craftsmanship, and fearless execution, we're the team that makes it happen.
          </p>
          <a 
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 bg-black text-white text-[13px] tracking-[0.15em] uppercase hover:bg-[#c6912c] transition-colors duration-300"
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
