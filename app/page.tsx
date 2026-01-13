"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"

const SCROLL_THRESHOLD = 50
const PHILOSOPHY_THRESHOLD = 0.8
const SMART_SECTION_THRESHOLD = 0.5

const SERVICE_CARDS = [
  {
    title: "Custom Homes.",
    image: "/modern-glass-house-reflecting-in-lake-at-sunset-wi.jpg",
    alt: "Custom homes lifestyle",
    href: "/services/signature-custom-design",
  },
  {
    title: "Renovations.",
    image: "/luxury-modern-living-room-wood-ceiling-concrete-fi.jpg",
    alt: "Renovations lifestyle",
    href: "/services/renovation",
  },
  {
    title: "New Construction.",
    image: "/human3.jpg",
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
    image: "/modern-luxury-home-at-night-with-warm-interior-lig.jpg",
    alt: "Modern luxury home at night with mountains",
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
  },
  {
    author_name: "Elena Vasquez",
    rating: 5,
    relative_time_description: "1 month ago",
    text: "We hired Antova for a complete renovation of our historic property. They preserved the original character while modernizing everything. Truly exceptional attention to detail.",
  },
  {
    author_name: "Robert Blackwood",
    rating: 5,
    relative_time_description: "1 month ago",
    text: "The AI-powered estimates saved us weeks of back-and-forth. Accurate, transparent, and the build quality speaks for itself. Our new office headquarters is a masterpiece.",
  },
  {
    author_name: "Sarah Mitchell",
    rating: 5,
    relative_time_description: "2 months ago",
    text: "Working with Antova felt like having a true partner in realizing our vision. They listened, adapted, and delivered beyond what we imagined possible.",
  },
  {
    author_name: "Marcus Chen",
    rating: 4,
    relative_time_description: "3 months ago",
    text: "Professional team, excellent communication throughout the project. The final result on our lakeside cabin is beautiful. Would recommend for any premium construction needs.",
  },
]

// Custom hook for scroll threshold
function useScrollThreshold(threshold: number) {
  const [isPastThreshold, setIsPastThreshold] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsPastThreshold(window.scrollY > threshold)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [threshold])

  return isPastThreshold
}

// Service Card Component
interface ServiceCardProps {
  title: string
  image: string
  alt: string
  href: string
}

function ServiceCard({ title, image, alt, href }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
    >
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 30%, transparent 60%)",
        }}
      />
      <div className="absolute bottom-6 left-6 right-6">
        <h3 className="text-2xl md:text-3xl font-semibold text-white">
          {title}
        </h3>
      </div>
    </Link>
  )
}

// Offer Card Component
interface OfferCardProps {
  title: string
  description: string
  price: string
  image: string
  alt: string
  exploreHref: string
  exploreLabel: string
}

function OfferCard({
  title,
  description,
  price,
  image,
  alt,
  exploreHref,
  exploreLabel,
}: OfferCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-neutral-900">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />
      </div>
      <div className="relative p-6 -mt-20">
        <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
          {title}
        </h3>
        <p className="text-neutral-400 text-sm mb-3">{description}</p>
        <p className="text-[#c6912c] font-medium mb-4">{price}</p>
        <div className="flex gap-3">
          <Link
            href={exploreHref}
            className="text-sm text-white hover:text-[#c6912c] transition-colors"
          >
            {exploreLabel}
          </Link>
          <Link
            href="/contact"
            className="text-sm text-neutral-500 hover:text-white transition-colors"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </div>
  )
}

// Testimonial Card Component
interface TestimonialCardProps {
  headline: string
  service: string
  quote: string
  author: string
  role: string
  company: string
  videoThumbnail: string
}

