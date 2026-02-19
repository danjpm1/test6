"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { X } from "lucide-react"

const CATEGORIES = [
  { id: "all", label: "All Offers" },
  { id: "renovation", label: "Renovation" },
  { id: "new-build", label: "New Builds" },
  { id: "engineering", label: "Engineering" },
  { id: "financing", label: "Financing" },
]

const FEATURED_OFFER = {
  image: "/hero-winter-mountain-home.png",
  title: "Start Your Dream Project, Get 0% Financing",
  highlight: "0% APR for 12 Months",
  description: "Begin your renovation or new build with zero interest financing for the first year. Qualified buyers can lock in this exclusive rate on projects starting at $25,000. Terms and conditions apply.",
  cta: "Get Started",
  ctaLink: "/contact",
}

const OFFER_SECTIONS = [
  {
    id: "renovation",
    category: "Renovation",
    title: "Renovation",
    image: "/modern-luxury-home-at-night-with-warm-interior-lig.jpg",
    offers: [
      {
        icon: "calendar",
        title: "Ending January 31, 2025: $2,500 Credit on Premium Fixtures",
        link: "/contact",
        linkText: "Get Quote",
        details: "Available for kitchen and bathroom renovations over $20,000. Credit applied at signing. Must complete consultation by January 31, 2025.",
      },
      {
        icon: "percent",
        title: "0% APR Available for 12 Months",
        link: "/contact",
        linkText: "Get Prequalified",
        details: "Available for qualified buyers on renovation projects from $15,000 to $150,000. Subject to credit approval.",
      },
      {
        icon: "star",
        title: "Free Design Consultation",
        link: "/contact",
        linkText: "Book Now",
        details: "Complimentary 2-hour design consultation with our interior specialists. Valued at $500, now free for new clients.",
      },
    ],
  },
  {
    id: "new-build",
    category: "New Construction",
    title: "New Builds",
    image: "/modern-glass-house-reflecting-in-lake-at-sunset-wi.jpg",
    offers: [
      {
        icon: "calendar",
        title: "3.99% APR Construction Loan",
        link: "/contact",
        linkText: "Get Prequalified",
        details: "Lock in rates as low as 3.99% APR for qualified buyers through our lending partners. Available on custom homes from $350,000.",
      },
      {
        icon: "star",
        title: "Free Smart Home Package on Luxury Estates",
        link: "/contact",
        linkText: "Schedule Consultation",
        details: "Commission a luxury estate over $750,000 and receive a complimentary $15,000 smart home automation package including lighting, climate, and security.",
      },
      {
        icon: "gift",
        title: "Upgraded Appliance Package",
        link: "/contact",
        linkText: "Learn More",
        details: "Select from premium appliance brands at no additional cost when you build with Antova. Valued at up to $10,000.",
      },
    ],
  },
  {
    id: "engineering",
    category: "Engineering & Consulting",
    title: "Engineering",
    image: "/images/engineering-blueprints.png",
    offers: [
      {
        icon: "star",
        title: "Free Structural Assessment",
        link: "/services/engineering-consulting",
        linkText: "Book Now",
        details: "Get a complimentary on-site structural assessment and preliminary engineering report. Valued at $500, now free for new clients.",
      },
      {
        icon: "clock",
        title: "50% Faster Permit Expediting — Guaranteed",
        link: "/services/engineering-consulting",
        linkText: "Get Details",
        details: "Our permit expediting service gets your project approved in half the typical time. If we don't meet the timeline, your expediting fee is refunded.",
      },
      {
        icon: "percent",
        title: "Bundle & Save 15%",
        link: "/contact",
        linkText: "Get Quote",
        details: "Combine engineering consultation with permit expediting and save 15% on total service fees.",
      },
    ],
  },
  {
    id: "financing",
    category: "Financing Options",
    title: "Financing",
    image: "/luxury-custom-home-interior-design-modern-architec.jpg",
    offers: [
      {
        icon: "percent",
        title: "Home Equity Line from 5.99% APR",
        link: "/contact",
        linkText: "Check Eligibility",
        details: "Tap into your home's equity for your renovation project. Competitive rates starting at 5.99% APR through our partner lenders. Credit lines up to $500,000.",
      },
      {
        icon: "star",
        title: "No Equity Required — Unsecured Renovation Loan",
        link: "/contact",
        linkText: "Apply Now",
        details: "Finance your renovation without using your home as collateral. Fixed rates from 7.99% APR and predictable monthly payments for projects up to $100,000.",
      },
      {
        icon: "clock",
        title: "Fast Approval — Decision in 24 Hours",
        link: "/contact",
        linkText: "Get Started",
        details: "Our streamlined application process delivers financing decisions within 24 hours for qualified applicants.",
      },
    ],
  },
]

