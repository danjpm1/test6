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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,300;1,400;1,600;1,700&display=swap');

        .script-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-style: italic;
          font-weight: 700;
        }
      `}</style>

      <Navbar />

      {/* Porsche-style Editorial Layout */}
      <section className="pt-24 md:pt-28">
        
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
          
          {/* The image itself - centered, wider width ~65% */}
          <div className="relative flex justify-center py-0">
            <div className="w-[92%] sm:w-[80%] md:w-[70%] lg:w-[65%] relative z-10">
              <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                <Image
                  src="/signature-showcase-1.png"
                  alt="Breathtaking custom designed home"
                  fill
                  className="object-cover object-center rounded-tr-[8px] rounded-bl-[8px] md:rounded-tr-[10px] md:rounded-bl-[10px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* === BLACK FRAME CONTAINER - continues below image === */}
        <div className="bg-black">
          
          {/* Small black gap below the overlapping image */}
          <div className="h-[30px] md:h-[35px] lg:h-[40px]" />

          {/* Row 2: Split section - Text Left / Image Right with Parallax */}
          <div className="flex justify-center">
            <div className="w-[92%] sm:w-[80%] md:w-[70%] lg:w-[65%] flex flex-col md:flex-row md:items-start">
              {/* Text block - 40% of content, on black background, aligned left */}
              <div className="w-full md:w-[40%] py-8 md:py-10 lg:py-12 md:pr-6">
                <h2 className="text-[1.8rem] sm:text-[2.2rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[3rem] font-light text-white leading-[1.1] mb-6 md:mb-8 italic">
                  More drive. For<br />
                  ambitious<br />
                  destinations.
                </h2>
                <p className="text-[12px] md:text-[13px] lg:text-[14px] text-gray-300 leading-[1.8] max-w-[400px]">
                  The reason most people never live in their true dream home isn't money, terrain, or logistics. It's a lack of bold imagination.
                </p>
                <p className="text-[12px] md:text-[13px] lg:text-[14px] text-gray-300 leading-[1.8] max-w-[400px] mt-4">
                  We've built our reputation on proving the doubters wrong—transforming visionary sketches into breathtaking, one-of-a-kind realities that defy limits.
                </p>
              </div>

              {/* Image block - 60% of content, aligned to right edge with sticky parallax */}
              <div className="w-full md:w-[60%] relative md:sticky md:top-24 flex justify-end" style={{ alignSelf: 'flex-start' }}>
                <div className="relative w-full md:w-[95%]" style={{ aspectRatio: '3/4' }}>
                  <Image
                    src="/signature-showcase-2.png"
                    alt="Custom home lifestyle"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Thin black separator */}
          <div className="h-[8px] md:h-[10px] lg:h-[12px]" />

          {/* Row 3: Bottom Video */}
          <div className="flex justify-center">
            <div className="w-[92%] sm:w-[80%] md:w-[70%] lg:w-[65%] relative">
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
