"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const SECTIONS = [
  {
    id: "dream",
    type: "video",
    media: "/dream.mp4",
    headline: "YOU FOUND IT.",
    subtext: "That perfect spot where the world falls away.",
    color: "#0a1a0f",
  },
  {
    id: "challenge",
    type: "image",
    media: "/challange.png",
    headline: "OTHERS SEE IMPOSSIBLE.",
    subtext: "No roads. No access. No way... they said.",
    color: "#1a1a2e",
  },
  {
    id: "scout",
    type: "image",
    media: "/scout.png",
    headline: "WE SEE POTENTIAL.",
    subtext: "Our team assesses terrain, logistics, and challenges — mapping the path forward.",
    color: "#1a2a3a",
  },
  {
    id: "mobilize",
    type: "image",
    media: "/mobilize.png",
    headline: "WE BRING EVERYTHING.",
    subtext: "Premium materials delivered to the unreachable — no matter what it takes.",
    color: "#2a1a0a",
  },
  {
    id: "build",
    type: "image",
    media: "/build.png",
    headline: "PRECISION IN THE WILD.",
    subtext: "Expert craftsmen building with care, no matter how far off the grid.",
    color: "#1a2a1a",
  },
  {
    id: "result",
    type: "image",
    media: "/result.png",
    headline: "YOUR DREAM. REALIZED.",
    subtext: "If you can dream the location, we can build it there.",
    color: "#0a0a1a",
  },
]

