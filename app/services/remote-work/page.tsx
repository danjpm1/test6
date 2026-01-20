"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const SECTIONS = [
  {
    id: "dream",
    type: "video",
    media: "/remote/dream.mp4",
    headline: "YOU FOUND IT.",
    subtext: "That perfect spot where the world falls away.",
    theme: "light",
  },
  {
    id: "challenge",
    type: "image",
    media: "/remote/challenge.png",
    headline: "OTHERS SEE IMPOSSIBLE.",
    subtext: "No roads. No access. No way... they said.",
    theme: "dark",
  },
  {
    id: "scout",
    type: "image",
    media: "/remote/scout.png",
    headline: "WE SEE POTENTIAL.",
    subtext: "Our team assesses terrain, logistics, and challenges — mapping the path forward.",
    theme: "dark",
  },
  {
    id: "mobilize",
    type: "image",
    media: "/remote/mobilize.png",
    headline: "WE BRING EVERYTHING.",
    subtext: "Premium materials delivered to the unreachable — no matter what it takes.",
    theme: "light",
  },
  {
    id: "build",
    type: "image",
    media: "/remote/build.png",
    headline: "PRECISION IN THE WILD.",
    subtext: "Expert craftsmen building with care, no matter how far off the grid.",
    theme: "light",
  },
  {
    id: "result",
    type: "image",
    media: "/remote/result.png",
    headline: "YOUR DREAM. REALIZED.",
    subtext: "If you can dream the location, we can build it there.",
    theme: "dark",
  },
]

