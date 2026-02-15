"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

const SCROLL_THRESHOLD = 50
const SERVICE_CARDS_THRESHOLD = 0.5
const TESTIMONIALS_THRESHOLD = 0.5

const SERVICE_CARDS = [
  {
    title: "Signature Custom Design",
    image: "/modern-glass-house-reflecting-in-lake-at-sunset-wi.jpg",
    alt: "Custom homes lifestyle",
    href: "/services/signature-custom-design",
  },
  {
    title: "Renovations",
    image: "/renovation-human.png",
    alt: "Renovations lifestyle",
    href: "/services/renovation",
  },
  {
    title: "New Builds",
    image: "/new-builds.png",
    alt: "New construction lifestyle",
    href: "/services/new-builds",
  },
]

const OFFER_CARDS = [
  {
    title: "Engineering & Consulting",
    description: "Expert structural solutions and professional consulting for complex builds.",
    price: "Consultation from $500",
    image: "/images/engineering-blueprints.png",
    alt: "Architects working on architectural blueprints and floor plans",
    exploreHref: "/services/engineering-consulting",
    exploreLabel: "Explore Engineering",
  },
  {
    title: "Renovation",
    description: "Modern renovation spaces designed for business excellence.",
    price: "$2k-5k credits",
    image: "/renovation-human.png",
    alt: "Professional contractor reviewing renovation plans",
    exploreHref: "/services/renovation",
    exploreLabel: "Explore Renovation",
  },
]

const TESTIMONIALS = [
  {
    headline: "Expert Guidance",
    service: "Consulting",
    quote:
      "Antova's consulting team transformed our vision into reality. Their AI-powered estimates were spot-on, and the structural insights saved us months of planning time.",
    author: "Michael Chen",
    role: "Owner",
    company: "Aspen Horse Ranch",
    videoThumbnail: "/luxury-modern-cabin-interior-with-large-windows-wo.jpg",
  },
  {
    headline: "Flawless Renovation",
    service: "Renovation",
    quote:
      "Our clinic needed a complete transformation without disrupting patient care. Antova delivered exceptional craftsmanship on schedule.— the attention to detail was extraordinary.",
    author: "Sorin Isparesescu",
    role: "CEO",
    company: "Pain Clinic",
    videoThumbnail: "/project-1.jpg",
  },
  {
    headline: "Dream Home Delivered",
    service: "New Construction",
    quote:
      "From foundation to final walkthrough, Antova exceeded every expectation. Their transparent process and craftsmanship made building our custom home genuinely enjoyable.",
    author: "James Thornton",
    role: "CEO",
    company: "Thornton Capital",
    videoThumbnail: "/project-2.jpg",
  },
]

// Placeholder Google reviews - will be replaced with real data when Google Business is set up
const GOOGLE_REVIEWS = [
  {
    author_name: "David Morrison",
    rating: 5,
    relative_time_description: "2 weeks ago",
    text: "Antova exceeded every expectation. From the initial consultation to the final walkthrough, their team demonstrated remarkable professionalism. The craftsmanship on our mountain retreat is absolutely stunning.",
    image: null,
  },
  {
    author_name: "Elena Vasquez",
    rating: 5,
    relative_time_description: "1 month ago",
    text: "We hired Antova for a complete renovation of our historic property. They preserved the original character while modernizing everything. Truly exceptional attention to detail.",
    image: null,
  },
  {
    author_name: "Robert Blackwood",
    rating: 5,
    relative_time_description: "1 month ago",
    text: "The AI-powered estimates saved us weeks of back-and-forth. Accurate, transparent, and the build quality speaks for itself. Our new office headquarters is a masterpiece.",
    image: null,
  },
  {
    author_name: "Sarah Mitchell",
    rating: 5,
    relative_time_description: "2 months ago",
    text: "Working with Antova felt like having a true partner in realizing our vision. They listened, adapted, and delivered beyond what we imagined possible.",
    image: null,
  },
  {
    author_name: "Marcus Chen",
    rating: 5,
    relative_time_description: "3 months ago",
    text: "Professional team, excellent communication throughout the project. The final result on our lakeside cabin is beautiful. Would recommend for any premium construction needs.",
    image: null,
  },
]

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
}

