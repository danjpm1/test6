"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"

const SCROLL_THRESHOLD = 50
const SERVICE_CARDS_THRESHOLD = 0.5
const TESTIMONIALS_THRESHOLD = 0.5

const SERVICE_CARDS = [
  {
    title: "Custom Homes",
    subtitle: "Bring your vision to life",
    image: "/modern-glass-house-reflecting-in-lake-at-sunset-wi.jpg",
    alt: "Custom homes lifestyle",
    href: "/services/signature-custom-design",
  },
  {
    title: "Renovations",
    subtitle: "Transform what you already love",
    image: "/renovation-human.png",
    alt: "Renovations lifestyle",
    href: "/services/renovation",
  },
  {
    title: "New Builds",
    subtitle: "Precision from the ground up",
    image: "/new-builds.png",
    alt: "New construction lifestyle",
    href: "/services/new-builds",
  },
]

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Explore",
    description: "Use our AI Estimator to get an instant budget range — no commitment, no contact info required.",
  },
  {
    number: "02",
    title: "Consult",
    description: "Schedule a private design consultation to discuss your vision, timeline, and investment.",
  },
  {
    number: "03",
    title: "Design",
    description: "Our architects craft a detailed plan tailored to your site, style, and budget parameters.",
  },
  {
    number: "04",
    title: "Build",
    description: "Construction begins with transparent progress updates, on-time milestones, and zero surprises.",
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

/* ─── Service Card with emotional subtitle ─── */
interface ServiceCardProps {
  title: string
  subtitle: string
  image: string
  alt: string
  href: string
}

function ServiceCard({ title, subtitle, image, alt, href }: ServiceCardProps) {
  return (
    <Link href={href}>
      <div className="group relative overflow-hidden rounded-xl cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.02] aspect-[4/3]">
        <Image 
          src={image} 
          alt={alt} 
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105" 
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.35) 35%, transparent 60%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
          <div>
            <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
            <p className="text-white/60 text-sm">{subtitle}</p>
          </div>
          <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-[#c6912c] group-hover:border-[#c6912c] transition-all duration-300">
            <ArrowIcon />
          </div>
        </div>
      </div>
    </Link>
  )
}

/* ─── Testimonial Card ─── */
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

/* ─── Google Review Card ─── */
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

/* ─── Google Reviews Section ─── */
function GoogleReviewsSection() {
  const [showAll, setShowAll] = useState(false)
  const displayedReviews = showAll ? GOOGLE_REVIEWS : GOOGLE_REVIEWS.slice(0, 3)

  const avgRating = GOOGLE_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / GOOGLE_REVIEWS.length

  return (
    <section className="py-24 lg:py-32 bg-black relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c6912c]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-20">
          <div className="max-w-3xl">
            <p className="text-[#c6912c] font-medium tracking-[0.2em] uppercase text-sm mb-4">Client Reviews</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Trusted by Our Clients
            </h2>
          </div>

          <div className="flex items-center gap-4 bg-[#111] border border-white/10 rounded-xl px-5 py-4">
            <div className="flex items-center gap-2">
              <GoogleIcon />
              <span className="text-white font-semibold text-lg">{avgRating.toFixed(1)}</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex flex-col">
              <StarRating rating={Math.round(avgRating)} />
              <span className="text-white/50 text-xs mt-1">{GOOGLE_REVIEWS.length} reviews</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayedReviews.map((review, index) => (
            <GoogleReviewCard key={index} {...review} />
          ))}
        </div>

        {GOOGLE_REVIEWS.length > 3 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-8 py-4 text-sm text-[#c6912c] border border-[#c6912c]/50 rounded-[4px] hover:bg-[#c6912c]/10 transition-all duration-300"
            >
              {showAll ? "Show Less" : `View All ${GOOGLE_REVIEWS.length} Reviews`}
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        <div className="mt-16 text-center">
          <p className="text-white/50 text-sm mb-4">Had a great experience with Antova?</p>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium rounded-[4px] hover:bg-white/90 transition-colors duration-300"
          >
            <GoogleIcon />
            Write a Review on Google
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── Hooks ─── */
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

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT — Conversion Funnel Structure
   
   Flow:
   1. Hero → emotional hook + primary CTA (AI Estimator)
   2. Choose Your Path → intent routing (Custom / Reno / New Build)
   3. AI Estimator → primary conversion mechanism (moved UP)
   4. Value Prop + Stats → trust + authority
   5. How It Works → reduce anxiety, show process clarity
   6. Testimonials → social proof
   7. Google Reviews → external validation
   8. Final CTA → capacity-based urgency
   ═══════════════════════════════════════════════════════════ */

export default function AntovaBuilders() {
  const [showNavbar, setShowNavbar] = useState(false)
  const [showTitle, setShowTitle] = useState(false)
  const [showSubtitleAndButtons, setShowSubtitleAndButtons] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
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

  const bottomBgColor = isTestimonialsVisible ? "bg-black" : "bg-white"

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Scroll indicator animations */}
      <style jsx global>{`
        @keyframes scroll-wheel {
          0% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.5; transform: translateY(10px); }
          100% { opacity: 0; transform: translateY(14px); }
        }
        @keyframes chevron-fade-1 {
          0%, 100% { opacity: 0.8; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(6px); }
        }
        @keyframes chevron-fade-2 {
          0%, 100% { opacity: 0.5; transform: translateY(0); }
          50% { opacity: 0.9; transform: translateY(6px); }
        }
        .animate-scroll-wheel { animation: scroll-wheel 1.5s ease-in-out infinite; }
        .animate-chevron-1 { animation: chevron-fade-1 1.5s ease-in-out infinite; }
        .animate-chevron-2 { animation: chevron-fade-2 1.5s ease-in-out infinite; animation-delay: 0.2s; }
      `}</style>

      <Navbar hidden={!showNavbar} />

      {/* ━━━ SECTION 1: HERO ━━━
          Purpose: Emotional hook. Orient the visitor. Drive ONE primary action.
          Changes: 
          - Headline rewritten: sells transformation, not just a tagline
          - Microcopy under CTA reduces commitment anxiety
          - Subtle capacity line creates exclusivity without discounts
      */}
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
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 px-6 lg:px-12 xl:px-16 text-center w-full -mt-32 md:-mt-40">
          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-3 tracking-tight text-balance text-white transition-all duration-700 ease-out ${
              showTitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Your vision, built without compromise.
          </h1>
          <p 
            className={`text-lg md:text-xl lg:text-2xl mb-6 text-white/80 tracking-wide transition-all duration-700 ease-out ${
              showSubtitleAndButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Luxury custom homes & renovations · Pacific Northwest
          </p>
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-3 transition-all duration-700 ease-out ${
              showSubtitleAndButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto sm:min-w-[264px] h-[40px] bg-[#c6912c] hover:bg-[#a67923] text-black font-medium px-[34px] py-0 text-sm tracking-wide rounded-[4px] shadow-lg hover:shadow-[#c6912c]/50 transition-all hover:scale-105"
              asChild
            >
              <Link href="/cost-estimator">Get Your Estimate</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto sm:min-w-[264px] h-[40px] border-2 border-white text-white hover:bg-white hover:text-black font-medium px-[34px] py-0 text-sm tracking-wide rounded-[4px] transition-all hover:scale-105 bg-transparent"
              asChild
            >
              <Link href="/contact">Book a Consultation</Link>
            </Button>
          </div>
        </div>

        <ScrollIndicator show={showSubtitleAndButtons} />
      </section>


      {/* ━━━ SECTION 2: CHOOSE YOUR PATH ━━━
          Purpose: Intent routing first — luxury clients think in project types, not budgets.
          Cards link to dedicated service pages where the estimator is pushed harder.
      */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-[#c6912c] text-sm font-medium tracking-[0.2em] uppercase mb-4">What We Build</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black tracking-tight">
              Choose your project path
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {SERVICE_CARDS.map((card) => (
              <ServiceCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>


      {/* ━━━ SECTION 3: AI ESTIMATOR ━━━
          Purpose: For visitors who scroll past the lanes — still catch them with the estimator.
          Also reinforces the estimator for those who come back from service pages.
      */}
      <section className="relative flex items-center overflow-hidden py-16 lg:py-24 lg:min-h-[80vh] bg-[#0a0a0a]">
        <div className="relative z-10 px-6 lg:px-12 xl:px-16 w-full max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Left side - Text content */}
            <div className="space-y-6 order-1">
              <p className="text-[#c6912c] text-sm font-medium tracking-widest uppercase">
                AI-Powered Estimation
              </p>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                Know your budget<br />
                <span className="text-[#c6912c]">before you commit.</span>
              </h2>
              
              <p className="text-base md:text-lg lg:text-xl text-white/60 leading-relaxed max-w-xl">
                Our AI analyzes your project details and delivers an accurate cost range, material insights, and realistic timeline — instantly. No forms, no calls, no pressure.
              </p>

              {/* Value preview: what they'll get */}
              <div className="grid grid-cols-3 gap-4 pt-2 max-w-lg">
                <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-[#c6912c] text-lg font-bold">$</p>
                  <p className="text-white/50 text-xs mt-1">Budget Range</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-[#c6912c] text-lg font-bold">
                    <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </p>
                  <p className="text-white/50 text-xs mt-1">Timeline</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-[#c6912c] text-lg font-bold">
                    <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </p>
                  <p className="text-white/50 text-xs mt-1">Materials</p>
                </div>
              </div>
              
              {/* Buttons - Desktop */}
              <div className="hidden lg:flex flex-row gap-3 pt-4">
                <Button
                  size="lg"
                  className="sm:min-w-[220px] h-[48px] bg-[#c6912c] hover:bg-[#a67923] text-white font-semibold text-sm tracking-wide rounded-[4px] shadow-lg shadow-[#c6912c]/20 transition-all hover:scale-105 hover:shadow-[#c6912c]/40"
                  asChild
                >
                  <Link href="/cost-estimator">Try the Estimator — Free</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="sm:min-w-[200px] h-[48px] border border-white/20 text-white hover:bg-white/10 hover:border-white/40 bg-transparent font-medium text-sm tracking-wide rounded-[4px] transition-all hover:scale-105"
                  asChild
                >
                  <Link href="/about">How It Works</Link>
                </Button>
              </div>
              <p className="hidden lg:block text-white/30 text-xs">Takes about 60 seconds · 4 simple questions · No email required</p>
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

            {/* Buttons - Mobile */}
            <div className="flex lg:hidden flex-col gap-3 order-3 w-full">
              <Button
                size="lg"
                className="w-full h-[48px] bg-[#c6912c] hover:bg-[#a67923] text-white font-semibold text-sm tracking-wide rounded-[4px] shadow-lg shadow-[#c6912c]/20 transition-all"
                asChild
              >
                <Link href="/cost-estimator">Try the Estimator — Free</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full h-[48px] border border-white/20 text-white hover:bg-white/10 hover:border-white/40 bg-transparent font-medium text-sm tracking-wide rounded-[4px] transition-all"
                asChild
              >
                <Link href="/about">How It Works</Link>
              </Button>
              <p className="text-white/30 text-xs text-center">Takes about 60 seconds · 4 simple questions · No email required</p>
            </div>
          </div>
        </div>
      </section>


      {/* ━━━ SECTION 4: VALUE PROP + STATS ━━━
          Purpose: Build trust and authority. 
          "Luxury is the freedom to relax" is the strongest emotional copy on the page.
          Stats back it up with concrete numbers.
      */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto">
          <div className="max-w-[1000px] border-l-2 border-[#c6912c] pl-8 lg:pl-12">
            <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-black leading-snug font-light">
              Luxury is the freedom to relax
            </p>
            <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-black leading-snug font-light mt-4">
              while experts handle every detail.
            </p>
            <p className="text-lg md:text-xl text-black/50 mt-8 leading-relaxed">
              Antova delivers master craftsmanship, precise AI estimating, and seamless service — from blueprint to perfection.
            </p>
          </div>
        </div>

        {/* Stats trust bar */}
        <div className="px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto mt-16 lg:mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 py-10 border-t border-black/[0.06]">
            <div className="text-center">
              <p className="text-[#c6912c] text-4xl lg:text-5xl font-bold tracking-tight">150+</p>
              <p className="text-black/50 text-sm md:text-base mt-2">Projects Completed</p>
            </div>
            <div className="text-center">
              <p className="text-[#c6912c] text-4xl lg:text-5xl font-bold tracking-tight">12</p>
              <p className="text-black/50 text-sm md:text-base mt-2">Years Experience</p>
            </div>
            <div className="text-center">
              <p className="text-[#c6912c] text-4xl lg:text-5xl font-bold tracking-tight">98%</p>
              <p className="text-black/50 text-sm md:text-base mt-2">Client Satisfaction</p>
            </div>
            <div className="text-center">
              <p className="text-[#c6912c] text-4xl lg:text-5xl font-bold tracking-tight">$50M+</p>
              <p className="text-black/50 text-sm md:text-base mt-2">Total Value Built</p>
            </div>
          </div>
        </div>
      </section>


      {/* ━━━ SECTION 5: HOW IT WORKS ━━━
          Purpose: Reduce anxiety. Show process clarity and control.
          Affluent clients fear chaos, delays, and poor communication.
          This section says: "We have a system. You'll know what happens at every step."
      */}
      <section className="py-20 lg:py-28 bg-[#fafafa] border-t border-black/[0.04]">
        <div className="px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto">
          <div className="text-center mb-16 lg:mb-20">
            <p className="text-[#c6912c] text-sm font-medium tracking-[0.2em] uppercase mb-4">Our Process</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black tracking-tight">
              From vision to walkthrough
            </h2>
            <p className="text-black/50 text-lg mt-4 max-w-2xl mx-auto">
              A clear, controlled process designed around your time and your standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {PROCESS_STEPS.map((step) => (
              <div 
                key={step.number}
                className="group relative"
              >
                {/* Step number */}
                <p className="text-[#c6912c] text-5xl lg:text-6xl font-bold tracking-tight mb-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                  {step.number}
                </p>
                {/* Accent line */}
                <div className="w-12 h-[2px] bg-[#c6912c] mb-5 group-hover:w-20 transition-all duration-300" />
                <h3 className="text-xl font-semibold text-black mb-3">{step.title}</h3>
                <p className="text-black/50 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button
              size="lg"
              className="h-[48px] bg-[#c6912c] hover:bg-[#a67923] text-white font-medium text-sm tracking-wide rounded-[4px] shadow-lg transition-all hover:scale-105 px-10"
              asChild
            >
              <Link href="/cost-estimator">Start with Step 1 — Get Your Estimate</Link>
            </Button>
          </div>
        </div>
      </section>


      {/* ━━━ SECTION 6: TESTIMONIALS ━━━
          Purpose: Social proof from real clients.
          Kept intact from original — strong design.
      */}
      <section
        ref={testimonialsRef}
        className={`py-24 lg:py-32 ${bottomBgColor} transition-colors duration-300 ease-in-out relative overflow-hidden`}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c6912c]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto">
          <div className="max-w-3xl mb-16 lg:mb-20">
            <p className="text-[#c6912c] font-medium tracking-[0.2em] uppercase text-sm mb-4">Testimonials</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Stories of Excellence
            </h2>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed">
              Hear from clients who trusted Antova with their most ambitious projects.
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


      {/* ━━━ SECTION 7: GOOGLE REVIEWS ━━━ */}
      <GoogleReviewsSection />


      {/* ━━━ SECTION 8: FINAL CTA — CAPACITY-BASED URGENCY ━━━
          Purpose: Close the page with one clear action + exclusivity.
          Replaces the old discount section.
          Uses capacity messaging: "limited build slots" not "15% off".
      */}
      <section className="relative py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#c6912c]/8 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 px-6 lg:px-12 xl:px-16 w-full max-w-4xl mx-auto text-center">
          {/* Capacity badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#c6912c]/10 border border-[#c6912c]/30 rounded-full mb-8">
            <span className="w-2 h-2 bg-[#c6912c] rounded-full animate-pulse" />
            <span className="text-[#c6912c] text-xs font-medium tracking-wide">Now scheduling Q3 & Q4 2026 projects</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6 leading-[1.15]">
            Ready to build something
            <br className="hidden sm:block" />
            {" "}extraordinary?
          </h2>
          
          <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            We accept a limited number of projects each season to maintain the quality and attention our clients expect. Start with a free estimate to see if we're the right fit.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto sm:min-w-[280px] h-[52px] bg-[#c6912c] hover:bg-[#a67923] text-white font-semibold text-base tracking-wide rounded-[4px] shadow-lg shadow-[#c6912c]/20 transition-all hover:scale-105 hover:shadow-[#c6912c]/40"
              asChild
            >
              <Link href="/cost-estimator">Get Your Free Estimate</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto sm:min-w-[280px] h-[52px] border border-white/20 text-white hover:bg-white/10 hover:border-white/40 bg-transparent font-medium text-base tracking-wide rounded-[4px] transition-all hover:scale-105"
              asChild
            >
              <Link href="/contact">Schedule a Private Consultation</Link>
            </Button>
          </div>

          <p className="mt-6 text-white/30 text-xs tracking-wide">
            No obligation · Response within 24 hours · Complimentary initial consultation
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