export default function RemoteBuildsImmersive() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const initAnimations = async () => {
      const gsap = (await import("gsap")).default
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default
      
      gsap.registerPlugin(ScrollTrigger)

      // Smooth defaults
      gsap.defaults({ ease: "none" })

      // Hero section - pin and zoom with diagonal movement
      if (heroRef.current) {
        const heroVideo = heroRef.current.querySelector(".hero-media")
        const heroHeadline = heroRef.current.querySelector(".hero-headline")
        const heroSubtext = heroRef.current.querySelector(".hero-subtext")
        const heroOverlay = heroRef.current.querySelector(".hero-overlay")

        // Pin hero and create zoom effect
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=100%",
            pin: true,
            scrub: 1,
          },
        })

        heroTl
          .to(heroVideo, { scale: 1.4, rotation: 2, duration: 1 }, 0)
          .to(heroHeadline, { y: -150, x: -100, opacity: 0, scale: 1.1, rotation: -3, duration: 0.5 }, 0)
          .to(heroSubtext, { y: -80, x: -50, opacity: 0, duration: 0.5 }, 0.1)
          .to(heroOverlay, { opacity: 0.9, duration: 1 }, 0)
      }

      // Animate each content section with diagonal movements
      sectionsRef.current.forEach((section, index) => {
        if (!section) return

        const media = section.querySelector(".section-media")
        const headline = section.querySelector(".section-headline")
        const subtext = section.querySelector(".section-subtext")
        const number = section.querySelector(".section-number")
        const overlay = section.querySelector(".section-overlay")
        const diagonalWipe = section.querySelector(".diagonal-wipe")

        // Alternate direction for visual variety
        const isEven = index % 2 === 0
        const xDirection = isEven ? 1 : -1

        // Pin section and create immersive effects
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        })

        // Initial states - coming from diagonal direction
        gsap.set(headline, { y: 200, x: 100 * xDirection, opacity: 0, scale: 0.85, rotation: 5 * xDirection })
        gsap.set(subtext, { y: 150, x: 80 * xDirection, opacity: 0 })
        gsap.set(number, { x: -100 * xDirection, opacity: 0, rotation: -10 * xDirection })
        gsap.set(media, { scale: 1.3, x: 50 * xDirection, rotation: 2 * xDirection })
        gsap.set(diagonalWipe, { scaleX: 1 })

        // Animation sequence with diagonal movement
        tl
          // Phase 1: Diagonal wipe reveal (0 - 0.2)
          .to(diagonalWipe, { scaleX: 0, duration: 0.2, ease: "power2.inOut" }, 0)
          
          // Phase 2: Content reveals diagonally (0.1 - 0.4)
          .to(media, { scale: 1, x: 0, rotation: 0, duration: 0.4 }, 0.1)
          .to(overlay, { opacity: 0.3, duration: 0.3 }, 0.1)
          .to(number, { x: 0, opacity: 0.2, rotation: 0, duration: 0.3 }, 0.15)
          .to(headline, { y: 0, x: 0, opacity: 1, scale: 1, rotation: 0, duration: 0.35 }, 0.15)
          .to(subtext, { y: 0, x: 0, opacity: 1, duration: 0.35 }, 0.25)
          
          // Phase 3: Hold with subtle movement (0.4 - 0.6)
          .to(media, { scale: 1.05, rotation: 0.5 * xDirection, duration: 0.2 }, 0.4)
          
          // Phase 4: Exit diagonally (0.6 - 1.0)
          .to(headline, { y: -150, x: -80 * xDirection, opacity: 0, scale: 1.1, rotation: -5 * xDirection, duration: 0.35 }, 0.6)
          .to(subtext, { y: -100, x: -60 * xDirection, opacity: 0, duration: 0.35 }, 0.65)
          .to(number, { x: 100 * xDirection, opacity: 0, rotation: 10 * xDirection, duration: 0.25 }, 0.7)
          .to(media, { scale: 1.4, x: -30 * xDirection, rotation: -2 * xDirection, duration: 0.4 }, 0.6)
          .to(overlay, { opacity: 1, duration: 0.4 }, 0.6)
      })

      // Floating particles - diagonal movement
      const particles = document.querySelectorAll(".particle")
      particles.forEach((particle, i) => {
        const direction = i % 2 === 0 ? 1 : -1
        gsap.to(particle, {
          y: `random(-200, 200)`,
          x: `random(-150, 150)`,
          rotation: `random(-360, 360)`,
          scale: `random(0.5, 1.5)`,
          duration: `random(8, 15)`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        })
        
        // Add continuous diagonal drift
        gsap.to(particle, {
          y: `-=${direction * 500}`,
          x: `-=${direction * 300}`,
          duration: 20,
          repeat: -1,
          ease: "none",
        })
      })

      // Progress bar
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const progress = document.querySelector(".scroll-progress-bar") as HTMLElement
          if (progress) {
            progress.style.transform = `scaleX(${self.progress})`
          }
        },
      })
    }

    initAnimations()

    return () => {
      import("gsap/ScrollTrigger").then(({ default: ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((t) => t.kill())
      })
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full bg-black">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Outfit:wght@200;300;400;500;600&display=swap');

        html {
          scroll-behavior: auto !important;
        }

        .headline-font {
          font-family: 'Playfair Display', serif;
        }

        .body-font {
          font-family: 'Outfit', sans-serif;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .scroll-progress-bar {
          transform-origin: left;
          transform: scaleX(0);
        }

        .text-shadow-lg {
          text-shadow: 0 4px 30px rgba(0,0,0,0.8), 0 0 100px rgba(0,0,0,0.5);
        }

        /* Diagonal flow animation */
        @keyframes diagonal-flow {
          0% { 
            transform: translate(100%, -100%) rotate(-45deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% { 
            transform: translate(-100%, 100%) rotate(-45deg);
            opacity: 0;
          }
        }

        /* Subtle rotation */
        @keyframes subtle-rotate {
          0%, 100% { transform: rotate(-1deg) scale(1); }
          50% { transform: rotate(1deg) scale(1.02); }
        }

        .diagonal-animate {
          animation: diagonal-flow 15s linear infinite;
        }

        .subtle-move {
          animation: subtle-rotate 10s ease-in-out infinite;
        }
      `}</style>

      <Navbar />

      {/* Progress Bar - Top */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-[100]">
        <div className="scroll-progress-bar h-full bg-gradient-to-r from-[#c6912c] to-[#e8b84a]" />
      </div>

      {/* Floating Particles - More Dynamic */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Round particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`round-${i}`}
            className="particle bg-[#c6912c] rounded-full"
            style={{
              width: Math.random() * 8 + 3 + "px",
              height: Math.random() * 8 + 3 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              opacity: Math.random() * 0.4 + 0.1,
            }}
          />
        ))}
        {/* Elongated particles (like seeds) */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`seed-${i}`}
            className="particle bg-[#c6912c]/60"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 15 + 8 + "px",
              borderRadius: "50%",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              opacity: Math.random() * 0.3 + 0.1,
              transform: `rotate(${Math.random() * 60 - 30}deg)`,
            }}
          />
        ))}
        {/* Glowing dots */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`glow-${i}`}
            className="particle rounded-full"
            style={{
              width: Math.random() * 12 + 6 + "px",
              height: Math.random() * 12 + 6 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              opacity: Math.random() * 0.2 + 0.05,
              background: "radial-gradient(circle, #c6912c 0%, transparent 70%)",
              filter: "blur(2px)",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Video Background */}
        <div className="hero-media absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/dream.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Gradient Overlay */}
        <div className="hero-overlay absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-50" />
        
        {/* Vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />

        {/* Content */}
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6">
          <h1 className="hero-headline headline-font text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight text-shadow-lg">
            YOU FOUND IT.
          </h1>
          <p className="hero-subtext body-font text-xl md:text-2xl lg:text-3xl text-white/80 mt-6 md:mt-8 font-light max-w-2xl">
            That perfect spot where the world falls away.
          </p>
          
          {/* Scroll Hint */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <span className="body-font text-white/50 text-sm tracking-[0.3em] uppercase">
              Scroll to discover
            </span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1.5 h-3 bg-[#c6912c] rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      {SECTIONS.slice(1).map((section, index) => (
        <section
          key={section.id}
          ref={(el) => { sectionsRef.current[index] = el }}
          className="relative w-full h-screen overflow-hidden"
        >
          {/* Background Color Layer */}
          <div 
            className="section-bg absolute inset-0 transition-colors duration-1000"
            style={{ backgroundColor: section.color }}
          />

          {/* Image */}
          <div className="section-media absolute inset-0 w-full h-full">
            <Image
              src={section.media}
              alt={section.headline}
              fill
              className="object-cover"
              priority={index < 2}
            />
          </div>

          {/* Overlay */}
          <div className="section-overlay absolute inset-0 bg-black/60" />
          
          {/* Diagonal Wipe Transition */}
          <div 
            className="diagonal-wipe absolute inset-0 bg-black z-30 origin-left"
            style={{ 
              clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
            }}
          />
          
          {/* Vignette */}
          <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.7)]" />

          {/* Content */}
          <div className="relative z-20 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
            {/* Section Number */}
            <span className="section-number body-font text-[#c6912c] text-8xl md:text-9xl font-bold opacity-20 absolute top-1/4 right-8 md:right-16">
              {String(index + 2).padStart(2, "0")}
            </span>

            <div className="max-w-4xl">
              <h2 className="section-headline headline-font text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[0.95] text-shadow-lg">
                {section.headline}
              </h2>

              <p className="section-subtext body-font text-lg md:text-xl lg:text-2xl text-white/70 mt-6 md:mt-10 font-light leading-relaxed max-w-2xl">
                {section.subtext}
              </p>

              {/* CTA on last section */}
              {section.id === "result" && (
                <div className="mt-12">
                  <a
                    href="/contact"
                    className="group inline-flex items-center gap-4 bg-[#c6912c] hover:bg-[#d4a43d] text-black font-semibold px-10 py-5 text-lg transition-all duration-500 body-font"
                  >
                    Start Your Journey
                    <svg
                      className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2"
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

          {/* Diagonal Decorative Lines */}
          <div 
            className="absolute bottom-0 left-0 w-64 h-1 bg-gradient-to-r from-[#c6912c] to-transparent origin-left"
            style={{ transform: "rotate(-15deg) translateY(20px)" }}
          />
          <div 
            className="absolute top-0 right-0 w-64 h-1 bg-gradient-to-l from-[#c6912c] to-transparent origin-right"
            style={{ transform: "rotate(-15deg) translateY(-20px)" }}
          />
          
          {/* Corner Accents */}
          <div className="absolute bottom-8 left-8 w-16 h-16">
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c6912c]/40" style={{ transform: "rotate(-45deg) translateX(-30%)" }} />
          </div>
          <div className="absolute top-8 right-8 w-16 h-16">
            <div className="absolute top-0 right-0 w-full h-[2px] bg-[#c6912c]/40" style={{ transform: "rotate(-45deg) translateX(30%)" }} />
          </div>
        </section>
      ))}

      {/* Final CTA Section */}
      <section className="relative bg-black py-32 md:py-48 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #c6912c 1px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-16 text-center">
          <h2 className="headline-font text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
            Ready to Build the{" "}
            <span className="text-[#c6912c] italic">Impossible</span>?
          </h2>
          <p className="body-font text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 font-light">
            Tell us about your dream location. We'll make it reality.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-[#c6912c] hover:bg-[#d4a43d] text-black font-semibold px-12 py-5 text-lg transition-all duration-300 body-font"
            >
              Contact Us
            </a>
            <a
              href="/projects"
              className="inline-flex items-center justify-center gap-3 border-2 border-white/20 hover:border-[#c6912c] text-white hover:text-[#c6912c] font-semibold px-12 py-5 text-lg transition-all duration-300 body-font"
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
