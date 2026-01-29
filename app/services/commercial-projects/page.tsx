"use client"

import { useState, useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function CommercialPage() {
  const [isPaused, setIsPaused] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true)
      },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
      setIsPaused(!isPaused)
    }
  }

  const stats = [
    { value: '100%', unit: '', label: 'Code Compliant' },
    { value: 'Budget', unit: '', label: 'Driven' },
    { value: '100%', unit: '', label: 'Customer Satisfaction' },
  ]

  return (
    <div className="w-full overflow-x-hidden bg-white">
      <Navbar />

      {/* Hero Section - Tesla Style */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/newbuilds-video.mp4" type="video/mp4" />
        </video>

        {/* Hero Content - Top Center */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10 text-center px-6">
          <h1 className="text-[clamp(32px,5vw,56px)] font-medium tracking-tight text-white mb-1">
            Commercial
          </h1>
          <p className="text-[clamp(12px,1.5vw,14px)] font-normal text-white/85">
            Large-Scale Construction Services
          </p>
        </div>

        {/* Pause Button */}
        <button
          onClick={toggleVideo}
          className="absolute bottom-8 left-8 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transition-all hover:bg-white/20 hover:scale-105 z-10"
        >
          {isPaused ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="4" width="4" height="16"/>
              <rect x="14" y="4" width="4" height="16"/>
            </svg>
          )}
        </button>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        className="flex items-center justify-center pt-[115px] pb-[67px] px-12 bg-white"
      >
        <div className="flex items-center justify-center gap-12 max-w-[1000px] w-full flex-col md:flex-row">
          {stats.map((stat, index) => (
            <div key={stat.label} className="contents">
              <div 
                className={`text-center transition-all duration-700 ${
                  statsVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div>
                  <span className="text-[clamp(28px,4vw,48px)] font-medium tracking-tight text-[#171a20]">
                    {stat.value}
                  </span>
                  {stat.unit && (
                    <span className="text-[clamp(16px,2vw,24px)] font-normal text-[#171a20] ml-1">
                      {stat.unit}
                    </span>
                  )}
                </div>
                <div className="text-[clamp(11px,1.2vw,14px)] font-normal text-[#5c5e62] mt-2">
                  {stat.label}
                </div>
              </div>
              {index < stats.length - 1 && (
                <div className="w-px h-16 bg-black/10 hidden md:block" />
              )}
              {index < stats.length - 1 && (
                <div className="w-12 h-px bg-black/10 md:hidden" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 21:9 Image + Text Section - Tesla Style */}
      <section className="pt-12 pb-20 bg-white">
        <div className="max-w-[2016px] mx-auto px-4 md:px-6">
          <div className="relative w-full aspect-[3/1] overflow-hidden rounded-lg mb-10">
            <img
              src="/commercial_wide1.png"
              alt="Commercial construction project"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-8 md:px-12">
          <div className="max-w-[1200px]">
          <h2 className="text-[clamp(28px,4vw,44px)] font-semibold tracking-tight text-[#171a20] mb-4 leading-[1.15]">
            Building a Sustainable, More Resilient Grid
          </h2>
          <p className="text-[clamp(13px,1.3vw,15px)] font-normal leading-[1.75] text-[#5c5e62]">
            The future of renewable energy relies on large-scale industrial energy storage. Megapack is a powerful, integrated battery system that provides clean, reliable, cost-effective energy storage to help stabilize the grid and prevent outages. Reducing our reliance on fossil fuels and strengthening our grid infrastructure will make sustainable energy more accessible and affordable for everyone on Earth.{' '}
            <a href="#" className="text-[#171a20] underline">Learn more in our Master Plan Part 3</a>.
          </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