// Modal content for each section
const MODAL_CONTENT: Record<string, {
  subtitle: string
  headline: string
  description: string
  benefits: { icon: string; title: string; description: string }[]
  testimonial: { quote: string; author: string; title: string }
  stats: { value: string; label: string }[]
}> = {
  renovation: {
    subtitle: "RENOVATION SERVICES",
    headline: "Transform Your Space with Precision",
    description: "From kitchen remodels to whole-home transformations, we deliver exceptional craftsmanship that elevates your living experience.",
    benefits: [
      { icon: "design", title: "Expert Design Consultation", description: "Complimentary 2-hour session with our interior specialists" },
      { icon: "quality", title: "Premium Materials Only", description: "Hand-selected fixtures and finishes from top brands" },
      { icon: "timeline", title: "On-Time Guarantee", description: "We meet deadlines or your project management fee is waived" },
      { icon: "warranty", title: "5-Year Craftsmanship Warranty", description: "Complete peace of mind on all renovation work" },
    ],
    testimonial: {
      quote: "Antova transformed our 1990s kitchen into a stunning modern space. The attention to detail was remarkable.",
      author: "Jennifer & Mark Thompson",
      title: "Kitchen Renovation, Coeur d'Alene"
    },
    stats: [
      { value: "150+", label: "Renovations Completed" },
      { value: "98%", label: "Client Satisfaction" },
      { value: "$2,500", label: "Fixture Credit Available" },
    ]
  },
  "new-build": {
    subtitle: "NEW CONSTRUCTION",
    headline: "Build Your Dream From the Ground Up",
    description: "Custom homes designed around your lifestyle, built with uncompromising quality and cutting-edge technology.",
    benefits: [
      { icon: "design", title: "Fully Custom Design", description: "Your vision, our expertise — every detail tailored to you" },
      { icon: "smart", title: "Smart Home Integration", description: "Complimentary $15K automation package on luxury estates" },
      { icon: "energy", title: "Energy Efficient Build", description: "Modern insulation, windows, and HVAC systems standard" },
      { icon: "warranty", title: "10-Year Structural Warranty", description: "Industry-leading protection for your investment" },
    ],
    testimonial: {
      quote: "From the first meeting to move-in day, Antova exceeded every expectation. Our home is exactly what we envisioned.",
      author: "Sarah & David Mitchell",
      title: "Custom Home, Sandpoint"
    },
    stats: [
      { value: "75+", label: "Homes Built" },
      { value: "3.99%", label: "APR Available" },
      { value: "$10K", label: "Appliance Package" },
    ]
  },
  engineering: {
    subtitle: "ENGINEERING & CONSULTING",
    headline: "Expert Guidance for Complex Projects",
    description: "Structural assessments, permit expediting, and professional consulting to ensure your project succeeds.",
    benefits: [
      { icon: "assessment", title: "Free Structural Assessment", description: "Complimentary on-site evaluation worth $500" },
      { icon: "permit", title: "50% Faster Permits", description: "Guaranteed expedited approval or your fee refunded" },
      { icon: "expert", title: "Licensed Engineers", description: "PE-stamped drawings and professional certifications" },
      { icon: "savings", title: "Bundle & Save 15%", description: "Combine services for significant cost savings" },
    ],
    testimonial: {
      quote: "Their engineering team got our permits approved in half the time. The expertise saved us months of delays.",
      author: "Michael Chen",
      title: "Commercial Project, Spokane"
    },
    stats: [
      { value: "100%", label: "Permit Success Rate" },
      { value: "50%", label: "Faster Approval" },
      { value: "$620K+", label: "Client Savings" },
    ]
  },
  financing: {
    subtitle: "FINANCING OPTIONS",
    headline: "Flexible Financing for Every Budget",
    description: "Multiple financing solutions to make your dream project a reality, with competitive rates and fast approvals.",
    benefits: [
      { icon: "rate", title: "Rates from 5.99% APR", description: "Competitive home equity lines through trusted partners" },
      { icon: "nosecurity", title: "No Equity Required Option", description: "Unsecured loans up to $100K without collateral" },
      { icon: "fast", title: "24-Hour Decisions", description: "Streamlined application with rapid approval" },
      { icon: "flexible", title: "Flexible Terms", description: "Customize payments to fit your budget" },
    ],
    testimonial: {
      quote: "The financing process was seamless. We got approved in a day and started our renovation the following week.",
      author: "Robert & Lisa Anderson",
      title: "Whole-Home Renovation, Liberty Lake"
    },
    stats: [
      { value: "0%", label: "APR for 12 Months" },
      { value: "24hr", label: "Approval Time" },
      { value: "$500K", label: "Max Credit Line" },
    ]
  },
}

