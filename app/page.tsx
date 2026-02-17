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
  {
    title: "Consulting & Engineering",
    image: "/images/engineering-blueprints.png",
    alt: "Architects working on blueprints and structural plans",
    href: "/services/engineering-consulting",
  },
]

const SECONDARY_SERVICES = [
  {
    title: "Commercial Projects",
    description: "Office, retail, and mixed-use builds designed around your business needs.",
    href: "/services/commercial",
    image: "/project-1.jpg",
    alt: "Commercial construction project",
  },
  {
    title: "Remote Builds",
    description: "Full-service project management for builds outside the Inland Northwest.",
    href: "/services/remote",
    image: "/project-2.jpg",
    alt: "Remote build project management",
  },
]

const PROJECT_GALLERY = [
  {
    title: "Lakeside Modern Retreat",
    type: "Custom Home",
    image: "/project-1.jpg",
    href: "/projects",
  },
  {
    title: "Mountain View Estate",
    type: "New Build",
    image: "/project-2.jpg",
    href: "/projects",
  },
  {
    title: "Alpine Timber Lodge",
    type: "Custom Home",
    image: "/hero-winter-mountain-home.png",
    href: "/projects",
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
        <div className="relative w-9 h-14 border-2 border-white/70 rounded-full flex justify-center group-hover:border-[#c6912c] transition-colors duration-300">
          <div className="w-1.5 h-3 bg-[#c6912c] rounded-full mt-2.5 animate-scroll-wheel" />
          <div className="absolute inset-0 rounded-full bg-[#c6912c]/0 group-hover:bg-[#c6912c]/10 transition-all duration-300" />
        </div>
        <div className="flex flex-col items-center -space-y-2">
          <svg className="w-7 h-7 text-white/80 animate-chevron-1 group-hover:text-[#c6912c] transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <svg className="w-7 h-7 text-white/50 animate-chevron-2 group-hover:text-[#c6912c]/70 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
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
        <svg key={star} className={`w-4 h-4 ${star <= rating ? "text-[#c6912c]" : "text-white/20"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

interface ServiceCardProps { title: string; image: string; alt: string; href: string }

function ServiceCard({ title, image, alt, href }: ServiceCardProps) {
  return (
    <Link href={href}>
      <div className="group relative overflow-hidden rounded-xl cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.02] aspect-[4/3]">
        <Image src={image} alt={alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-center" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 30%, transparent 60%)" }} />
        <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between">
          <h3 className="text-white font-medium text-base">{title}</h3>
          <ArrowIcon />
        </div>
      </div>
    </Link>
  )
}

interface TestimonialCardProps { headline: string; service: string; quote: string; author: string; role: string; company: string; videoThumbnail: string }

function TestimonialCard({ headline, service, quote, author, role, company, videoThumbnail }: TestimonialCardProps) {
  return (
    <div className="group relative bg-[#111] rounded-2xl overflow-hidden border border-white/10 hover:border-[#c6912c]/40 transition-all duration-500">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c6912c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-between mb-5">
          <span className="text-[#c6912c] text-xs font-medium tracking-[0.2em] uppercase">{service}</span>
          <QuoteIcon />
        </div>
        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 tracking-tight">{headline}</h3>
        <blockquote className="text-white/70 text-base leading-relaxed mb-6">"{quote}"</blockquote>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-[#c6912c]/20 flex items-center justify-center">
            <span className="text-[#c6912c] font-semibold text-sm">{getInitials(author)}</span>
          </div>
          <div>
            <p className="text-white font-medium">{author}</p>
            <p className="text-white/50 text-sm">{role}, {company}</p>
          </div>
        </div>
        <div className="relative aspect-[2/1] rounded-xl overflow-hidden cursor-pointer">
          <Image src={videoThumbnail} alt={`${author} testimonial video`} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
          <PlayIcon />
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 rounded text-white/90 text-xs font-medium">2:34</div>
        </div>
      </div>
    </div>
  )
}

interface GoogleReviewCardProps { author_name: string; rating: number; relative_time_description: string; text: string; image: string | null }

function GoogleReviewCard({ author_name, rating, relative_time_description, text, image }: GoogleReviewCardProps) {
  return (
    <div className="group relative bg-[#111] rounded-2xl overflow-hidden border border-white/10 hover:border-[#c6912c]/40 transition-all duration-500 flex-shrink-0 w-[340px] sm:w-[380px]">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c6912c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="p-6 lg:p-8">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#c6912c]/20 flex items-center justify-center">
              <span className="text-[#c6912c] font-semibold text-xs">{getInitials(author_name)}</span>
            </div>
            <div>
              <p className="text-white font-medium text-sm">{author_name}</p>
              <p className="text-white/40 text-xs">{relative_time_description}</p>
            </div>
          </div>
          <StarRating rating={rating} />
        </div>
        <blockquote className="text-white/60 text-sm leading-relaxed mb-5 line-clamp-4">"{text}"</blockquote>
        <div className="pt-4 border-t border-white/10 flex items-center gap-2">
          <GoogleIcon />
          <span className="text-white/40 text-xs">Google Review</span>
        </div>
      </div>
    </div>
  )
}

function GoogleReviewsSection() {
  const avgRating = GOOGLE_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / GOOGLE_REVIEWS.length
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-14 lg:py-18 bg-black relative overflow-hidden">
      <div className="relative z-10 px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
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
          <div className="flex items-center gap-3">
            <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm text-white/70 border border-white/15 rounded-[4px] hover:bg-white/5 hover:border-white/30 transition-all duration-300">
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-medium rounded-[4px] hover:bg-white/90 transition-colors duration-300">
              <GoogleIcon />
              Write a Review
            </a>
          </div>
        </div>
        {/* Scrollable review cards */}
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {GOOGLE_REVIEWS.map((review) => (
            <div key={review.author_name} className="snap-start">
              <GoogleReviewCard {...review} />
            </div>
          ))}
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
  const [formName, setFormName] = useState("")
  const [formEmail, setFormEmail] = useState("")
  const [formProjectType, setFormProjectType] = useState("")
  const [formSubmitted, setFormSubmitted] = useState(false)
  const router = useRouter()
  const serviceCardsRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)

  const isTestimonialsVisible = useScrollThreshold(testimonialsRef, TESTIMONIALS_THRESHOLD)

  useEffect(() => {
    const titleTimer = setTimeout(() => setShowTitle(true), 300)
    const subtitleTimer = setTimeout(() => setShowSubtitleAndButtons(true), 1000)
    const navbarTimer = setTimeout(() => setShowNavbar(true), 1800)
    return () => { clearTimeout(titleTimer); clearTimeout(subtitleTimer); clearTimeout(navbarTimer) }
  }, [])

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > SCROLL_THRESHOLD) }
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Projects carousel arrow visibility
  useEffect(() => {
    const carousel = document.getElementById('projects-carousel')
    const leftArrow = document.getElementById('projects-carousel-left')
    const rightArrow = document.getElementById('projects-carousel-right')

    const updateArrows = () => {
      if (!carousel || !leftArrow || !rightArrow) return
      const scrollLeft = carousel.scrollLeft
      const maxScroll = carousel.scrollWidth - carousel.clientWidth

      if (scrollLeft > 50) {
        leftArrow.style.opacity = '1'
        leftArrow.style.pointerEvents = 'auto'
      } else {
        leftArrow.style.opacity = '0'
        leftArrow.style.pointerEvents = 'none'
      }

      if (scrollLeft >= maxScroll - 50) {
        rightArrow.style.opacity = '0'
        rightArrow.style.pointerEvents = 'none'
      } else {
        rightArrow.style.opacity = '1'
        rightArrow.style.pointerEvents = 'auto'
      }
    }

    if (carousel) {
      carousel.addEventListener('scroll', updateArrows)
      updateArrows()
    }
    return () => { if (carousel) carousel.removeEventListener('scroll', updateArrows) }
  }, [])

  const bottomBgColor = isTestimonialsVisible ? "bg-black" : "bg-[#f5f5f0]"

  return (
    <div className={`min-h-screen bg-white overflow-x-hidden`}>
      <style jsx global>{`
        @keyframes scroll-wheel { 0% { opacity: 1; transform: translateY(0); } 50% { opacity: 0.5; transform: translateY(10px); } 100% { opacity: 0; transform: translateY(14px); } }
        @keyframes chevron-fade-1 { 0%, 100% { opacity: 0.8; transform: translateY(0); } 50% { opacity: 1; transform: translateY(6px); } }
        @keyframes chevron-fade-2 { 0%, 100% { opacity: 0.5; transform: translateY(0); } 50% { opacity: 0.9; transform: translateY(6px); } }
        .animate-scroll-wheel { animation: scroll-wheel 1.5s ease-in-out infinite; }
        .animate-chevron-1 { animation: chevron-fade-1 1.5s ease-in-out infinite; }
        .animate-chevron-2 { animation: chevron-fade-2 1.5s ease-in-out infinite; animation-delay: 0.2s; }
        @keyframes border-pulse { 0%, 100% { border-color: rgba(198, 145, 44, 0.3); box-shadow: 0 0 0 0 rgba(198, 145, 44, 0); } 50% { border-color: rgba(198, 145, 44, 0.7); box-shadow: 0 0 12px 2px rgba(198, 145, 44, 0.15); } }
        .animate-border-pulse { animation: border-pulse 2s ease-in-out infinite; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

      <Navbar hidden={!showNavbar} />

      {/* ━━━ HERO ━━━ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute top-[56px] left-0 right-0 z-20 bg-gradient-to-r from-[#c6912c]/15 via-[#c6912c]/10 to-[#c6912c]/15 backdrop-blur-md border-y border-[#c6912c]/25 text-center py-2 px-4">
          <Link href="/offers" className="inline-flex items-center justify-center gap-3 group">
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#c6912c] animate-pulse" />
            <span className="text-white text-xs sm:text-sm font-medium tracking-wide">Spring 2026 Now Booking</span>
            <span className="text-white/30 text-xs">|</span>
            <span className="text-[#c6912c] text-xs sm:text-sm font-semibold tracking-wide">Free Design Consultation Included</span>
            <svg className="w-3.5 h-3.5 text-[#c6912c] group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>

        <div className="absolute inset-0 z-0">
          <Image src="/hero-winter-mountain-home.png" alt="Luxury mountain chalet in winter with warm interior lighting" fill priority sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        <div className="relative z-10 px-6 lg:px-12 xl:px-16 text-center w-full -mt-12 md:-mt-20">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-balance text-white transition-all duration-700 ease-out ${showTitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Your vision, built without compromise.
          </h1>
          <p className={`text-lg md:text-xl lg:text-2xl mb-14 text-white/80 tracking-wide transition-all duration-700 ease-out ${showSubtitleAndButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            See your realistic investment range in 60 seconds — no email or phone required.
          </p>

          <div className={`flex flex-col items-center gap-8 transition-all duration-700 ease-out ${showSubtitleAndButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="w-full max-w-[780px] bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-xl p-3 sm:p-4 space-y-3">
              <div className="flex items-center justify-center gap-2 pb-1">
                <svg className="w-4 h-4 text-[#c6912c]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                </svg>
                <span className="text-[#c6912c] text-xs font-semibold tracking-[0.15em] uppercase">AI-Powered Estimator</span>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                <div className="relative flex-1">
                  <select
                    value={selectedProjectType}
                    onChange={(e) => setSelectedProjectType(e.target.value)}
                    className={`w-full h-[54px] px-5 pr-12 bg-white text-black/80 text-base font-medium rounded-lg border-2 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#c6912c]/50 transition-all shadow-sm ${selectedProjectType ? "border-[#c6912c]/30" : "animate-border-pulse"}`}
                  >
                    <option value="" disabled>① Select your project type</option>
                    <option value="custom-home">Signature Custom Design</option>
                    <option value="renovation">Renovation</option>
                    <option value="new-build">New Build</option>
                    <option value="consulting">Consulting & Engineering</option>
                  </select>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/30 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
                <Button size="lg" className="h-[54px] bg-[#c6912c] hover:bg-[#a67923] text-white font-semibold px-10 text-base tracking-wide rounded-lg shadow-lg shadow-[#c6912c]/20 transition-all hover:scale-[1.02] hover:shadow-[#c6912c]/40 whitespace-nowrap"
                  onClick={() => { const param = selectedProjectType ? `?type=${selectedProjectType}` : ""; router.push(`/cost-estimator${param}`) }}>
                  Reveal My Investment Range →
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-white/60 text-xs tracking-wide pt-1">
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-[#c6912c]/70" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  60-second results
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-[#c6912c]/70" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                  No email required
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-[#c6912c]/70" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  150+ builds delivered
                </span>
              </div>
            </div>
          </div>
        </div>
        <ScrollIndicator show={showSubtitleAndButtons} />
      </section>

      {/* ━━━ TRUST STRIP ━━━ */}
      <div className="bg-white">
        <div className="px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto">
          <div className="flex overflow-x-auto md:overflow-visible md:grid md:grid-cols-5 gap-0 py-8 md:py-10 border-b border-black/[0.06] scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex flex-col items-center justify-center gap-2 min-w-[140px] flex-shrink-0 px-4 md:px-0 border-r border-black/[0.06] md:border-r-0">
              <div className="flex items-center gap-2">
                <GoogleIcon />
                <span className="text-[#c6912c] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">5.0</span>
              </div>
              <div className="flex gap-0.5">{[1,2,3,4,5].map(i => (<svg key={i} className="w-4 h-4 text-[#c6912c]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>))}</div>
              <span className="text-black/40 text-sm whitespace-nowrap">Google Rating</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 min-w-[140px] flex-shrink-0 px-4 md:px-0 border-r border-black/[0.06] md:border-r-0">
              <span className="text-[#c6912c] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">150+</span>
              <span className="text-black/40 text-sm whitespace-nowrap">Projects Completed</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 min-w-[140px] flex-shrink-0 px-4 md:px-0 border-r border-black/[0.06] md:border-r-0">
              <span className="text-[#c6912c] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">12</span>
              <span className="text-black/40 text-sm whitespace-nowrap">Years Experience</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 min-w-[140px] flex-shrink-0 px-4 md:px-0 border-r border-black/[0.06] md:border-r-0">
              <span className="text-[#c6912c] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">98%</span>
              <span className="text-black/40 text-sm whitespace-nowrap">Client Satisfaction</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 min-w-[140px] flex-shrink-0 px-4 md:px-0">
              <span className="text-[#c6912c] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">$50M+</span>
              <span className="text-black/40 text-sm whitespace-nowrap">Total Value Built</span>
            </div>
          </div>
        </div>
      </div>

      {/* ━━━ OFFERS (Tesla-style) ━━━ */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Card 1: Spring Scheduling — urgency + scarcity */}
            <Link href="/offers" className="block">
              <div className="group relative bg-[#f4f4f0] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-black/[0.06] cursor-pointer">
                <div className="flex flex-col sm:flex-row items-stretch">
                  <div className="flex-1 flex flex-col justify-center p-6 sm:p-8">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 w-fit bg-[#c6912c]/10 rounded-full text-[#c6912c] text-[11px] font-semibold tracking-wide uppercase mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c6912c] animate-pulse" />
                      Limited Availability
                    </span>
                    <h2 className="text-2xl md:text-[1.7rem] font-bold text-black mb-2 tracking-tight leading-tight group-hover:text-[#c6912c] transition-colors">Spring 2026 — now booking.</h2>
                    <p className="text-black/45 text-sm leading-relaxed mb-4 max-w-sm">Free design consultation & AI scope analysis included with every project.</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-black/70 group-hover:text-[#c6912c] transition-colors">
                      Reserve Your Spot
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </span>
                  </div>
                  <div className="relative w-full sm:w-[220px] lg:w-[260px] min-h-[180px] sm:min-h-[220px] flex-shrink-0">
                    <Image
                      src="/new-builds.png"
                      alt="Antova Builders new construction project"
                      fill
                      sizes="(max-width: 640px) 100vw, 260px"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </Link>

            {/* Card 2: AI Estimator — instant value, zero friction */}
            <div
              onClick={() => { const param = selectedProjectType ? `?type=${selectedProjectType}` : ""; router.push(`/cost-estimator${param}`) }}
              className="group relative bg-[#f4f4f0] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-black/[0.06] cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row items-stretch">
                <div className="flex-1 flex flex-col justify-center p-6 sm:p-8">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 w-fit bg-[#c6912c]/10 rounded-full text-[#c6912c] text-[11px] font-semibold tracking-wide uppercase mb-3">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                    AI-Powered
                  </span>
                  <h2 className="text-2xl md:text-[1.7rem] font-bold text-black mb-2 tracking-tight leading-tight group-hover:text-[#c6912c] transition-colors">Your investment range in 60 seconds.</h2>
                  <p className="text-black/45 text-sm leading-relaxed mb-4 max-w-sm">No email, no phone call — just select your project type and get a realistic cost range instantly.</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-black/70 group-hover:text-[#c6912c] transition-colors">
                    Try the Estimator
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </span>
                </div>
                <div className="relative w-full sm:w-[220px] lg:w-[260px] min-h-[180px] sm:min-h-[220px] flex-shrink-0">
                  <Image
                    src="/renovation-human.png"
                    alt="Professional reviewing renovation plans with Antova"
                    fill
                    sizes="(max-width: 640px) 100vw, 260px"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ PROBLEM → SOLUTION (Tesla-style split) ━━━ */}
      <section className="bg-white overflow-hidden">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-2 min-h-[600px] lg:min-h-[700px]">
            {/* Left: Image */}
            <div className="relative min-h-[400px] lg:min-h-0 order-2 lg:order-1">
              <Image
                src="/modern-glass-house-reflecting-in-lake-at-sunset-wi.jpg"
                alt="Modern glass house reflecting in lake at sunset — Antova custom build"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              {/* Subtle gradient overlay on right edge for text blending on desktop */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10 hidden lg:block" />
              {/* Bottom gradient for mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:hidden" />
            </div>

            {/* Right: Content */}
            <div className="flex flex-col justify-center px-6 lg:px-16 xl:px-20 py-14 lg:py-20 order-1 lg:order-2">
              <p className="text-[#c6912c] font-medium tracking-[0.2em] uppercase text-sm mb-4">Why homeowners hesitate</p>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] xl:text-5xl font-bold text-black mb-5 tracking-tight leading-[1.15]">
                Building a home shouldn't feel like a gamble.
              </h2>
              <p className="text-black/50 text-base lg:text-lg leading-relaxed mb-10 max-w-xl">
                Most homeowners delay their dream project because they've heard the horror stories — budgets that double, timelines that slip, contractors who disappear. We built Antova to eliminate every one of those fears.
              </p>

              {/* Three promises — vertical stack with left-aligned icons */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#c6912c]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-[#c6912c]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-1">No investment surprises</h3>
                    <p className="text-black/45 text-sm leading-relaxed">Our AI estimator gives you a realistic investment range before you commit. No hidden fees, no scope creep.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#c6912c]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-[#c6912c]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-1">On time, every time</h3>
                    <p className="text-black/45 text-sm leading-relaxed">150+ projects delivered on schedule. You'll know the timeline upfront — and we'll stick to it.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#c6912c]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-[#c6912c]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-1">Craftsmanship guaranteed</h3>
                    <p className="text-black/45 text-sm leading-relaxed">98% client satisfaction across every project. We're with you from first sketch to final walkthrough.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ HOW IT WORKS ━━━ */}
      <section className="py-16 lg:py-20 bg-[#fafafa] border-y border-black/[0.06]">
        <div className="px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <p className="text-[#c6912c] font-medium tracking-[0.2em] uppercase text-sm mb-4">How it works</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black tracking-tight">Three steps to your dream home.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-16 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-[#c6912c] text-5xl lg:text-6xl font-bold mb-3 tracking-tight">01</div>
              <h3 className="text-xl font-bold text-black mb-2">See your investment range</h3>
              <p className="text-black/50 text-base leading-relaxed">Select your project type and get a realistic cost range in 60 seconds. No email, no obligation — just clarity.</p>
            </div>
            <div className="text-center">
              <div className="text-[#c6912c] text-5xl lg:text-6xl font-bold mb-3 tracking-tight">02</div>
              <h3 className="text-xl font-bold text-black mb-2">Meet your project team</h3>
              <p className="text-black/50 text-base leading-relaxed">Book a free design consultation. We'll walk through your vision, refine the scope, and create a detailed plan tailored to your goals.</p>
            </div>
            <div className="text-center">
              <div className="text-[#c6912c] text-5xl lg:text-6xl font-bold mb-3 tracking-tight">03</div>
              <h3 className="text-xl font-bold text-black mb-2">Build with confidence</h3>
              <p className="text-black/50 text-base leading-relaxed">Construction begins with a fixed timeline and transparent pricing. You'll have full visibility at every stage — from foundation to final walkthrough.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 lg:mt-16">
            <Button size="lg" className="w-full sm:w-auto sm:min-w-[240px] h-[48px] bg-[#c6912c] hover:bg-[#a67923] text-white font-medium text-sm tracking-wide rounded-[4px] shadow-lg transition-all hover:scale-105"
              onClick={() => { const param = selectedProjectType ? `?type=${selectedProjectType}` : ""; router.push(`/cost-estimator${param}`) }}>
              Start with Step 1 →
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto sm:min-w-[240px] h-[48px] border border-black/15 text-black/70 hover:bg-black hover:text-white bg-transparent font-medium text-sm tracking-wide rounded-[4px] transition-all hover:scale-105" asChild>
              <Link href="/contact">Skip to consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ━━━ SERVICE LANES ━━━ */}
      <section id="services" ref={serviceCardsRef} className="py-14 lg:py-18 bg-white">
        <div className="px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto">
          <div className="max-w-3xl mb-10 lg:mb-12">
            <p className="text-[#c6912c] font-medium tracking-[0.2em] uppercase text-sm mb-4">Our services</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black tracking-tight">Choose your path.</h2>
          </div>
          {/* Primary services — 2x2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {SERVICE_CARDS.map((card) => (
              <Link key={card.title} href={card.href}>
                <div className="group relative overflow-hidden rounded-xl cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.02] aspect-[16/10]">
                  <Image src={card.image} alt={card.alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover object-center transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 30%, transparent 60%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex items-center justify-between">
                    <h3 className="text-white font-medium text-base md:text-lg">{card.title}</h3>
                    <ArrowIcon />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* Secondary services — compact cards with images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mt-4 md:mt-5">
            {SECONDARY_SERVICES.map((service) => (
              <Link key={service.title} href={service.href}>
                <div className="group bg-[#f4f4f0] rounded-xl overflow-hidden hover:bg-[#eeeee8] transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-black/[0.04]">
                  <div className="flex flex-row items-stretch">
                    <div className="flex-1 flex flex-col justify-center p-6 md:p-8">
                      <h3 className="text-lg md:text-xl font-bold text-black mb-1.5 group-hover:text-[#c6912c] transition-colors">{service.title}</h3>
                      <p className="text-black/45 text-sm leading-relaxed mb-4">{service.description}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-black/50 group-hover:text-[#c6912c] transition-colors">
                        Learn more
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                    <div className="relative w-[160px] md:w-[200px] flex-shrink-0 hidden sm:block">
                      <Image
                        src={service.image}
                        alt={service.alt}
                        fill
                        sizes="200px"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ PROJECT GALLERY (carousel) ━━━ */}
      <section className="py-14 lg:py-18 bg-[#f5f5f0]">
        {/* Header */}
        <div className="px-6 lg:px-12 xl:px-[10%] mb-10 lg:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <p className="text-[#c6912c] font-medium tracking-[0.2em] uppercase text-sm mb-4">Recent projects</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black tracking-tight">Craftsmanship you can see.</h2>
            </div>
            <Link href="/projects" className="inline-flex items-center gap-2 text-black/50 hover:text-black text-sm font-medium transition-colors group">
              View all projects
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            id="projects-carousel"
            className="flex gap-[18px] md:gap-[24px] lg:gap-[27px] overflow-x-auto scrollbar-hide scroll-smooth pl-6 md:pl-12 lg:pl-[10%] pr-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {PROJECT_GALLERY.map((project) => (
              <Link key={project.title} href={project.href} className="flex-shrink-0 w-[409px] sm:w-[512px] md:w-[615px] lg:w-[718px] xl:w-[793px] group">
                <div className="relative w-full aspect-[16/11.67] rounded-lg overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 409px, (max-width: 768px) 512px, (max-width: 1024px) 615px, (max-width: 1280px) 718px, 793px"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] text-black mt-5 md:mt-7 uppercase tracking-wide font-bold">
                  {project.title}
                </h3>
                <p className="text-[14px] md:text-[15px] lg:text-[16px] text-gray-600 leading-relaxed mt-2 md:mt-3">
                  {project.type}
                </p>
              </Link>
            ))}
            {/* End spacer */}
            <div className="flex-shrink-0 w-6" />
          </div>

          {/* Left arrow */}
          <button
            id="projects-carousel-left"
            className="absolute left-0 top-[36%] -translate-y-1/2 w-[40px] h-[37px] md:w-[44px] md:h-[44px] bg-white/60 backdrop-blur-sm flex items-center justify-center hover:bg-white/90 transition-all duration-300 z-10 opacity-0 pointer-events-none"
            aria-label="Previous project"
            onClick={() => {
              const c = document.getElementById('projects-carousel')
              if (c) {
                const firstCard = c.querySelector('a') as HTMLElement
                const scrollAmount = firstCard ? firstCard.offsetWidth + 27 : 820
                c.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
              }
            }}
          >
            <svg className="w-4 h-4 md:w-[18px] md:h-[18px] text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            id="projects-carousel-right"
            className="absolute right-[2%] top-[36%] -translate-y-1/2 w-[40px] h-[37px] md:w-[44px] md:h-[44px] bg-white/60 backdrop-blur-sm flex items-center justify-center hover:bg-white/90 transition-all duration-300 z-10"
            aria-label="Next project"
            onClick={() => {
              const c = document.getElementById('projects-carousel')
              if (c) {
                const firstCard = c.querySelector('a') as HTMLElement
                const scrollAmount = firstCard ? firstCard.offsetWidth + 27 : 820
                c.scrollBy({ left: scrollAmount, behavior: 'smooth' })
              }
            }}
          >
            <svg className="w-4 h-4 md:w-[18px] md:h-[18px] text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </section>

      {/* ━━━ TESTIMONIALS ━━━ */}
      <section ref={testimonialsRef} className={`py-16 lg:py-20 ${bottomBgColor} transition-colors duration-300 ease-in-out relative overflow-hidden`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c6912c]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto">
          <div className="max-w-3xl mb-10 lg:mb-14">
            <p className="text-[#c6912c] font-medium tracking-[0.2em] uppercase text-sm mb-4">Testimonials</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight">Clients who built without compromise.</h2>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed">Real projects, real results — from homeowners who trusted Antova with their vision.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {TESTIMONIALS.map((testimonial) => (<TestimonialCard key={testimonial.headline} {...testimonial} />))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 lg:mt-16">
            <Button size="lg" className="w-full sm:w-auto sm:min-w-[264px] h-[48px] bg-[#c6912c] hover:bg-[#a67923] text-white font-medium text-sm tracking-wide rounded-[4px] shadow-lg transition-all hover:scale-105"
              onClick={() => { const param = selectedProjectType ? `?type=${selectedProjectType}` : ""; router.push(`/cost-estimator${param}`) }}>
              See What Your Build Costs →
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto sm:min-w-[264px] h-[48px] border border-white/20 text-white hover:bg-white hover:text-black bg-transparent font-medium text-sm tracking-wide rounded-[4px] transition-all hover:scale-105" asChild>
              <Link href="/contact" scroll={true}>Talk to Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ━━━ WHY AI ━━━ */}
      <section className="relative flex items-center overflow-hidden py-14 lg:py-20 bg-[#0a0a0a]">
        <div className="relative z-10 px-6 lg:px-12 xl:px-16 w-full max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div className="space-y-5 order-1">
              <p className="text-[#c6912c] text-sm font-medium tracking-widest uppercase">Why we're different</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                AI precision meets<br /><span className="text-[#c6912c]">master craftsmanship.</span>
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-white/60 leading-relaxed max-w-xl">Traditional builders guess. We calculate. Our AI analyzes thousands of data points to deliver estimates that hold — so your project stays on track from day one.</p>
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
            <div className="relative order-2">
              <div className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-square">
                <video autoPlay loop muted playsInline poster="/ai-video-poster.jpg" className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                  onClick={(e) => { const video = e.currentTarget; video.play(); setIsVideoPlaying(true); }} onPlay={() => setIsVideoPlaying(true)}>
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

      <GoogleReviewsSection />

      {/* ━━━ FAQ ━━━ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 lg:mb-14">
              <p className="text-[#c6912c] font-medium tracking-[0.2em] uppercase text-sm mb-4">Common questions</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black tracking-tight">Before you decide.</h2>
            </div>
            <div className="divide-y divide-black/[0.08]">
              <details className="group py-5">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg md:text-xl font-semibold text-black pr-8">What if my project goes over budget?</h3>
                  <span className="text-[#c6912c] flex-shrink-0 transition-transform duration-200 group-open:rotate-45"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg></span>
                </summary>
                <p className="text-black/50 text-base leading-relaxed mt-3 pr-14">It won't. Our AI-powered scope analysis identifies cost variables before construction begins — not after. You'll receive a detailed investment range upfront, and we lock in pricing before breaking ground. In 150+ projects, our final costs have stayed within the original estimate.</p>
              </details>
              <details className="group py-5">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg md:text-xl font-semibold text-black pr-8">How long does a typical project take?</h3>
                  <span className="text-[#c6912c] flex-shrink-0 transition-transform duration-200 group-open:rotate-45"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg></span>
                </summary>
                <p className="text-black/50 text-base leading-relaxed mt-3 pr-14">Timelines vary by scope — a major renovation typically runs 3–6 months, while a custom home build is 8–14 months. We provide a detailed construction timeline during your free consultation, and we've maintained a 98% on-time delivery rate across all projects.</p>
              </details>
              <details className="group py-5">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg md:text-xl font-semibold text-black pr-8">What's included in the free consultation?</h3>
                  <span className="text-[#c6912c] flex-shrink-0 transition-transform duration-200 group-open:rotate-45"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg></span>
                </summary>
                <p className="text-black/50 text-base leading-relaxed mt-3 pr-14">A 45-minute session with your project team where we walk through your vision, review your AI estimate in detail, discuss materials and design options, and provide a preliminary timeline. You'll leave with a clear understanding of scope, investment, and next steps — with zero obligation to proceed.</p>
              </details>
              <details className="group py-5">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg md:text-xl font-semibold text-black pr-8">Do you only work in the Pacific Northwest?</h3>
                  <span className="text-[#c6912c] flex-shrink-0 transition-transform duration-200 group-open:rotate-45"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg></span>
                </summary>
                <p className="text-black/50 text-base leading-relaxed mt-3 pr-14">Our primary service area covers the Inland Northwest — Eastern Washington, Northern Idaho, and surrounding regions. For select projects outside this area, we offer consulting and project management services. Use the estimator to start, and we'll discuss logistics during your consultation.</p>
              </details>
              <details className="group py-5">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg md:text-xl font-semibold text-black pr-8">How accurate is the AI estimate?</h3>
                  <span className="text-[#c6912c] flex-shrink-0 transition-transform duration-200 group-open:rotate-45"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg></span>
                </summary>
                <p className="text-black/50 text-base leading-relaxed mt-3 pr-14">The online estimator provides a realistic investment range based on project type, size, and regional data. It's designed to give you directional clarity — not a final quote. During your consultation, we refine the numbers with site-specific details, material selections, and your exact specifications to produce a precise, locked-in estimate.</p>
              </details>
              <details className="group py-5">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg md:text-xl font-semibold text-black pr-8">What happens after the build is complete?</h3>
                  <span className="text-[#c6912c] flex-shrink-0 transition-transform duration-200 group-open:rotate-45"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg></span>
                </summary>
                <p className="text-black/50 text-base leading-relaxed mt-3 pr-14">We don't disappear after the final walkthrough. Every Antova project includes a comprehensive warranty and a dedicated point of contact for any post-construction needs. Many of our clients return for additional projects — that's why our satisfaction rate is 98%.</p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ FINAL CTA — Inline Form ━━━ */}
      <section className="py-20 lg:py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c6912c]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">Let's build something extraordinary.</h2>
              <p className="text-white/50 text-lg md:text-xl leading-relaxed">Tell us about your project and we'll get back to you within 24 hours with next steps.</p>
            </div>

            {formSubmitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#c6912c]/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#c6912c]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">We've got your details.</h3>
                <p className="text-white/50 text-base">Our team will reach out within 24 hours. In the meantime, try the <button onClick={() => router.push('/cost-estimator')} className="text-[#c6912c] hover:underline">AI Estimator</button> for an instant range.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-5 py-4 bg-white/[0.07] border border-white/[0.1] rounded-lg text-white placeholder:text-white/30 text-base focus:outline-none focus:border-[#c6912c]/50 focus:ring-1 focus:ring-[#c6912c]/30 transition-all"
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-5 py-4 bg-white/[0.07] border border-white/[0.1] rounded-lg text-white placeholder:text-white/30 text-base focus:outline-none focus:border-[#c6912c]/50 focus:ring-1 focus:ring-[#c6912c]/30 transition-all"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    className="w-full px-5 py-4 bg-white/[0.07] border border-white/[0.1] rounded-lg text-white placeholder:text-white/30 text-base focus:outline-none focus:border-[#c6912c]/50 focus:ring-1 focus:ring-[#c6912c]/30 transition-all"
                  />
                </div>
                <select
                  value={formProjectType}
                  onChange={(e) => setFormProjectType(e.target.value)}
                  className="w-full px-5 py-4 bg-white/[0.07] border border-white/[0.1] rounded-lg text-white text-base focus:outline-none focus:border-[#c6912c]/50 focus:ring-1 focus:ring-[#c6912c]/30 transition-all appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                >
                  <option value="" className="bg-[#1a1a1a]">Select project type</option>
                  <option value="custom-home" className="bg-[#1a1a1a]">Custom Home Design</option>
                  <option value="renovation" className="bg-[#1a1a1a]">Renovation</option>
                  <option value="new-build" className="bg-[#1a1a1a]">New Build</option>
                  <option value="consulting" className="bg-[#1a1a1a]">Consulting & Engineering</option>
                  <option value="commercial" className="bg-[#1a1a1a]">Commercial Project</option>
                  <option value="remote" className="bg-[#1a1a1a]">Remote Build</option>
                </select>
                <button
                  onClick={() => setFormSubmitted(true)}
                  className="w-full px-8 py-4 bg-[#c6912c] hover:bg-[#a67923] text-white font-semibold text-base rounded-lg transition-all hover:scale-[1.01] hover:shadow-lg hover:shadow-[#c6912c]/20"
                >
                  Start My Project →
                </button>

                {/* Divider with "or" */}
                <div className="flex items-center gap-4 py-1">
                  <div className="flex-1 h-px bg-white/[0.08]" />
                  <span className="text-white/25 text-xs uppercase tracking-widest">or</span>
                  <div className="flex-1 h-px bg-white/[0.08]" />
                </div>

                {/* Phone CTA — equal weight */}
                <a href="tel:+12086258342" className="group flex items-center justify-center gap-3 w-full px-8 py-4 border border-white/[0.12] hover:border-[#c6912c]/40 rounded-lg transition-all hover:bg-white/[0.03]">
                  <svg className="w-5 h-5 text-[#c6912c]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span className="text-white/70 text-base font-medium group-hover:text-white transition-colors">Call us directly</span>
                  <span className="text-white text-base font-semibold group-hover:text-[#c6912c] transition-colors">(208) 625-8342</span>
                </a>

                <p className="text-white/25 text-xs text-center pt-1">No commitment required. We'll discuss your vision and provide a detailed scope.</p>
              </div>
            )}

            {/* Or use estimator — secondary path */}
            <div className="mt-8 pt-8 border-t border-white/[0.08] text-center">
              <p className="text-white/35 text-sm mb-3">Not ready to talk yet?</p>
              <button
                onClick={() => { const param = selectedProjectType ? `?type=${selectedProjectType}` : ""; router.push(`/cost-estimator${param}`) }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#c6912c] hover:text-[#d4a245] transition-colors"
              >
                Get an instant estimate with our AI tool
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
              <p className="text-white/25 text-xs mt-4">Available Mon–Fri, 8am–6pm PST</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
