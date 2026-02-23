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
        shortDetails: "3-hour design consultation with our lead architect for custom home projects over $400,000.",
        fullDetails: "This exclusive consultation gives you dedicated time with our principal architect to explore your vision, discuss site considerations, and understand the full scope of possibilities for your custom home. We'll analyze your property, review your inspiration materials, and provide preliminary concept sketches.",
        includes: [
          "3-hour one-on-one session with lead architect",
          "Preliminary site analysis and feasibility review",
          "Initial concept sketches (2-3 design directions)",
          "Material and style recommendations",
          "Budget framework discussion",
          "Written summary of recommendations"
        ],
        terms: "Available for custom home projects with minimum budget of $400,000. Must schedule within 60 days of inquiry. One consultation per property.",
        expires: "Ongoing offer",
        linkText: "Book Consultation",
      },
      {
        icon: "gift",
        title: "Free Smart Home Integration Package",
        shortDetails: "Complimentary $20,000 smart home package for signature homes over $600,000.",
        fullDetails: "Transform your custom home into an intelligent living space with our premium smart home integration package. This comprehensive system seamlessly connects lighting, climate, security, and entertainment — all controllable from your smartphone or voice commands.",
        includes: [
          "Lutron RadioRA 3 whole-home lighting control",
          "Nest or Ecobee smart thermostat system",
          "Ring or similar video doorbell & entry system",
          "Smart lock integration (3 entry points)",
          "Whole-home Wi-Fi mesh network setup",
          "Professional programming and configuration",
          "Training session for homeowners"
        ],
        terms: "Available for signature custom homes with contract value over $600,000. Package value of $20,000 applied as credit. Cannot be exchanged for cash.",
        expires: "Limited time — while slots available",
        linkText: "Learn More",
      },
      {
        icon: "percent",
        title: "$10,000 Premium Material Upgrade Credit",
        shortDetails: "Apply toward imported stone, custom millwork, or designer fixtures.",
        fullDetails: "Elevate your custom home with premium materials at no additional cost. This credit allows you to upgrade key design elements — from Italian marble countertops to handcrafted millwork — giving your home the refined finishes that make a lasting impression.",
        includes: [
          "Imported natural stone (marble, quartzite, granite)",
          "Custom hardwood millwork and cabinetry upgrades",
          "Designer plumbing fixtures (Waterworks, Kallista)",
          "Premium hardware and accessories",
          "Specialty tile and mosaic work",
          "Custom metalwork and railings"
        ],
        terms: "Credit applied at contract signing. Valid for contracts signed by March 31, 2025. Cannot be combined with other material promotions. Unused credit has no cash value.",
        expires: "March 31, 2025",
        linkText: "Get Quote",
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
        title: "Limited Time: $2,500 Credit on Premium Fixtures",
        shortDetails: "Available for kitchen and bathroom renovations over $20,000. Ends January 31, 2025.",
        fullDetails: "Upgrade your kitchen or bathroom with premium fixtures at a significant savings. This credit applies to high-end brands that elevate both function and aesthetics — from professional-grade faucets to designer cabinet hardware.",
        includes: [
          "Premium faucets (Brizo, Kohler, Grohe)",
          "Designer cabinet hardware",
          "Under-cabinet and accent lighting",
          "High-end showerheads and fixtures",
          "Quality towel bars and bath accessories",
          "Upgraded outlet and switch covers"
        ],
        terms: "Minimum project value of $20,000. Credit applied at contract signing. Must complete consultation by January 31, 2025. One credit per project.",
        expires: "January 31, 2025",
        linkText: "Get Quote",
      },
      {
        icon: "percent",
        title: "0% APR Financing for 12 Months",
        shortDetails: "Zero interest financing for renovation projects $15,000 to $150,000.",
        fullDetails: "Make your renovation affordable with our zero-interest financing option. Pay over 12 months with no interest charges — giving you the flexibility to complete your dream renovation without the financial strain of paying everything upfront.",
        includes: [
          "No interest for 12 full months",
          "Fixed monthly payments",
          "No prepayment penalties",
          "Quick approval process (24-48 hours)",
          "Finance up to $150,000",
          "Combine with other project incentives"
        ],
        terms: "Subject to credit approval through our lending partners. Available for projects from $15,000 to $150,000. Standard rates apply after promotional period if balance remains.",
        expires: "Ongoing — subject to lender availability",
        linkText: "Get Prequalified",
      },
      {
        icon: "star",
        title: "Free Design Consultation",
        shortDetails: "Complimentary 2-hour design consultation with our interior specialists. $500 value.",
        fullDetails: "Start your renovation journey with expert guidance. Our interior design specialists will help you clarify your vision, explore possibilities, and create a roadmap for your project — from material selections to layout optimization.",
        includes: [
          "2-hour in-home or virtual consultation",
          "Style assessment and direction",
          "Space planning recommendations",
          "Material and finish suggestions",
          "Preliminary budget discussion",
          "Follow-up summary document"
        ],
        terms: "Available for new clients. One consultation per household. No purchase obligation.",
        expires: "Ongoing offer",
        linkText: "Book Now",
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
        shortDetails: "Lock in rates as low as 3.99% APR for custom homes from $350,000.",
        fullDetails: "Secure exceptional financing for your new build with our preferred lending partners. This competitive rate helps make your dream home more affordable while providing the flexibility of a construction-to-permanent loan structure.",
        includes: [
          "Rates as low as 3.99% APR",
          "Construction-to-permanent loan option",
          "Interest-only payments during construction",
          "Single closing — saves on fees",
          "Lock rate for up to 12 months",
          "Dedicated loan officer support"
        ],
        terms: "Rate subject to credit approval and may vary based on creditworthiness. Available for primary residences. Minimum loan amount $350,000. Points may apply.",
        expires: "Rate subject to market conditions",
        linkText: "Get Prequalified",
      },
      {
        icon: "star",
        title: "Free Smart Home Package on Luxury Estates",
        shortDetails: "Complimentary $15,000 smart home package for estates over $750,000.",
        fullDetails: "Your luxury estate deserves intelligent living. This comprehensive smart home package integrates lighting, climate, security, and entertainment into one seamless system — professionally installed and configured during construction for flawless integration.",
        includes: [
          "Whole-home lighting automation",
          "Multi-zone climate control",
          "Integrated security system with cameras",
          "Video doorbell and smart locks",
          "Distributed audio system (4 zones)",
          "Centralized control panel",
          "Mobile app setup and training"
        ],
        terms: "Available for new construction estates with contract value over $750,000. Installed during construction phase. Cannot be exchanged for cash value.",
        expires: "Limited availability",
        linkText: "Schedule Consultation",
      },
      {
        icon: "gift",
        title: "Upgraded Appliance Package",
        shortDetails: "Premium appliance brands at no additional cost. Valued at up to $10,000.",
        fullDetails: "Outfit your new kitchen with top-tier appliances from brands known for performance, reliability, and design. Choose from our curated selection of premium packages that complement your home's style and your culinary aspirations.",
        includes: [
          "Professional-grade range or cooktop",
          "Built-in refrigerator upgrade",
          "Whisper-quiet dishwasher",
          "Ventilation hood upgrade",
          "Microwave drawer or built-in option",
          "Brands: Sub-Zero, Wolf, Thermador, Miele"
        ],
        terms: "Package value up to $10,000 based on standard allowances. Selection from approved brands/models. Upgrades beyond package value available at additional cost.",
        expires: "Ongoing offer",
        linkText: "Learn More",
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
        shortDetails: "Credit toward tenant improvements on commercial build-outs over $75,000.",
        fullDetails: "Maximize your commercial space investment with this tenant improvement credit. Whether you're building out an office, retail location, or restaurant, this credit helps offset costs for the custom features that make your space unique.",
        includes: [
          "Custom millwork and built-ins",
          "Specialty flooring upgrades",
          "Accent lighting and fixtures",
          "Branded signage integration",
          "Break room or kitchenette upgrades",
          "Reception area enhancements"
        ],
        terms: "Minimum project value of $75,000. Applicable to office, retail, or restaurant spaces. Valid for contracts signed by March 31, 2025. One credit per project.",
        expires: "March 31, 2025",
        linkText: "Get Quote",
      },
      {
        icon: "clock",
        title: "Fast-Track Permitting — 30% Faster Guaranteed",
        shortDetails: "Accelerated permit approvals with money-back guarantee if we miss the timeline.",
        fullDetails: "Time is money in commercial construction. Our permit expediting service leverages established relationships and expert knowledge to accelerate approvals significantly. We're so confident, we guarantee results or refund our expediting fee.",
        includes: [
          "Complete permit application preparation",
          "Pre-submission review with authorities",
          "Dedicated permit expeditor",
          "ADA compliance review included",
          "Regular status updates",
          "Issue resolution and resubmission"
        ],
        terms: "30% faster compared to standard municipal timelines. Guarantee applies to expediting fee only. Timeline begins after complete documentation submitted.",
        expires: "Ongoing service",
        linkText: "Learn More",
      },
      {
        icon: "star",
        title: "Free Space Planning & Layout Consultation",
        shortDetails: "Complimentary space planning session with our commercial design team. $750 value.",
        fullDetails: "Optimize your commercial space before construction begins. Our commercial design specialists analyze workflow, code requirements, and brand needs to create a layout that maximizes efficiency and customer experience.",
        includes: [
          "On-site space assessment",
          "Workflow and traffic flow analysis",
          "Preliminary layout concepts (2-3 options)",
          "Code compliance preliminary review",
          "Furniture and fixture planning",
          "Written recommendations report"
        ],
        terms: "Available for commercial projects. One consultation per project. No purchase obligation.",
        expires: "Ongoing offer",
        linkText: "Book Now",
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
        shortDetails: "Complimentary on-site evaluation for remote build projects over $150,000. $1,200 value.",
        fullDetails: "Building remotely requires specialized expertise. Our team will visit your property, assess terrain challenges, evaluate access options, and determine utility feasibility — giving you a clear picture of what's possible before you commit.",
        includes: [
          "On-site property visit by project manager",
          "Terrain and soil analysis",
          "Access road evaluation or creation options",
          "Utility connection feasibility study",
          "Helicopter or special access assessment if needed",
          "Detailed written report with recommendations",
          "Preliminary cost impact analysis"
        ],
        terms: "Available for remote build projects with minimum budget of $150,000. Travel expenses covered within 100 miles; additional mileage may apply.",
        expires: "Ongoing offer",
        linkText: "Schedule Visit",
      },
      {
        icon: "gift",
        title: "$8,000 Solar & Battery Package Credit",
        shortDetails: "Apply toward solar, battery storage, or hybrid power systems for off-grid homes.",
        fullDetails: "Power your remote home sustainably with our solar and battery credit. Whether fully off-grid or hybrid, this credit helps offset the cost of renewable energy systems that provide reliable, independent power.",
        includes: [
          "Solar panel installation",
          "Battery storage systems (Tesla Powerwall, etc.)",
          "Hybrid inverter systems",
          "Generator integration",
          "Whole-home energy monitoring",
          "System design and engineering"
        ],
        terms: "Available on projects contracted by March 31, 2025. Credit applied toward solar/battery components and installation. Cannot be combined with utility rebates we apply for on your behalf.",
        expires: "March 31, 2025",
        linkText: "Get Quote",
      },
      {
        icon: "percent",
        title: "Well & Septic System — 10% Off",
        shortDetails: "Save 10% on well drilling and septic installation when bundled with your build.",
        fullDetails: "Remote properties typically require independent water and waste systems. Bundle these essential services with your construction contract and save significantly while ensuring seamless coordination between all site work.",
        includes: [
          "Well drilling and pump installation",
          "Water quality testing",
          "Pressure tank and filtration system",
          "Septic system design and engineering",
          "Septic tank and drain field installation",
          "All required permits and inspections"
        ],
        terms: "10% discount on combined well and septic package when bundled with construction contract. Discount applied to labor and materials.",
        expires: "Ongoing offer",
        linkText: "Learn More",
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
        shortDetails: "Complimentary on-site structural assessment and preliminary engineering report. $500 value.",
        fullDetails: "Whether you're planning a renovation, concerned about existing conditions, or need expert evaluation for a dispute, our structural engineers provide professional assessment and clear recommendations.",
        includes: [
          "On-site structural inspection",
          "Foundation and framing evaluation",
          "Load-bearing wall identification",
          "Preliminary engineering opinion",
          "Photo documentation",
          "Written assessment report",
          "Recommendations for next steps"
        ],
        terms: "Available for new clients. One assessment per property. Full engineering reports and stamped drawings available at standard rates if needed.",
        expires: "Ongoing offer",
        linkText: "Book Now",
      },
      {
        icon: "clock",
        title: "50% Faster Permit Expediting — Guaranteed",
        shortDetails: "Get your project approved in half the typical time, or your expediting fee is refunded.",
        fullDetails: "Don't let permit delays derail your project timeline. Our expediting service combines expert preparation, established relationships, and persistent follow-up to cut approval times dramatically.",
        includes: [
          "Complete application preparation",
          "Drawing review for compliance issues",
          "Pre-submission authority meetings",
          "Dedicated expeditor assignment",
          "Daily/weekly status tracking",
          "Issue resolution and resubmission",
          "Final permit pickup and delivery"
        ],
        terms: "50% faster compared to standard municipal processing times. Guarantee applies to expediting service fee. Timeline measured from complete submission.",
        expires: "Ongoing service",
        linkText: "Get Details",
      },
      {
        icon: "percent",
        title: "Bundle & Save 15%",
        shortDetails: "Combine engineering consultation with permit expediting and save 15% on total fees.",
        fullDetails: "Get comprehensive support for your project at a reduced rate. When you need both engineering expertise and permit assistance, bundling these services saves money and ensures seamless coordination.",
        includes: [
          "Structural engineering consultation",
          "Permit application preparation",
          "Drawing review and markup",
          "Expedited permit processing",
          "Single point of contact",
          "Coordinated timeline management"
        ],
        terms: "15% discount applies to combined service fees. Both services must be contracted together. Discount applied at invoicing.",
        expires: "Ongoing offer",
        linkText: "Get Quote",
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
        shortDetails: "Tap into your home's equity with rates starting at 5.99% APR. Lines up to $500,000.",
        fullDetails: "Leverage the equity you've built to fund your renovation or addition. Home equity lines offer flexibility — draw what you need, when you need it — with competitive rates and potential tax advantages.",
        includes: [
          "Rates starting at 5.99% APR",
          "Credit lines up to $500,000",
          "Draw period flexibility",
          "Interest-only payment options",
          "No prepayment penalties",
          "Potential tax deductibility (consult tax advisor)"
        ],
        terms: "Rates based on creditworthiness and loan-to-value ratio. Property appraisal required. Offered through partner lenders. Your home serves as collateral.",
        expires: "Rates subject to market conditions",
        linkText: "Check Eligibility",
      },
      {
        icon: "star",
        title: "No Equity Required — Unsecured Renovation Loan",
        shortDetails: "Finance up to $100,000 without using your home as collateral. Fixed rates from 7.99% APR.",
        fullDetails: "Don't have sufficient equity or prefer not to use your home as collateral? Our unsecured renovation loans provide the funds you need with predictable fixed payments and no risk to your property.",
        includes: [
          "Fixed rates from 7.99% APR",
          "Loan amounts up to $100,000",
          "No home equity required",
          "Fixed monthly payments",
          "Terms from 3-12 years",
          "No prepayment penalties",
          "Funds disbursed quickly"
        ],
        terms: "Subject to credit approval. Rates vary based on creditworthiness, loan amount, and term. Personal guarantee required.",
        expires: "Ongoing — subject to lender availability",
        linkText: "Apply Now",
      },
      {
        icon: "clock",
        title: "Fast Approval — Decision in 24 Hours",
        shortDetails: "Streamlined application with financing decisions within 24 hours for qualified applicants.",
        fullDetails: "Don't wait weeks to know if you're approved. Our streamlined process delivers fast decisions so you can move forward with your project confidently. Apply online in minutes and get your answer quickly.",
        includes: [
          "Simple online application",
          "Soft credit pull for pre-qualification",
          "Decision within 24 hours",
          "Dedicated loan coordinator",
          "Clear terms and documentation",
          "Fast funding after approval"
        ],
        terms: "24-hour decision for complete applications submitted during business days. Complex applications may require additional time. Final approval subject to verification.",
        expires: "Ongoing service",
        linkText: "Get Started",
      },
    ],
  },
]

