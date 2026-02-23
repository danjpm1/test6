"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

// Move static data outside component to prevent re-creation
const stats = [
  { value: '100%', unit: '', label: 'Code Compliant' },
  { value: 'Budget', unit: '', label: 'Driven' },
  { value: '100%', unit: '', label: 'Customer Satisfaction' },
]

// FAQ data for commercial projects
const faqs = [
  {
    question: "What types of commercial projects do you handle?",
    answer: "We build across all commercial categories — office spaces, retail, medical facilities, mixed-use developments, and light industrial. Over 50% of our projects are commercial, and we've delivered everything from clinic renovations to ground-up office headquarters."
  },
  {
    question: "How do you minimize disruption to ongoing business operations?",
    answer: "We plan construction in phases designed around your business needs. For occupied buildings, we coordinate work schedules, isolate construction zones, and maintain clear pathways. Many of our commercial clients continue full operations throughout the project — like the Pain Clinic renovation that never missed a patient day."
  },
  {
    question: "What's your typical timeline for commercial construction?",
    answer: "Timelines vary by scope — a tenant improvement might take 6–10 weeks, while a ground-up commercial build runs 8–14 months. We provide a detailed construction schedule during consultation and maintain over 99% on-time delivery across all commercial projects."
  }
]

export default function CommercialPage() {
  const [isPaused, setIsPaused] = useState(false)
  const [isSecondVideoPaused, setIsSecondVideoPaused] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const secondVideoRef = useRef<HTMLVideoElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    
    // Preload hero video with high priority
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'video'
    link.href = '/renovation-showcase.mp4'
    link.type = 'video/mp4'
    document.head.appendChild(link)
    
    return () => {
      document.head.removeChild(link)
    }
  }, [])

  useEffect(() => {
    const currentRef = statsRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (currentRef) observer.observe(currentRef)
    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [])

  // Lazy load second video when it comes into view
  useEffect(() => {
    const video = secondVideoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.preload = 'auto'
          video.load()
          video.play().catch(() => {})
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const toggleVideo = useCallback(() => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
      setIsPaused(!isPaused)
    }
  }, [isPaused])

  const toggleSecondVideo = useCallback(() => {
    if (secondVideoRef.current) {
      if (isSecondVideoPaused) {
        secondVideoRef.current.play()
      } else {
        secondVideoRef.current.pause()
      }
      setIsSecondVideoPaused(!isSecondVideoPaused)
    }
  }, [isSecondVideoPaused])

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
          preload="auto"
          // @ts-ignore - fetchpriority is valid HTML but not typed in React
          fetchpriority="high"
          src="/renovation-showcase.mp4"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Hero Content - Top Center */}
        <div className="absolute top-24 sm:top-32 left-1/2 -translate-x-1/2 z-10 text-center px-4 sm:px-6 w-full">
          <h1 className="text-[36px] sm:text-[40px] md:text-[clamp(48px,6vw,72px)] font-bold tracking-tight text-white mb-2 sm:mb-3">
            Commercial
          </h1>
          <p className="text-[15px] sm:text-[17px] md:text-[clamp(18px,2vw,22px)] font-medium text-white/90">
            Over 50% of our projects are commercial
          </p>
        </div>

        {/* Pause Button */}
        <button
          onClick={toggleVideo}
          aria-label={isPaused ? "Play video" : "Pause video"}
          className="absolute bottom-6 left-4 sm:bottom-8 sm:left-8 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transition-all hover:bg-white/20 hover:scale-105 z-10"
        >
          {isPaused ? (
            <svg width="14" height="14" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          ) : (
            <svg width="14" height="14" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <rect x="6" y="4" width="4" height="16"/>
              <rect x="14" y="4" width="4" height="16"/>
            </svg>
          )}
        </button>
      </section>

      {/* ===== Trust Signals Strip ===== */}
      <section className="bg-white pt-8 sm:pt-10 md:pt-16 pb-3 sm:pb-4 md:pb-6">
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-8 text-[10px] sm:text-[11px] md:text-[13px] text-gray-500 px-4 sm:px-6">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="text-[#c6912c] font-medium">50+</span>
            <span>Commercial Projects</span>
          </div>
          <div className="w-px h-2.5 sm:h-3 bg-gray-300" />
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="text-[#c6912c] font-medium">5.0</span>
            <span>Google Rating</span>
          </div>
          <div className="w-px h-2.5 sm:h-3 bg-gray-300" />
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="text-[#c6912c] font-medium">99%</span>
            <span>On-Time Delivery</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        className="flex items-center justify-center pt-6 sm:pt-8 md:pt-[60px] pb-8 sm:pb-10 md:pb-[60px] px-4 sm:px-6 md:px-12 bg-white"
      >
        <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-12 max-w-[1000px] w-full flex-col md:flex-row">
          {stats.map((stat, index) => (
            <div key={stat.label} className="contents">
              <div 
                className={`text-center transition-all duration-700 will-change-transform ${
                  statsVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div>
                  <span className="text-[32px] sm:text-[36px] md:text-[clamp(36px,4.5vw,52px)] font-bold tracking-tight text-[#171a20]">
                    {stat.value}
                  </span>
                  {stat.unit && (
                    <span className="text-[16px] sm:text-[18px] md:text-[clamp(18px,2vw,24px)] font-semibold text-[#171a20] ml-1">
                      {stat.unit}
                    </span>
                  )}
                </div>
                <div className="text-[12px] sm:text-[13px] md:text-[clamp(13px,1.4vw,16px)] font-medium text-[#393b3d] mt-0.5 sm:mt-1">
                  {stat.label}
                </div>
              </div>
              {index < stats.length - 1 && (
                <div className="w-px h-14 bg-black/10 hidden md:block" />
              )}
              {index < stats.length - 1 && (
                <div className="w-8 sm:w-10 h-px bg-black/10 md:hidden" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 21:9 Image + Text Section - Tesla Style */}
      <section className="pt-6 sm:pt-8 md:pt-[67px] pb-12 sm:pb-16 md:pb-[150px] bg-white">
        <div className="max-w-[1915px] mx-auto px-0 md:px-6">
          <div className="relative w-full aspect-[16/10] md:aspect-[3/1.045] overflow-hidden md:rounded-lg mb-6 sm:mb-8 md:mb-11">
            <Image
              src="/commercial_wide1.png"
              alt="Commercial construction project"
              fill
              sizes="100vw"
              className="object-cover"
              priority={false}
              quality={80}
            />
          </div>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 md:px-12">
          <div className="max-w-[1200px]">
            <h2 className="text-[24px] sm:text-[28px] md:text-[clamp(32px,4.5vw,48px)] font-semibold tracking-tight text-[#171a20] mb-2 sm:mb-3 md:mb-4 leading-[1.2] md:leading-[1.15]">
              Your Success Is Our Success
            </h2>
            <p className="text-[14px] sm:text-[15px] md:text-[clamp(15px,1.5vw,17px)] font-normal leading-[1.7] sm:leading-[1.8] md:leading-[1.75] text-[#393b3d] mb-6 sm:mb-8">
              Our skilled team is driven to build the commercial project that you need in order for your business to succeed. Our principle is that your success is our success. In our building process we prioritize quality, efficiency, and transparent communication to deliver spaces that elevate your business.
            </p>

            {/* ===== CTA with FUD microcopy ===== */}
            <div className="pt-1 sm:pt-2">
              <Link 
                href="/ai-estimator"
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
      </section>

      {/* Video Section */}
      <section className="pt-10 sm:pt-12 md:pt-[106px] pb-10 sm:pb-12 md:pb-20 bg-white">
        <div className="max-w-[1915px] mx-auto px-0 md:px-6">
          <div className="relative w-full aspect-[16/10] md:aspect-[3/1.045] overflow-hidden md:rounded-lg">
            <video
              ref={secondVideoRef}
              muted
              loop
              playsInline
              preload="none"
              className="w-full h-full object-cover"
            >
              <source src="/renovation-showcase.mp4" type="video/mp4" />
            </video>
            <button
              onClick={toggleSecondVideo}
              aria-label={isSecondVideoPaused ? "Play video" : "Pause video"}
              className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transition-all hover:bg-white/20 hover:scale-105"
            >
              {isSecondVideoPaused ? (
                <svg width="12" height="12" className="sm:w-[14px] sm:h-[14px]" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              ) : (
                <svg width="12" height="12" className="sm:w-[14px] sm:h-[14px]" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <rect x="6" y="4" width="4" height="16"/>
                  <rect x="14" y="4" width="4" height="16"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Title + Description + 3 Columns */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 md:px-12 mt-8 sm:mt-10 md:mt-16">
          <h2 className="text-[22px] sm:text-[26px] md:text-[clamp(32px,4.5vw,52px)] font-semibold tracking-tight text-[#171a20] mb-2 sm:mb-3 leading-[1.2] sm:leading-[1.15] md:leading-[1.1]">
            Transforming Commercial Construction
          </h2>
          <p className="text-[14px] sm:text-[15px] md:text-[clamp(15px,1.5vw,17px)] font-normal leading-[1.7] sm:leading-[1.8] md:leading-[1.75] text-[#393b3d] max-w-[1100px] mb-8 sm:mb-10 md:mb-16">
            Antova Builders is changing the way commercial spaces are built. Operating across the Inland Northwest, we provide comprehensive construction support and can deliver projects of any scale.
          </p>

          {/* 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-16">
            <div>
              <h3 className="text-[18px] sm:text-[20px] md:text-[clamp(20px,2.5vw,28px)] font-semibold text-[#171a20] mb-2 md:mb-4">
                Easy to Plan
              </h3>
              <p className="text-[14px] sm:text-[15px] md:text-[clamp(14px,1.4vw,16px)] font-normal leading-[1.7] sm:leading-[1.8] text-[#393b3d]">
                Each project begins with comprehensive planning and integrated design services, reducing coordination costs by 25%. Our flexible approach allows for faster approvals, and over 99% of projects are delivered on time. We also offer support during planning and throughout construction.
              </p>
            </div>

            <div>
              <h3 className="text-[18px] sm:text-[20px] md:text-[clamp(20px,2.5vw,28px)] font-semibold text-[#171a20] mb-2 md:mb-4">
                Safe to Build
              </h3>
              <p className="text-[14px] sm:text-[15px] md:text-[clamp(14px,1.4vw,16px)] font-normal leading-[1.7] sm:leading-[1.8] text-[#393b3d]">
                Antova Builders maintains rigorous safety standards on every job site. We are designed as a single, vertically integrated system with protocols that reduce risk. We meet over 40 safety requirements, ensuring a safe environment for workers and local communities.
              </p>
            </div>

            <div>
              <h3 className="text-[18px] sm:text-[20px] md:text-[clamp(20px,2.5vw,28px)] font-semibold text-[#171a20] mb-2 md:mb-4">
                Built for Performance
              </h3>
              <p className="text-[14px] sm:text-[15px] md:text-[clamp(14px,1.4vw,16px)] font-normal leading-[1.7] sm:leading-[1.8] text-[#393b3d]">
                Every project comes with our quality guarantee, ensuring operational excellence throughout the lifetime of your building. Each construction receives dedicated support and quality checks, with a track record of over 99% client satisfaction, even in challenging conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Testimonial Section ===== */}
      <section className="bg-[#f5f5f5] py-12 sm:py-16 md:py-20 lg:py-24">
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
              "The AI-powered estimates saved us weeks of back-and-forth. Accurate, transparent, and the build quality speaks for itself. Our new office headquarters is a masterpiece — delivered on time and exactly as promised."
            </blockquote>
            
            {/* Author */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#c6912c]/10 flex items-center justify-center text-[#c6912c] font-medium text-xs sm:text-sm">
                RB
              </div>
              <div>
                <p className="font-medium text-black text-[14px] sm:text-[15px] md:text-[16px]">Robert Blackwood</p>
                <p className="text-gray-500 text-[12px] sm:text-[13px] md:text-[14px]">CEO · Office Headquarters Build</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Mid-page CTA section ===== */}
      <section className="bg-[#f5f5f5] py-6 sm:py-8 md:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="bg-white border border-gray-100 rounded-lg p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-5 sm:gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-black">
                Ready to discuss your project?
              </h3>
              <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-500 mt-1.5 sm:mt-2">
                Get a realistic investment range in 60 seconds — no commitment required.
              </p>
            </div>
            <Link 
              href="/ai-estimator"
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
      <section className="bg-[#f5f5f5] py-10 sm:py-12 md:py-16 lg:py-20">
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

      {/* Call to Action Section - ENHANCED */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 text-center">
          <p className="text-[11px] sm:text-[12px] md:text-sm text-gray-400 uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4 md:mb-6">
            Commercial Projects
          </p>
          <h2 className="text-[24px] sm:text-[28px] md:text-[clamp(32px,4.5vw,48px)] font-semibold tracking-tight text-[#171a20] mb-3 sm:mb-4 leading-[1.2] sm:leading-[1.15]">
            Ready to Build Your Business?
          </h2>
          
          {/* Capacity-based urgency */}
          <p className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-gray-500 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            Spring 2026 — Limited commercial slots available
          </p>

          {/* Dual CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5">
            <Link 
              href="/ai-estimator"
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
              Schedule Consultation
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* FUD-reducing microcopy */}
          <p className="mt-4 sm:mt-5 md:mt-6 text-[10px] sm:text-[11px] md:text-[12px] text-gray-400">
            Free consultation · No commitment · Complimentary project scope included
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
