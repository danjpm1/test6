"use client"
import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { projects } from "./data"

const projectTypes: Record<string, { label: string; color: string }> = {
  "cedar-ridge-residence": { label: "New Build", color: "bg-emerald-600" },
  "modern-loft-remodel": { label: "Remodel", color: "bg-blue-600" },
  "lakeview-cabin": { label: "Cabin", color: "bg-amber-700" },
  "hillside-house": { label: "New Build", color: "bg-emerald-600" },
  "farmhouse-conversion": { label: "Renovation", color: "bg-violet-600" },
}

export default function ProjectsPage() {
  const [visibleCount, setVisibleCount] = useState(5)
  const [showStickyCta, setShowStickyCta] = useState(false)
  
  const visibleProjects = projects.slice(0, visibleCount)
  const hasMore = visibleCount < projects.length

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCta(window.scrollY > 800)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, projects.length))
  }

  return (
    <div className="w-full min-h-screen bg-[#000000]">
      <Navbar />
      
      <main className="pt-16 md:pt-20">
        
        {/* HERO - Full Bleed Featured Project */}
        <section className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
          {/* Background Image - Use your best project shot */}
          <div className="absolute inset-0">
            <img
              src="/modern-luxury-home-at-night-with-warm-interior-lig.jpg"
              alt="Cedar Ridge Residence"
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay - dark at bottom for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 h-full flex flex-col justify-end pb-12 md:pb-20 px-6 md:px-12 max-w-7xl mx-auto">
            
            {/* Urgency Tag - Subtle, Premium */}
            <div className="mb-4 md:mb-6">
              <span className="inline-flex items-center gap-2 text-[#c6912c] text-xs md:text-sm font-medium tracking-wide uppercase">
                <span className="w-2 h-2 bg-[#c6912c] rounded-full animate-pulse" />
                2025 Build Slots Available
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 max-w-3xl leading-tight">
              Crafted for Those Who <br className="hidden md:block" />
              <span className="text-[#c6912c]">Demand Excellence</span>
            </h1>

            <p className="text-white/70 text-base md:text-lg max-w-xl mb-6 md:mb-8">
              47 precision-built homes across the Inland Northwest. 
              Each one a testament to uncompromising quality.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-10 md:mb-16">
              <Link href="/cost-estimator">
                <button className="h-12 md:h-14 px-8 md:px-10 bg-[#c6912c] hover:bg-[#B87D35] text-black font-semibold rounded-md transition-all text-sm md:text-base">
                  Get Your Estimate
                </button>
              </Link>
              <Link href="/contact">
                <button className="h-12 md:h-14 px-8 md:px-10 bg-white/10 backdrop-blur-sm border border-white/30 hover:border-[#c6912c] hover:bg-white/20 text-white font-medium rounded-md transition-all text-sm md:text-base">
                  Schedule Consultation
                </button>
              </Link>
            </div>

            {/* Stats Bar - Integrated, Minimal */}
            <div className="flex gap-8 md:gap-16 border-t border-white/20 pt-6 md:pt-8">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-white">47<span className="text-[#c6912c]">+</span></p>
                <p className="text-white/50 text-xs md:text-sm">Projects</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-white">100<span className="text-[#c6912c]">%</span></p>
                <p className="text-white/50 text-xs md:text-sm">On-Time</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-white">15<span className="text-[#c6912c]">+</span></p>
                <p className="text-white/50 text-xs md:text-sm">Years</p>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/40">
            <span className="text-xs tracking-widest uppercase">Explore</span>
            <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Section Divider with Filter Tabs */}
        <section className="bg-black border-b border-white/10 sticky top-16 md:top-20 z-40">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 md:py-5 flex items-center justify-between">
            <h2 className="text-white font-semibold text-lg md:text-xl">All Projects</h2>
            {/* Future: Add filter tabs here */}
            <div className="flex gap-2 text-sm">
              <button className="px-4 py-2 text-[#c6912c] border-b-2 border-[#c6912c]">All</button>
              <button className="px-4 py-2 text-white/50 hover:text-white transition-colors">New Builds</button>
              <button className="px-4 py-2 text-white/50 hover:text-white transition-colors">Remodels</button>
              <button className="px-4 py-2 text-white/50 hover:text-white transition-colors">Cabins</button>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="bg-black py-8 md:py-12 px-4 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {visibleProjects.map((project, index) => (
              <div key={project.slug}>
                <a 
                  href={`/projects/${project.slug}`} 
                  className="group relative block"
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={project.cover || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full object-cover aspect-[16/10] transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {projectTypes[project.slug] && (
                      <span className={`absolute top-4 left-4 ${projectTypes[project.slug].color} text-white text-xs font-medium px-3 py-1.5 rounded-full`}>
                        {projectTypes[project.slug].label}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center gap-2 text-white text-sm font-medium">
                        View Project
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-[#c6912c] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/50 text-sm">{project.location}</p>
                  </div>
                </a>

                {/* Mid-Page CTA - after 3rd project */}
                {index === 2 && (
                  <div className="md:col-span-2 bg-[#0a0a0a] border border-white/10 rounded-lg p-8 md:p-12 mt-8 mb-4">
                    <div className="max-w-2xl">
                      <p className="text-[#c6912c] text-sm font-medium uppercase tracking-wide mb-2">
                        Ready to Start?
                      </p>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                        Your Vision. Our Precision.
                      </h3>
                      <p className="text-white/60 mb-6">
                        Get a detailed estimate for your project in under 2 minutes — 
                        no obligation, no sales pressure.
                      </p>
                      <Link href="/cost-estimator">
                        <button className="h-12 px-8 bg-[#c6912c] hover:bg-[#B87D35] text-black font-semibold rounded-md transition-all inline-flex items-center gap-2">
                          Get Your Free Estimate
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center py-10 md:py-14">
              <button
                onClick={handleLoadMore}
                className="px-10 py-4 text-sm uppercase tracking-[0.15em] text-white border border-white/20 hover:border-[#c6912c] hover:text-[#c6912c] transition-all rounded-md"
              >
                Load More Projects
              </button>
            </div>
          )}
        </section>

        {/* Bottom CTA Section */}
        <section className="bg-[#0a0a0a] border-t border-white/10">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Let's Build Something Remarkable
            </h2>
            <p className="text-white/60 text-base md:text-lg mb-8 max-w-2xl mx-auto">
              Every Antova project begins with a conversation. 
              Tell us your vision — we'll show you what's possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cost-estimator">
                <button className="h-12 md:h-14 px-10 bg-[#c6912c] hover:bg-[#B87D35] text-black font-semibold rounded-md transition-all">
                  AI Estimator
                </button>
              </Link>
              <Link href="/contact">
                <button className="h-12 md:h-14 px-10 bg-transparent border border-white/30 hover:border-[#c6912c] text-white hover:text-[#c6912c] font-medium rounded-md transition-all">
                  Consult With Us
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky CTA */}
      <div 
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          showStickyCta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <Link href="/cost-estimator">
          <button className="bg-[#c6912c] hover:bg-[#B87D35] text-black font-semibold px-5 py-3 rounded-full shadow-lg shadow-black/50 flex items-center gap-2 transition-all hover:scale-105">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Get Estimate
          </button>
        </Link>
      </div>

      <Footer />
    </div>
  )
}
