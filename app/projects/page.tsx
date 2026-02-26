"use client"
import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { projects } from "./data"

// Project type mapping - you can move this to data.ts later
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
      setShowStickyCta(window.scrollY > 600)
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
      <main className="pt-16 md:pt-24">
        
        {/* Social Proof Stats Bar */}
        <section className="bg-gradient-to-b from-[#0a0a0a] to-black py-8 md:py-12 px-4 border-b border-white/10">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-center text-2xl md:text-4xl font-bold text-white mb-2">
              Our Portfolio
            </h1>
            <p className="text-center text-white/60 text-sm md:text-base mb-8">
              Premium craftsmanship across the Inland Northwest
            </p>
            
            <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
              <div>
                <p className="text-2xl md:text-4xl font-bold text-[#c6912c]">47+</p>
                <p className="text-white/60 text-xs md:text-sm mt-1">Projects Completed</p>
              </div>
              <div>
                <p className="text-2xl md:text-4xl font-bold text-[#c6912c]">100%</p>
                <p className="text-white/60 text-xs md:text-sm mt-1">On-Time Delivery</p>
              </div>
              <div>
                <p className="text-2xl md:text-4xl font-bold text-[#c6912c]">15+</p>
                <p className="text-white/60 text-xs md:text-sm mt-1">Years Experience</p>
              </div>
            </div>
          </div>
        </section>

        {/* Urgency Banner */}
        <div className="bg-[#c6912c]/10 border-y border-[#c6912c]/30 py-3 px-4">
          <p className="text-center text-sm md:text-base text-white">
            <span className="text-[#c6912c] font-semibold">2025 Build Schedule Open</span>
            <span className="text-white/70"> — Limited premium project slots available</span>
          </p>
        </div>

        {/* Projects Grid */}
        <section className="bg-black py-8 md:py-16 px-4">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {visibleProjects.map((project, index) => (
              <>
                <a 
                  key={project.slug} 
                  href={`/projects/${project.slug}`} 
                  className="group relative"
                >
                  {/* Project Type Badge */}
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={project.cover || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full object-cover aspect-[16/10] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                    {projectTypes[project.slug] && (
                      <span className={`absolute top-3 left-3 ${projectTypes[project.slug].color} text-white text-xs font-medium px-3 py-1 rounded-full`}>
                        {projectTypes[project.slug].label}
                      </span>
                    )}
                    {/* Hover overlay with "View Project" */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#c6912c] px-4 py-2 rounded-md text-sm">
                        View Project →
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-3 md:mt-4">
                    <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-[#c6912c] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[#F5A623] text-xs md:text-sm">{project.location}</p>
                  </div>
                </a>

                {/* Mid-Page CTA - appears after 3rd project */}
                {index === 2 && (
                  <div 
                    key="mid-cta" 
                    className="md:col-span-2 bg-gradient-to-r from-[#c6912c]/20 via-[#c6912c]/10 to-[#c6912c]/20 border border-[#c6912c]/30 rounded-xl p-6 md:p-10 my-4"
                  >
                    <div className="max-w-2xl mx-auto text-center">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        Have a Project Like This in Mind?
                      </h3>
                      <p className="text-white/70 text-sm md:text-base mb-6">
                        Get a personalized estimate in under 2 minutes with our AI-powered tool — no commitment required.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href="/cost-estimator">
                          <button className="h-11 px-8 bg-[#c6912c] hover:bg-[#B87D35] text-black font-semibold rounded-md transition-all">
                            Get Your Free Estimate →
                          </button>
                        </Link>
                        <Link href="/contact">
                          <button className="h-11 px-8 bg-transparent border border-white/30 hover:border-[#c6912c] text-white hover:text-[#c6912c] font-medium rounded-md transition-all">
                            Talk to Our Team
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center py-8 md:py-12">
              <button
                onClick={handleLoadMore}
                className="px-8 py-3 text-sm uppercase tracking-[0.15em] text-white border border-[#c6912c] hover:border-[#B87D35] hover:text-[#B87D35] transition-all rounded-[4px]"
              >
                Load More
              </button>
            </div>
          )}
        </section>

        {/* Bottom CTA Section */}
        <section className="container mx-auto px-6 py-12 md:py-24 max-w-4xl">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-6 md:mb-12">
            <Link href="/cost-estimator">
              <button className="h-10 md:h-11 min-w-[180px] md:min-w-[200px] px-5 md:px-6 bg-[#c6912c] hover:bg-[#B87D35] text-black text-sm md:text-base font-semibold rounded-md">
                AI Estimator
              </button>
            </Link>
            <Link href="/contact">
              <button className="h-10 md:h-11 min-w-[180px] md:min-w-[200px] px-5 md:px-6 bg-white hover:bg-[#D4A574] text-black text-sm md:text-base font-semibold rounded-md border-2 border-[#c6912c]">
                Consult With Us
              </button>
            </Link>
          </div>
          <p className="text-white/80 text-center text-sm md:text-lg lg:text-xl leading-snug md:leading-relaxed max-w-2xl mx-auto">
            At Antova Builders, every project blends craftsmanship and technology. From modern remodels to mountain
            homes, we pursue clarity in form, durable materials, and precise execution.
          </p>
        </section>
      </main>

      {/* Sticky CTA - appears on scroll */}
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
