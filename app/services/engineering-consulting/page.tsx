"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

function AnimatedCounter({
  end,
  prefix = "",
  suffix = "",
  duration = 2000,
  startAnimation = false,
}: {
  end: number
  prefix?: string
  suffix?: string
  duration?: number
  startAnimation?: boolean
}) {
  const [count, setCount] = useState(0)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    if (!startAnimation || hasAnimatedRef.current) return
    hasAnimatedRef.current = true

    let startTime: number | null = null
    let animationId: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setCount(Math.floor(end * easeOut))

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [startAnimation, end, duration])

  return (
    <span>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

const STATS = [
  { end: 500, prefix: "$", suffix: "K+", label: "CLIENT SAVINGS" },
  { end: 100, prefix: "", suffix: "%", label: "PERMITTING\nSUCCESS" },
  { end: 10, prefix: "", suffix: "+", label: "DISPUTES\nRESOLVED" },
]

const SERVICES = [
  {
    num: "01",
    title: "ENGINEERING SOLUTIONS",
    shortDesc: "Technical expertise for comprehensive engineering solutions to your construction challenges.",
    fullDesc: "Our engineering team brings decades of combined experience to solve your most complex construction challenges. From structural analysis to MEP coordination, we provide comprehensive solutions that ensure your project meets all technical requirements while optimizing for cost and timeline efficiency.",
    features: ["Structural Engineering Review", "MEP Coordination", "Value Engineering", "Technical Documentation"]
  },
  {
    num: "02", 
    title: "SOLVING COMPLEX ISSUES",
    shortDesc: "Strategic problem-solving for construction disputes and technical complications.",
    fullDesc: "When construction projects face disputes or technical complications, our team provides expert analysis and strategic solutions. We work with all stakeholders to resolve issues efficiently, minimizing delays and protecting your investment through mediation, expert testimony, and technical consulting.",
    features: ["Dispute Resolution", "Expert Witness Services", "Technical Analysis", "Stakeholder Mediation"]
  },
  {
    num: "03",
    title: "PERMITTING",
    shortDesc: "Streamlined permitting with 100% success rate to keep your project compliant.",
    fullDesc: "Navigate the complex world of construction permitting with confidence. Our 100% success rate speaks to our deep understanding of local regulations and building codes. We handle all documentation, submissions, and agency communications to keep your project moving forward without delays.",
    features: ["Permit Application Management", "Code Compliance Review", "Agency Liaison", "Expedited Processing"]
  },
]

const RESULTS = [
  {
    stat: "$500K+",
    title: "SAVED IN CONSTRUCTION DISPUTES",
    shortDesc: "Strategic resolution that protected client investments",
    fullDesc: "A luxury residential project faced a complex dispute with contractors over material specifications and timeline delays. Our team conducted a thorough technical analysis, documented all discrepancies, and led mediation sessions between all parties. Through strategic negotiation and expert documentation, we resolved the dispute without litigation, saving our client over $500,000 in potential legal fees and project delays.",
    client: "Luxury Residential Development",
    duration: "3 months",
    services: ["Dispute Resolution", "Technical Analysis", "Mediation"]
  },
  {
    stat: "2 WEEKS",
    title: "PERMIT APPROVAL TIME",
    shortDesc: "Fast-tracked permitting for luxury residential project",
    fullDesc: "When a high-end residential client needed urgent permit approval for a time-sensitive renovation, our team mobilized immediately. We prepared comprehensive documentation, coordinated directly with city officials, and addressed all compliance concerns proactively. What typically takes 8-12 weeks was accomplished in just 2 weeks, keeping the project on schedule for the client's move-in date.",
    client: "Beverly Hills Residence",
    duration: "2 weeks",
    services: ["Permit Expediting", "Agency Liaison", "Documentation"]
  },
  {
    stat: "100%",
    title: "COMPLIANCE ACHIEVED",
    shortDesc: "Full code compliance on complex multi-unit development",
    fullDesc: "A multi-unit development project was flagged for multiple code violations during inspection, threatening to halt construction indefinitely. Our engineering team conducted a complete compliance audit, developed remediation plans for each violation, and worked closely with inspectors to verify corrections. We achieved 100% compliance across all 47 inspection points, allowing construction to resume without further delays.",
    client: "Multi-Unit Development",
    duration: "6 weeks",
    services: ["Code Compliance", "Engineering Review", "Inspection Coordination"]
  },
  {
    stat: "30%",
    title: "COST REDUCTION",
    shortDesc: "Value engineering without compromising quality",
    fullDesc: "A commercial construction project was significantly over budget before breaking ground. Our value engineering team analyzed every aspect of the design and specifications, identifying opportunities to reduce costs while maintaining the client's vision and quality standards. Through material substitutions, design optimizations, and contractor negotiations, we reduced the total project cost by 30% — a savings of over $2 million.",
    client: "Commercial Office Building",
    duration: "2 months",
    services: ["Value Engineering", "Cost Analysis", "Specification Review"]
  },
]

export default function EngineeringConsultingPage() {
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [selectedResult, setSelectedResult] = useState<number | null>(null)
  const [statsVisible, setStatsVisible] = useState(false)
  const [activeCard, setActiveCard] = useState(0)
  const statsRef = useRef<HTMLElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const hasTriggered = useRef(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Handle modal escape key and body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedService(null)
        setSelectedResult(null)
      }
    }
    
    if (selectedService !== null || selectedResult !== null) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleEscape)
    } else {
      document.body.style.overflow = ""
    }
    
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleEscape)
    }
  }, [selectedService, selectedResult])

  // Scroll-triggered animation for stats (desktop) / delayed trigger (mobile)
  useEffect(() => {
    if (typeof window === "undefined") return

    // On mobile, trigger animation after short delay (stats visible sooner)
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      const mobileTimer = setTimeout(() => {
        if (!hasTriggered.current) {
          setStatsVisible(true)
          hasTriggered.current = true
        }
      }, 800) // Start after 800ms on mobile
      return () => clearTimeout(mobileTimer)
    }

    // On desktop, use scroll trigger
    const checkAndTrigger = () => {
      if (hasTriggered.current) return
      
      const element = statsRef.current
      if (!element) return

      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      if (rect.top < windowHeight * 0.7 && rect.bottom > 0) {
        setStatsVisible(true)
        hasTriggered.current = true
      }
    }

    const handleUserScroll = () => {
      setTimeout(checkAndTrigger, 50)
    }

    const handleKeyScroll = (e: KeyboardEvent) => {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Space"].includes(e.key)) {
        handleUserScroll()
      }
    }

    window.addEventListener("wheel", handleUserScroll, { passive: true })
    window.addEventListener("touchmove", handleUserScroll, { passive: true })
    window.addEventListener("keydown", handleKeyScroll)

    return () => {
      window.removeEventListener("wheel", handleUserScroll)
      window.removeEventListener("touchmove", handleUserScroll)
      window.removeEventListener("keydown", handleKeyScroll)
    }
  }, [])

  return (
    <div className="w-full overflow-x-hidden bg-black">
      <Navbar />

      {/* SERVICE HEADER */}
      <section className="bg-black pt-20 sm:pt-24 pb-4 sm:pb-6">
        <div className="px-5 sm:px-8 md:px-16 lg:px-24">
          <div className="flex items-center justify-end gap-4">
            <div className="hidden sm:block w-12 md:w-20 h-[1px] bg-[#c6912c]" />
            <h1 className="font-display text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl tracking-wider text-right">
              ENGINEERING & CONSULTING
            </h1>
          </div>
        </div>
      </section>

      {/* HERO */}
      <section className="relative w-full min-h-[70svh] sm:min-h-[80svh] bg-black">
        {/* Background Image - Less dark */}
        <div className="absolute inset-0">
          <Image
            src="/luxury-modern-cabin-interior-with-large-windows-wo.jpg"
            alt="Complex engineering project"
            fill
            className="object-cover object-center opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center min-h-[70svh] sm:min-h-[80svh] px-5 sm:px-8 md:px-16 lg:px-24 py-12">
          {/* Tagline */}
          <p className="font-sans text-[#c6912c] text-[10px] sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-6">
            Protect Your Investment. Solve Complex Challenges.
          </p>

          {/* Main Headline */}
          <h2 className="font-display text-white text-[2.75rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[7rem] leading-[0.95] tracking-tight mb-6 sm:mb-8">
            CONSTRUCTION
            <br />
            <span className="text-[#c6912c]">CONSULTING</span>
            <br />
            THAT DELIVERS
          </h2>

          {/* Supporting Text - Hidden on mobile */}
          <p className="hidden sm:block font-sans text-white/80 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            Expert engineering solutions, dispute resolution, and permitting services that save you time and money.
          </p>

          {/* CTA Button */}
          <div>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#c6912c] hover:bg-[#d4a04c] text-white font-sans font-semibold text-sm sm:text-base tracking-wide px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg transition-all duration-300 group"
            >
              GET EXPERT CONSULTATION
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section id="services" ref={statsRef} className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-12 sm:py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
            {/* LEFT: ANIMATED STATS */}
            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              {STATS.map((stat, index) => (
                <div key={index} className="flex items-center gap-4 sm:gap-6">
                  <div className="font-display text-[#c6912c] leading-none text-[48px] sm:text-[72px] md:text-[90px]">
                    <AnimatedCounter
                      end={stat.end}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={2000 + index * 200}
                      startAnimation={statsVisible}
                    />
                  </div>
                  <div>
                    <p className="font-sans text-[#1a1a1a] font-bold tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-[12px] md:text-[14px] uppercase whitespace-pre-line leading-relaxed">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: HEADLINE with left border */}
            <div className="border-l-2 border-[#c6912c] pl-6 sm:pl-8 lg:pl-12">
              <h2 className="font-display tracking-tight leading-[0.95] text-[32px] sm:text-[48px] md:text-[64px]">
                <span className="text-[#6b6b6b]">WHAT CAN</span>
                <br />
                <span className="text-[#c6912c]">ANTOVA BUILDERS</span>
                <br />
                <span className="text-[#6b6b6b]">DO FOR YOU?</span>
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* CONSULTING SERVICES */}
      <section className="bg-black py-12 sm:py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
          <h2 className="font-display text-white text-center text-[28px] sm:text-[46px] md:text-[58px] tracking-tight mb-10 sm:mb-16 md:mb-24">
            CONSULTING SERVICES
          </h2>
          
          <div 
            ref={cardsContainerRef}
            onScroll={(e) => {
              const container = e.currentTarget
              const scrollLeft = container.scrollLeft
              const cardWidth = container.offsetWidth * 0.75 + 16 // 75vw + gap
              const newActive = Math.round(scrollLeft / cardWidth)
              setActiveCard(Math.min(newActive, SERVICES.length - 1))
            }}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:overflow-visible lg:gap-8"
          >
            {SERVICES.map((service, index) => (
              <div
                key={index}
                onClick={() => setSelectedService(index)}
                className="group relative flex-shrink-0 w-[75vw] sm:w-[420px] lg:w-auto snap-start bg-[#141414] rounded-xl sm:rounded-2xl p-6 sm:p-12 md:p-14 lg:p-16 transition-all duration-500 hover:shadow-[0_0_60px_-15px_rgba(198,145,44,0.3)] hover:-translate-y-1 cursor-pointer"
              >
                {/* Gold accent line */}
                <div className="absolute left-0 top-6 bottom-6 sm:top-10 sm:bottom-10 w-[3px] bg-gradient-to-b from-[#c6912c] via-[#c6912c]/50 to-transparent rounded-full" />
                
                {/* Expand icon - top right */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-[#c6912c]/50 group-hover:border-[#c6912c] group-hover:bg-[#c6912c] flex items-center justify-center transition-all duration-300">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c6912c]/70 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                
                <div className="font-display text-[#c6912c] text-[72px] sm:text-[120px] md:text-[140px] lg:text-[160px] leading-none mb-4 sm:mb-8 md:mb-10">
                  {service.num}
                </div>
                <h3 className="font-display text-white text-lg sm:text-[28px] md:text-[32px] mb-2 sm:mb-4 md:mb-5 tracking-wide">
                  {service.title}
                </h3>
                <p className="font-sans text-[#666] text-sm sm:text-lg md:text-[19px] leading-relaxed">
                  {service.shortDesc}
                </p>
              </div>
            ))}
          </div>

          {/* Pagination dots - mobile only */}
          <div className="flex lg:hidden justify-center gap-2 mt-6">
            {SERVICES.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const container = cardsContainerRef.current
                  if (container) {
                    const cardWidth = container.offsetWidth * 0.75 + 16
                    container.scrollTo({ left: cardWidth * index, behavior: 'smooth' })
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeCard === index 
                    ? 'bg-[#c6912c] w-6' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to service ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE MODAL */}
      {selectedService !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedService(null)}
        >
          <div 
            className="relative bg-white rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-full flex items-center justify-center hover:bg-[#c6912c] transition-colors z-10"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Icon area */}
            <div className="bg-[#f0f4f8] rounded-t-xl sm:rounded-t-2xl p-8 sm:p-12 flex items-center justify-center">
              <div className="font-display text-[#c6912c]/30 text-[100px] sm:text-[180px] leading-none">
                {SERVICES[selectedService].num}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-10">
              <p className="font-sans text-[#c6912c] text-xs sm:text-sm tracking-[0.2em] uppercase mb-1 sm:mb-2">
                CONSULTING SERVICE
              </p>
              <h3 className="font-display text-black text-2xl sm:text-4xl mb-4 sm:mb-6">
                {SERVICES[selectedService].title}
              </h3>
              <p className="font-sans text-[#555] text-sm sm:text-lg leading-relaxed mb-6 sm:mb-8">
                {SERVICES[selectedService].fullDesc}
              </p>
              
              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {SERVICES[selectedService].features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#c6912c] rounded-full flex-shrink-0" />
                    <span className="font-sans text-[#333] text-xs sm:text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DRIVING RESULTS */}
      <section className="bg-white py-12 sm:py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          {/* Header */}
          <div className="mb-10 sm:mb-16 md:mb-24">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="w-8 sm:w-12 h-[2px] bg-[#c6912c]" />
              <p className="font-sans text-[#888] text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase">
                Our Results Speak For Us
              </p>
            </div>
            <h2 className="font-display text-[28px] sm:text-[48px] md:text-[64px] leading-[0.95] tracking-tight">
              <span className="text-[#1a1a1a]">DRIVING RESULTS</span>
              <br />
              <span className="text-[#1a1a1a]">THROUGH </span>
              <span className="text-[#c6912c]">EXPERT</span>
              <br />
              <span className="text-[#c6912c]">CONSULTING</span>
            </h2>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#c6912c]/30">
            {RESULTS.map((result, index) => (
              <div
                key={index}
                onClick={() => setSelectedResult(index)}
                className="group bg-white p-6 sm:p-10 md:p-12 cursor-pointer hover:bg-[#fafafa] transition-colors"
              >
                <p className="font-display text-[#c6912c] text-[40px] sm:text-[56px] md:text-[64px] leading-none mb-2 sm:mb-4">
                  {result.stat}
                </p>
                <h3 className="font-display text-[#1a1a1a] text-base sm:text-2xl md:text-[26px] mb-2 sm:mb-3 tracking-wide">
                  {result.title}
                </h3>
                <p className="font-sans text-[#777] text-sm sm:text-base mb-4 sm:mb-6">
                  {result.shortDesc}
                </p>
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-[#c6912c] group-hover:bg-[#c6912c] flex items-center justify-center transition-all duration-300">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#c6912c] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULT MODAL */}
      {selectedResult !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedResult(null)}
        >
          <div 
            className="relative bg-white rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedResult(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-full flex items-center justify-center hover:bg-[#c6912c] transition-colors z-10"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Stat header area */}
            <div className="bg-[#1a1a1a] rounded-t-xl sm:rounded-t-2xl p-6 sm:p-12">
              <p className="font-display text-[#c6912c] text-[56px] sm:text-[100px] leading-none mb-1 sm:mb-2">
                {RESULTS[selectedResult].stat}
              </p>
              <h3 className="font-display text-white text-lg sm:text-3xl tracking-wide">
                {RESULTS[selectedResult].title}
              </h3>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-10">
              <p className="font-sans text-[#c6912c] text-xs sm:text-sm tracking-[0.2em] uppercase mb-1 sm:mb-2">
                Case Study
              </p>
              <p className="font-sans text-[#555] text-sm sm:text-lg leading-relaxed mb-6 sm:mb-8">
                {RESULTS[selectedResult].fullDesc}
              </p>
              
              {/* Project Details */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div>
                  <p className="font-sans text-[#999] text-[10px] sm:text-xs tracking-[0.15em] uppercase mb-1">Client</p>
                  <p className="font-sans text-[#333] text-sm sm:text-base font-medium">{RESULTS[selectedResult].client}</p>
                </div>
                <div>
                  <p className="font-sans text-[#999] text-[10px] sm:text-xs tracking-[0.15em] uppercase mb-1">Duration</p>
                  <p className="font-sans text-[#333] text-sm sm:text-base font-medium">{RESULTS[selectedResult].duration}</p>
                </div>
              </div>
              
              {/* Services Used */}
              <div>
                <p className="font-sans text-[#999] text-[10px] sm:text-xs tracking-[0.15em] uppercase mb-2 sm:mb-3">Services Provided</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {RESULTS[selectedResult].services.map((service, idx) => (
                    <span key={idx} className="font-sans text-xs sm:text-sm bg-[#f5f5f5] text-[#555] px-2 sm:px-3 py-1 rounded-full">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-black">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center">
          {/* Two CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 sm:mb-12">
            <a
              href="/contact"
              className="h-11 min-w-[200px] px-6 bg-[#c6912c] hover:bg-[#a67923] text-black font-semibold rounded-md transition-all flex items-center justify-center"
            >
              Get Expert Consultation
            </a>
            <a
              href="/estimator"
              className="h-11 min-w-[200px] px-6 bg-transparent hover:bg-[#c6912c] text-white hover:text-black font-semibold rounded-md border-2 border-[#c6912c] transition-all flex items-center justify-center"
            >
              AI Estimator
            </a>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl text-white mb-4 sm:mb-6">
            Let's Solve Your <span className="text-[#c6912c]">Challenge</span>
          </h2>
          <p className="font-sans text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            From complex disputes to fast-track permitting, our team delivers results. Get in touch today.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
