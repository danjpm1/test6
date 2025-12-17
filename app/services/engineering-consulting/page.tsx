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
          <h1 className="font-display text-[1.5rem] sm:text-[2rem] md:text-[3rem] lg:text-[4.5rem] font-bold text-white tracking-tight text-right leading-tight">
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
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-12 items-center">
            {/* LEFT: ANIMATED STATS */}
            <div className="space-y-10 md:space-y-12">
              {STATS.map((stat, index) => (
                <div key={index} className="flex items-center gap-6 sm:gap-8">
                  <div className="font-display text-[#c6912c] font-extrabold leading-none text-[56px] sm:text-[70px] md:text-[82px]">
                    <AnimatedCounter
                      end={stat.end}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={2000 + index * 200}
                      startAnimation={statsVisible}
                    />
                  </div>
                  <div>
                    <p className="font-sans text-[#1a1a1a] font-bold tracking-[0.2em] text-[11px] sm:text-[13px] md:text-[14px] uppercase whitespace-pre-line leading-relaxed">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* GOLDEN LINE CONNECTOR */}
            <div className="hidden lg:flex justify-center">
              <div className="w-[2px] h-64 bg-gradient-to-b from-transparent via-[#c6912c] to-transparent" />
            </div>

            {/* RIGHT: HEADLINE */}
            <div className="lg:pl-4">
              <h2 className="font-display tracking-tight leading-[0.95] text-[44px] sm:text-[56px] md:text-[72px]">
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
      <section className="bg-black py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <h2 className="font-display text-white text-center text-[32px] sm:text-[40px] md:text-[52px] tracking-tight mb-12 md:mb-20">
            CONSULTING SERVICES
          </h2>
          
          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:overflow-visible lg:gap-6">
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
                className="group flex-shrink-0 w-[85vw] sm:w-[420px] lg:w-auto snap-start bg-gradient-to-b from-[#1a1a1a] to-[#111] rounded-2xl p-8 sm:p-10 md:p-12 lg:p-14 border-t border-[#333] hover:border-[#c6912c]/40 transition-all duration-500"
              >
                <div className="font-display text-[#c6912c] text-[90px] sm:text-[110px] md:text-[130px] lg:text-[150px] leading-none mb-6 md:mb-10">
                  {service.num}
                </div>
                <h3 className="font-display text-white text-lg sm:text-xl md:text-2xl lg:text-[26px] mb-3 md:mb-4 tracking-wide">
                  {service.title}
                </h3>
                <p className="font-sans text-[#888] text-sm sm:text-base md:text-[17px] leading-relaxed">
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