function BenefitIcon({ type }: { type: string }) {
  const iconClass = "w-6 h-6 text-[#c6912c]"
  
  switch (type) {
    case "design":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      )
    case "quality":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    case "timeline":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case "warranty":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    case "smart":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    case "energy":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    case "assessment":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    case "permit":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case "expert":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    case "savings":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case "rate":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    case "nosecurity":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      )
    case "fast":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    case "flexible":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    default:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
        </svg>
      )
  }
}

// Full-screen immersive modal component
function OfferModal({ 
  section, 
  isOpen, 
  onClose 
}: { 
  section: typeof OFFER_SECTIONS[0] | null
  isOpen: boolean
  onClose: () => void 
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  if (!section) return null

  const content = MODAL_CONTENT[section.id]
  if (!content) return null

  return (
    <div
      className={`fixed inset-0 z-[100] transition-all duration-500 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Dark overlay */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 md:top-8 md:right-8 z-20 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
        aria-label="Close modal"
      >
        <X size={24} className="text-white" />
      </button>

      {/* Modal Content - Scrollable */}
      <div 
        className={`relative z-10 w-full h-full overflow-y-auto transition-all duration-500 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="min-h-full flex flex-col">
          {/* Hero Image Section */}
          <div className="relative w-full h-[40vh] md:h-[50vh] flex-shrink-0">
            <img
              src={section.image}
              alt={section.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            
            {/* Title overlay on image */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
              <p className="text-[#c6912c] text-sm md:text-base tracking-[0.3em] uppercase mb-3 font-medium">
                {content.subtitle}
              </p>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight max-w-4xl">
                {content.headline}
              </h2>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 bg-black px-6 md:px-12 lg:px-16 py-12 md:py-16">
            <div className="max-w-6xl mx-auto">
              {/* Description */}
              <p className="text-lg md:text-xl text-white/70 max-w-3xl mb-12 leading-relaxed">
                {content.description}
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 md:gap-8 mb-12 pb-12 border-b border-white/10">
                {content.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#c6912c] mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-white/50 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Benefits Grid */}
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
                {content.benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="flex gap-4 p-5 md:p-6 bg-white/5 rounded-lg border border-white/10 hover:border-[#c6912c]/50 transition-colors duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-[#c6912c]/10 rounded-lg flex items-center justify-center">
                      <BenefitIcon type={benefit.icon} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <div className="bg-gradient-to-r from-[#c6912c]/10 to-transparent p-6 md:p-8 rounded-lg border-l-4 border-[#c6912c] mb-12">
                <p className="text-white/90 text-lg md:text-xl italic leading-relaxed mb-4">
                  "{content.testimonial.quote}"
                </p>
                <div>
                  <p className="text-white font-semibold">{content.testimonial.author}</p>
                  <p className="text-white/50 text-sm">{content.testimonial.title}</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" onClick={onClose}>
                  <button className="w-full sm:w-auto px-10 py-4 bg-[#c6912c] hover:bg-[#d4a03a] text-black font-semibold text-lg rounded transition-all duration-300 hover:shadow-lg hover:shadow-[#c6912c]/30">
                    Get Quote
                  </button>
                </Link>
                <Link href="/contact" onClick={onClose}>
                  <button className="w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-white/30 hover:border-white text-white font-semibold text-lg rounded transition-all duration-300 hover:bg-white/10">
                    Schedule Consultation
                  </button>
                </Link>
              </div>

              {/* Fine print */}
              <p className="text-center text-white/30 text-xs mt-8">
                All offers subject to terms and conditions. Contact us for full details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function OfferIcon({ type }: { type: string }) {
  switch (type) {
    case "calendar":
      return (
        <svg className="w-5 h-5 text-[#5c5c5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    case "percent":
      return (
        <svg className="w-5 h-5 text-[#5c5c5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    case "star":
      return (
        <svg className="w-5 h-5 text-[#5c5c5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    case "gift":
      return (
        <svg className="w-5 h-5 text-[#5c5c5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      )
    case "clock":
      return (
        <svg className="w-5 h-5 text-[#5c5c5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    default:
      return null
  }
}

export default function OffersPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedSection, setSelectedSection] = useState<typeof OFFER_SECTIONS[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredSections = activeCategory === "all" 
    ? OFFER_SECTIONS 
    : OFFER_SECTIONS.filter(section => section.id === activeCategory)

  const handleLearnMore = (section: typeof OFFER_SECTIONS[0]) => {
    setSelectedSection(section)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedSection(null), 300)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section - Tesla Style */}
        <section className="pt-16 pb-8 md:pt-24 md:pb-12 bg-white text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight mb-4">
              Current Offers
            </h1>
            <p className="text-lg md:text-xl text-black font-medium mb-2">
              Explore Limited-Time Offers on Antova Services
            </p>
            <p className="text-sm text-gray-500">
              All promotions are subject to change and may end at any time.
            </p>
          </div>
        </section>

        {/* Featured Offer - Large Image */}
        <section className="px-4 md:px-8 lg:px-12 pb-8 md:pb-12">
          <div className="max-w-[1200px] mx-auto">
            {/* Smaller Image like Tesla */}
            <div className="relative w-full aspect-[16/6] md:aspect-[21/8] rounded-lg overflow-hidden mb-8">
              <img
                src={FEATURED_OFFER.image}
                alt="Featured offer"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Offer Details Below Image */}
            <div className="max-w-3xl">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6">
                {FEATURED_OFFER.title}
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#5c5c5c] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-black">{FEATURED_OFFER.highlight}</p>
                    <p className="text-gray-600 text-sm mt-1">{FEATURED_OFFER.description}</p>
                    <Link href={FEATURED_OFFER.ctaLink} className="text-black text-sm font-medium underline underline-offset-4 hover:text-[#c6912c] transition-colors mt-2 inline-block">
                      {FEATURED_OFFER.cta}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Tabs - Sticky */}
        <section className="sticky top-16 md:top-20 z-40 bg-white border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 justify-center">
              <div className="flex gap-2 sm:gap-3 py-4">
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-5 sm:px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
                      activeCategory === category.id
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Offer Sections - Tesla Model Style */}
        {filteredSections.map((section, index) => (
          <section key={section.id} className={`py-12 md:py-20 ${index % 2 === 0 ? 'bg-[#f4f4f4]' : 'bg-white'}`}>
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Left: Content */}
                <div className="bg-white lg:bg-transparent p-6 lg:p-8 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">{section.category}</p>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-5">
                    {section.title}
                  </h2>
                  
                  {/* CTA Buttons */}
                  <div className="flex gap-3 mb-8">
                    <Link href="/contact">
                      <button className="px-6 py-2.5 bg-[#3b5998] text-white text-sm font-medium rounded hover:bg-[#2d4373] transition-colors">
                        Get Quote
                      </button>
                    </Link>
                    <button 
                      onClick={() => handleLearnMore(section)}
                      className="px-6 py-2.5 bg-white text-black text-sm font-medium rounded border border-gray-300 hover:border-gray-400 transition-colors"
                    >
                      Learn More
                    </button>
                  </div>

                  {/* Offers List - More compact */}
                  <div className="space-y-5">
                    {section.offers.map((offer, offerIndex) => (
                      <div key={offerIndex}>
                        <div className="flex items-start gap-3">
                          <OfferIcon type={offer.icon} />
                          <div>
                            <h3 className="font-semibold text-black text-sm md:text-base leading-snug">{offer.title}</h3>
                            <Link href={offer.link} className="text-sm text-gray-500 underline underline-offset-4 hover:text-black transition-colors">
                              {offer.linkText}
                            </Link>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{offer.details}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Image (taller to match content) */}
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-full object-cover object-center min-h-[400px] lg:min-h-[500px]"
                  />
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Bottom CTA */}
        <section className="py-16 md:py-24 bg-black text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Don't See What You Need?
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Contact us for custom pricing and financing options tailored to your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="px-8 py-3 bg-[#c6912c] hover:bg-[#a67923] text-black font-medium rounded transition-colors">
                  Contact Us
                </button>
              </Link>
              <Link href="/estimator">
                <button className="px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-medium rounded transition-colors">
                  AI Estimator
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Fine Print */}
        <section className="py-8 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <p className="text-xs text-gray-400 leading-relaxed">
              * All offers are subject to credit approval and may vary based on creditworthiness. Financing offers are provided through third-party lending partners. APR rates shown are for illustrative purposes and may differ based on individual qualifications. Offers valid for projects contracted by March 31, 2025. Cannot be combined with other promotions unless otherwise stated. Antova Builders reserves the right to modify or discontinue offers at any time. Contact us for complete terms and conditions.
            </p>
          </div>
        </section>
      </main>

      <Footer />

      {/* Full-screen Offer Modal */}
      <OfferModal 
        section={selectedSection}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
