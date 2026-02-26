"use client"
import { useState, useEffect, useCallback } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
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
  const [isMobile, setIsMobile] = useState(false)

  // Filter projects based on active filter
  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") return true
    
    const projectType = projectTypes[project.slug]?.label
    
    switch (activeFilter) {
      case "New Builds":
        return projectType === "New Build"
      case "Remodels":
        return projectType === "Remodel" || projectType === "Renovation"
      case "Cabins":
        return projectType === "Cabin"
      default:
        return true
    }
  })
  
  const visibleProjects = filteredProjects.slice(0, visibleCount)
  const hasMore = visibleCount < filteredProjects.length
  
  // Get first 3 projects for hero preview
  const previewProjects = projects.slice(0, 3)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.innerWidth >= 768) {
            setScrollY(window.scrollY)
          }
          setShowStickyCta(window.scrollY > 600)
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    setHeroLoaded(true)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + 4, filteredProjects.length))
  }, [filteredProjects.length])

  const handleFilterChange = useCallback((filter: FilterType) => {
    setActiveFilter(filter)
    setVisibleCount(6) // Reset to initial count when filter changes
  }, [])

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      
      <main>
        
        {/* ═══════════════════════════════════════════════════════════════
            HERO - With clear page identification
        ═══════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[100svh] md:min-h-[90vh] w-full overflow-hidden bg-[#030303]">
          
          {/* Background Image - Multiple fallback sources */}
          <div 
            className="absolute inset-0 will-change-transform"
            style={!isMobile ? { transform: `translateY(${scrollY * 0.2}px)` } : undefined}
          >
            {/* Try multiple image paths for reliability */}
            <img
              src={projects[0]?.cover || "/modern-luxury-home-at-night-with-warm-interior-lig.jpg"}
              alt="Antova Builders - Premium Custom Home"
              className={`w-full h-full object-cover transition-opacity duration-700 ${
                heroLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setHeroLoaded(true)}
              onError={(e) => {
                // Fallback if image fails
                const target = e.target as HTMLImageElement
                target.src = "/hero-winter-mountain-home.png"
              }}
            />
          </div>
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/60 to-[#030303]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/80 via-[#030303]/40 to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 h-full flex flex-col justify-end px-5 md:px-16 lg:px-24 pb-10 md:pb-20 pt-24 md:pt-32 max-w-[1800px] mx-auto">
            
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-16">
              
              {/* Left Side - Text Content */}
              <div className={`flex-1 transition-all duration-700 ${
                heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}>
                
                {/* PAGE IDENTIFIER - Clear label */}
                <div className="mb-4 md:mb-6">
                  <span className="text-[#c6912c] text-xs md:text-sm font-semibold uppercase tracking-[0.2em]">
                    Our Projects
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-semibold text-white leading-[1.1] tracking-[-0.02em] mb-4 md:mb-6 max-w-2xl">
                  Where Vision
                  <br />
                  <span className="text-[#c6912c]">Becomes Legacy</span>
                </h1>

                {/* Subheadline */}
                <p className="text-white/60 text-base md:text-lg lg:text-xl max-w-lg mb-6 md:mb-8 font-light leading-relaxed">
                  47 exceptional residences across the Inland Northwest. 
                  Each one built without compromise.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12">
                  <Link href="/cost-estimator" className="w-full sm:w-auto">
                    <button className="group w-full sm:w-auto h-12 md:h-14 px-8 md:px-10 bg-[#c6912c] hover:bg-[#d4a43d] active:bg-[#b8822a] text-black font-semibold rounded-lg md:rounded-md transition-all duration-300 text-sm md:text-base flex items-center justify-center gap-2.5">
                      Get Your Estimate
                      <svg 
                        className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </Link>
                  <Link href="/contact" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto h-12 md:h-14 px-8 md:px-10 bg-white/10 border border-white/20 hover:border-white/40 hover:bg-white/15 active:bg-white/20 text-white font-medium rounded-lg md:rounded-md transition-all duration-300 text-sm md:text-base">
                      Book Consultation
                    </button>
                  </Link>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 sm:gap-8 md:gap-12">
                  <div>
                    <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight">
                      47<span className="text-[#c6912c]">+</span>
                    </p>
                    <p className="text-white/40 text-xs sm:text-sm mt-0.5">Projects</p>
                  </div>
                  <div className="w-px h-8 sm:h-10 bg-white/15" />
                  <div>
                    <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight">
                      100<span className="text-[#c6912c]">%</span>
                    </p>
                    <p className="text-white/40 text-xs sm:text-sm mt-0.5">On-Time</p>
                  </div>
                  <div className="w-px h-8 sm:h-10 bg-white/15" />
                  <div>
                    <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight">
                      15<span className="text-[#c6912c]">+</span>
                    </p>
                    <p className="text-white/40 text-xs sm:text-sm mt-0.5">Years</p>
                  </div>
                </div>
              </div>

              {/* Right Side - Project Preview Thumbnails */}
              <div className={`hidden lg:block transition-all duration-700 delay-200 ${
                heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}>
                <p className="text-white/40 text-sm mb-4 font-medium">Featured Work</p>
                <div className="flex gap-3">
                  {previewProjects.map((project, index) => (
                    <Link 
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      className="group relative block"
                    >
                      <div className="w-32 xl:w-40 aspect-[4/3] rounded-lg overflow-hidden border-2 border-white/10 hover:border-[#c6912c]/50 transition-all duration-300">
                        <img
                          src={project.cover || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                      </div>
                      <p className="text-white/60 text-xs mt-2 group-hover:text-white transition-colors truncate max-w-32 xl:max-w-40">
                        {project.title}
                      </p>
                    </Link>
                  ))}
                </div>
                <Link 
                  href="#projects-grid" 
                  className="inline-flex items-center gap-2 text-[#c6912c] text-sm mt-4 hover:text-[#d4a43d] transition-colors"
                >
                  View all projects
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll Indicator - Desktop only */}
          <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:block transition-opacity duration-700 ${
            heroLoaded ? "opacity-100" : "opacity-0"
          }`}>
            <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/30 to-white/30 animate-pulse" />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            FILTER BAR
        ═══════════════════════════════════════════════════════════════ */}
        <section id="projects-grid" className="bg-white/95 backdrop-blur-sm border-b border-black/5 sticky top-16 md:top-20 z-40">
          <div className="max-w-[1800px] mx-auto px-5 md:px-16 lg:px-24 py-3 md:py-4 flex items-center justify-between gap-4">
            <h2 className="text-black/80 font-medium text-sm md:text-lg shrink-0">
              {activeFilter === "All" ? "All Projects" : activeFilter}
              <span className="text-black/30 font-normal ml-2">({filteredProjects.length})</span>
            </h2>
            
            <div className="flex gap-1 overflow-x-auto scrollbar-hide -mr-5 pr-5 md:mr-0 md:pr-0">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterChange(filter)}
                  className={`shrink-0 px-4 md:px-5 py-2.5 md:py-2 text-sm rounded-lg md:rounded-md transition-all duration-300 min-h-[44px] md:min-h-0 ${
                    activeFilter === filter
                      ? "text-[#c6912c] bg-[#c6912c]/10 font-medium"
                      : "text-black/40 hover:text-black/70 active:bg-black/5"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            PROJECTS GRID
        ═══════════════════════════════════════════════════════════════ */}
        <section className="bg-white py-8 md:py-16 px-5 md:px-16 lg:px-24">
          <div className="max-w-[1800px] mx-auto">
            
            {/* No Results State */}
            {filteredProjects.length === 0 ? (
              <div className="text-center py-16 md:py-24">
                <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-black/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-black/80 mb-2">No {activeFilter} Found</h3>
                <p className="text-black/50 mb-6">We don't have any {activeFilter.toLowerCase()} projects to show yet.</p>
                <button
                  onClick={() => handleFilterChange("All")}
                  className="text-[#c6912c] font-medium hover:text-[#b8822a] transition-colors"
                >
                  View all projects →
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
              {visibleProjects.map((project, index) => (
                <div key={project.slug}>
                  {/* Project Card */}
                  <Link 
                    href={`/projects/${project.slug}`}
                    className="group relative block"
                  >
                    <div className="relative overflow-hidden rounded-xl shadow-sm md:hover:shadow-xl transition-shadow duration-500">
                      <div className="aspect-[16/10] relative">
                        <Image
                          src={project.cover || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-105"
                          loading={index < 4 ? "eager" : "lazy"}
                        />
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 md:opacity-60 md:group-hover:opacity-80 transition-opacity duration-500" />
                      
                      {projectTypes[project.slug] && (
                        <span className={`absolute top-3 md:top-5 left-3 md:left-5 ${projectTypes[project.slug].color} text-white text-xs font-medium px-2.5 md:px-3 py-1 md:py-1.5 rounded-full shadow-lg`}>
                          {projectTypes[project.slug].label}
                        </span>
                      )}
                      
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                        <h3 className="text-lg md:text-2xl font-semibold text-white mb-0.5 md:mb-1 md:group-hover:text-[#c6912c] transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-white/60 text-sm">{project.location}</p>
                        
                        <div className="hidden md:flex mt-4 items-center gap-2 text-white/0 group-hover:text-white transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <span className="text-sm font-medium">View Project</span>
                          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Mid-Page CTA */}
            {visibleCount >= 3 && (
              <div className="my-8 md:my-14">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]">
                  <div className="absolute top-0 right-0 w-40 md:w-80 h-40 md:h-80 bg-[#c6912c]/10 rounded-full blur-2xl md:blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                  
                  <div className="relative z-10 p-6 md:p-12 lg:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
                    <div className="max-w-xl">
                      <p className="text-[#c6912c] text-xs md:text-sm font-medium uppercase tracking-widest mb-2 md:mb-3">
                        Start Your Project
                      </p>
                      <h3 className="text-xl md:text-3xl lg:text-4xl font-semibold text-white mb-3 md:mb-4 leading-tight">
                        Ready to Build Your Dream Home?
                      </h3>
                      <p className="text-white/50 text-sm md:text-lg leading-relaxed">
                        Get a detailed, personalized estimate in under 2 minutes. 
                        No commitment. No pressure. Just clarity.
                      </p>
                    </div>
                    <Link href="/cost-estimator" className="w-full md:w-auto shrink-0">
                      <button className="group w-full md:w-auto h-12 md:h-14 px-6 md:px-8 bg-[#c6912c] hover:bg-[#d4a43d] active:bg-[#b8822a] text-black font-semibold rounded-lg md:rounded-md transition-all duration-300 flex items-center justify-center gap-2.5 whitespace-nowrap shadow-lg shadow-[#c6912c]/20">
                        Get Free Estimate
                        <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center pt-8 md:pt-12">
                <button
                  onClick={handleLoadMore}
                  className="group px-8 md:px-10 py-3.5 md:py-4 text-sm uppercase tracking-[0.12em] md:tracking-[0.15em] text-black/50 border border-black/10 hover:border-[#c6912c] hover:text-[#c6912c] active:bg-[#c6912c]/5 transition-all duration-300 rounded-lg md:rounded-md flex items-center gap-3 md:gap-4 min-h-[48px]"
                >
                  Load More
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>
            )}
              </>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            TESTIMONIAL
        ═══════════════════════════════════════════════════════════════ */}
        <section className="bg-[#f8f8f8] py-12 md:py-24 px-5 md:px-16 lg:px-24">
          <div className="max-w-4xl mx-auto text-center">
            <svg className="w-8 h-8 md:w-12 md:h-12 text-[#c6912c]/40 mx-auto mb-4 md:mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-lg md:text-2xl lg:text-3xl text-black/80 font-light leading-relaxed mb-6 md:mb-8 px-2">
              "Antova didn't just build our home — they understood our vision 
              and elevated it beyond what we imagined. The attention to detail 
              is extraordinary."
            </blockquote>
            <div className="flex items-center justify-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/10 flex items-center justify-center text-black/40 font-medium text-sm md:text-base">
                MC
              </div>
              <div className="text-left">
                <p className="text-black font-medium text-sm md:text-base">Michael & Sarah Chen</p>
                <p className="text-black/40 text-xs md:text-sm">Cedar Ridge Residence</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            FINAL CTA
        ═══════════════════════════════════════════════════════════════ */}
        <section className="relative bg-white py-16 md:py-28 px-5 md:px-16 lg:px-24 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#c6912c]/5 rounded-full blur-2xl md:blur-3xl" />
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <p className="text-[#c6912c] text-xs md:text-sm font-medium uppercase tracking-widest mb-3 md:mb-4">
              Let's Begin
            </p>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-black mb-4 md:mb-6 leading-tight">
              Your Legacy Starts With a Conversation
            </h2>
            <p className="text-black/50 text-base md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
              Every remarkable home begins with a vision. 
              Share yours with us — we'll show you what's possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link href="/cost-estimator" className="w-full sm:w-auto">
                <button className="group w-full sm:w-auto h-12 md:h-16 px-8 md:px-14 bg-[#c6912c] hover:bg-[#d4a43d] active:bg-[#b8822a] text-black font-semibold rounded-lg md:rounded-md transition-all duration-300 text-sm md:text-lg flex items-center justify-center gap-2.5 shadow-lg shadow-[#c6912c]/20">
                  Get Your Estimate
                  <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto h-12 md:h-16 px-8 md:px-14 bg-transparent border-2 border-black/10 hover:border-[#c6912c] text-black hover:text-[#c6912c] active:bg-[#c6912c]/5 font-medium rounded-lg md:rounded-md transition-all duration-300 text-sm md:text-lg">
                  Schedule a Call
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky CTA */}
      <div 
        className={`fixed bottom-4 md:bottom-6 right-4 md:right-6 z-50 transition-all duration-500 pb-safe ${
          showStickyCta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        <Link href="/cost-estimator">
          <button className="group bg-[#c6912c] hover:bg-[#d4a43d] active:bg-[#b8822a] text-black font-semibold pl-4 md:pl-5 pr-3 md:pr-4 py-3 md:py-3.5 rounded-full shadow-2xl shadow-black/20 flex items-center gap-2 md:gap-3 transition-all duration-300 md:hover:scale-105 active:scale-95">
            <span className="text-sm">Get Estimate</span>
            <span className="w-7 h-7 md:w-8 md:h-8 bg-black/15 rounded-full flex items-center justify-center">
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
