"use client"

import { useState } from "react"
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
    id: "signature-custom-design",
    category: "Signature Custom Design",
    title: "Custom Design",
    image: "/luxury-custom-home-interior-design-modern-architec.jpg",
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
    id: "commercial",
    category: "Commercial Projects",
    title: "Commercial",
    image: "/modern-commercial-building-exterior-glass-facade.jpg",
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

  const filteredSections = activeCategory === "all" 
    ? OFFER_SECTIONS 
    : OFFER_SECTIONS.filter(section => section.id === activeCategory)

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
          <section key={section.id} id={section.id} className={`py-12 md:py-20 ${index % 2 === 0 ? 'bg-[#f4f4f4]' : 'bg-white'}`}>
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
                    <Link href={`/services/${section.id === 'engineering' ? 'engineering-consulting' : section.id === 'financing' ? 'engineering-consulting' : section.id === 'new-build' ? 'new-builds' : section.id === 'remote' ? 'remote-work' : section.id === 'commercial' ? 'commercial-projects' : section.id}`}>
                      <button className="px-6 py-2.5 bg-white text-black text-sm font-medium rounded border border-gray-300 hover:border-gray-400 transition-colors">
                        Learn More
                      </button>
                    </Link>
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
              * All offers are subject to credit approval and may vary based on creditworthiness. Financing offers are provided through third-party lending partners. APR rates shown are for illustrative purposes and may differ based on individual qualifications. Offers valid for projects contracted by March 31, 2025. Cannot be combined with other promotions unless otherwise stated. Antova Builders reserves the right to modify or discontinue offers at any time. Contact us for complete terms and conditions.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
