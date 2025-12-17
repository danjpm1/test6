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
  { end: 500, prefix: "$", suffix: "k+", label: "CLIENT SAVINGS" },
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

export default function EngineeringConsultingPage() {
  const [statsVisible, setStatsVisible] = useState(false)
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const statsRef = useRef<HTMLElement>(null)
  const hasTriggered = useRef(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Handle modal escape key and body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedService(null)
    }
    
    if (selectedService !== null) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleEscape)
    } else {
      document.body.style.overflow = ""
    }
    
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleEscape)
    }
  }, [selectedService])

  useEffect(() => {
    if (typeof window === "undefined") return

    const checkAndTrigger = () => {
      if (hasTriggered.current) return
      
      const element = statsRef.current
      if (!element) return

      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Trigger when stats section top is visible in viewport
      if (rect.top < windowHeight * 0.7 && rect.bottom > 0) {
        setStatsVisible(true)
        hasTriggered.current = true
      }
    }

    // Only listen to real user interactions (wheel, touch, keydown)
    const handleUserScroll = () => {
      // Small delay to let scroll position update
      setTimeout(checkAndTrigger, 50)
    }

    window.addEventListener("wheel", handleUserScroll, { passive: true })
    window.addEventListener("touchmove", handleUserScroll, { passive: true })
    window.addEventListener("keydown", (e) => {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Space"].includes(e.key)) {
        handleUserScroll()
      }
    })

    return () => {
      window.removeEventListener("wheel", handleUserScroll)
      window.removeEventListener("touchmove", handleUserScroll)
    }
  }, [])

  return (
    <div className="w-full overflow-x-hidden bg-black">
      <Navbar />

      {/* HERO */}
      <section className="relative w-full bg-black">
        <div className="flex items-center justify-end px-4 sm:px-8 md:pr-24 lg:pr-32 pt-24 sm:pt-28 md:pt-20 lg:pt-24 pb-8 md:pb-16 lg:pb-20">
          <h1 className="font-display text-[2.5rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[7rem] text-white tracking-tight text-right leading-tight">
            ENGINEERING & CONSULTING
          </h1>
        </div>
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[3/1]">
          <Image
            src="/luxury-modern-cabin-interior-with-large-windows-wo.jpg"
            alt="Complex engineering project"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      {/* GOLD LINE */}
      <div className="w-full h-[2px] bg-[#D4A574]" />

      {/* STATS SECTION */}
      <section ref={statsRef} className="bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* LEFT: ANIMATED STATS */}
            <div className="space-y-8 md:space-y-10">
              {STATS.map((stat, index) => (
                <div key={index} className="flex items-center gap-6 sm:gap-8">
                  <div className="font-display text-[#c6912c] leading-none text-[72px] sm:text-[90px] md:text-[110px]">
                    <AnimatedCounter
                      end={stat.end}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={2000 + index * 200}
                      startAnimation={statsVisible}
                    />
                  </div>
                  <div>
                    <p className="font-sans text-[#1a1a1a] font-bold tracking-[0.2em] text-[12px] sm:text-[14px] md:text-[15px] uppercase whitespace-pre-line leading-relaxed">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: HEADLINE with left border */}
            <div className="lg:border-l-2 lg:border-[#c6912c] lg:pl-12">
              <h2 className="font-display tracking-tight leading-[0.95] text-[48px] sm:text-[64px] md:text-[80px]">
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
      <section className="bg-black py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <h2 className="font-display text-white text-center text-[36px] sm:text-[46px] md:text-[58px] tracking-tight mb-16 md:mb-24">
            CONSULTING SERVICES
          </h2>
          
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:overflow-visible lg:gap-8">
            {SERVICES.map((service, index) => (
              <div
                key={index}
                onClick={() => setSelectedService(index)}
                className="group relative flex-shrink-0 w-[85vw] sm:w-[420px] lg:w-auto snap-start bg-[#1a1a1a] rounded-2xl p-10 sm:p-12 md:p-14 lg:p-16 transition-all duration-500 hover:shadow-[0_0_60px_-15px_rgba(198,145,44,0.3)] hover:-translate-y-1 cursor-pointer"
              >
                {/* Gold accent line */}
                <div className="absolute left-0 top-10 bottom-10 w-[3px] bg-gradient-to-b from-[#c6912c] via-[#c6912c]/50 to-transparent rounded-full" />
                
                {/* Expand icon - top right */}
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full border border-[#444] group-hover:border-[#c6912c] group-hover:bg-[#c6912c] flex items-center justify-center transition-all duration-300">
                  <svg className="w-4 h-4 text-[#666] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                
                <div className="font-display text-[#c6912c] text-[100px] sm:text-[120px] md:text-[140px] lg:text-[160px] leading-none mb-8 md:mb-10">
                  {service.num}
                </div>
                <h3 className="font-display text-white text-2xl sm:text-[28px] md:text-[32px] mb-4 md:mb-5 tracking-wide">
                  {service.title}
                </h3>
                <p className="font-sans text-[#666] text-base sm:text-lg md:text-[19px] leading-relaxed">
                  {service.shortDesc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE MODAL */}
      {selectedService !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedService(null)}
        >
          <div 
            className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-[#c6912c] transition-colors z-10"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Icon area */}
            <div className="bg-[#f0f4f8] rounded-t-2xl p-12 flex items-center justify-center">
              <div className="font-display text-[#c6912c]/30 text-[140px] sm:text-[180px] leading-none">
                {SERVICES[selectedService].num}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 sm:p-10">
              <p className="font-sans text-[#c6912c] text-sm tracking-[0.2em] uppercase mb-2">
                CONSULTING SERVICE
              </p>
              <h3 className="font-display text-black text-3xl sm:text-4xl mb-6">
                {SERVICES[selectedService].title}
              </h3>
              <p className="font-sans text-[#555] text-base sm:text-lg leading-relaxed mb-8">
                {SERVICES[selectedService].fullDesc}
              </p>
              
              {/* Features */}
              <div className="grid grid-cols-2 gap-3">
                {SERVICES[selectedService].features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#c6912c] rounded-full" />
                    <span className="font-sans text-[#333] text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DRIVING RESULTS */}
      <section className="bg-white py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* Header */}
          <div className="mb-16 md:mb-24">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[2px] bg-[#c6912c]" />
              <p className="font-sans text-[#888] text-sm tracking-[0.25em] uppercase">
                Our Results Speak For Us
              </p>
            </div>
            <h2 className="font-display text-[36px] sm:text-[48px] md:text-[64px] leading-[0.95] tracking-tight">
              <span className="text-[#1a1a1a]">DRIVING RESULTS</span>
              <br />
              <span className="text-[#1a1a1a]">THROUGH </span>
              <span className="text-[#c6912c]">EXPERT</span>
              <br />
              <span className="text-[#c6912c]">CONSULTING</span>
            </h2>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#e5e5e5]">
            {[
              {
                stat: "$500K+",
                title: "SAVED IN CONSTRUCTION DISPUTES",
                desc: "Strategic resolution that protected client investments"
              },
              {
                stat: "2 WEEKS",
                title: "PERMIT APPROVAL TIME",
                desc: "Fast-tracked permitting for luxury residential project"
              },
              {
                stat: "100%",
                title: "COMPLIANCE ACHIEVED",
                desc: "Full code compliance on complex multi-unit development"
              },
              {
                stat: "30%",
                title: "COST REDUCTION",
                desc: "Value engineering without compromising quality"
              },
            ].map((result, index) => (
              <div
                key={index}
                className="group bg-white p-8 sm:p-10 md:p-12 cursor-pointer hover:bg-[#fafafa] transition-colors"
              >
                <p className="font-display text-[#c6912c] text-[48px] sm:text-[56px] md:text-[64px] leading-none mb-4">
                  {result.stat}
                </p>
                <h3 className="font-display text-[#1a1a1a] text-xl sm:text-2xl md:text-[26px] mb-3 tracking-wide">
                  {result.title}
                </h3>
                <p className="font-sans text-[#777] text-base mb-6">
                  {result.desc}
                </p>
                <div className="w-10 h-10 rounded-lg bg-[#f0f0f0] group-hover:bg-[#c6912c] flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-[#999] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
