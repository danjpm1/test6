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
      <section className="bg-white pt-24 md:pt-32">
        
        {/* Script Title - Centered */}
        <div className="py-6 md:py-10 flex justify-center">
          <h1 className="script-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black">
            Signature Custom Design
          </h1>
        </div>

        {/* Main Image with Black Side Bars */}
        <div className="flex">
          {/* Left black bar */}
          <div className="w-[12%] md:w-[15%] lg:w-[18%] bg-black flex-shrink-0" />
          
          {/* Center image */}
          <div className="flex-1 relative aspect-[4/3] md:aspect-[16/10]">
            <Image
              src="/signature-showcase-1.png"
              alt="Breathtaking custom designed home"
              fill
              className="object-cover object-center"
            />
          </div>
          
          {/* Right black bar */}
          <div className="w-[12%] md:w-[15%] lg:w-[18%] bg-black flex-shrink-0" />
        </div>

        {/* Thick black bar below first image */}
        <div className="w-full h-[30px] md:h-[50px] lg:h-[60px] bg-black" />

        {/* Split Section: Text Left, Image Right - with continuing black side bars */}
        <div className="flex">
          {/* Left black bar */}
          <div className="w-[12%] md:w-[15%] lg:w-[18%] bg-black flex-shrink-0" />
          
          {/* Content area */}
          <div className="flex-1 grid md:grid-cols-2">
            {/* Left - Text Content */}
            <div className="px-6 md:px-10 lg:px-14 py-10 md:py-14 lg:py-20 flex flex-col justify-center bg-white">
              <h2 className="text-[1.65rem] sm:text-3xl md:text-[2rem] lg:text-[2.5rem] font-normal text-black leading-[1.2] mb-5 md:mb-7">
                More drive. For<br />
                ambitious<br />
                destinations.
              </h2>
              <p className="text-[12px] md:text-[13px] text-gray-500 leading-relaxed max-w-sm">
                The reason most people never live in their true dream home isn't money, terrain, or logistics. It's a lack of bold imagination.
              </p>
              <p className="text-[12px] md:text-[13px] text-gray-500 leading-relaxed max-w-sm mt-3">
                We've built our reputation on proving the doubters wrong—transforming visionary sketches into breathtaking, one-of-a-kind realities that defy limits.
              </p>
            </div>

            {/* Right - Image */}
            <div className="relative aspect-[4/3] md:aspect-auto min-h-[280px] md:min-h-0">
              <Image
                src="/signature-showcase-2.png"
                alt="Custom home lifestyle"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
          
          {/* Right black bar */}
          <div className="w-[12%] md:w-[15%] lg:w-[18%] bg-black flex-shrink-0" />
        </div>

        {/* Thin black separator */}
        <div className="flex">
          <div className="w-[12%] md:w-[15%] lg:w-[18%] bg-black flex-shrink-0" />
          <div className="flex-1 h-[8px] md:h-[12px] bg-black" />
          <div className="w-[12%] md:w-[15%] lg:w-[18%] bg-black flex-shrink-0" />
        </div>

        {/* Bottom Autoplay Video with Black Side Bars */}
        <div className="flex">
          {/* Left black bar */}
          <div className="w-[12%] md:w-[15%] lg:w-[18%] bg-black flex-shrink-0" />
          
          {/* Center video */}
          <div className="flex-1 relative aspect-[21/9] md:aspect-[21/7]">
            <video
              src="/renovation-showcase.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          
          {/* Right black bar */}
          <div className="w-[12%] md:w-[15%] lg:w-[18%] bg-black flex-shrink-0" />
        </div>

        {/* Bottom black bar */}
        <div className="w-full h-[20px] md:h-[30px] bg-black" />

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
