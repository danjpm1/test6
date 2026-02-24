"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

// ━━━ THROTTLE UTILITY (fixes scroll jank) ━━━
function throttle<T extends (...args: any[]) => void>(fn: T, wait: number): T {
  let lastTime = 0
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  
  return ((...args: Parameters<T>) => {
    const now = Date.now()
    const remaining = wait - (now - lastTime)
    
    if (remaining <= 0) {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      lastTime = now
      fn(...args)
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastTime = Date.now()
        timeoutId = null
        fn(...args)
      }, remaining)
    }
  }) as T
}

// FAQ data for signature custom design
const faqs = [
  {
    question: "How is Signature Custom Design different from a standard new build?",
    answer: "Signature Custom Design is our highest tier of service — fully bespoke architecture created from scratch around your vision, lifestyle, and site. Unlike spec homes or modified floor plans, every element is designed specifically for you. This includes custom architectural drawings, premium material selections, and hands-on collaboration throughout the entire process."
  },
  {
    question: "How long does a custom design project typically take?",
    answer: "From initial consultation to move-in, most Signature Custom Design projects take 14–24 months. The design phase typically runs 3–5 months, followed by 10–18 months of construction depending on size and complexity. We provide a detailed timeline during your consultation and maintain transparent communication throughout."
  },
  {
    question: "What is the investment range for a Signature Custom Design home?",
    answer: "Our Signature Custom Design homes typically start at $800,000 and range upward based on size, site conditions, and finish selections. Use our AI estimator to get a personalized investment range in 60 seconds, or schedule a consultation for a detailed discussion of your specific vision."
  }
]

