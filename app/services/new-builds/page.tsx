"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const STEPS = [
  {
    number: "1",
    title: "Design",
    description: "We craft architectural visions that balance ambition with practicality from the ground up.",
    image: "/aerial.jpg",
    alt: "Luxury home aerial view with pool",
    type: "image",
  },
  {
    number: "2",
    title: "Build",
    description: "Construction is creation – we bring your vision to life with precision and purpose.",
    image: "/newbuilds-video.mp4",
    alt: "New home construction",
    type: "video",
  },
  {
    number: "3",
    title: "Live it",
    description: "Move into the home you've always imagined — built for your life, not someone else's.",
    image: "/modern-luxury-home-at-night-with-warm-interior-lig.jpg",
    alt: "Completed luxury home at night",
    type: "image",
  },
]

const ROTATION_INTERVAL = 8000
const SWIPE_THRESHOLD = 50

function ScrollIndicator({ show }: { show: boolean }) {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <div 
      className={`absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer transition-all duration-1000 ease-out group ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      onClick={scrollToContent}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Mouse icon with animated wheel */}
        <div className="relative w-9 h-14 border-2 border-white/70 rounded-full flex justify-center group-hover:border-[#c6912c] transition-colors duration-300">
          {/* Animated scroll wheel */}
          <div className="w-1.5 h-3 bg-[#c6912c] rounded-full mt-2.5 animate-scroll-wheel" />
          {/* Glow effect on hover */}
          <div className="absolute inset-0 rounded-full bg-[#c6912c]/0 group-hover:bg-[#c6912c]/10 transition-all duration-300" />
        </div>
        
        {/* Animated chevrons - bigger and brighter */}
        <div className="flex flex-col items-center -space-y-2">
          <svg 
            className="w-7 h-7 text-white/80 animate-chevron-1 group-hover:text-[#c6912c] transition-colors duration-300" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <svg 
            className="w-7 h-7 text-white/50 animate-chevron-2 group-hover:text-[#c6912c]/70 transition-colors duration-300" 
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
    <div className="w-full overflow-x-hidden bg-black">
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
      <section className="relative w-full aspect-[16/9] md:aspect-auto md:h-screen bg-black">
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
        <div className="absolute inset-x-0 bottom-[38%] md:bottom-[22%] md:inset-x-auto md:right-[8%] text-center md:text-right px-5 md:px-0">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight"
            style={{ textShadow: '0 4px 40px rgba(0,0,0,0.5)' }}
          >
            NEW BUILDS
          </h1>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator show={showScrollIndicator} />
      </section>

      <div className="bg-black h-6 md:h-12" />
      <div className="w-full h-[2px] bg-[#D4A574]" />

      <section className="bg-black text-white py-12 md:py-32">
        <div className="container mx-auto px-5 md:px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-16 mb-10 md:mb-20">
            <div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-1 md:mb-4">
                Your Vision.
              </h2>
              <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light italic text-gray-400">
                Built From the Ground Up.
              </p>
            </div>

            <div className="space-y-4 md:space-y-6 text-[15px] md:text-lg text-gray-300 mt-4 lg:mt-0">
              <p className="leading-[1.7] md:leading-8">
                <span className="font-semibold text-white">Antova Builder</span> excels in creating exceptional new custom homes—from sophisticated
                luxury builds to thoughtfully designed residences that suit a variety of lifestyles and budgets.
              </p>
              <p className="leading-[1.7] md:leading-8">
                We believe every client deserves a home that feels perfectly theirs. Through genuine
                collaboration, expert guidance, and superior craftsmanship, we bring your ideas to life,
                delivering outstanding quality and attention to detail whether you're seeking the height
                of luxury or a refined, well-executed home that fits your world.
              </p>
              <p className="leading-[1.7] md:leading-8">
                From the first conversation to the final key handover, we're committed to building
                something extraordinary—tailored just for you.
              </p>
              <p className="font-semibold text-white pt-1 md:pt-2">Your dream. Our craftsmanship. Built for you.</p>
            </div>
          </div>
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden w-full px-5">
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
                  <div className="relative w-full aspect-[4/3] mb-6">
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

          <div className="grid grid-cols-3 gap-3 mb-4 w-full">
            {STEPS.map((step, i) => {
              const isActive = activeStep === i
              return (
                <button key={i} onClick={() => setActiveStep(i)} className="flex flex-col cursor-pointer">
                  <div className={`h-[2px] w-full transition-colors duration-300 ${isActive ? "bg-white" : "bg-gray-600"}`} />
                  <div className="flex items-center gap-2 mt-4">
                    <span
                      className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all duration-300 ${
                        isActive ? "bg-[#c6912c] text-black" : "bg-transparent border border-gray-600 text-gray-600"
                      }`}
                    >
                      {step.number}
                    </span>
                    <h3 className={`text-sm font-semibold transition-colors duration-300 ${isActive ? "text-white" : "text-gray-600"}`}>
                      {step.title}
                    </h3>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="text-left pr-8 mt-2">
            <p className="text-sm text-gray-300 leading-relaxed">{currentStep.description}</p>
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
                    <div className={`absolute top-0 left-0 right-0 h-[2px] transition-colors ${isActive ? "bg-[#c6912c]" : "bg-gray-700"}`} />

                    <div className="flex items-center justify-center gap-3 pt-6 pb-4">
                      <span
                        className={`flex items-center justify-center w-10 h-10 rounded-full text-lg font-bold transition-all duration-300 ${
                          isActive ? "bg-[#c6912c] text-black" : "bg-transparent border-2 border-gray-600 text-gray-600"
                        }`}
                      >
                        {step.number}
                      </span>
                      <h3 className={`text-xl font-semibold transition-colors duration-300 ${isActive ? "text-white" : "text-gray-500"}`}>
                        {step.title}
                      </h3>
                    </div>

                    <p className={`text-xs sm:text-sm leading-relaxed px-1 sm:px-0 transition-colors ${isActive ? "text-white" : "text-gray-500"}`}>
                      {step.description}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-black">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center">
          {/* Two CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 sm:mb-12">
            <a
              href="/contact"
              className="h-11 min-w-[200px] px-6 bg-[#c6912c] hover:bg-[#a67923] text-black font-semibold rounded-md transition-all flex items-center justify-center"
            >
              Start Your New Build
            </a>
            <a
              href="/cost-estimator"
              className="h-11 min-w-[200px] px-6 bg-transparent hover:bg-[#c6912c] text-white hover:text-black font-semibold rounded-md border-2 border-[#c6912c] transition-all flex items-center justify-center"
            >
              AI Estimator
            </a>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl text-white mb-4 sm:mb-6">
            Let's Start Making Your <span className="text-[#c6912c]">Dream Home</span> a Reality
          </h2>
          <p className="font-sans text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            From initial design to final walkthrough, our team delivers exceptional custom homes. Get in touch today.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
