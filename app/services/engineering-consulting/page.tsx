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

export default function EngineeringConsultingPage() {
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef<HTMLElement>(null)
  const hasTriggered = useRef(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
            {[
              {
                num: "01",
                title: "ENGINEERING SOLUTIONS",
                desc: "Technical expertise for comprehensive engineering solutions to your construction challenges."
              },
              {
                num: "02", 
                title: "SOLVING COMPLEX ISSUES",
                desc: "Strategic problem-solving for construction disputes and technical complications."
              },
              {
                num: "03",
                title: "PERMITTING",
                desc: "Streamlined permitting with 100% success rate to keep your project compliant."
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group relative flex-shrink-0 w-[85vw] sm:w-[420px] lg:w-auto snap-start bg-[#0a0a0a] rounded-2xl p-10 sm:p-12 md:p-14 lg:p-16 transition-all duration-500 hover:shadow-[0_0_60px_-15px_rgba(198,145,44,0.3)] hover:-translate-y-1"
              >
                {/* Gold accent line */}
                <div className="absolute left-0 top-10 bottom-10 w-[3px] bg-gradient-to-b from-[#c6912c] via-[#c6912c]/50 to-transparent rounded-full" />
                
                <div className="font-display text-[#c6912c] text-[100px] sm:text-[120px] md:text-[140px] lg:text-[160px] leading-none mb-8 md:mb-10">
                  {service.num}
                </div>
                <h3 className="font-display text-white text-2xl sm:text-[28px] md:text-[32px] mb-4 md:mb-5 tracking-wide">
                  {service.title}
                </h3>
                <p className="font-sans text-[#666] text-base sm:text-lg md:text-[19px] leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