interface Offer {
  icon: string
  title: string
  shortDetails: string
  fullDetails: string
  includes: string[]
  terms: string
  expires: string
  linkText: string
}

interface OfferSection {
  id: string
  category: string
  title: string
  image: string
  tagline: string
  description: string
  offers: Offer[]
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

// Premium Offer Modal Component - With Expanded Details
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
  const [expandedOffer, setExpandedOffer] = useState<number | null>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      if (modalRef.current) {
        modalRef.current.scrollTop = 0
      }
      setExpandedOffer(null)
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
        className={`relative z-10 w-full max-w-2xl bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 max-h-[90vh] overflow-y-auto ${
          isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Premium Header */}
        <div className="relative bg-[#0a0a0a] px-5 md:px-8 py-6 md:py-8">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#c6912c]" />
          
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-[#c6912c] text-[10px] md:text-xs tracking-[0.25em] uppercase mb-1.5 font-medium">
                {section.category}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
                {section.title}
              </h2>
            </div>
            <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#c6912c]/30 flex items-center justify-center">
              <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#c6912c]/20 flex items-center justify-center">
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#c6912c]" />
              </div>
            </div>
          </div>
          
          <p className="mt-3 text-sm md:text-base text-white/50 font-light">
            {section.tagline}
          </p>
        </div>

        {/* Description */}
        <div className="px-5 md:px-8 py-4 bg-[#fafafa] border-b border-gray-100">
          <p className="text-gray-600 text-sm leading-relaxed">
            {section.description}
          </p>
        </div>

        {/* Offers List - Expandable */}
        <div className="px-5 md:px-8 py-5 md:py-6">
          <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-gray-400 mb-4 font-medium">
            Available Offers — Click to expand details
          </p>
          
          <div className="space-y-3">
            {section.offers.map((offer, index) => (
              <div
                key={index}
                className={`group border rounded-xl transition-all duration-300 ${
                  expandedOffer === index 
                    ? "border-[#c6912c] bg-[#fffdf9]" 
                    : "border-gray-100 bg-gray-50 hover:border-[#c6912c]/40 hover:bg-white"
                }`}
              >
                {/* Offer Header - Always visible */}
                <button
                  onClick={() => setExpandedOffer(expandedOffer === index ? null : index)}
                  className="w-full flex items-start gap-3 p-3 md:p-4 text-left"
                >
                  <div className="flex-shrink-0 relative">
                    <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors ${
                      expandedOffer === index ? "bg-[#c6912c]" : "bg-[#c6912c]/10"
                    }`}>
                      <OfferIcon 
                        type={offer.icon} 
                        className={`w-4 h-4 md:w-5 md:h-5 ${expandedOffer === index ? "text-white" : "text-[#c6912c]"}`} 
                      />
                    </div>
                    <div className="absolute -top-1 -left-1 w-4 h-4 md:w-5 md:h-5 bg-[#c6912c] rounded-full flex items-center justify-center">
                      <span className="text-white text-[9px] md:text-[10px] font-bold">{index + 1}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-semibold text-sm leading-snug transition-colors ${
                      expandedOffer === index ? "text-[#c6912c]" : "text-gray-900"
                    }`}>
                      {offer.title}
                    </h4>
                    {expandedOffer !== index && (
                      <p className="text-gray-500 text-xs leading-relaxed mt-1">
                        {offer.shortDetails}
                      </p>
                    )}
                  </div>
                  
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                    expandedOffer === index 
                      ? "border-[#c6912c] bg-[#c6912c]" 
                      : "border-gray-300"
                  }`}>
                    <svg 
                      className={`w-3 h-3 transition-transform ${
                        expandedOffer === index ? "rotate-180 text-white" : "text-gray-400"
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Expanded Content */}
                {expandedOffer === index && (
                  <div className="px-3 md:px-4 pb-4 md:pb-5 pt-0">
                    <div className="pl-12 md:pl-[52px] space-y-4">
                      {/* Full Description */}
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {offer.fullDetails}
                      </p>

                      {/* What's Included */}
                      <div>
                        <p className="text-[10px] tracking-[0.15em] uppercase text-[#c6912c] font-semibold mb-2">
                          What's Included
                        </p>
                        <ul className="space-y-1.5">
                          {offer.includes.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                              <svg className="w-4 h-4 text-[#c6912c] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Terms & Expiration */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-gray-200">
                        <div className="flex-1">
                          <p className="text-[9px] tracking-[0.1em] uppercase text-gray-400 font-medium mb-1">Terms</p>
                          <p className="text-xs text-gray-500 leading-relaxed">{offer.terms}</p>
                        </div>
                        <div className="sm:w-32 sm:text-right">
                          <p className="text-[9px] tracking-[0.1em] uppercase text-gray-400 font-medium mb-1">Expires</p>
                          <p className="text-xs font-medium text-[#c6912c]">{offer.expires}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Footer */}
        <div className="sticky bottom-0 px-5 md:px-8 py-4 md:py-5 bg-[#0a0a0a] flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
          <p className="text-white/50 text-xs md:text-sm hidden sm:block">
            Ready to claim these offers?
          </p>
          <div className="flex gap-2 w-full sm:w-auto">
            <Link href="/contact" className="flex-1 sm:flex-none">
              <button className="w-full px-5 md:px-6 py-2.5 bg-[#c6912c] hover:bg-[#b8830f] text-white text-xs md:text-sm font-medium rounded-lg transition-all duration-300">
                Get Quote
              </button>
            </Link>
            <Link 
              href={`/cost-estimator?type=${
                section.id === "signature-custom-design" ? "custom-home" :
                section.id === "new-build" ? "new-build" :
                section.id === "renovation" ? "renovation" :
                section.id === "commercial" ? "commercial" :
                section.id === "remote" ? "remote" :
                section.id === "consulting-engineering" ? "consulting" :
                section.id === "financing" ? "consulting" : ""
              }`} 
              className="flex-1 sm:flex-none"
            >
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
        {/* Hero Section */}
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

        {/* Featured Offer */}
        <section className="px-4 md:px-8 lg:px-12 pb-8 md:pb-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="relative w-full aspect-[16/6] md:aspect-[21/8] rounded-lg overflow-hidden mb-8">
              <img
                src={FEATURED_OFFER.image}
                alt="Featured offer"
                className="w-full h-full object-cover object-center"
              />
            </div>

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

        {/* Filter Tabs */}
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

        {/* Offer Sections */}
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

                  {/* CTA Buttons */}
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

                  {/* Offers List - Short version */}
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
                              {offer.shortDetails}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Image */}
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
