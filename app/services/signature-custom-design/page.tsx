"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const STEPS = [
  {
    number: "1",
    title: "Design",
    description: "We craft architectural visions that balance ambition with practicality — collaborating closely to shape every detail from the ground up.",
    image: "/design.png",
    alt: "Luxury home design",
    type: "image",
  },
  {
    number: "2",
    title: "Build",
    description: "Construction is creation — we bring your vision to life with precision craftsmanship, transparent timelines, and unwavering attention to quality.",
    image: "/newbuilds-video.mp4",
    alt: "New home construction",
    type: "video",
  },
  {
    number: "3",
    title: "Live It",
    description: "Move into the home you've always imagined — built for your life, your family, and your future. Not someone else's.",
    image: "/live it.png",
    alt: "Completed luxury home at night",
    type: "image",
  },
]

const ROTATION_INTERVAL = 8000
const SWIPE_THRESHOLD = 50

// FAQ data for new builds
const faqs = [
  {
    question: "How long does it take to build a new home?",
    answer: "A typical new build takes 8–14 months from groundbreaking to final walkthrough, depending on size and complexity. This includes foundation, framing, systems installation, and finishing. We provide a detailed construction timeline during your free consultation and maintain a 98% on-time delivery rate."
  },
  {
    question: "Do I need to have land already, or can you help with that?",
    answer: "Either works. If you already own land, we'll evaluate it during consultation for buildability and site considerations. If you're still searching, we can provide guidance on what to look for and connect you with trusted real estate partners in the Inland Northwest."
  },
  {
    question: "What's included in the design phase?",
    answer: "The design phase includes architectural planning, site evaluation, material selection, and detailed blueprints. You'll work directly with our design team through multiple revision rounds until every detail matches your vision. We don't break ground until you're completely satisfied with the plan."
  }
]