function ArrowIcon() {
  return (
    <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-14 h-14 bg-[#c6912c] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
        <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  )
}

function ScrollIndicator({ show }: { show: boolean }) {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <div 
      className={`absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer transition-all duration-1000 ease-out group ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      onClick={scrollToContent}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Mouse icon with animated wheel */}
        <div className="relative w-9 h-14 border-2 border-white/70 rounded-full flex justify-center group-hover:border-[#c6912c] transition-colors duration-300">
          {/* Animated scroll wheel */}
          <div className="w-1.5 h-3 bg-[#c6912c] rounded-full mt-2.5 animate-scroll-wheel" />
          {/* Glow effect on hover */}
          <div className="absolute inset-0 rounded-full bg-[#c6912c]/0 group-hover:bg-[#c6912c]/10 transition-all duration-300" />
        </div>
        
        {/* Animated chevrons - bigger and brighter */}
        <div className="flex flex-col items-center -space-y-2">
          <svg 
            className="w-7 h-7 text-white/80 animate-chevron-1 group-hover:text-[#c6912c] transition-colors duration-300" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <svg 
            className="w-7 h-7 text-white/50 animate-chevron-2 group-hover:text-[#c6912c]/70 transition-colors duration-300" 
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

function QuoteIcon() {
  return (
    <svg className="w-8 h-8 text-[#c6912c]/30" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? "text-[#c6912c]" : "text-white/20"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

interface ServiceCardProps {
  title: string
  image: string
  alt: string
  href: string
}

function ServiceCard({ title, image, alt, href }: ServiceCardProps) {
  return (
    <Link href={href}>
      <div className="group relative overflow-hidden rounded-xl cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.02] aspect-[4/3]">
        <Image 
          src={image} 
          alt={alt} 
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center" 
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 30%, transparent 60%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between">
          <h3 className="text-white font-medium text-base">{title}</h3>
          <ArrowIcon />
        </div>
      </div>
    </Link>
  )
}

interface OfferCardProps {
  title: string
  description: string
  price: string
  image: string
  alt: string
  exploreHref: string
  exploreLabel: string
}

function OfferCard({ title, description, price, image, alt, exploreHref, exploreLabel }: OfferCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl cursor-pointer">
      <div className="relative aspect-[4/5] sm:aspect-[3/2] overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30" />

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 space-y-3">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-normal text-white tracking-wide">{title}</h3>
          <p className="text-white/90 text-sm lg:text-base leading-relaxed">{description}</p>
          <p className="text-white/70 text-xs sm:text-sm font-medium">{price}</p>
          <div className="flex gap-3 pt-2">
            <Button
              size="sm"
              className="bg-white text-black hover:bg-white/90 font-semibold text-xs px-4 py-2 transition-all"
              asChild
            >
              <Link href={exploreHref}>{exploreLabel}</Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-black text-xs px-4 py-2 transition-all bg-transparent"
              asChild
            >
              <Link href="/contact">Get Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface TestimonialCardProps {
  headline: string
  service: string
  quote: string
  author: string
  role: string
  company: string
  videoThumbnail: string
}

function TestimonialCard({ headline, service, quote, author, role, company, videoThumbnail }: TestimonialCardProps) {
  return (
    <div className="group relative bg-[#111] rounded-2xl overflow-hidden border border-white/10 hover:border-[#c6912c]/40 transition-all duration-500">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c6912c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="p-8 lg:p-10">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[#c6912c] text-xs font-medium tracking-[0.2em] uppercase">{service}</span>
          <QuoteIcon />
        </div>

        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-5 tracking-tight">{headline}</h3>

        <blockquote className="text-white/70 text-base leading-relaxed mb-8">"{quote}"</blockquote>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-[#c6912c]/20 flex items-center justify-center">
            <span className="text-[#c6912c] font-semibold text-sm">{getInitials(author)}</span>
          </div>
          <div>
            <p className="text-white font-medium">{author}</p>
            <p className="text-white/50 text-sm">
              {role}, {company}
            </p>
          </div>
        </div>

        <div className="relative aspect-[2/1] rounded-xl overflow-hidden cursor-pointer">
          <Image
            src={videoThumbnail}
            alt={`${author} testimonial video`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
          <PlayIcon />

          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 rounded text-white/90 text-xs font-medium">
            2:34
          </div>
        </div>
      </div>
    </div>
  )
}

interface GoogleReviewCardProps {
  author_name: string
  rating: number
  relative_time_description: string
  text: string
  image: string | null
}

function GoogleReviewCard({ author_name, rating, relative_time_description, text, image }: GoogleReviewCardProps) {
  return (
    <div className="group relative bg-[#111] rounded-2xl overflow-hidden border border-white/10 hover:border-[#c6912c]/40 transition-all duration-500">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c6912c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="p-8 lg:p-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#c6912c]/20 flex items-center justify-center">
              <span className="text-[#c6912c] font-semibold text-sm">{getInitials(author_name)}</span>
            </div>
            <div>
              <p className="text-white font-medium">{author_name}</p>
              <p className="text-white/50 text-sm">{relative_time_description}</p>
            </div>
          </div>
          <StarRating rating={rating} />
        </div>

        <blockquote className="text-white/70 text-base leading-relaxed mb-6">"{text}"</blockquote>

        {image && (
          <div className="relative aspect-[2/1] rounded-xl overflow-hidden mb-6">
            <Image
              src={image}
              alt={`Project by ${author_name}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
        )}

        <div className="pt-6 border-t border-white/10 flex items-center gap-2">
          <GoogleIcon />
          <span className="text-white/40 text-xs">Google Review</span>
        </div>
      </div>
    </div>
  )
}

