"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function SignatureCustomDesignPage() {
  const [parallaxOffset, setParallaxOffset] = useState(0)
  const [videoMargin, setVideoMargin] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const splitSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Calculate responsive video margin based on viewport - DESKTOP ONLY
  useEffect(() => {
    const updateVideoMargin = () => {
      const vh = window.innerHeight
      const vw = window.innerWidth
      
      // Only calculate for desktop
      if (vw >= 768) {
        const margin = Math.min(vw * 0.25, vh * 0.45, 500)
        setVideoMargin(margin)
      }
    }
    
    updateVideoMargin()
    window.addEventListener('resize', updateVideoMargin)
    return () => window.removeEventListener('resize', updateVideoMargin)
  }, [])

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (splitSectionRef.current) {
        const rect = splitSectionRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const windowWidth = window.innerWidth
        
        // Smaller parallax on mobile, larger on desktop
        const maxOffset = windowWidth < 768 
          ? Math.min(windowHeight * 0.08, 60) 
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

  // Carousel arrow visibility based on scroll position
  useEffect(() => {
    const carousel = document.getElementById('highlights-carousel')
    const leftArrow = document.getElementById('carousel-left-arrow')
    const rightArrow = document.getElementById('carousel-right-arrow')

    const updateArrows = () => {
      if (!carousel || !leftArrow || !rightArrow) return
      
      const scrollLeft = carousel.scrollLeft
      const maxScroll = carousel.scrollWidth - carousel.clientWidth
      
      // Show left arrow if scrolled
      if (scrollLeft > 50) {
        leftArrow.style.opacity = '1'
        leftArrow.style.pointerEvents = 'auto'
      } else {
        leftArrow.style.opacity = '0'
        leftArrow.style.pointerEvents = 'none'
      }
      
      // Hide right arrow if at end
      if (scrollLeft >= maxScroll - 50) {
        rightArrow.style.opacity = '0'
        rightArrow.style.pointerEvents = 'none'
      } else {
        rightArrow.style.opacity = '1'
        rightArrow.style.pointerEvents = 'auto'
      }
    }

    if (carousel) {
      carousel.addEventListener('scroll', updateArrows)
      updateArrows()
    }

    return () => {
      if (carousel) carousel.removeEventListener('scroll', updateArrows)
    }
  }, [])

  // Carousel arrow visibility
  useEffect(() => {
    const carousel = document.getElementById('highlights-carousel')
    const leftArrow = document.getElementById('carousel-left-arrow')
    const rightArrow = document.getElementById('carousel-right-arrow')
    
    const handleCarouselScroll = () => {
      if (carousel && leftArrow && rightArrow) {
        // Show left arrow if scrolled
        if (carousel.scrollLeft > 50) {
          leftArrow.style.opacity = '1'
          leftArrow.style.pointerEvents = 'auto'
        } else {
          leftArrow.style.opacity = '0'
          leftArrow.style.pointerEvents = 'none'
        }
        
        // Hide right arrow if at end
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 50) {
          rightArrow.style.opacity = '0'
          rightArrow.style.pointerEvents = 'none'
        } else {
          rightArrow.style.opacity = '1'
          rightArrow.style.pointerEvents = 'auto'
        }
      }
    }
    
    if (carousel) {
      carousel.addEventListener('scroll', handleCarouselScroll)
      handleCarouselScroll() // Initial check
    }
    
    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', handleCarouselScroll)
      }
    }
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

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
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
          
          {/* The image itself - centered */}
          <div className="relative flex justify-center py-0">
            <div className="w-[92%] sm:w-[85%] md:w-[75%] lg:w-[70%] xl:w-[68%] relative z-10">
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

        {/* === BLACK FRAME CONTAINER === */}
        <div className="bg-black overflow-visible relative">
          
          {/* Small gap before content */}
          <div className="h-[15px] sm:h-[20px] md:h-[25px] lg:h-[30px] xl:h-[40px]" />

          {/* Split section */}
          <div ref={splitSectionRef} className="flex justify-center overflow-visible">
            <div className="w-[92%] sm:w-[88%] md:w-[82%] lg:w-[78%] xl:w-[75%] flex flex-col md:flex-row md:items-start overflow-visible">
              
              {/* Text block */}
              <div className="w-full md:w-[45%] lg:w-[42%] py-6 sm:py-8 md:py-10 lg:py-12 px-2 md:pl-[2%] lg:pl-[3%] xl:pl-[4%]">
                <h2 className="text-[1.8rem] sm:text-[2.2rem] md:text-[2rem] lg:text-[2.8rem] xl:text-[3.5rem] font-normal text-white leading-[1.1] mb-6 sm:mb-8 md:mb-10 italic">
                  More drive. For<br />
                  ambitious<br />
                  destinations.
                </h2>
                <p className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] text-gray-200 leading-[1.9] md:leading-[2] max-w-[520px]">
                  The reason most people never live in their true dream home isn't money, terrain, or logistics. It's a lack of bold imagination.
                </p>
                <p className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] text-gray-200 leading-[1.9] md:leading-[2] max-w-[520px] mt-5 md:mt-6">
                  We've built our reputation on proving the doubters wrong—transforming visionary sketches into breathtaking, one-of-a-kind realities that defy limits.
                </p>
                <p className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] text-gray-200 leading-[1.9] md:leading-[2] max-w-[520px] mt-5 md:mt-6">
                  If your dream demands creativity that breaks the mold, extraordinary craftsmanship, and fearless execution, we're the team that makes it happen.
                </p>
                <p className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] text-gray-200 leading-[1.9] md:leading-[2] max-w-[520px] mt-5 md:mt-6">
                  Dream bigger. We'll design it, engineer it, and build it—exactly where you envision it.
                </p>
              </div>

              {/* ============ MOBILE ONLY: Video then Image ============ */}
              
              {/* Mobile Video - LEFT aligned, bigger */}
              <div className="block md:hidden w-[70%] mr-auto mt-4">
                <div className="relative w-full" style={{ aspectRatio: '16/10' }}>
                  <video
                    src="/renovation-showcase.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover rounded-r-[8px]"
                  />
                </div>
              </div>

              {/* Mobile Second Image - RIGHT aligned, smaller, overlaps video */}
              <div 
                className="block md:hidden w-[55%] ml-auto -mt-16 relative z-20"
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
                    className="object-cover object-center rounded-l-[8px]"
                  />
                </div>
              </div>

              {/* ============ DESKTOP ONLY: Second Image ============ */}
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

      {/* ============ DESKTOP ONLY: Video Section with 50/50 split ============ */}
      <section 
        className="relative hidden md:block"
        style={{ marginTop: `-${videoMargin}px` }}
      >
        {/* Split backgrounds - 50% black, 50% white */}
        <div className="absolute inset-0 flex flex-col">
          <div className="flex-1 bg-black" />
          <div className="flex-1 bg-[#f9f8f6]" />
        </div>
        
        {/* Video centered on the boundary */}
        <div className="relative z-50 flex justify-center py-[60px] md:py-[80px] lg:py-[100px]">
          <div className="w-[58%] md:w-[52%] lg:w-[50%] xl:w-[48%] relative mr-[5%] md:mr-[7%] lg:mr-[9%]">
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

      {/* ============ MOBILE ONLY: 50/50 transition ============ */}
      <section className="relative block md:hidden">
        <div className="absolute inset-0 flex flex-col">
          <div className="flex-1 bg-black" />
          <div className="flex-1 bg-[#f9f8f6]" />
        </div>
        <div className="relative z-10 h-[60px]" />
      </section>

      {/* ============ Highlights Section ============ */}
      <section className="bg-[#f9f8f6] pt-20 md:pt-28 lg:pt-36 pb-12 md:pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Title centered */}
          <h2 className="text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-bold text-black text-center tracking-tight">
            Antova Builders highlights.
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative mt-10 md:mt-14">
          {/* Carousel container */}
          <div 
            id="highlights-carousel"
            className="flex gap-6 md:gap-8 lg:gap-9 overflow-x-auto scrollbar-hide scroll-smooth pl-6 md:pl-12 lg:pl-[10%] pr-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Card 1 */}
            <div className="flex-shrink-0 w-[409px] sm:w-[512px] md:w-[615px] lg:w-[718px] xl:w-[793px]">
              <div className="relative w-full aspect-[16/11.67] rounded-lg overflow-hidden">
                <Image
                  src="/signature-showcase-1.png"
                  alt="Premium Materials"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] font-bold text-black mt-5 md:mt-7">
                Premium Materials
              </h3>
              <p className="text-[14px] md:text-[15px] lg:text-[16px] text-gray-600 leading-relaxed mt-2 md:mt-3">
                We source only the finest materials from trusted suppliers worldwide. Every beam, stone, and fixture meets our exacting standards for quality and durability.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex-shrink-0 w-[409px] sm:w-[512px] md:w-[615px] lg:w-[718px] xl:w-[793px]">
              <div className="relative w-full aspect-[16/11.67] rounded-lg overflow-hidden">
                <Image
                  src="/signature-showcase-1.png"
                  alt="Expert Craftsmanship"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] font-bold text-black mt-5 md:mt-7">
                Expert Craftsmanship
              </h3>
              <p className="text-[14px] md:text-[15px] lg:text-[16px] text-gray-600 leading-relaxed mt-2 md:mt-3">
                Our master craftsmen bring decades of experience to every project. Their attention to detail transforms architectural visions into flawless reality.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex-shrink-0 w-[409px] sm:w-[512px] md:w-[615px] lg:w-[718px] xl:w-[793px]">
              <div className="relative w-full aspect-[16/11.67] rounded-lg overflow-hidden">
                <Image
                  src="/signature-showcase-1.png"
                  alt="Smart Home Integration"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] font-bold text-black mt-5 md:mt-7">
                Smart Home Integration
              </h3>
              <p className="text-[14px] md:text-[15px] lg:text-[16px] text-gray-600 leading-relaxed mt-2 md:mt-3">
                Seamlessly integrated technology throughout your home. Control lighting, climate, security, and entertainment from anywhere with intuitive systems.
              </p>
            </div>

            {/* Card 4 */}
            <div className="flex-shrink-0 w-[409px] sm:w-[512px] md:w-[615px] lg:w-[718px] xl:w-[793px]">
              <div className="relative w-full aspect-[16/11.67] rounded-lg overflow-hidden">
                <Image
                  src="/signature-showcase-1.png"
                  alt="Sustainable Design"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] font-bold text-black mt-5 md:mt-7">
                Sustainable Design
              </h3>
              <p className="text-[14px] md:text-[15px] lg:text-[16px] text-gray-600 leading-relaxed mt-2 md:mt-3">
                Energy-efficient construction meets luxury living. Solar integration, superior insulation, and eco-friendly materials reduce your footprint without compromise.
              </p>
            </div>

            {/* Card 5 */}
            <div className="flex-shrink-0 w-[409px] sm:w-[512px] md:w-[615px] lg:w-[718px] xl:w-[793px] pr-6">
              <div className="relative w-full aspect-[16/11.67] rounded-lg overflow-hidden">
                <Image
                  src="/signature-showcase-1.png"
                  alt="Personalized Service"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] font-bold text-black mt-5 md:mt-7">
                Personalized Service
              </h3>
              <p className="text-[14px] md:text-[15px] lg:text-[16px] text-gray-600 leading-relaxed mt-2 md:mt-3">
                A dedicated project manager guides you from concept to completion. Regular updates, transparent communication, and unwavering commitment to your vision.
              </p>
            </div>
          </div>

          {/* Left arrow - hidden initially, shows after scrolling */}
          <button 
            id="carousel-left-arrow"
            className="absolute left-0 top-[36%] -translate-y-1/2 w-[35px] h-[37px] md:w-[38px] md:h-[44px] bg-white/60 backdrop-blur-sm flex items-center justify-center hover:bg-white/90 transition-all duration-300 z-10 opacity-0 pointer-events-none"
            aria-label="Previous"
            onClick={() => {
              const container = document.getElementById('highlights-carousel')
              if (container) {
                container.scrollBy({ left: -830, behavior: 'smooth' })
              }
            }}
          >
            <svg className="w-4 h-4 md:w-[18px] md:h-[18px] text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Right arrow */}
          <button 
            id="carousel-right-arrow"
            className="absolute right-[2%] top-[36%] -translate-y-1/2 w-[35px] h-[37px] md:w-[38px] md:h-[44px] bg-white/60 backdrop-blur-sm flex items-center justify-center hover:bg-white/90 transition-all duration-300 z-10"
            aria-label="Next"
            onClick={() => {
              const container = document.getElementById('highlights-carousel')
              if (container) {
                container.scrollBy({ left: 830, behavior: 'smooth' })
              }
            }}
          >
            <svg className="w-4 h-4 md:w-[18px] md:h-[18px] text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </section>

      {/* Begin Your Vision CTA Section */}
      <section className="bg-[#f9f8f6] py-16 sm:py-20 md:py-24 lg:py-28 xl:py-36">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <p className="text-[12px] sm:text-[13px] md:text-sm text-gray-400 uppercase tracking-[0.2em] mb-4 sm:mb-6">
            Signature Custom Design
          </p>
          <h2 className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] font-bold text-black leading-tight mb-6 sm:mb-8">
            More vision. For extraordinary homes.
          </h2>
          <p className="text-[14px] sm:text-[15px] md:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12">
            We've built our reputation on transforming visionary sketches into breathtaking, one-of-a-kind realities that defy limits—combining bold creativity, extraordinary craftsmanship, and fearless execution to make ambitious dreams happen.
          </p>
          <a 
            href="/contact"
            className="inline-flex items-center gap-3 px-8 sm:px-10 py-3 sm:py-4 bg-black text-white text-[12px] sm:text-[13px] tracking-[0.15em] uppercase hover:bg-[#c6912c] transition-colors duration-300"
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