function ScrollIndicator({ show }: { show: boolean }) {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <div 
      className={`absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 cursor-pointer transition-all duration-1000 ease-out group ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      onClick={scrollToContent}
    >
      <div className="flex flex-col items-center gap-3 sm:gap-4">
        {/* Mouse icon with animated wheel */}
        <div className="relative w-7 h-11 sm:w-9 sm:h-14 border-2 border-white/70 rounded-full flex justify-center group-hover:border-[#c6912c] transition-colors duration-300">
          {/* Animated scroll wheel */}
          <div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-[#c6912c] rounded-full mt-2 sm:mt-2.5 animate-scroll-wheel" />
          {/* Glow effect on hover */}
          <div className="absolute inset-0 rounded-full bg-[#c6912c]/0 group-hover:bg-[#c6912c]/10 transition-all duration-300" />
        </div>
        
        {/* Animated chevrons */}
        <div className="flex flex-col items-center -space-y-2">
          <svg 
            className="w-5 h-5 sm:w-7 sm:h-7 text-white/80 animate-chevron-1 group-hover:text-[#c6912c] transition-colors duration-300" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <svg 
            className="w-5 h-5 sm:w-7 sm:h-7 text-white/50 animate-chevron-2 group-hover:text-[#c6912c]/70 transition-colors duration-300" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function NewBuildsPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const touchStartX = useRef(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setShowScrollIndicator(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length)
    }, ROTATION_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return

    const direction = deltaX > 0 ? 1 : -1
    setActiveStep((prev) => (prev + direction + STEPS.length) % STEPS.length)
  }

  const currentStep = STEPS[activeStep]

  return (
    <div className="w-full overflow-x-hidden bg-white">
      {/* Custom animations for scroll indicator */}
      <style jsx global>{`
        @keyframes scroll-wheel {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          50% {
            opacity: 0.5;
            transform: translateY(10px);
          }
          100% {
            opacity: 0;
            transform: translateY(14px);
          }
        }
        
        @keyframes chevron-fade-1 {
          0%, 100% {
            opacity: 0.8;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(6px);
          }
        }
        
        @keyframes chevron-fade-2 {
          0%, 100% {
            opacity: 0.5;
            transform: translateY(0);
          }
          50% {
            opacity: 0.9;
            transform: translateY(6px);
          }
        }
        
        .animate-scroll-wheel {
          animation: scroll-wheel 1.5s ease-in-out infinite;
        }
        
        .animate-chevron-1 {
          animation: chevron-fade-1 1.5s ease-in-out infinite;
        }
        
        .animate-chevron-2 {
          animation: chevron-fade-2 1.5s ease-in-out infinite;
          animation-delay: 0.2s;
        }
      `}</style>

      <Navbar />

      {/* Hero Section - Tesla Style Full Bleed */}
      <section className="relative w-full h-screen">
        <Image
          src="/new-builds.png"
          alt="Modern luxury new build"
          fill
          className="object-cover object-center"
          priority
        />
        
        {/* Subtle gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)'
          }}
        />
        
        {/* Title - centered on mobile, lower right on desktop */}
        <div className="absolute inset-x-0 bottom-[28%] sm:bottom-[25%] md:bottom-[22%] md:inset-x-auto md:right-[8%] text-center md:text-right px-4 sm:px-5 md:px-0">
          <h1 
            className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight"
            style={{ textShadow: '0 4px 40px rgba(0,0,0,0.5)' }}
          >
            NEW BUILDS
          </h1>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator show={showScrollIndicator} />
      </section>

      <div className="bg-white h-4 sm:h-6 md:h-12" />
      <div className="w-full h-[2px] bg-[#D4A574]" />

      <section className="bg-white text-black py-10 sm:py-12 md:py-32">
        <div className="container mx-auto px-4 sm:px-5 md:px-6 max-w-7xl">
          {/* ===== Trust signals strip ===== */}
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-8 text-[10px] sm:text-[11px] md:text-[13px] text-gray-500 mb-8 sm:mb-10 md:mb-16">
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

          <div className="grid lg:grid-cols-2 gap-5 sm:gap-6 md:gap-16 mb-8 sm:mb-10 md:mb-20">
            <div>
              <h2 className="text-[22px] sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black mb-0.5 sm:mb-1 md:mb-4">
                Your Vision.
              </h2>
              <p className="text-[22px] sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-light italic text-gray-500">
                Built From the Ground Up.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4 md:space-y-6 text-[14px] sm:text-[15px] md:text-lg text-gray-600 mt-3 sm:mt-4 lg:mt-0">
              <p className="leading-[1.65] sm:leading-[1.7] md:leading-8">
                <span className="font-semibold text-black">Antova Builder</span> excels in creating exceptional new custom homes — from sophisticated luxury builds to thoughtfully designed residences that suit a variety of lifestyles and budgets.
              </p>
              <p className="leading-[1.65] sm:leading-[1.7] md:leading-8">
                We believe every client deserves a home that feels perfectly theirs. Through genuine collaboration, expert guidance, and superior craftsmanship, we bring your ideas to life — delivering outstanding quality and attention to detail whether you're seeking the height of luxury or a refined, well-executed home that fits your world.
              </p>
              <p className="font-semibold text-black pt-0.5 sm:pt-1 md:pt-2">Your dream. Our craftsmanship. Built for you.</p>
              
              {/* ===== CTA with FUD-reducing microcopy ===== */}
              <div className="pt-3 sm:pt-4 md:pt-6">
                <Link 
                  href="/cost-estimator?type=new-build"
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
          </div>
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden w-full px-4 sm:px-5">
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative overflow-hidden"
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeStep * 100}%)` }}
            >
              {STEPS.map((step, i) => (
                <div key={i} className="w-full flex-shrink-0">
                  <div className="relative w-full aspect-[4/3] mb-5 sm:mb-6">
                    {step.type === "video" ? (
                      <video
                        src={step.image}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover object-center"
                      />
                    ) : (
                      <Image src={step.image} alt={step.alt} fill className="object-cover object-center" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4 w-full">
            {STEPS.map((step, i) => {
              const isActive = activeStep === i
              return (
                <button key={i} onClick={() => setActiveStep(i)} className="flex flex-col cursor-pointer">
                  <div className={`h-[2px] w-full transition-colors duration-300 ${isActive ? "bg-black" : "bg-gray-300"}`} />
                  <div className="flex items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                    <span
                      className={`flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${
                        isActive ? "bg-[#c6912c] text-white" : "bg-transparent border border-gray-400 text-gray-400"
                      }`}
                    >
                      {step.number}
                    </span>
                    <h3 className={`text-[12px] sm:text-sm font-semibold transition-colors duration-300 ${isActive ? "text-black" : "text-gray-400"}`}>
                      {step.title}
                    </h3>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="text-left pr-4 sm:pr-8 mt-1.5 sm:mt-2">
            <p className="text-[13px] sm:text-sm text-gray-600 leading-relaxed">{currentStep.description}</p>
          </div>
        </div>

        {/* Desktop carousel */}
        <div className="hidden md:flex w-full justify-center px-6">
          <div className="w-full max-w-[1400px]">
            <div className="relative w-full aspect-[21/9]">
              {currentStep.type === "video" ? (
                <video
                  key={activeStep}
                  src={currentStep.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300"
                />
              ) : (
                <Image
                  src={currentStep.image}
                  alt={currentStep.alt}
                  fill
                  className="object-cover object-center transition-opacity duration-300"
                  key={activeStep}
                />
              )}
            </div>

            <div className="grid grid-cols-3 gap-8 pt-12">
              {STEPS.map((step, i) => {
                const isActive = activeStep === i
                return (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className="relative text-center cursor-pointer transition-all hover:opacity-80"
                  >
                    <div className={`absolute top-0 left-0 right-0 h-[2px] transition-colors ${isActive ? "bg-[#c6912c]" : "bg-gray-300"}`} />

                    <div className="flex items-center justify-center gap-3 pt-6 pb-4">
                      <span
                        className={`flex items-center justify-center w-10 h-10 rounded-full text-lg font-bold transition-all duration-300 ${
                          isActive ? "bg-[#c6912c] text-white" : "bg-transparent border-2 border-gray-300 text-gray-400"
                        }`}
                      >
                        {step.number}
                      </span>
                      <h3 className={`text-xl font-semibold transition-colors duration-300 ${isActive ? "text-black" : "text-gray-400"}`}>
                        {step.title}
                      </h3>
                    </div>

                    <p className={`text-xs sm:text-sm leading-relaxed px-1 sm:px-0 transition-colors ${isActive ? "text-gray-700" : "text-gray-400"}`}>
                      {step.description}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Testimonial Section ===== */}
      <section className="bg-gray-50 py-12 sm:py-16 md:py-20 lg:py-24">
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
              "From foundation to final walkthrough, Antova exceeded every expectation. Their transparent process and craftsmanship made building our custom home genuinely enjoyable. We knew exactly where we stood at every stage — no surprises, no stress."
            </blockquote>
            
            {/* Author */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#c6912c]/10 flex items-center justify-center text-[#c6912c] font-medium text-xs sm:text-sm">
                JT
              </div>
              <div>
                <p className="font-medium text-black text-[14px] sm:text-[15px] md:text-[16px]">James Thornton</p>
                <p className="text-gray-500 text-[12px] sm:text-[13px] md:text-[14px]">CEO, Thornton Capital · Custom New Build</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Mid-page CTA section ===== */}
      <section className="bg-gray-50 py-6 sm:py-8 md:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="bg-white border border-gray-100 rounded-lg p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-5 sm:gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-black">
                Ready to build your dream home?
              </h3>
              <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-500 mt-1.5 sm:mt-2">
                Get a realistic investment range in 60 seconds — no commitment required.
              </p>
            </div>
            <Link 
              href="/cost-estimator?type=new-build"
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
      <section className="bg-gray-50 py-10 sm:py-12 md:py-16 lg:py-20">
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
            New Builds
          </p>
          <h2 className="text-[22px] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-black leading-tight mb-3 sm:mb-4 md:mb-5">
            Let's Build Something Extraordinary.
          </h2>
          
          {/* Capacity-based urgency */}
          <p className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-gray-500 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            Spring 2026 — 3 new build slots remaining
          </p>

          {/* Dual CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5">
            <Link 
              href="/cost-estimator?type=new-build"
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
              Book a Consultation
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