function GoogleReviewsSection() {
  const avgRating = GOOGLE_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / GOOGLE_REVIEWS.length

  return (
    <section className="py-16 lg:py-20 bg-black relative overflow-hidden">
      <div className="relative z-10 px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          {/* Google badge */}
          <div className="flex items-center gap-4">
            <GoogleIcon />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-2xl">{avgRating.toFixed(1)}</span>
                <StarRating rating={Math.round(avgRating)} />
              </div>
              <span className="text-white/40 text-sm">{GOOGLE_REVIEWS.length} verified reviews</span>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-12 w-px bg-white/10" />

          {/* CTA */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm text-white/70 border border-white/15 rounded-[4px] hover:bg-white/5 hover:border-white/30 transition-all duration-300"
            >
              View All Reviews
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium rounded-[4px] hover:bg-white/90 transition-colors duration-300"
            >
              <GoogleIcon />
              Write a Review
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function useScrollThreshold(ref: React.RefObject<HTMLElement | null>, threshold: number) {
  const [isPastThreshold, setIsPastThreshold] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        setIsPastThreshold(rect.top <= window.innerHeight * threshold)
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [ref, threshold])

  return isPastThreshold
}

export default function AntovaBuilders() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showNavbar, setShowNavbar] = useState(false)
  const [showTitle, setShowTitle] = useState(false)
  const [showSubtitleAndButtons, setShowSubtitleAndButtons] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [selectedProjectType, setSelectedProjectType] = useState("")
  const router = useRouter()
  const serviceCardsRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)

  const isTestimonialsVisible = useScrollThreshold(testimonialsRef, TESTIMONIALS_THRESHOLD)

  useEffect(() => {
    const titleTimer = setTimeout(() => setShowTitle(true), 300)
    const subtitleTimer = setTimeout(() => setShowSubtitleAndButtons(true), 1000)
    const navbarTimer = setTimeout(() => setShowNavbar(true), 1800)

    return () => {
      clearTimeout(titleTimer)
      clearTimeout(subtitleTimer)
      clearTimeout(navbarTimer)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const bottomBgColor = isTestimonialsVisible ? "bg-black" : "bg-white"

  return (
    <div className={`min-h-screen bg-white overflow-x-hidden`}>
      {/* Custom animations for scroll indicator */}
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

      <Navbar hidden={!showNavbar} />

      {/* ━━━ HERO ━━━ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-winter-mountain-home.png"
            alt="Luxury mountain chalet in winter with warm interior lighting"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        <div className="relative z-10 px-6 lg:px-12 xl:px-16 text-center w-full -mt-24 md:-mt-32">
          {/* Headline — benefit-driven, answers "why should I care" */}
          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-5 tracking-tight text-balance text-white transition-all duration-700 ease-out ${
              showTitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Your vision, built without compromise.
          </h1>

          {/* Subline — packs benefit + speed + proof into one line */}
          <p 
            className={`text-base md:text-lg lg:text-xl mb-4 text-white/60 tracking-wide transition-all duration-700 ease-out ${
              showSubtitleAndButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            See your realistic investment range in 60 seconds — no email required.
          </p>

          {/* Offer hook — Tesla-style one-liner between headline and CTA */}
          <p 
            className={`text-sm md:text-base mb-8 transition-all duration-700 ease-out ${
              showSubtitleAndButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#c6912c]/15 backdrop-blur-sm border border-[#c6912c]/30 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c6912c] animate-pulse" />
              <span className="text-[#c6912c] font-semibold tracking-wide">Complimentary Design Consultation</span>
              <span className="text-white/50">with every spring 2026 project</span>
            </span>
          </p>

          {/* Embedded estimator entry — wide tool-like bar (Simply Business pattern) */}
          <div 
            className={`flex flex-col items-center gap-5 transition-all duration-700 ease-out ${
              showSubtitleAndButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Frosted glass container — makes the estimator feel like a tool, not a form */}
            <div className="w-full max-w-[780px] bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-xl p-3 sm:p-4">
              {/* Form row: selector + button */}
              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                {/* Project type selector */}
                <div className="relative flex-1">
                  <select
                    value={selectedProjectType}
                    onChange={(e) => setSelectedProjectType(e.target.value)}
                    className="w-full h-[54px] px-5 pr-12 bg-white text-black/80 text-base font-medium rounded-lg border-0 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#c6912c]/50 transition-all shadow-sm"
                  >
                    <option value="" disabled>What are you building?</option>
                    <option value="custom-home">Custom Home</option>
                    <option value="renovation">Major Renovation</option>
                    <option value="new-build">New Build</option>
                    <option value="consulting">Engineering & Consulting</option>
                  </select>
                  {/* Dropdown arrow */}
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/30 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Primary CTA button */}
                <Button
                  size="lg"
                  className="h-[54px] bg-[#c6912c] hover:bg-[#a67923] text-white font-semibold px-10 text-base tracking-wide rounded-lg shadow-lg shadow-[#c6912c]/20 transition-all hover:scale-[1.02] hover:shadow-[#c6912c]/40 whitespace-nowrap"
                  onClick={() => {
                    const param = selectedProjectType ? `?type=${selectedProjectType}` : ""
                    router.push(`/cost-estimator${param}`)
                  }}
                >
                  Reveal My Investment Range →
                </Button>
              </div>
            </div>

            {/* Microcopy — reinforces different points than subline */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-white/70 text-xs sm:text-sm tracking-wide">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#c6912c]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Instant results
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#c6912c]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                No sales calls
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#c6912c]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Trusted in 150+ builds
              </span>
            </div>

            {/* Secondary CTA — consultation as text link, not competing button */}
            <Link 
              href="/contact" 
              className="text-white/70 hover:text-white text-sm underline underline-offset-4 decoration-white/40 hover:decoration-white/70 transition-all"
            >
              Or book a consultation directly
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator show={showSubtitleAndButtons} />
      </section>

      {/* ━━━ TRUST STRIP — immediately below hero ━━━
          Gold luxury style. Single source of truth for stats.
      */}
      <div className="bg-white">
        <div className="px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-0 py-10 md:py-14 border-b border-black/[0.06]">
            {/* Google Rating */}
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-2">
                <GoogleIcon />
                <span className="text-[#c6912c] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">5.0</span>
              </div>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-4 h-4 text-[#c6912c]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-black/40 text-sm">Google Rating</span>
            </div>

            {/* 150+ Projects */}
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="text-[#c6912c] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">150+</span>
              <span className="text-black/40 text-sm">Projects Completed</span>
            </div>

            {/* 12 Years */}
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="text-[#c6912c] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">12</span>
              <span className="text-black/40 text-sm">Years Experience</span>
            </div>

            {/* 98% Satisfaction */}
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="text-[#c6912c] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">98%</span>
              <span className="text-black/40 text-sm">Client Satisfaction</span>
            </div>

            {/* $50M+ */}
            <div className="flex flex-col items-center justify-center gap-2 col-span-2 md:col-span-1">
              <span className="text-[#c6912c] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">$50M+</span>
              <span className="text-black/40 text-sm">Total Value Built</span>
            </div>
          </div>
        </div>
      </div>

      {/* ━━━ SCHEDULING BANNER — Right after trust strip ━━━ */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto">
          <div className="relative flex flex-col sm:flex-row sm:items-stretch gap-0 bg-white border border-black/[0.06] rounded-2xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c6912c] via-[#c6912c]/60 to-transparent" />
            
            <div className="flex-1 flex flex-col gap-4 p-6 sm:p-8 lg:p-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 w-fit bg-black/[0.03] border border-black/[0.08] rounded-full text-black/50 text-xs font-medium tracking-wide uppercase">
                Spring 2026 · Limited Availability
              </span>
              <Link href="/offers">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black hover:text-[#c6912c] transition-colors cursor-pointer leading-tight">
                  Now scheduling spring 2026 projects.
                </h2>
              </Link>
              <p className="text-black/50 text-base md:text-lg max-w-xl leading-relaxed">
                Each project includes a complimentary design consultation and AI-powered scope analysis — so you know exactly what to expect before breaking ground.
              </p>
            </div>

            <div className="sm:w-[320px] lg:w-[380px] flex flex-col items-center justify-center gap-5 p-6 sm:p-8 lg:p-10 border-t sm:border-t-0 sm:border-l border-black/[0.06]">
              <div className="text-center space-y-2">
                <p className="text-black/40 text-xs tracking-wide uppercase">Included with every project</p>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-[#c6912c] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    <span className="text-black/70 text-sm">Design consultation</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-[#c6912c] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    <span className="text-black/70 text-sm">AI scope analysis</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-[#c6912c] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    <span className="text-black/70 text-sm">Priority scheduling</span>
                  </div>
                </div>
              </div>
              <Link href="/offers" className="w-full">
                <button className="flex items-center justify-center gap-3 w-full px-8 py-4 bg-[#c6912c] hover:bg-[#a67923] text-white font-semibold text-base rounded-[4px] transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-[#c6912c]/30">
                  <span>Check Availability</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </Link>
              <Link href="/contact" className="w-full">
                <button className="flex items-center justify-center gap-2 w-full px-8 py-3 border border-black/15 text-black/60 hover:text-black hover:border-black/30 font-medium text-sm rounded-[4px] transition-all">
                  Or request a custom quote
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ PROBLEM → SOLUTION — Names the fear, then resolves it ━━━ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto">
          {/* Problem — call out the fears */}
          <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
            <p className="text-[#c6912c] font-medium tracking-[0.2em] uppercase text-sm mb-4">Why homeowners hesitate</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6 tracking-tight leading-tight">
              Building a home shouldn't feel like a gamble.
            </h2>
            <p className="text-black/50 text-lg md:text-xl leading-relaxed">
              Most homeowners delay their dream project because they've heard the horror stories — budgets that double, timelines that slip, contractors who disappear. We built Antova to eliminate every one of those fears.
            </p>
          </div>

          {/* Solution — three fear-killers */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Fear 1: Budget overruns */}
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#c6912c]/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-[#c6912c]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">No investment surprises</h3>
              <p className="text-black/50 text-base leading-relaxed">
                Our AI estimator gives you a realistic investment range before you commit to anything. No hidden fees, no scope creep, no uncomfortable conversations later.
              </p>
            </div>

            {/* Fear 2: Timeline slips */}
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#c6912c]/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-[#c6912c]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">On time, every time</h3>
              <p className="text-black/50 text-base leading-relaxed">
                12 years and 150+ projects have taught us how to plan realistically and deliver on schedule. You'll know the timeline upfront — and we'll stick to it.
              </p>
            </div>

            {/* Fear 3: Quality / trust */}
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#c6912c]/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-[#c6912c]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Craftsmanship guaranteed</h3>
              <p className="text-black/50 text-base leading-relaxed">
                98% client satisfaction across every project we've ever built. We don't disappear after the contract — we're with you from first sketch to final walkthrough.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ HOW IT WORKS — Reduces "what happens next?" anxiety ━━━ */}
      <section className="py-20 lg:py-28 bg-[#fafafa] border-y border-black/[0.06]">
        <div className="px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
            <p className="text-[#c6912c] font-medium tracking-[0.2em] uppercase text-sm mb-4">How it works</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black tracking-tight">
              Three steps to your dream home.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-16 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="text-center">
              <div className="text-[#c6912c] text-5xl lg:text-6xl font-bold mb-4 tracking-tight">01</div>
              <h3 className="text-xl font-bold text-black mb-3">See your investment range</h3>
              <p className="text-black/50 text-base leading-relaxed">
                Select your project type and get a realistic cost range in 60 seconds. No email, no obligation — just clarity.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="text-[#c6912c] text-5xl lg:text-6xl font-bold mb-4 tracking-tight">02</div>
              <h3 className="text-xl font-bold text-black mb-3">Meet your project team</h3>
              <p className="text-black/50 text-base leading-relaxed">
                Book a free design consultation. We'll walk through your vision, refine the scope, and create a detailed plan tailored to your goals.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="text-[#c6912c] text-5xl lg:text-6xl font-bold mb-4 tracking-tight">03</div>
              <h3 className="text-xl font-bold text-black mb-3">Build with confidence</h3>
              <p className="text-black/50 text-base leading-relaxed">
                Construction begins with a fixed timeline and transparent pricing. You'll have full visibility at every stage — from foundation to final walkthrough.
              </p>
            </div>
          </div>

          {/* CTA under steps */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14 lg:mt-20">
            <Button
              size="lg"
              className="w-full sm:w-auto sm:min-w-[240px] h-[48px] bg-[#c6912c] hover:bg-[#a67923] text-white font-medium text-sm tracking-wide rounded-[4px] shadow-lg transition-all hover:scale-105"
              onClick={() => {
                const param = selectedProjectType ? `?type=${selectedProjectType}` : ""
                router.push(`/cost-estimator${param}`)
              }}
            >
              Start with Step 1 →
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto sm:min-w-[240px] h-[48px] border border-black/15 text-black/70 hover:bg-black hover:text-white bg-transparent font-medium text-sm tracking-wide rounded-[4px] transition-all hover:scale-105"
              asChild
            >
              <Link href="/contact">Skip to consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ━━━ SERVICE LANES — Choose your path ━━━ */}
      <section
        id="services"
        ref={serviceCardsRef}
        className="py-16 lg:py-24 bg-white"
      >
        <div className="px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto">
          <div className="max-w-3xl mb-12 lg:mb-16">
            <p className="text-[#c6912c] font-medium tracking-[0.2em] uppercase text-sm mb-4">Our services</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black tracking-tight">
              Choose your path.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {SERVICE_CARDS.map((card) => (
              <ServiceCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>


      <section
        ref={testimonialsRef}
        className={`py-24 lg:py-32 ${bottomBgColor} transition-colors duration-300 ease-in-out relative overflow-hidden`}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c6912c]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto">
          <div className="max-w-3xl mb-16 lg:mb-20">
            <p className="text-[#c6912c] font-medium tracking-[0.2em] uppercase text-sm mb-4">Testimonials</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Clients who built without compromise.
            </h2>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed">
              Real projects, real results — from homeowners who trusted Antova with their vision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard key={testimonial.headline} {...testimonial} />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16 lg:mt-20">
            <Button
              size="lg"
              className="w-full sm:w-auto sm:min-w-[264px] h-[48px] bg-[#c6912c] hover:bg-[#a67923] text-white font-medium text-sm tracking-wide rounded-[4px] shadow-lg transition-all hover:scale-105"
              asChild
            >
              <Link href="/projects" scroll={true}>View All Projects</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto sm:min-w-[264px] h-[48px] border border-white/20 text-white hover:bg-white hover:text-black bg-transparent font-medium text-sm tracking-wide rounded-[4px] transition-all hover:scale-105"
              asChild
            >
              <Link href="/contact" scroll={true}>Start Your Project</Link>
            </Button>
          </div>
        </div>
      </section>


      {/* ━━━ WHY AI — Differentiator, not duplicate CTA ━━━ */}
      <section className="relative flex items-center overflow-hidden py-16 lg:py-24 bg-[#0a0a0a]">
        <div className="relative z-10 px-6 lg:px-12 xl:px-16 w-full max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Left side - Text content */}
            <div className="space-y-6 order-1">
              <p className="text-[#c6912c] text-sm font-medium tracking-widest uppercase">
                Why we're different
              </p>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                AI precision meets<br />
                <span className="text-[#c6912c]">master craftsmanship.</span>
              </h2>
              
              <p className="text-base md:text-lg lg:text-xl text-white/60 leading-relaxed max-w-xl">
                Traditional builders guess. We calculate. Our AI analyzes thousands of data points to deliver estimates that hold — so your project stays on track from day one.
              </p>

              {/* Differentiators */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#c6912c] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <p className="text-white/70 text-base"><span className="text-white font-medium">Estimates that hold.</span> AI-powered scope analysis eliminates guesswork and budget surprises.</p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#c6912c] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <p className="text-white/70 text-base"><span className="text-white font-medium">Full transparency.</span> Real-time progress tracking and material cost breakdowns at every stage.</p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#c6912c] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <p className="text-white/70 text-base"><span className="text-white font-medium">Human expertise + AI intelligence.</span> Technology handles the numbers. Our craftsmen handle the build.</p>
                </div>
              </div>
            </div>

            {/* Right side - Video */}
            <div className="relative order-2">
              <div className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-square">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/ai-video-poster.jpg"
                  className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                  onClick={(e) => {
                    const video = e.currentTarget;
                    video.play();
                    setIsVideoPlaying(true);
                  }}
                  onPlay={() => setIsVideoPlaying(true)}
                >
                  <source src="/ai-video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0a0a0a] opacity-30 hidden lg:block pointer-events-none" />
              </div>
              <div className="absolute -inset-4 bg-[#c6912c]/10 rounded-3xl blur-3xl -z-10 hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <GoogleReviewsSection />

      {/* ━━━ FAQ — Objection-handling before the close ━━━ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14 lg:mb-18">
              <p className="text-[#c6912c] font-medium tracking-[0.2em] uppercase text-sm mb-4">Common questions</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black tracking-tight">
                Before you decide.
              </h2>
            </div>

            <div className="divide-y divide-black/[0.08]">
              {/* Q1 — Budget fear */}
              <details className="group py-6">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg md:text-xl font-semibold text-black pr-8">What if my project goes over budget?</h3>
                  <span className="text-[#c6912c] flex-shrink-0 transition-transform duration-200 group-open:rotate-45">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  </span>
                </summary>
                <p className="text-black/50 text-base leading-relaxed mt-4 pr-14">
                  It won't. Our AI-powered scope analysis identifies cost variables before construction begins — not after. You'll receive a detailed investment range upfront, and we lock in pricing before breaking ground. In 150+ projects, our final costs have stayed within the original estimate.
                </p>
              </details>

              {/* Q2 — Timeline fear */}
              <details className="group py-6">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg md:text-xl font-semibold text-black pr-8">How long does a typical project take?</h3>
                  <span className="text-[#c6912c] flex-shrink-0 transition-transform duration-200 group-open:rotate-45">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  </span>
                </summary>
                <p className="text-black/50 text-base leading-relaxed mt-4 pr-14">
                  Timelines vary by scope — a major renovation typically runs 3–6 months, while a custom home build is 8–14 months. We provide a detailed construction timeline during your free consultation, and we've maintained a 98% on-time delivery rate across all projects.
                </p>
              </details>

              {/* Q3 — Consultation commitment */}
              <details className="group py-6">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg md:text-xl font-semibold text-black pr-8">What's included in the free consultation?</h3>
                  <span className="text-[#c6912c] flex-shrink-0 transition-transform duration-200 group-open:rotate-45">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  </span>
                </summary>
                <p className="text-black/50 text-base leading-relaxed mt-4 pr-14">
                  A 45-minute session with your project team where we walk through your vision, review your AI estimate in detail, discuss materials and design options, and provide a preliminary timeline. You'll leave with a clear understanding of scope, investment, and next steps — with zero obligation to proceed.
                </p>
              </details>

              {/* Q4 — Location */}
              <details className="group py-6">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg md:text-xl font-semibold text-black pr-8">Do you only work in the Pacific Northwest?</h3>
                  <span className="text-[#c6912c] flex-shrink-0 transition-transform duration-200 group-open:rotate-45">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  </span>
                </summary>
                <p className="text-black/50 text-base leading-relaxed mt-4 pr-14">
                  Our primary service area covers the Inland Northwest — Eastern Washington, Northern Idaho, and surrounding regions. For select projects outside this area, we offer consulting and project management services. Use the estimator to start, and we'll discuss logistics during your consultation.
                </p>
              </details>

              {/* Q5 — AI trust */}
              <details className="group py-6">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg md:text-xl font-semibold text-black pr-8">How accurate is the AI estimate?</h3>
                  <span className="text-[#c6912c] flex-shrink-0 transition-transform duration-200 group-open:rotate-45">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  </span>
                </summary>
                <p className="text-black/50 text-base leading-relaxed mt-4 pr-14">
                  The online estimator provides a realistic investment range based on project type, size, and regional data. It's designed to give you directional clarity — not a final quote. During your consultation, we refine the numbers with site-specific details, material selections, and your exact specifications to produce a precise, locked-in estimate.
                </p>
              </details>

              {/* Q6 — Post-build warranty */}
              <details className="group py-6">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg md:text-xl font-semibold text-black pr-8">What happens after the build is complete?</h3>
                  <span className="text-[#c6912c] flex-shrink-0 transition-transform duration-200 group-open:rotate-45">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  </span>
                </summary>
                <p className="text-black/50 text-base leading-relaxed mt-4 pr-14">
                  We don't disappear after the final walkthrough. Every Antova project includes a comprehensive warranty and a dedicated point of contact for any post-construction needs. Many of our clients return for additional projects — that's why our satisfaction rate is 98%.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ FINAL CTA — Strong close for convinced visitors ━━━ */}
      <section className="py-24 lg:py-32 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c6912c]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Ready to build without compromise?
          </h2>
          <p className="text-white/50 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            See your realistic investment range in 60 seconds — or speak directly with our team about your vision.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto sm:min-w-[264px] h-[52px] bg-[#c6912c] hover:bg-[#a67923] text-white font-semibold text-base tracking-wide rounded-[4px] shadow-lg shadow-[#c6912c]/20 transition-all hover:scale-105 hover:shadow-[#c6912c]/40"
              onClick={() => {
                const param = selectedProjectType ? `?type=${selectedProjectType}` : ""
                router.push(`/cost-estimator${param}`)
              }}
            >
              Reveal My Investment Range →
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto sm:min-w-[264px] h-[52px] border border-white/20 text-white hover:bg-white hover:text-black bg-transparent font-semibold text-base tracking-wide rounded-[4px] transition-all hover:scale-105"
              asChild
            >
              <Link href="/contact">Book a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
