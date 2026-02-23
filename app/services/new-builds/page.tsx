"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

function ScrollIndicator({ show }: { show: boolean }) {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <div 
      className={`absolute bottom-6 sm:bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 cursor-pointer transition-all duration-1000 ease-out group ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      onClick={scrollToContent}
    >
      <div className="flex flex-col items-center gap-2.5 sm:gap-3 md:gap-4">
        <div className="relative w-6 h-10 sm:w-7 sm:h-11 md:w-9 md:h-14 border-2 border-white/70 rounded-full flex justify-center group-hover:border-[#c6912c] transition-colors duration-300">
          <div className="w-1 h-2 sm:w-1 sm:h-2.5 md:w-1.5 md:h-3 bg-[#c6912c] rounded-full mt-1.5 sm:mt-2 md:mt-2.5 animate-scroll-wheel" />
          <div className="absolute inset-0 rounded-full bg-[#c6912c]/0 group-hover:bg-[#c6912c]/10 transition-all duration-300" />
        </div>
        
        <div className="flex flex-col items-center -space-y-2">
          <svg 
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-white/80 animate-chevron-1 group-hover:text-[#c6912c] transition-colors duration-300" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <svg 
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-white/50 animate-chevron-2 group-hover:text-[#c6912c]/70 transition-colors duration-300" 
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

const remoteBuildsCards = [
  {
    title: "Logistical Challenges",
    description: "We handle complex logistics, permits, and coordination so you don't have to.",
    image: "/remote-card-1.png"
  },
  {
    title: "We Can Build Anywhere",
    description: "From mountain retreats to coastal escapes, no location is too remote.",
    image: "/remote-card-2.png"
  },
  {
    title: "Enjoy Your Oasis",
    description: "Your private sanctuary awaits, crafted with precision and care.",
    image: "/remote-card-3.png"
  }
]

// FAQ data for remote builds
const faqs = [
  {
    question: "How do you build in locations with no road access?",
    answer: "We mobilize helicopters, specialized off-road vehicles, and seasoned crews who excel in extreme conditions. All materials, equipment, and personnel are transported using methods suited to your specific site — whether that's helicopter airlifts, boat access, or pioneering temporary roads."
  },
  {
    question: "Does building remotely cost significantly more?",
    answer: "Remote builds do involve additional logistics costs, but we optimize every aspect of the process to minimize premiums. Our AI estimator provides transparent pricing that accounts for your specific location. Many clients find that the value of their dream location far outweighs the incremental investment."
  },
  {
    question: "How long does a remote build typically take?",
    answer: "Timelines depend on location accessibility and project scope — most remote builds take 12–18 months from groundbreaking to completion. Weather windows, material staging, and logistical planning are factored into your detailed timeline during consultation."
  }
]

export default function RemoteBuildsPage() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setShowScrollIndicator(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full overflow-x-hidden bg-[#080a0f]">
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

      {/* Hero Section */}
      <section className="relative w-full h-screen">
        <Image
          src="/remote-builds.png"
          alt="Modern luxury remote build"
          fill
          sizes="100vw"
          className="object-cover object-top"
          priority
        />
        
        {/* Bottom gradient fade */}
        <div 
          className="absolute inset-x-0 bottom-0 h-[35%]"
          style={{
            background: 'linear-gradient(to top, #080a0f 0%, rgba(8,10,15,0.7) 40%, transparent 100%)'
          }}
        />
        
        {/* Title - bottom right */}
        <div className="absolute bottom-[20%] sm:bottom-[18%] md:bottom-[16%] lg:bottom-[15%] inset-x-4 md:inset-x-auto md:right-[5%] text-center md:text-right">
          <h1 
            className="font-display text-[32px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight"
            style={{ 
              color: '#D4F1F9',
              textShadow: '0 2px 40px rgba(0,0,0,0.4)',
            }}
          >
            REMOTE BUILDS
          </h1>
        </div>

        <ScrollIndicator show={showScrollIndicator} />
      </section>

      <div className="bg-[#080a0f] h-4 sm:h-6 md:h-12" />
      <div className="w-full h-[2px] bg-[#D4A574]/40" />

      {/* ===== Trust Signals Strip ===== */}
      <section className="bg-[#080a0f] py-6 sm:py-8 md:py-12">
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-8 text-[10px] sm:text-[11px] md:text-[13px] text-white/50 px-4 sm:px-6">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="text-[#c6912c] font-medium">150+</span>
            <span>Projects Delivered</span>
          </div>
          <div className="w-px h-2.5 sm:h-3 bg-white/20" />
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="text-[#c6912c] font-medium">5.0</span>
            <span>Google Rating</span>
          </div>
          <div className="w-px h-2.5 sm:h-3 bg-white/20" />
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="text-[#c6912c] font-medium">Any</span>
            <span>Location Possible</span>
          </div>
        </div>
      </section>

      {/* Three Cards Section */}
      <section className="relative py-10 sm:py-12 md:py-20 bg-[#080a0f]">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {remoteBuildsCards.map((card, index) => (
              <div 
                key={index}
                className="group relative aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-8">
                  <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-white mb-1.5 sm:mb-2 tracking-wide uppercase">
                    {card.title}
                  </h3>
                  <p className="font-sans text-[13px] sm:text-sm md:text-base text-white/70 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-transparent group-hover:border-[#c6912c]/50 transition-colors duration-300" />
              </div>
            ))}
          </div>

          {/* ===== CTA after cards with FUD microcopy ===== */}
          <div className="mt-10 sm:mt-12 md:mt-16 text-center">
            <Link 
              href="/cost-estimator?type=remote"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-3 bg-[#c6912c] text-black text-[11px] sm:text-[12px] tracking-[0.15em] uppercase font-semibold hover:bg-[#b8830f] transition-colors duration-300"
            >
              See Your Investment Range
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="mt-2.5 sm:mt-3 text-[10px] sm:text-[11px] md:text-[12px] text-white/40">
              60-second results · No email required · No obligation
            </p>
          </div>
        </div>
      </section>

      {/* Full Width Forest Section */}
      <section className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="/forest.png"
          alt="Remote forest building location"
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover object-center"
        />
        
        <div 
          className="absolute inset-x-0 top-0 h-[25%]"
          style={{
            background: 'linear-gradient(to bottom, #080a0f 0%, rgba(8,10,15,0.7) 40%, transparent 100%)'
          }}
        />
        
        <div 
          className="absolute inset-x-0 bottom-0 h-[20%]"
          style={{
            background: 'linear-gradient(to top, #080a0f 0%, rgba(8,10,15,0.6) 40%, transparent 100%)'
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        
        <div className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
            
            <div className="space-y-6 sm:space-y-8">
              <h2 className="font-display text-[26px] sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                BUILD YOUR
                <br />
                <span className="text-[#627486]">DREAM ANYWHERE</span>
              </h2>
              
              <div className="space-y-4 sm:space-y-6 max-w-lg">
                <p className="text-[14px] sm:text-base md:text-lg text-white/80 leading-relaxed">
                  Antova Builders specializes in building homes and structures in the most challenging locations — mountaintops, remote mountain valleys, islands, and sites where conventional contractors refuse to go.
                </p>
                
                <p className="text-[14px] sm:text-base md:text-lg text-white/80 leading-relaxed">
                  We mobilize helicopters, specialized off-road vehicles, and seasoned crews who excel in extreme conditions. Whether airlifting all materials to an inaccessible peak or pioneering access where no roads exist, we turn impossible sites into reality.
                </p>
                
                <p className="text-base sm:text-lg md:text-xl font-semibold text-[#c6912c] pt-1 sm:pt-2">
                  If you can dream the location, we can build it there
                </p>
              </div>
            </div>
            
            {/* Logo */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div
                  className="absolute inset-0 blur-3xl opacity-60"
                  style={{
                    background: "radial-gradient(circle, rgba(198, 145, 44, 0.3) 0%, transparent 60%)",
                    transform: "scale(2)",
                  }}
                />
                
                <Image
                  src="/antova-logo-gold.svg"
                  alt="Antova Builders"
                  width={400}
                  height={400}
                  className="relative w-64 md:w-80 lg:w-96"
                  style={{
                    filter: "drop-shadow(0 0 60px rgba(198, 145, 44, 0.25))",
                  }}
                />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* ===== Testimonial Section ===== */}
      <section className="bg-[#080a0f] py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="bg-[#0f1218] border border-white/10 rounded-lg p-5 sm:p-8 md:p-10 lg:p-12">
            {/* Quote icon */}
            <div className="text-[#c6912c] mb-4 sm:mb-6">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            
            {/* Quote */}
            <blockquote className="text-[15px] sm:text-[17px] md:text-[20px] lg:text-[22px] text-white/90 leading-relaxed mb-6 sm:mb-8">
              "Antova's consulting team transformed our vision into reality. Their AI-powered estimates were spot-on, and the structural insights saved us months of planning time. Building on our remote mountain property seemed impossible until we found them."
            </blockquote>
            
            {/* Author */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#c6912c]/20 flex items-center justify-center text-[#c6912c] font-medium text-xs sm:text-sm">
                MC
              </div>
              <div>
                <p className="font-medium text-white text-[14px] sm:text-[15px] md:text-[16px]">Michael Chen</p>
                <p className="text-white/50 text-[12px] sm:text-[13px] md:text-[14px]">Owner, Aspen Horse Ranch · Remote Custom Build</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Mid-page CTA section ===== */}
      <section className="bg-[#080a0f] py-6 sm:py-8 md:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="bg-[#0f1218] border border-white/10 rounded-lg p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-5 sm:gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
                Have a remote location in mind?
              </h3>
              <p className="text-[13px] sm:text-[14px] md:text-[15px] text-white/50 mt-1.5 sm:mt-2">
                Get a realistic investment range in 60 seconds — no commitment required.
              </p>
            </div>
            <Link 
              href="/cost-estimator?type=remote"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 bg-white text-black text-[11px] sm:text-[12px] tracking-[0.12em] uppercase font-semibold hover:bg-[#c6912c] transition-colors duration-300 whitespace-nowrap flex-shrink-0"
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
      <section className="bg-[#080a0f] py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Section header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <p className="text-[10px] sm:text-[11px] md:text-[12px] text-[#c6912c] uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-2 sm:mb-3">
              Common Questions
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
              Before You Decide
            </h2>
          </div>

          {/* FAQ accordion */}
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-[#0f1218] border border-white/10 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium text-[14px] sm:text-[15px] md:text-[16px] text-white pr-3 sm:pr-4">
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
                    <p className="text-[13px] sm:text-[14px] md:text-[15px] text-white/60 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - ENHANCED */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-[#080a0f]">
        <div className="mx-auto max-w-4xl px-4 sm:px-5 md:px-8 text-center">
          <p className="text-[11px] sm:text-[12px] md:text-[13px] lg:text-sm text-white/40 uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4 md:mb-6">
            Remote Builds
          </p>
          
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-5xl text-white mb-3 sm:mb-4 md:mb-5">
            Let's Build Your <span className="text-[#c6912c]">Dream</span> Anywhere
          </h2>
          
          {/* Capacity-based urgency */}
          <p className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-white/50 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            2026 Season — Limited remote project slots available
          </p>

          {/* Dual CTA */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-5 sm:mb-6">
            <Link
              href="/cost-estimator?type=remote"
              className="h-12 w-full sm:w-auto sm:min-w-[220px] px-6 sm:px-8 bg-[#c6912c] hover:bg-[#b8830f] text-black font-semibold rounded-md transition-all flex items-center justify-center gap-2 text-[11px] sm:text-[12px] md:text-[13px] tracking-[0.1em] uppercase"
            >
              See Your Investment Range
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="h-12 w-full sm:w-auto sm:min-w-[220px] px-6 sm:px-8 bg-transparent hover:bg-[#c6912c] text-white hover:text-black font-semibold rounded-md border-2 border-[#c6912c] transition-all flex items-center justify-center gap-2 text-[11px] sm:text-[12px] md:text-[13px] tracking-[0.1em] uppercase"
            >
              Schedule Consultation
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* FUD-reducing microcopy */}
          <p className="text-[10px] sm:text-[11px] md:text-[12px] text-white/40">
            Free consultation · No commitment · Complimentary site feasibility analysis
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
