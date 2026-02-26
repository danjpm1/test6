"use client"
import { useState, useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { projects } from "./data"

const projectTypes: Record<string, { label: string; color: string }> = {
  "cedar-ridge-residence": { label: "New Build", color: "bg-emerald-600" },
  "modern-loft-remodel": { label: "Remodel", color: "bg-sky-600" },
  "lakeview-cabin": { label: "Cabin", color: "bg-amber-600" },
  "hillside-house": { label: "New Build", color: "bg-emerald-600" },
  "farmhouse-conversion": { label: "Renovation", color: "bg-violet-600" },
}

const filters = ["All", "New Builds", "Remodels", "Cabins"] as const
type FilterType = typeof filters[number]

export default function ProjectsPage() {
  const [visibleCount, setVisibleCount] = useState(6)
  const [showStickyCta, setShowStickyCta] = useState(false)
  const [activeFilter, setActiveFilter] = useState<FilterType>("All")
  const [heroLoaded, setHeroLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  const visibleProjects = projects.slice(0, visibleCount)
  const hasMore = visibleCount < projects.length

  useEffect(() => {
    setHeroLoaded(true)
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setShowStickyCta(window.scrollY > 800)
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, projects.length))
  }

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      
      <main>
        
        {/* ═══════════════════════════════════════════════════════════════
            HERO - Dark Cinematic (matches homepage)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden bg-[#030303]">
          {/* Background Image with Parallax */}
          <div 
            className="absolute inset-0 scale-110"
            style={{ transform: `translateY(${scrollY * 0.25}px) scale(1.1)` }}
          >
            <img
              src="/modern-luxury-home-at-night-with-warm-interior-lig.jpg"
              alt="Antova Builders - Premium Custom Home"
              className={`w-full h-full object-cover transition-all duration-1000 ${
                heroLoaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
              }`}
              onLoad={() => setHeroLoaded(true)}
            />
          </div>
          
          {/* Cinematic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/70 via-transparent to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 lg:px-24 pb-16 md:pb-24 max-w-[1800px] mx-auto">
            
            <div className={`transition-all duration-1000 delay-300 ${
              heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              
              {/* Availability Badge */}
              <div className="mb-6 md:mb-8">
                <span className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c6912c] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c6912c]"></span>
                  </span>
                  <span className="text-white/90 text-sm font-medium tracking-wide">
                    Now Accepting 2025 Projects
                  </span>
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-semibold text-white leading-[1.05] tracking-[-0.02em] mb-4 md:mb-6 max-w-4xl">
                Where Vision
                <br />
                <span className="text-[#c6912c]">Becomes Legacy</span>
              </h1>

              {/* Subheadline */}
              <p className="text-white/60 text-lg md:text-xl max-w-xl mb-8 md:mb-10 font-light leading-relaxed">
                47 exceptional residences across the Inland Northwest. 
                Each one built without compromise.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12 md:mb-16">
                <Link href="/cost-estimator">
                  <button className="group h-14 px-10 bg-[#c6912c] hover:bg-[#d4a43d] text-black font-semibold rounded-md transition-all duration-300 text-base flex items-center gap-3">
                    Get Your Estimate
                    <svg 
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="h-14 px-10 bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 hover:bg-white/15 text-white font-medium rounded-md transition-all duration-300 text-base">
                    Book Consultation
                  </button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8 md:gap-14">
                <div>
                  <p className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                    47<span className="text-[#c6912c]">+</span>
                  </p>
                  <p className="text-white/40 text-sm mt-1">Homes Built</p>
                </div>
                <div className="w-px h-10 bg-white/15" />
                <div>
                  <p className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                    100<span className="text-[#c6912c]">%</span>
                  </p>
                  <p className="text-white/40 text-sm mt-1">On Schedule</p>
                </div>
                <div className="w-px h-10 bg-white/15 hidden sm:block" />
                <div className="hidden sm:block">
                  <p className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                    15<span className="text-[#c6912c]">+</span>
                  </p>
                  <p className="text-white/40 text-sm mt-1">Years</p>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-all duration-1000 delay-700 ${
            heroLoaded ? "opacity-100" : "opacity-0"
          }`}>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-white/30 animate-pulse" />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            FILTER BAR - Light Background (Sticky)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="bg-white/95 backdrop-blur-md border-b border-black/5 sticky top-16 md:top-20 z-40">
          <div className="max-w-[1800px] mx-auto px-6 md:px-16 lg:px-24 py-4 md:py-5 flex items-center justify-between">
            <h2 className="text-black/80 font-medium text-base md:text-lg">Portfolio</h2>
            <div className="flex gap-1 md:gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 md:px-5 py-2 text-sm md:text-base rounded-md transition-all duration-300 ${
                    activeFilter === filter
                      ? "text-[#c6912c] bg-[#c6912c]/10 font-medium"
                      : "text-black/40 hover:text-black/70"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            PROJECTS GRID - White Background
        ═══════════════════════════════════════════════════════════════ */}
        <section className="bg-white py-12 md:py-20 px-6 md:px-16 lg:px-24">
          <div className="max-w-[1800px] mx-auto">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {visibleProjects.map((project, index) => (
                <div key={project.slug}>
                  {/* Project Card */}
                  <Link 
                    href={`/projects/${project.slug}`}
                    className="group relative block"
                  >
                    <div className="relative overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-500">
                      {/* Image */}
                      <div className="aspect-[16/10]">
                        <img
                          src={project.cover || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                      
                      {/* Project Type Badge */}
                      {projectTypes[project.slug] && (
                        <span className={`absolute top-4 md:top-5 left-4 md:left-5 ${projectTypes[project.slug].color} text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg`}>
                          {projectTypes[project.slug].label}
                        </span>
                      )}
                      
                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                        <h3 className="text-xl md:text-2xl font-semibold text-white mb-1 group-hover:text-[#c6912c] transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-white/60 text-sm">{project.location}</p>
                        
                        {/* View Project Link */}
                        <div className="mt-4 flex items-center gap-2 text-white/0 group-hover:text-white transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <span className="text-sm font-medium">View Project</span>
                          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* ═══════════════════════════════════════════════════════
                      MID-PAGE CTA - After 3rd Project
                  ═══════════════════════════════════════════════════════ */}
                  {index === 2 && (
                    <div className="md:col-span-2 my-10 md:my-14">
                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]">
                        {/* Decorative Accent */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-[#c6912c]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                        
                        <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                          <div className="max-w-xl">
                            <p className="text-[#c6912c] text-sm font-medium uppercase tracking-widest mb-3">
                              Start Your Project
                            </p>
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4 leading-tight">
                              Ready to Build Your Dream Home?
                            </h3>
                            <p className="text-white/50 text-base md:text-lg leading-relaxed">
                              Get a detailed, personalized estimate in under 2 minutes. 
                              No commitment. No pressure. Just clarity.
                            </p>
                          </div>
                          <Link href="/cost-estimator">
                            <button className="group h-14 px-8 bg-[#c6912c] hover:bg-[#d4a43d] text-black font-semibold rounded-md transition-all duration-300 flex items-center gap-3 whitespace-nowrap shadow-lg shadow-[#c6912c]/20">
                              Get Free Estimate
                              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center pt-12 md:pt-16">
                <button
                  onClick={handleLoadMore}
                  className="group px-10 py-4 text-sm uppercase tracking-[0.15em] text-black/50 border border-black/10 hover:border-[#c6912c] hover:text-[#c6912c] transition-all duration-300 rounded-md flex items-center gap-4"
                >
                  Load More
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            TESTIMONIAL SECTION - Light Gray Background
        ═══════════════════════════════════════════════════════════════ */}
        <section className="bg-[#f8f8f8] py-16 md:py-24 px-6 md:px-16 lg:px-24">
          <div className="max-w-4xl mx-auto text-center">
            <svg className="w-10 h-10 md:w-12 md:h-12 text-[#c6912c]/40 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-xl md:text-2xl lg:text-3xl text-black/80 font-light leading-relaxed mb-8">
              "Antova didn't just build our home — they understood our vision 
              and elevated it beyond what we imagined. The attention to detail 
              is extraordinary."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center text-black/40 font-medium">
                MC
              </div>
              <div className="text-left">
                <p className="text-black font-medium">Michael & Sarah Chen</p>
                <p className="text-black/40 text-sm">Cedar Ridge Residence</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            FINAL CTA SECTION - White Background
        ═══════════════════════════════════════════════════════════════ */}
        <section className="relative bg-white py-20 md:py-28 px-6 md:px-16 lg:px-24 overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[600px] bg-[#c6912c]/5 rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <p className="text-[#c6912c] text-sm font-medium uppercase tracking-widest mb-4">
              Let's Begin
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black mb-6 leading-tight">
              Your Legacy Starts With a Conversation
            </h2>
            <p className="text-black/50 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Every remarkable home begins with a vision. 
              Share yours with us — we'll show you what's possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cost-estimator">
                <button className="group h-14 md:h-16 px-10 md:px-14 bg-[#c6912c] hover:bg-[#d4a43d] text-black font-semibold rounded-md transition-all duration-300 text-base md:text-lg flex items-center justify-center gap-3 shadow-lg shadow-[#c6912c]/20">
                  Get Your Estimate
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </Link>
              <Link href="/contact">
                <button className="h-14 md:h-16 px-10 md:px-14 bg-transparent border-2 border-black/10 hover:border-[#c6912c] text-black hover:text-[#c6912c] font-medium rounded-md transition-all duration-300 text-base md:text-lg">
                  Schedule a Call
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════════════════════════════
          STICKY CTA - Appears on Scroll
      ═══════════════════════════════════════════════════════════════ */}
      <div 
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
          showStickyCta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        <Link href="/cost-estimator">
          <button className="group bg-[#c6912c] hover:bg-[#d4a43d] text-black font-semibold pl-5 pr-4 py-3.5 rounded-full shadow-2xl shadow-black/20 flex items-center gap-3 transition-all duration-300 hover:scale-105">
            <span className="text-sm md:text-base">Get Estimate</span>
            <span className="w-8 h-8 bg-black/15 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </Link>
      </div>

      <Footer />
    </div>
  )
}
