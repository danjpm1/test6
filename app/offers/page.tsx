"use client"

import { useState, useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

const CATEGORIES = [
  { id: "all", label: "All Offers" },
  { id: "signature-custom-design", label: "Custom Design" },
  { id: "renovation", label: "Renovation" },
  { id: "new-build", label: "New Builds" },
  { id: "commercial", label: "Commercial" },
  { id: "remote", label: "Remote" },
  { id: "consulting-engineering", label: "Consulting & Engineering" },
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
    id: "signature-custom-design",
    category: "Signature Custom Design",
    title: "Custom Design",
    image: "/luxury-custom-home-interior-design-modern-architec.jpg",
    tagline: "Where Vision Meets Craftsmanship",
    description: "Create a one-of-a-kind residence that reflects your lifestyle, taste, and aspirations. Our signature custom design service combines architectural excellence with uncompromising attention to detail.",
    offers: [
      {
        icon: "star",
        title: "Complimentary Architectural Consultation — $1,500 Value",
        link: "/contact",
        linkText: "Book Consultation",
        details: "Receive a comprehensive 3-hour design consultation with our lead architect. Includes preliminary concept sketches and site analysis for custom home projects over $400,000.",
      },
      {
        icon: "gift",
        title: "Free Smart Home Integration Package",
        link: "/contact",
        linkText: "Learn More",
        details: "Commission a signature home over $600,000 and receive a complimentary $20,000 smart home package including Lutron lighting, climate control, and security integration.",
      },
      {
        icon: "percent",
        title: "$10,000 Premium Material Upgrade Credit",
        link: "/contact",
        linkText: "Get Quote",
        details: "Apply toward imported stone, custom millwork, or designer fixtures. Available on custom home contracts signed by March 31, 2025. Cannot be combined with other material promotions.",
      },
    ],
  },
  {
    id: "renovation",
    category: "Renovation",
    title: "Renovation",
    image: "/modern-luxury-home-at-night-with-warm-interior-lig.jpg",
    tagline: "Transform Your Space, Elevate Your Life",
    description: "Breathe new life into your existing home with renovations that blend modern luxury with timeless design. From kitchens to whole-home transformations, we deliver excellence.",
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
    tagline: "Build Your Dream From the Ground Up",
    description: "Start fresh with a custom-built home designed and constructed to your exact specifications. Experience the journey from blueprint to reality with Antova's expert team.",
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
    id: "commercial",
    category: "Commercial Projects",
    title: "Commercial",
    image: "/modern-commercial-building-exterior-glass-facade.jpg",
    tagline: "Spaces That Mean Business",
    description: "From office headquarters to retail spaces, we deliver commercial construction that elevates your brand and optimizes your operations. Your success is our blueprint.",
    offers: [
      {
        icon: "percent",
        title: "$5,000 Tenant Improvement Credit",
        link: "/contact",
        linkText: "Get Quote",
        details: "Receive a $5,000 credit toward tenant improvements on commercial build-outs over $75,000. Applicable to office, retail, or restaurant spaces. Valid for contracts signed by March 31, 2025.",
      },
      {
        icon: "clock",
        title: "Fast-Track Permitting — 30% Faster Guaranteed",
        link: "/contact",
        linkText: "Learn More",
        details: "Our commercial permit expediting service accelerates approvals by 30% or more. If we miss the timeline, your expediting fee is fully refunded. Includes ADA compliance review.",
      },
      {
        icon: "star",
        title: "Free Space Planning & Layout Consultation",
        link: "/contact",
        linkText: "Book Now",
        details: "Complimentary space planning session with our commercial design team. Includes workflow optimization, code compliance review, and preliminary layout — a $750 value.",
      },
    ],
  },
  {
    id: "remote",
    category: "Remote & Off-Grid",
    title: "Remote",
    image: "/luxury-modern-cabin-interior-with-large-windows-wo1.jpg",
    tagline: "Build Your Dream Anywhere",
    description: "No location is too remote for Antova. We specialize in building exceptional homes in challenging locations — mountaintops, valleys, islands, and everywhere in between.",
    offers: [
      {
        icon: "star",
        title: "Free Site Assessment & Access Consultation",
        link: "/contact",
        linkText: "Schedule Visit",
        details: "Complimentary on-site evaluation including terrain analysis, access logistics planning, and utility feasibility study. A $1,200 value for remote build projects over $150,000.",
      },
      {
        icon: "gift",
        title: "$8,000 Solar & Battery Package Credit",
        link: "/contact",
        linkText: "Get Quote",
        details: "Apply toward solar panel installation, battery storage, or hybrid power systems on off-grid homes. Available on projects contracted by March 31, 2025.",
      },
      {
        icon: "percent",
        title: "Well & Septic System — 10% Off",
        link: "/contact",
        linkText: "Learn More",
        details: "Save 10% on complete well drilling and septic system installation when bundled with your remote build contract. Includes permitting and county inspections.",
      },
    ],
  },
  {
    id: "consulting-engineering",
    category: "Consulting & Engineering",
    title: "Consulting",
    image: "/images/engineering-blueprints.png",
    tagline: "Expert Solutions, Proven Results",
    description: "Navigate complex construction challenges with confidence. Our engineering and consulting services protect your investment through expert dispute resolution, permitting, and technical guidance.",
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
    tagline: "Make Your Vision Affordable",
    description: "Don't let budget constraints hold back your dream project. Our flexible financing options through trusted lending partners make luxury construction accessible.",
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

interface OfferSection {
  id: string
  category: string
  title: string
  image: string
  tagline: string
  description: string
  offers: {
    icon: string
    title: string
    link: string
    linkText: string
    details: string
  }[]
}

function OfferIcon({ type, className = "w-5 h-5" }: { type: string; className?: string }) {
  switch (type) {
    case "calendar":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    case "percent":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    case "star":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    case "gift":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      )
    case "clock":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    default:
      return null
  }
}

// Premium Offer Modal Component - Compact & Mobile Optimized
const ServiceOfferModal = ({
  section,
  isOpen,
  onClose,
}: {
  section: OfferSection | null
  isOpen: boolean
  onClose: () => void
}) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      if (modalRef.current) {
        modalRef.current.scrollTop = 0
      }
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

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-start md:items-center justify-center overflow-y-auto py-4 px-3 md:p-4 transition-all duration-500 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-3 right-3 md:top-5 md:right-5 z-20 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#c6912c] group"
        aria-label="Close modal"
      >
        <svg
          className="w-4 h-4 text-black group-hover:text-white transition-colors"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Modal Content */}
      <div
        ref={modalRef}
        className={`relative z-10 w-full max-w-xl bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ${
          isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Premium Header - Compact & Elegant */}
        <div className="relative bg-[#0a0a0a] px-5 md:px-8 py-6 md:py-8">
          {/* Gold accent line at top */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#c6912c]" />
          
          {/* Category + Title Row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-[#c6912c] text-[10px] md:text-xs tracking-[0.25em] uppercase mb-1.5 font-medium">
                {section.category}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
                {section.title}
              </h2>
            </div>
            {/* Decorative element */}
            <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#c6912c]/30 flex items-center justify-center">
              <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#c6912c]/20 flex items-center justify-center">
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#c6912c]" />
              </div>
            </div>
          </div>
          
          {/* Tagline */}
          <p className="mt-3 text-sm md:text-base text-white/50 font-light">
            {section.tagline}
          </p>
        </div>

        {/* Description - Compact */}
        <div className="px-5 md:px-8 py-4 bg-[#fafafa] border-b border-gray-100">
          <p className="text-gray-600 text-sm leading-relaxed">
            {section.description}
          </p>
        </div>

        {/* Offers List - Compact */}
        <div className="px-5 md:px-8 py-5 md:py-6">
          <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-gray-400 mb-4 font-medium">
            Current Offers
          </p>
          
          <div className="space-y-3">
            {section.offers.map((offer, index) => (
              <div
                key={index}
                className="group flex items-start gap-3 p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-100 transition-all duration-200 hover:border-[#c6912c]/40 hover:bg-white"
              >
                {/* Number + Icon */}
                <div className="flex-shrink-0 relative">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#c6912c]/10 flex items-center justify-center">
                    <OfferIcon type={offer.icon} className="w-4 h-4 md:w-5 md:h-5 text-[#c6912c]" />
                  </div>
                  <div className="absolute -top-1 -left-1 w-4 h-4 md:w-5 md:h-5 bg-[#c6912c] rounded-full flex items-center justify-center">
                    <span className="text-white text-[9px] md:text-[10px] font-bold">{index + 1}</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-[#c6912c] transition-colors">
                    {offer.title}
                  </h4>
                  <p className="text-gray-500 text-xs leading-relaxed mt-1 line-clamp-2">
                    {offer.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Footer - Compact */}
        <div className="px-5 md:px-8 py-4 md:py-5 bg-[#0a0a0a] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-xs md:text-sm hidden sm:block">
            Ready to claim these offers?
          </p>
          <div className="flex gap-2 w-full sm:w-auto">
            <Link href="/contact" className="flex-1 sm:flex-none">
              <button className="w-full px-5 md:px-6 py-2.5 bg-[#c6912c] hover:bg-[#b8830f] text-white text-xs md:text-sm font-medium rounded-lg transition-all duration-300">
                Get Quote
              </button>
            </Link>
            <Link href="/cost-estimator" className="flex-1 sm:flex-none">
              <button className="w-full px-5 md:px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs md:text-sm font-medium rounded-lg border border-white/20 transition-all duration-300">
                AI Estimator
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function OffersPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedSection, setSelectedSection] = useState<OfferSection | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredSections = activeCategory === "all"
    ? OFFER_SECTIONS
    : OFFER_SECTIONS.filter((section) => section.id === activeCategory)

  const handleOpenModal = (section: OfferSection) => {
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
                  <svg
                    className="w-5 h-5 text-[#5c5c5c] mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-black">{FEATURED_OFFER.highlight}</p>
                    <p className="text-gray-600 text-sm mt-1">{FEATURED_OFFER.description}</p>
                    <Link
                      href={FEATURED_OFFER.ctaLink}
                      className="text-black text-sm font-medium underline underline-offset-4 hover:text-[#c6912c] transition-colors mt-2 inline-block"
                    >
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
          <section
            key={section.id}
            id={section.id}
            className={`py-12 md:py-20 ${index % 2 === 0 ? "bg-[#f4f4f4]" : "bg-white"}`}
          >
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Left: Content */}
                <div className="bg-white lg:bg-transparent p-6 lg:p-8 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">{section.category}</p>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-5">
                    {section.title}
                  </h2>

                  {/* CTA Buttons - Updated "Learn More" to open modal */}
                  <div className="flex gap-3 mb-8">
                    <Link href="/contact">
                      <button className="px-6 py-2.5 bg-[#3b5998] text-white text-sm font-medium rounded hover:bg-[#2d4373] transition-colors">
                        Get Quote
                      </button>
                    </Link>
                    <button
                      onClick={() => handleOpenModal(section)}
                      className="px-6 py-2.5 bg-white text-black text-sm font-medium rounded border border-gray-300 hover:border-[#c6912c] hover:text-[#c6912c] transition-colors"
                    >
                      Learn More
                    </button>
                  </div>

                  {/* Offers List - More compact */}
                  <div className="space-y-5">
                    {section.offers.map((offer, offerIndex) => (
                      <div key={offerIndex}>
                        <div className="flex items-start gap-3">
                          <OfferIcon type={offer.icon} className="w-5 h-5 text-[#5c5c5c]" />
                          <div>
                            <h3 className="font-semibold text-black text-sm md:text-base leading-snug">
                              {offer.title}
                            </h3>
                            <button
                              onClick={() => handleOpenModal(section)}
                              className="text-sm text-gray-500 underline underline-offset-4 hover:text-[#c6912c] transition-colors"
                            >
                              {offer.linkText}
                            </button>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                              {offer.details}
                            </p>
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
              <Link href="/cost-estimator">
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
              * All offers are subject to credit approval and may vary based on creditworthiness.
              Financing offers are provided through third-party lending partners. APR rates shown
              are for illustrative purposes and may differ based on individual qualifications. Offers
              valid for projects contracted by March 31, 2025. Cannot be combined with other
              promotions unless otherwise stated. Antova Builders reserves the right to modify or
              discontinue offers at any time. Contact us for complete terms and conditions.
            </p>
          </div>
        </section>
      </main>

      <Footer />

      {/* Service Offer Modal */}
      <ServiceOfferModal
        section={selectedSection}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