export default function SignatureCustomDesignPage() {
  const [parallaxOffset, setParallaxOffset] = useState(0)
  const [videoMargin, setVideoMargin] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const splitSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // ━━━ FIXED: Combined resize handler for mobile check AND video margin ━━━
  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      
      // Mobile check
      setIsMobile(vw < 768)
      
      // Video margin (desktop only)
      if (vw >= 768) {
        const margin = Math.min(vw * 0.25, vh * 0.45, 500)
        setVideoMargin(margin)
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // ━━━ FIXED: Throttled parallax effect ━━━
  useEffect(() => {
    const handleScroll = throttle(() => {
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
    }, 16) // ~60fps throttle for smooth parallax

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ━━━ FIXED: Single carousel arrow handler using React state (removed duplicate) ━━━
  useEffect(() => {
    const carousel = document.getElementById('highlights-carousel')

    const updateArrows = throttle(() => {
      if (!carousel) return
      
      const scrollLeft = carousel.scrollLeft
      const maxScroll = carousel.scrollWidth - carousel.clientWidth
      
      setShowLeftArrow(scrollLeft > 50)
      setShowRightArrow(scrollLeft < maxScroll - 50)
    }, 100)

    if (carousel) {
      carousel.addEventListener('scroll', updateArrows, { passive: true })
      updateArrows()
    }

    return () => {
      if (carousel) carousel.removeEventListener('scroll', updateArrows)
    }
  }, [])

  return (
    <div className="w-full bg-white font-sans">
      <style jsx global>{`
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
          {/* Title - Luxury styled */}
          <div className="pt-10 pb-6 md:pt-14 md:pb-8 lg:pt-16 lg:pb-10 flex flex-col items-center">
            {/* Small overline */}
            <p className="text-[10px] sm:text-[11px] md:text-[12px] text-[#c6912c] uppercase tracking-[0.35em] mb-3 md:mb-4">
              Antova Builders
            </p>
            
            {/* Main title */}
            <h1 className="font-bebas text-[2.25rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] text-black uppercase tracking-[0.04em] text-center">
              Signature Custom Design
            </h1>
            
            {/* Gold accent line */}
            <div className="mt-5 md:mt-6 lg:mt-7 w-[60px] md:w-[80px] h-[2px] bg-[#c6912c]" />
          </div>

          {/* ===== Trust signals strip ===== */}
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-8 text-[10px] sm:text-[11px] md:text-[13px] text-gray-500 pb-8 sm:pb-10 md:pb-12">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="text-[#c6912c] font-medium">150+</span>
              <span>Homes Built</span>
            </div>
            <div className="w-px h-2.5 sm:h-3 bg-gray-300" />
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="text-[#c6912c] font-medium">5.0</span>
              <span>Google Rating</span>
            </div>
            <div className="w-px h-2.5 sm:h-3 bg-gray-300" />
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="text-[#c6912c] font-medium">12</span>
              <span>Years Experience</span>
            </div>
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
              <div className="w-full md:w-[48%] lg:w-[45%] py-6 sm:py-8 md:py-10 lg:py-12 px-2 md:pl-[2%] lg:pl-[3%] xl:pl-[4%] flex-shrink-0">
                <h2 className="font-bebas text-[2rem] sm:text-[2.5rem] md:text-[2.25rem] lg:text-[3rem] xl:text-[3.75rem] text-white leading-[1.1] mb-6 sm:mb-8 md:mb-10 uppercase">
                  More vision. For<br />
                  extraordinary<br />
                  homes.
                </h2>
                <p className="font-sans text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] text-gray-200 leading-[1.9] md:leading-[2]">
                  The reason most people never live in their true dream home isn't money, terrain, or logistics. It's a lack of bold imagination.
                  <br /><br />
                  We've built our reputation on proving the doubters wrong—transforming visionary sketches into breathtaking, one-of-a-kind realities that defy limits.
                </p>

                {/* ===== CTA with FUD-reducing microcopy ===== */}
                <div className="pt-6 sm:pt-8 md:pt-10">
                  <Link 
                    href="/cost-estimator?type=custom-home"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-3 bg-[#c6912c] text-white text-[11px] sm:text-[12px] tracking-[0.15em] uppercase hover:bg-[#b8830f] transition-colors duration-300 font-sans"
                  >
                    See Your Investment Range
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <p className="mt-2.5 sm:mt-3 text-[10px] sm:text-[11px] md:text-[12px] text-gray-400 text-center sm:text-left">
                    60-second results · No email required · No obligation
                  </p>
                </div>
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
                className="hidden md:block md:w-[48%] lg:w-[50%] md:ml-auto md:-mr-[1%] lg:-mr-[2%] relative z-20"
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

      {/* ===== Testimonial Section ===== */}
      <section className="bg-[#f9f8f6] py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="bg-white border border-gray-100 rounded-lg p-5 sm:p-8 md:p-10 lg:p-12">
            {/* Quote icon */}
            <div className="text-[#c6912c] mb-4 sm:mb-6">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            
            {/* Quote */}
            <blockquote className="text-[15px] sm:text-[17px] md:text-[20px] lg:text-[22px] text-gray-800 leading-relaxed mb-6 sm:mb-8">
              "From first sketch to move-in day, Antova delivered a home that exceeded every expectation — on time and within budget. They transformed our wildest ideas into reality without ever saying 'that's not possible.'"
            </blockquote>
            
            {/* Author */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#c6912c]/10 flex items-center justify-center text-[#c6912c] font-medium text-xs sm:text-sm">
                ST
              </div>
              <div>
                <p className="font-medium text-black text-[14px] sm:text-[15px] md:text-[16px]">Sarah & David Thompson</p>
                <p className="text-gray-500 text-[12px] sm:text-[13px] md:text-[14px]">Coeur d'Alene, ID · Signature Custom Design</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Highlights Section ============ */}
      <section className="bg-[#f9f8f6] pt-8 md:pt-12 lg:pt-16 pb-12 md:pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Title centered - Bebas Neue */}
          <h2 className="font-bebas text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] text-black text-center tracking-wide uppercase">
            Antova Builders highlights.
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative mt-10 md:mt-14">
          {/* Carousel container */}
          <div 
            id="highlights-carousel"
            className="flex gap-[18px] md:gap-[24px] lg:gap-[27px] overflow-x-auto scrollbar-hide scroll-smooth pl-6 md:pl-12 lg:pl-[10%] pr-6"
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
              <h3 className="font-bebas text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] text-black mt-5 md:mt-7 uppercase tracking-wide">
                Premium Materials
              </h3>
              <p className="font-sans text-[14px] md:text-[15px] lg:text-[16px] text-gray-600 leading-relaxed mt-2 md:mt-3">
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
              <h3 className="font-bebas text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] text-black mt-5 md:mt-7 uppercase tracking-wide">
                Expert Craftsmanship
              </h3>
              <p className="font-sans text-[14px] md:text-[15px] lg:text-[16px] text-gray-600 leading-relaxed mt-2 md:mt-3">
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
              <h3 className="font-bebas text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] text-black mt-5 md:mt-7 uppercase tracking-wide">
                Smart Home Integration
              </h3>
              <p className="font-sans text-[14px] md:text-[15px] lg:text-[16px] text-gray-600 leading-relaxed mt-2 md:mt-3">
                Seamlessly integrated technology throughout your home. Control lighting, climate, security, and entertainment from anywhere with intuitive systems.
              </p>
            </div>
            
            {/* Spacer for end padding */}
            <div className="flex-shrink-0 w-6"></div>
          </div>

          {/* Left arrow - FIXED: Using React state */}
          <button 
            id="carousel-left-arrow"
            className={`absolute left-0 top-[36%] -translate-y-1/2 w-[40px] h-[37px] md:w-[44px] md:h-[44px] bg-white/60 backdrop-blur-sm flex items-center justify-center hover:bg-white/90 transition-all duration-300 z-10 ${
              showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Previous"
            onClick={() => {
              const container = document.getElementById('highlights-carousel')
              if (container) {
                const firstCard = container.querySelector('div.flex-shrink-0') as HTMLElement
                const scrollAmount = firstCard ? firstCard.offsetWidth + 27 : 820
                container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
              }
            }}
          >
            <svg className="w-4 h-4 md:w-[18px] md:h-[18px] text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Right arrow - FIXED: Using React state */}
          <button 
            id="carousel-right-arrow"
            className={`absolute right-[2%] top-[36%] -translate-y-1/2 w-[40px] h-[37px] md:w-[44px] md:h-[44px] bg-white/60 backdrop-blur-sm flex items-center justify-center hover:bg-white/90 transition-all duration-300 z-10 ${
              showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Next"
            onClick={() => {
              const container = document.getElementById('highlights-carousel')
              if (container) {
                const firstCard = container.querySelector('div.flex-shrink-0') as HTMLElement
                const scrollAmount = firstCard ? firstCard.offsetWidth + 27 : 820
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
              }
            }}
          >
            <svg className="w-4 h-4 md:w-[18px] md:h-[18px] text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </section>

      {/* ===== Mid-page CTA section ===== */}
      <section className="bg-[#f9f8f6] py-6 sm:py-8 md:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="bg-white border border-gray-100 rounded-lg p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-5 sm:gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-black">
                Ready to design your dream home?
              </h3>
              <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-500 mt-1.5 sm:mt-2">
                Get a realistic investment range in 60 seconds — no commitment required.
              </p>
            </div>
            <Link 
              href="/cost-estimator?type=custom-home"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 bg-black text-white text-[11px] sm:text-[12px] tracking-[0.12em] uppercase hover:bg-[#c6912c] transition-colors duration-300 font-sans whitespace-nowrap flex-shrink-0"
            >
              Try the Estimator
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FAQ Section ===== */}
      <section className="bg-[#f9f8f6] py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Section header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <p className="text-[10px] sm:text-[11px] md:text-[12px] text-[#c6912c] uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-2 sm:mb-3">
              Common Questions
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-black">
              Before You Decide
            </h2>
          </div>

          {/* FAQ accordion */}
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-100 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-[14px] sm:text-[15px] md:text-[16px] text-black pr-3 sm:pr-4">
                    {faq.question}
                  </span>
                  <svg 
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-[#c6912c] flex-shrink-0 transition-transform duration-200 ${openFaq === index ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth={2} 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-5">
                    <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Final CTA Section ===== */}
      <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 text-center">
          <p className="text-[11px] sm:text-[12px] md:text-[13px] lg:text-sm text-gray-400 uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4 md:mb-6">
            Signature Custom Design
          </p>
          <h2 className="font-bebas text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] text-black leading-tight mb-3 sm:mb-4 md:mb-5 uppercase tracking-wide">
            Imagination Isn't Limited. Neither Are We.
          </h2>
          
          {/* Capacity-based urgency */}
          <p className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-gray-500 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            Spring 2026 — 2 custom design slots remaining
          </p>

          {/* Dual CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5">
            <Link 
              href="/cost-estimator?type=custom-home"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 md:px-10 py-3.5 sm:py-3 md:py-4 bg-[#c6912c] text-white text-[11px] sm:text-[12px] md:text-[13px] tracking-[0.12em] sm:tracking-[0.15em] uppercase hover:bg-[#b8830f] transition-colors duration-300 font-sans"
            >
              See Your Investment Range
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 md:px-10 py-3.5 sm:py-3 md:py-4 bg-black text-white text-[11px] sm:text-[12px] md:text-[13px] tracking-[0.12em] sm:tracking-[0.15em] uppercase hover:bg-gray-800 transition-colors duration-300 font-sans"
            >
              Begin Your Vision
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* FUD-reducing microcopy */}
          <p className="mt-4 sm:mt-5 md:mt-6 text-[10px] sm:text-[11px] md:text-[12px] text-gray-400">
            Free consultation · No commitment · Complimentary site evaluation included
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