function TestimonialCard({
  headline,
  service,
  quote,
  author,
  role,
  company,
  videoThumbnail,
}: TestimonialCardProps) {
  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6 hover:border-[#c6912c]/30 transition-all duration-500">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[#c6912c] text-xs font-medium tracking-wider uppercase">
          {service}
        </span>
        <span className="text-[#c6912c]/60 text-4xl font-serif">"</span>
      </div>

      <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
        {headline}
      </h3>

      <blockquote className="text-neutral-400 text-sm leading-relaxed mb-6">
        "{quote}"
      </blockquote>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c6912c] to-[#8a6420] flex items-center justify-center text-sm font-medium text-white/90">
          {initials}
        </div>
        <div>
          <p className="text-white font-medium text-sm">{author}</p>
          <p className="text-neutral-500 text-xs">
            {role}, {company}
          </p>
        </div>
      </div>

      <div className="relative aspect-video rounded-xl overflow-hidden group/video cursor-pointer">
        <Image
          src={videoThumbnail}
          alt={`${author} testimonial video`}
          fill
          className="object-cover transition-transform duration-500 group-hover/video:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 group-hover/video:bg-black/20 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-[#c6912c] flex items-center justify-center group-hover/video:scale-110 transition-transform">
            <svg
              className="w-5 h-5 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-3 right-3 bg-black/60 px-2 py-1 rounded text-white text-xs">
          2:34
        </div>
      </div>
    </div>
  )
}

// Star Rating Component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? "text-amber-500" : "text-neutral-600"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

// Google Review Card Component
interface GoogleReviewCardProps {
  author_name: string
  rating: number
  relative_time_description: string
  text: string
  index: number
}

function GoogleReviewCard({
  author_name,
  rating,
  relative_time_description,
  text,
  index,
}: GoogleReviewCardProps) {
  const initials = author_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div
      className="group bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6 hover:border-[#c6912c]/30 transition-all duration-500"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c6912c] to-[#8a6420] flex items-center justify-center text-sm font-medium text-white/90">
            {initials}
          </div>
          <div>
            <p className="text-white font-medium text-sm">{author_name}</p>
            <p className="text-neutral-500 text-xs">
              {relative_time_description}
            </p>
          </div>
        </div>
        <StarRating rating={rating} />
      </div>

      <p className="text-neutral-400 text-sm leading-relaxed line-clamp-4 group-hover:text-neutral-300 transition-colors duration-300">
        "{text}"
      </p>

      <div className="mt-4 pt-4 border-t border-neutral-800/50 flex items-center gap-2">
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
        <span className="text-neutral-600 text-xs">Google Review</span>
      </div>
    </div>
  )
}

