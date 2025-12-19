"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

const CATEGORIES = [
  { id: "all", label: "All Offers" },
  { id: "renovation", label: "Renovation" },
  { id: "new-build", label: "New Builds" },
  { id: "engineering", label: "Engineering" },
  { id: "financing", label: "Financing" },
]

const OFFERS = [
  {
    id: 1,
    category: "renovation",
    image: "/modern-luxury-home-at-night-with-warm-interior-lig.jpg",
    title: "Kitchen Renovation",
    highlight: "0% Financing",
    subtitle: "For 12 Months",
    details: "Transform your kitchen with premium materials and expert craftsmanship. Qualified buyers get 0% APR financing for the first 12 months.",
    price: "From $25,000",
    priceNote: "Average project cost",
    cta: "Get Started",
    ctaLink: "/contact",
    badge: "Limited Time",
  },
  {
    id: 2,
    category: "renovation",
    image: "/luxury-modern-living-room-wood-ceiling-concrete-fi.jpg",
    title: "Bathroom Remodel",
    highlight: "$2,500 Credit",
    subtitle: "On Premium Fixtures",
    details: "Upgrade your bathroom with luxury fixtures and finishes. Receive a $2,500 credit toward premium fixture upgrades when you book by January 31st.",
    price: "From $15,000",
    priceNote: "Average project cost",
    cta: "Learn More",
    ctaLink: "/services/renovation",
    badge: "Popular",
  },
  {
    id: 3,
    category: "new-build",
    image: "/modern-glass-house-reflecting-in-lake-at-sunset-wi.jpg",
    title: "Custom Home Build",
    highlight: "3.99% APR",
    subtitle: "Construction Loan",
    details: "Build your dream home with competitive construction financing. Lock in rates as low as 3.99% APR for qualified buyers through our lending partners.",
    price: "From $350,000",
    priceNote: "Starting build cost",
    cta: "Start Design",
    ctaLink: "/contact",
    badge: null,
  },
  {
    id: 4,
    category: "new-build",
    image: "/luxury-custom-home-interior-design-modern-architec.jpg",
    title: "Luxury Estate",
    highlight: "Free Upgrade",
    subtitle: "Smart Home Package",
    details: "Commission a luxury estate and receive a complimentary $15,000 smart home automation package including lighting, climate, and security systems.",
    price: "From $750,000",
    priceNote: "Starting build cost",
    cta: "Schedule Consultation",
    ctaLink: "/contact",
    badge: "Exclusive",
  },
  {
    id: 5,
    category: "engineering",
    image: "/images/engineering-blueprints.png",
    title: "Engineering Consultation",
    highlight: "Free Assessment",
    subtitle: "First Visit",
    details: "Get a complimentary on-site structural assessment and preliminary engineering report. Valued at $500, now free for new clients.",
    price: "$0",
    priceNote: "First consultation",
    cta: "Book Now",
    ctaLink: "/services/engineering-consulting",
    badge: "New Client",
  },
  {
    id: 6,
    category: "engineering",
    image: "/project-1.jpg",
    title: "Permit Expediting",
    highlight: "50% Faster",
    subtitle: "Guaranteed Timeline",
    details: "Our permit expediting service gets your project approved in half the typical time. If we don't meet the timeline, your expediting fee is refunded.",
    price: "From $1,500",
    priceNote: "Service fee",
    cta: "Get Details",
    ctaLink: "/services/engineering-consulting",
    badge: null,
  },
  {
    id: 7,
    category: "financing",
    image: "/hero-winter-mountain-home.png",
    title: "Home Equity Line",
    highlight: "5.99% APR",
    subtitle: "Variable Rate",
    details: "Tap into your home's equity for your renovation project. Competitive rates starting at 5.99% APR through our partner lenders.",
    price: "Up to $500,000",
    priceNote: "Credit line",
    cta: "Check Eligibility",
    ctaLink: "/contact",
    badge: null,
  },
  {
    id: 8,
    category: "financing",
    image: "/modern-minimalist-architecture-exterior-detail-bla.jpg",
    title: "Renovation Loan",
    highlight: "No Equity Required",
    subtitle: "Unsecured Financing",
    details: "Finance your renovation without using your home as collateral. Fixed rates and predictable monthly payments for projects up to $100,000.",
    price: "From 7.99% APR",
    priceNote: "For qualified buyers",
    cta: "Apply Now",
    ctaLink: "/contact",
    badge: "Fast Approval",
  },
]

export default function OffersPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredOffers = activeCategory === "all" 
    ? OFFERS 
    : OFFERS.filter(offer => offer.category === activeCategory)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-black text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-4">
              Current Offers
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
              Exclusive financing, credits, and incentives on renovation, new builds, and consulting services.
            </p>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="sticky top-16 md:top-20 z-40 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex gap-1 sm:gap-2 py-4">
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                      activeCategory === category.id
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Offers Grid */}
        <section className="py-12 md:py-16 bg-[#f4f4f4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Results Count */}
            <p className="text-sm text-gray-500 mb-8">
              {filteredOffers.length} offer{filteredOffers.length !== 1 ? "s" : ""} available
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    {offer.badge && (
                      <span className="absolute top-4 left-4 px-3 py-1 bg-[#c6912c] text-white text-xs font-medium rounded-full">
                        {offer.badge}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category Tag */}
                    <span className="text-[10px] font-medium tracking-[0.2em] text-gray-400 uppercase">
                      {CATEGORIES.find(c => c.id === offer.category)?.label}
                    </span>

                    {/* Title */}
                    <h3 className="font-display text-xl md:text-2xl text-black mt-2 mb-3">
                      {offer.title}
                    </h3>

                    {/* Highlight */}
                    <div className="mb-4">
                      <span className="text-3xl md:text-4xl font-display text-[#c6912c]">
                        {offer.highlight}
                      </span>
                      <span className="block text-sm text-gray-500 mt-1">
                        {offer.subtitle}
                      </span>
                    </div>

                    {/* Details */}
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                      {offer.details}
                    </p>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-lg font-semibold text-black">
                        {offer.price}
                      </span>
                      <span className="text-xs text-gray-400">
                        {offer.priceNote}
                      </span>
                    </div>

                    {/* CTA */}
                    <Link href={offer.ctaLink}>
                      <button className="w-full py-3 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors">
                        {offer.cta}
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 md:py-24 bg-black text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-4">
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
        <section className="py-8 bg-[#f4f4f4] border-t border-gray-200">
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
