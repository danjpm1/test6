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
  },
  {
    id: "challenge",
    type: "image",
    media: "/challange.png",
    headline: "OTHERS SEE IMPOSSIBLE.",
    subtext: "No roads. No access. No way... they said.",
  },
  {
    id: "scout",
    type: "image",
    media: "/scout.png",
    headline: "WE SEE POTENTIAL.",
    subtext: "Our team assesses terrain, logistics, and challenges — mapping the path forward.",
  },
  {
    id: "mobilize",
    type: "image",
    media: "/mobilize.png",
    headline: "WE BRING EVERYTHING.",
    subtext: "Premium materials delivered to the unreachable — no matter what it takes.",
  },
  {
    id: "build",
    type: "image",
    media: "/build.png",
    headline: "PRECISION IN THE WILD.",
    subtext: "Expert craftsmen building with care, no matter how far off the grid.",
  },
  {
    id: "result",
    type: "image",
    media: "/result.png",
    headline: "YOUR DREAM. REALIZED.",
    subtext: "If you can dream the location, we can build it there.",
  },
]

export default function RemoteBuildsImmersive() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initAnimations = async () => {
      const gsap = (await import("gsap")).default
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default
      
      gsap.registerPlugin(ScrollTrigger)

      // Select all sections
      const sections = document.querySelectorAll(".story-section")

      sections.forEach((section) => {
        const media = section.querySelector(".story-media")
        const content = section.querySelector(".story-content")

        // IMAGE: Subtle parallax (moves slower than scroll)
        if (media) {
          gsap.fromTo(media,
            { yPercent: -10 },
            {
              yPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          )
        }

        // CONTENT: Simple fade in/out based on position
        if (content) {
          // Fade in when entering
          gsap.fromTo(content,
            { opacity: 0 },
            {
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top 30%",
                scrub: true,
              },
            }
          )

          // Fade out when leaving
          gsap.fromTo(content,
            { opacity: 1 },
            {
              opacity: 0,
              ease: "power2.in",
              scrollTrigger: {
                trigger: section,
                start: "bottom 70%",
                end: "bottom 20%",
                scrub: true,
              },
            }
          )
        }
      })

      // Floating particles
      const particles = document.querySelectorAll(".particle")
      particles.forEach((particle, i) => {
        gsap.to(particle, {
          y: "random(-80, 80)",
          x: "random(-40, 40)",
          duration: "random(8, 15)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
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
    <div ref={containerRef} className="w-full bg-[#0a0f0a]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Outfit:wght@200;300;400;500;600&display=swap');

        html {
          scroll-behavior: auto !important;
        }

        body {
          overflow-x: hidden;
        }

        .headline-font {
          font-family: 'Playfair Display', serif;
        }

        .body-font {
          font-family: 'Outfit', sans-serif;
        }

        .text-shadow-lg {
          text-shadow: 0 2px 20px rgba(0,0,0,0.5);
        }

        .scroll-progress-bar {
          transform-origin: left;
          transform: scaleX(0);
        }
      `}</style>

      <Navbar />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-white/5 z-[100]">
        <div className="scroll-progress-bar h-full bg-[#c6912c]" />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle absolute rounded-full bg-[#c6912c]"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              opacity: Math.random() * 0.2 + 0.05,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="story-section relative w-full h-screen overflow-hidden">
        <div className="story-media absolute inset-[-10%] w-[120%] h-[120%]">
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

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0a] via-transparent to-transparent" />

        <div className="story-content relative z-20 h-full flex flex-col justify-end pb-24 md:pb-32 px-8 md:px-16 lg:px-24">
          <h1 className="headline-font text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight text-shadow-lg">
            YOU FOUND IT.
          </h1>
          <p className="body-font text-lg md:text-xl lg:text-2xl text-white/80 mt-4 md:mt-6 font-light max-w-xl">
            That perfect spot where the world falls away.
          </p>
          
          {/* Scroll Hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="body-font text-white/40 text-xs tracking-[0.2em] uppercase">
              Scroll to discover
            </span>
            <svg className="w-5 h-5 text-[#c6912c] animate-bounce" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      {SECTIONS.slice(1).map((section, index) => (
        <section
          key={section.id}
          className="story-section relative w-full min-h-screen overflow-hidden"
        >
          {/* Background Image */}
          <div className="story-media absolute inset-[-10%] w-[120%] h-[120%]">
            <Image
              src={section.media}
              alt={section.headline}
              fill
              className="object-cover"
              priority={index < 2}
            />
          </div>

          {/* Gradient overlays for smooth blending */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0a] via-transparent to-[#0a0f0a]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f0a]/60 via-transparent to-transparent" />

          {/* Content - Static position, only fades */}
          <div className="story-content relative z-20 min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24">
            <div className="max-w-2xl">
              {/* Section indicator */}
              <span className="body-font text-[#c6912c] text-sm tracking-[0.2em] uppercase mb-4 block">
                {String(index + 2).padStart(2, "0")}
              </span>

              <h2 className="headline-font text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] text-shadow-lg">
                {section.headline}
              </h2>

              <p className="body-font text-base md:text-lg lg:text-xl text-white/70 mt-6 md:mt-8 font-light leading-relaxed">
                {section.subtext}
              </p>

              {/* CTA on last section */}
              {section.id === "result" && (
                <div className="mt-10">
                  <a
                    href="/contact"
                    className="group inline-flex items-center gap-3 bg-[#c6912c] hover:bg-[#d4a43d] text-black font-medium px-8 py-4 text-base transition-all duration-300 body-font"
                  >
                    Start Your Journey
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Final CTA Section */}
      <section className="relative bg-[#0a0f0a] py-24 md:py-32">
        <div className="relative z-10 container mx-auto px-8 md:px-16 text-center">
          <h2 className="headline-font text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Build the{" "}
            <span className="text-[#c6912c]">Impossible</span>?
          </h2>
          <p className="body-font text-base md:text-lg text-white/50 max-w-xl mx-auto mb-10 font-light">
            Tell us about your dream location.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-[#c6912c] hover:bg-[#d4a43d] text-black font-medium px-10 py-4 transition-all duration-300 body-font"
            >
              Contact Us
            </a>
            <a
              href="/projects"
              className="inline-flex items-center justify-center border border-white/20 hover:border-[#c6912c] text-white hover:text-[#c6912c] font-medium px-10 py-4 transition-all duration-300 body-font"
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