// Google Reviews Section Component
function GoogleReviewsSection() {
  const [showAll, setShowAll] = useState(false)
  const displayedReviews = showAll ? GOOGLE_REVIEWS : GOOGLE_REVIEWS.slice(0, 3)

  const avgRating =
    GOOGLE_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / GOOGLE_REVIEWS.length

  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-[#c6912c] text-sm font-medium tracking-wider uppercase mb-3">
              Client Reviews
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
              Trusted by Our Clients
            </h2>
          </div>

          {/* Google Rating Summary */}
          <div className="flex items-center gap-4 bg-neutral-900/40 border border-neutral-800 rounded-xl px-5 py-3">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
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
              <span className="text-white font-semibold">
                {avgRating.toFixed(1)}
              </span>
            </div>
            <div className="h-8 w-px bg-neutral-700" />
            <div className="flex flex-col">
              <StarRating rating={Math.round(avgRating)} />
              <span className="text-neutral-500 text-xs mt-0.5">
                {GOOGLE_REVIEWS.length} reviews
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedReviews.map((review, index) => (
            <GoogleReviewCard key={index} {...review} index={index} />
          ))}
        </div>

        {/* Show More Button */}
        {GOOGLE_REVIEWS.length > 3 && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm text-[#c6912c] border border-[#c6912c]/50 rounded-full hover:bg-[#c6912c]/10 transition-all duration-300"
            >
              {showAll ? "Show Less" : `View All ${GOOGLE_REVIEWS.length} Reviews`}
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${
                  showAll ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Write a Review CTA */}
        <div className="mt-16 text-center">
          <p className="text-neutral-500 text-sm mb-4">
            Had a great experience with Antova?
          </p>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-neutral-200 transition-colors duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
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
            Write a Review on Google
          </a>
        </div>
      </div>
    </section>
  )
}

// Main Page Component
export default function AntovaBuilders() {
  const [bgColor, setBgColor] = useState("bg-white")
  const [textColor, setTextColor] = useState("text-black")

  const philosophyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleScroll() {
      if (philosophyRef.current) {
        const rect = philosophyRef.current.getBoundingClientRect()
        const threshold = window.innerHeight * PHILOSOPHY_THRESHOLD

        if (rect.top <= threshold) {
          setBgColor("bg-black")
          setTextColor("text-white")
        } else {
          setBgColor("bg-white")
          setTextColor("text-black")
        }
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const goldBtn =
    "bg-[#c6912c] hover:bg-[#a67923] text-black font-medium rounded shadow-lg hover:shadow-[#c6912c]/50 hover:scale-105 transition-all"
  const outlineBtn =
    "border-2 border-white text-white hover:bg-white hover:text-black font-medium rounded bg-transparent hover:scale-105 transition-all"

  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-300`}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero-winter-mountain-home.png"
            alt="Luxury mountain chalet in winter with warm interior lighting"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        <div className="relative z-10 px-6 lg:px-12 text-center -mt-32 md:-mt-40">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 tracking-tight text-white">
            Antova Builders
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-4 text-white/90 tracking-wide">
            Precision Built. Luxury Perfected.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/cost-estimator">
              <Button className={`${goldBtn} px-8 py-6 text-base`}>
                AI Estimator
              </Button>
            </Link>
            <Link href="/contact">
              <Button className={`${outlineBtn} px-8 py-6 text-base`}>
                Consult With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Offers Banner */}
      <section className="bg-black py-4">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/offers"
            className="flex items-center justify-between py-3 px-4 bg-neutral-900 rounded-xl hover:bg-neutral-800 transition-colors group"
          >
            <h3 className="text-white font-semibold">Get your offer now.</h3>
            <span className="text-neutral-400 group-hover:text-white transition-colors">
              View All Offers
            </span>
          </Link>
        </div>
      </section>

      {/* Offer Cards */}
      <section className="bg-black py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {OFFER_CARDS.map((card, index) => (
              <OfferCard key={index} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Quote */}
      <div
        ref={philosophyRef}
        className="bg-black py-24 px-6 border-l-4 border-[#c6912c]"
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-2xl md:text-3xl lg:text-4xl text-white/90 font-light leading-relaxed">
            <span className="text-[#c6912c]">Luxury</span> is the freedom to
            relax
            <br />
            while experts handle every detail.
          </p>
          <p className="mt-6 text-neutral-400 text-lg">
            Antova delivers master craftsmanship, precise AI estimating, and
            seamless service — from blueprint to perfection.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="bg-black py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {SERVICE_CARDS.map((card, index) => (
              <ServiceCard key={index} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials - Stories of Excellence */}
      <section className="bg-black py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-neutral-500 text-sm tracking-wider uppercase mb-2">
              Testimonials
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Stories of Excellence
            </h2>
            <p className="text-neutral-400 mt-4 max-w-2xl">
              Hear from clients who trusted Antova with their most ambitious
              projects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>

          <div className="flex flex-wrap gap-4 justify-center mt-12">
            <Link href="/projects">
              <Button
                variant="outline"
                className="border-neutral-700 text-white hover:bg-neutral-800"
              >
                View All Projects
              </Button>
            </Link>
            <Link href="/contact">
              <Button className={goldBtn}>Start Your Project</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <GoogleReviewsSection />

      {/* AI Estimator CTA */}
      <section className="bg-black py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#c6912c] text-sm font-medium tracking-wider uppercase mb-3">
                AI-Powered Estimation
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Turn ideas into architectural reality.
              </h2>
              <p className="text-neutral-400 text-lg mb-8 max-w-lg">
                Begin with your vision. Our AI instantly transforms project
                details into accurate cost estimates, material insights, and
                construction timelines.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/cost-estimator">
                  <Button className={goldBtn}>Try AI Estimator</Button>
                </Link>
                <Link href="/about">
                  <Button
                    variant="outline"
                    className="border-neutral-700 text-white hover:bg-neutral-800"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer">
              <Image
                src="/ai-video-poster.jpg"
                alt="AI Estimator demonstration"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#c6912c] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