export default function RemoteBuildsScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    // Dynamically import GSAP to avoid SSR issues
    const initGSAP = async () => {
      const gsap = (await import("gsap")).default
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default
      
      gsap.registerPlugin(ScrollTrigger)

      // Smooth scroll behavior
      document.documentElement.style.scrollBehavior = "smooth"

      // Animate each section
      sectionsRef.current.forEach((section, index) => {
        if (!section) return

        const headline = section.querySelector(".headline")
        const subtext = section.querySelector(".subtext")
        const media = section.querySelector(".media-container")
        const overlay = section.querySelector(".overlay")

        // Initial states
        gsap.set(headline, { y: 100, opacity: 0 })
        gsap.set(subtext, { y: 50, opacity: 0 })

        // Create timeline for this section
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        })

        // Animate in
        tl.to(headline, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
        tl.to(subtext, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.5")

        // Parallax effect on media
        gsap.to(media, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })

        // Fade overlay based on scroll
        if (overlay && index > 0) {
          gsap.fromTo(
            overlay,
            { opacity: 0.7 },
            {
              opacity: 0.3,
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            }
          )
        }
      })

      // Progress indicator animation
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const progress = document.querySelector(".scroll-progress") as HTMLElement
          if (progress) {
            progress.style.transform = `scaleY(${self.progress})`
          }
        },
      })
    }

    initGSAP()

    return () => {
      // Cleanup
      import("gsap/ScrollTrigger").then(({ default: ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      })
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full bg-black">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap');

        .scroll-progress {
          transform-origin: top;
          transform: scaleY(0);
        }

        .headline-text {
          font-family: 'Playfair Display', serif;
        }

        .subtext-text {
          font-family: 'Outfit', sans-serif;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(1.1);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .hero-video {
          animation: scaleIn 2s ease-out forwards;
        }

        .hero-headline {
          animation: fadeInUp 1.2s ease-out 0.5s forwards;
          opacity: 0;
        }

        .hero-subtext {
          animation: fadeInUp 1.2s ease-out 0.8s forwards;
          opacity: 0;
        }

        .scroll-hint {
          animation: fadeInUp 1.2s ease-out 1.5s forwards;
          opacity: 0;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }

        .scroll-hint-arrow {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>

      <Navbar />

      {/* Scroll Progress Indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
        <div className="w-[2px] h-32 bg-white/20 rounded-full overflow-hidden">
          <div className="scroll-progress w-full h-full bg-[#c6912c]" />
        </div>
      </div>

      {/* Section Navigation Dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3 translate-x-8">
        {SECTIONS.map((section, index) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="w-2 h-2 rounded-full bg-white/30 hover:bg-[#c6912c] transition-all duration-300 hover:scale-150"
            aria-label={`Go to ${section.headline}`}
          />
        ))}
      </div>

      {/* Hero Section - The Dream (Video) */}
      <section
        id="dream"
        ref={(el) => { sectionsRef.current[0] = el }}
        className="relative w-full h-screen overflow-hidden"
      >
        <div className="media-container absolute inset-0 w-full h-[120%] -top-[10%]">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="hero-video w-full h-full object-cover"
          >
            <source src="/remote/dream.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Gradient Overlay */}
        <div className="overlay absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-16 lg:px-24">
          <h1 className="headline hero-headline headline-text text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight max-w-4xl">
            {SECTIONS[0].headline}
          </h1>
          <p className="subtext hero-subtext subtext-text text-lg md:text-2xl text-white/80 mt-4 md:mt-6 max-w-2xl font-light">
            {SECTIONS[0].subtext}
          </p>

          {/* Scroll Hint */}
          <div className="scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="subtext-text text-white/60 text-sm tracking-widest uppercase">
              Scroll to discover
            </span>
            <div className="scroll-hint-arrow">
              <svg
                className="w-6 h-6 text-[#c6912c]"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Remaining Sections */}
      {SECTIONS.slice(1).map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          ref={(el) => { sectionsRef.current[index + 1] = el }}
          className="relative w-full min-h-screen overflow-hidden flex items-center"
        >
          {/* Background Image with Parallax Container */}
          <div className="media-container absolute inset-0 w-full h-[120%] -top-[10%]">
            <Image
              src={section.media}
              alt={section.headline}
              fill
              className="object-cover"
              priority={index < 2}
            />
          </div>

          {/* Overlay - Different for light/dark themes */}
          <div
            className={`overlay absolute inset-0 ${
              section.theme === "dark"
                ? "bg-gradient-to-r from-black/70 via-black/50 to-black/30"
                : "bg-gradient-to-t from-black/60 via-black/30 to-transparent"
            }`}
          />

          {/* Content */}
          <div
            className={`relative z-10 w-full px-6 md:px-16 lg:px-24 py-24 ${
              index % 2 === 0 ? "text-left" : "text-right ml-auto"
            }`}
          >
            <div className={`max-w-3xl ${index % 2 !== 0 ? "ml-auto" : ""}`}>
              {/* Section Number */}
              <span className="subtext-text text-[#c6912c] text-sm md:text-base tracking-[0.3em] uppercase mb-4 block font-medium">
                {String(index + 2).padStart(2, "0")} — {section.id}
              </span>

              <h2 className="headline headline-text text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
                {section.headline}
              </h2>

              <p className="subtext subtext-text text-lg md:text-xl lg:text-2xl text-white/70 mt-6 md:mt-8 font-light leading-relaxed">
                {section.subtext}
              </p>

              {/* CTA for last section */}
              {section.id === "result" && (
                <div className="mt-10 md:mt-12">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-3 bg-[#c6912c] hover:bg-[#d4a43d] text-black font-semibold px-8 py-4 text-lg transition-all duration-300 hover:gap-5 subtext-text"
                  >
                    Start Your Journey
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Decorative Line */}
          <div
            className={`absolute bottom-0 ${
              index % 2 === 0 ? "left-0" : "right-0"
            } w-1/3 h-[2px] bg-gradient-to-r from-[#c6912c] to-transparent ${
              index % 2 !== 0 ? "rotate-180" : ""
            }`}
          />
        </section>
      ))}

      {/* Final CTA Section */}
      <section className="relative bg-black py-24 md:py-32">
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #c6912c 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-16 text-center">
          <h2 className="headline-text text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Build the <span className="text-[#c6912c]">Impossible</span>?
          </h2>
          <p className="subtext-text text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10">
            Tell us about your dream location. We'll handle the rest.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#c6912c] hover:bg-[#d4a43d] text-black font-semibold px-10 py-4 text-lg transition-all duration-300 subtext-text"
            >
              Contact Us
            </a>
            <a
              href="/projects"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-[#c6912c] text-white hover:text-[#c6912c] font-semibold px-10 py-4 text-lg transition-all duration-300 subtext-text"
            >
              View Projects
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
