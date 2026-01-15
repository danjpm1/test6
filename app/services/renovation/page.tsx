"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const STEPS = [
  {
    number: "1",
    title: "Consult",
    description: "We begin with a thoughtful, in-depth consultation — listening closely to your vision, lifestyle, and priorities while carefully evaluating your existing space to uncover its full potential and craft a tailored plan that reflects what matters most to you.",
    image: "/aerial.jpg",
    alt: "Luxury home aerial view with pool",
  },
  {
    number: "2",
    title: "Transform",
    description: "Renovation is reinvention — we reshape your home with meticulous care, precision artistry, and deep respect for its original character, bringing your vision to life flawlessly.",
    image: "/luxury-modern-cabin-interior-with-large-windows-wo1.jpg",
    alt: "Home renovation in progress",
  },
  {
    number: "3",
    title: "Rediscover",
    description: "Step into your renewed space as if for the first time — refined, elevated, and perfectly aligned with the next chapter of your story.",
    image: "/modern-luxury-home-at-night-with-warm-interior-lig.jpg",
    alt: "Completed luxury renovation at night",
  },
]

const ROTATION_INTERVAL = 4000
const SWIPE_THRESHOLD = 50

export default function RenovationPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [isVideoVisible, setIsVideoVisible] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const touchStartX = useRef(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length)
    }, ROTATION_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVideoVisible(true)
            if (videoRef.current && isVideoLoaded && isPlaying) {
              videoRef.current.play()
            }
          } else {
            if (videoRef.current) {
              videoRef.current.pause()
            }
          }
        })
      },
      { threshold: 0.25 }
    )

    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current)
    }

    return () => observer.disconnect()
  }, [isVideoLoaded, isPlaying])

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true)
    if (videoRef.current && isVideoVisible && isPlaying) {
      videoRef.current.play()
    }
  }

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

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
      <Navbar />

      {/* Hero Section - Tesla Style Full Bleed */}
      <section className="relative w-full h-screen">
        <Image
          src="/renovation-home.png"
          alt="Modern luxury renovation"
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
        
        {/* Title - lower right positioning */}
        <div className="absolute bottom-[18%] right-[5%] md:right-[8%]">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight"
            style={{ textShadow: '0 4px 40px rgba(0,0,0,0.5)' }}
          >
            RENOVATION
          </h1>
        </div>
      </section>

      <div className="bg-white h-6 md:h-12" />
      <div className="w-full h-[2px] bg-[#D4A574]" />

      <section className="bg-white text-black py-12 md:py-32">
        <div className="container mx-auto px-5 md:px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-16 mb-10 md:mb-20">
            <div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-1 md:mb-4">
                Your Home.
              </h2>
              <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light italic text-gray-500">
                Reimagined and Renewed.
              </p>
            </div>

            <div className="space-y-4 md:space-y-6 text-[15px] md:text-lg text-gray-600 mt-4 lg:mt-0">
              <p className="leading-[1.7] md:leading-8">
                Antova Builder specializes in luxury renovations for every budget.
              </p>
              <p className="leading-[1.7] md:leading-8">
                We transform existing homes into spaces that perfectly match the way you want to live today, delivering exceptional design, materials, and craftsmanship at every price point. A renovation isn't just new walls and fixtures; it's a complete re-imagination of your home. We listen closely, honor everything you already love about the place, and elevate it with thoughtful details and flawless execution — whether the project is focused and efficient or grand in scope.
              </p>
              <p className="font-semibold text-black pt-1 md:pt-2">Your vision. Your budget. Our expertise.</p>
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
                    <Image src={step.image} alt={step.alt} fill className="object-cover object-center" />
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
                  <div className={`h-[2px] w-full transition-colors duration-300 ${isActive ? "bg-black" : "bg-gray-300"}`} />
                  <div className="flex items-center gap-2 mt-4">
                    <span
                      className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all duration-300 ${
                        isActive ? "bg-[#c6912c] text-white" : "bg-transparent border border-gray-400 text-gray-400"
                      }`}
                    >
                      {step.number}
                    </span>
                    <h3 className={`text-sm font-semibold transition-colors duration-300 ${isActive ? "text-black" : "text-gray-400"}`}>
                      {step.title}
                    </h3>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="text-left pr-8 mt-2">
            <p className="text-sm text-gray-600 leading-relaxed">{currentStep.description}</p>
          </div>
        </div>

        {/* Desktop carousel */}
        <div className="hidden md:flex w-full justify-center px-6">
          <div className="w-full max-w-[1400px]">
            <div className="relative w-full aspect-[21/9]">
              <Image
                src={currentStep.image}
                alt={currentStep.alt}
                fill
                className="object-cover object-center transition-opacity duration-300"
                key={activeStep}
              />
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

      {/* Tesla-style Feature Section */}
      <section className="bg-gray-50 py-16 md:py-24 lg:py-32">
        <div className="mx-auto px-[5%] md:px-[7.5%]">
          <div 
            ref={videoContainerRef}
            className="relative w-full aspect-[2.4/1] md:aspect-[2.8/1] overflow-hidden bg-gray-200"
            style={{
              clipPath: `polygon(
                0 0,
                calc(100% - 20px) 0,
                100% 20px,
                100% 100%,
                20px 100%,
                0 calc(100% - 20px)
              )`
            }}
          >
            <video
              ref={videoRef}
              src="/renovation-showcase.mp4"
              autoPlay
              muted
              loop
              playsInline
              poster="/renovation-poster.jpg"
              onLoadedData={handleVideoLoaded}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Play/Pause button */}
            <button 
              onClick={toggleVideo}
              className="absolute bottom-4 left-4 w-8 h-8 bg-black/60 rounded flex items-center justify-center hover:bg-black/80 transition-colors"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="white" 
                  className="w-4 h-4"
                >
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="white" 
                  className="w-4 h-4"
                >
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              )}
            </button>
          </div>

          <div className="mt-8 md:mt-12 px-2 md:px-4">
            <h2 className="text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-medium text-black tracking-tight leading-tight">
              Redefining Renovations forever
            </h2>
            <p className="mt-2 md:mt-3 text-sm md:text-[15px] text-gray-500">
              Our renovations are timeless & last a lifetime.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
