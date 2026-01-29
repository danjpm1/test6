"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
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
        className="flex items-center justify-center py-8 px-12 bg-white"
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
      <section className="pt-2 pb-16 px-12 bg-white max-w-[1400px] mx-auto">
        <div className="relative w-full aspect-[21/9] overflow-hidden rounded-lg mb-8">
          <Image
            src="/commercial_wide1.png"
            alt="Commercial construction project"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="max-w-[1100px]">
          <h2 className="text-[clamp(28px,4vw,44px)] font-semibold tracking-tight text-[#171a20] mb-3 leading-tight">
            Building Your Business, One Project at a Time
          </h2>
          <p className="text-[clamp(13px,1.4vw,15px)] font-normal leading-[1.8] text-[#5c5e62]">
            Our skilled team is driven to build the commercial project that you need in order for your business to succeed. Our principle is that your success is our success. In our building process we prioritize quality, efficiency, and transparent communication.{' '}
            <a href="#" className="text-[#171a20] underline">Learn more about our process</a>.
          </p>
        </div>
      </section>

      {/* 16:9 Video Section - Tesla Style */}
      <section className="py-20 px-12 bg-white max-w-[1400px] mx-auto">
        <div className="relative w-full aspect-video overflow-hidden rounded-lg">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/newbuilds-video.mp4" type="video/mp4" />
          </video>
          <button
            className="absolute bottom-6 left-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transition-all hover:bg-white/20 hover:scale-105"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="4" width="4" height="16"/>
              <rect x="14" y="4" width="4" height="16"/>
            </svg>
          </button>
        </div>

        {/* Title + Description */}
        <div className="mt-16 mb-10">
          <h2 className="text-[clamp(32px,5vw,56px)] font-medium tracking-tight text-[#171a20] mb-4">
            Build More
          </h2>
          <p className="text-[clamp(14px,1.5vw,18px)] font-normal text-[#5c5e62] max-w-4xl">
            Our commercial construction services are fully customizable and can be deployed at scale, making them suitable for a variety of project sizes, locations and applications.
          </p>
        </div>

        {/* 3 Column Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#f4f4f4] rounded-lg p-8">
            <h3 className="text-[clamp(20px,2.5vw,28px)] font-medium text-[#171a20] mb-4">
              Retail & Hospitality
            </h3>
            <p className="text-[clamp(13px,1.3vw,15px)] text-[#5c5e62] leading-relaxed">
              Creates inviting customer experiences with functional layouts, premium finishes, and designs that strengthen your brand identity and drive foot traffic.
            </p>
          </div>

          <div className="bg-[#f4f4f4] rounded-lg p-8">
            <h3 className="text-[clamp(20px,2.5vw,28px)] font-medium text-[#171a20] mb-4">
              Office & Corporate
            </h3>
            <p className="text-[clamp(13px,1.3vw,15px)] text-[#5c5e62] leading-relaxed">
              Delivers productive work environments with modern amenities, flexible spaces, and infrastructure that supports your team's growth and collaboration.
            </p>
          </div>

          <div className="bg-[#f4f4f4] rounded-lg p-8">
            <h3 className="text-[clamp(20px,2.5vw,28px)] font-medium text-[#171a20] mb-4">
              Industrial & Warehouse
            </h3>
            <p className="text-[clamp(13px,1.3vw,15px)] text-[#5c5e62] leading-relaxed">
              Builds efficient operational facilities with optimized logistics flow, durable construction, and scalable designs that maximize your operational capacity.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
