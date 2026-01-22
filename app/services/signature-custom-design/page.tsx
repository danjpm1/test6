"use client"

import { useEffect } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function SignatureCustomDesignPage() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="w-full overflow-x-hidden bg-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,300;1,400&display=swap');

        .script-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-style: italic;
          font-weight: 300;
        }
      `}</style>

      <Navbar />

      {/* Porsche-style Editorial Layout */}
      <section className="bg-white pt-24 md:pt-28">
        
        {/* Script Title - Centered */}
        <div className="pt-8 pb-6 md:pt-10 md:pb-8 flex justify-center">
          <h1 className="script-title text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] text-black">
            Signature Custom Design
          </h1>
        </div>

        {/* === BLACK FRAME CONTAINER === */}
        <div className="bg-black">
          
          {/* Row 1: Main Image with side bars */}
          <div className="flex">
            {/* Left black bar - 15% */}
            <div className="w-[8%] md:w-[12%] lg:w-[15%] bg-black" />
            
            {/* Center image - 70% */}
            <div className="w-[84%] md:w-[76%] lg:w-[70%] relative">
              <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                <Image
                  src="/signature-showcase-1.png"
                  alt="Breathtaking custom designed home"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
            
            {/* Right black bar - 15% */}
            <div className="w-[8%] md:w-[12%] lg:w-[15%] bg-black" />
          </div>

          {/* Thick black bar between image and split section */}
          <div className="h-[35px] md:h-[50px] lg:h-[60px] bg-black" />

          {/* Row 2: Split section - Text Left / Image Right */}
          <div className="flex">
            {/* Left black bar - 15% */}
            <div className="w-[8%] md:w-[12%] lg:w-[15%] bg-black" />
            
            {/* Content area - 70% */}
            <div className="w-[84%] md:w-[76%] lg:w-[70%] flex flex-col md:flex-row">
              {/* Text block - 40% of content */}
              <div className="w-full md:w-[40%] bg-white px-6 md:px-10 lg:px-12 py-8 md:py-12 lg:py-16 flex flex-col justify-center">
                <h2 className="text-[1.5rem] sm:text-[1.75rem] md:text-[1.65rem] lg:text-[2rem] xl:text-[2.25rem] font-normal text-black leading-[1.15] mb-4 md:mb-6">
                  More drive. For<br />
                  ambitious<br />
                  destinations.
                </h2>
                <p className="text-[11px] md:text-[12px] lg:text-[13px] text-gray-500 leading-[1.6] max-w-xs">
                  The reason most people never live in their true dream home isn't money, terrain, or logistics. It's a lack of bold imagination.
                </p>
                <p className="text-[11px] md:text-[12px] lg:text-[13px] text-gray-500 leading-[1.6] max-w-xs mt-3">
                  We've built our reputation on proving the doubters wrong—transforming visionary sketches into breathtaking, one-of-a-kind realities that defy limits.
                </p>
              </div>

              {/* Image block - 60% of content */}
              <div className="w-full md:w-[60%] relative min-h-[250px] md:min-h-0">
                <Image
                  src="/signature-showcase-2.png"
                  alt="Custom home lifestyle"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
            
            {/* Right black bar - 15% */}
            <div className="w-[8%] md:w-[12%] lg:w-[15%] bg-black" />
          </div>

          {/* Thin black separator */}
          <div className="h-[8px] md:h-[10px] lg:h-[12px] bg-black" />

          {/* Row 3: Bottom Video */}
          <div className="flex">
            {/* Left black bar - 15% */}
            <div className="w-[8%] md:w-[12%] lg:w-[15%] bg-black" />
            
            {/* Center video - 70% */}
            <div className="w-[84%] md:w-[76%] lg:w-[70%] relative">
              <div className="relative w-full" style={{ aspectRatio: '2.5/1' }}>
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
            
            {/* Right black bar - 15% */}
            <div className="w-[8%] md:w-[12%] lg:w-[15%] bg-black" />
          </div>

          {/* Bottom black bar */}
          <div className="h-[15px] md:h-[20px] lg:h-[25px] bg-black" />

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
