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

  // GSAP animations
  useEffect(() => {
    const initAnimations = async () => {
      const gsap = (await import("gsap")).default
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default
      
      gsap.registerPlugin(ScrollTrigger)

      const mediaLayers = document.querySelectorAll(".media-layer")
      const contentLayers = document.querySelectorAll(".content-layer")

      // Media crossfade with parallax
      mediaLayers.forEach((layer, index) => {
        const inner = layer.querySelector('video, img')
        
        if (index === 0) {
          gsap.set(layer, { opacity: 1 })
        } else {
          gsap.set(layer, { opacity: 0 })
        }

        // Parallax movement on all images - moves opposite to scroll
        if (inner) {
          gsap.fromTo(inner,
            { yPercent: -10, scale: 1.15 },
            {
              yPercent: 10,
              scale: 1.05,
              ease: "none",
              scrollTrigger: {
                trigger: document.querySelector(`#trigger-${index}`),
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              }
            }
          )
        }

        // Crossfade between images - slower transition
        if (index < mediaLayers.length - 1) {
          const trigger = document.querySelector(`#trigger-${index}`)
          
          // Fade out current layer
          gsap.to(layer, { 
            opacity: 0,
            scrollTrigger: {
              trigger: trigger,
              start: "center center",
              end: "bottom top",
              scrub: 2,
            }
          })
          
          // Fade in next layer
          gsap.to(mediaLayers[index + 1], { 
            opacity: 1,
            scrollTrigger: {
              trigger: trigger,
              start: "center center",
              end: "bottom top",
              scrub: 2,
            }
          })
        }
      })

      // Content fade - slower, matches image transitions
      contentLayers.forEach((layer, index) => {
        const trigger = document.querySelector(`#trigger-${index}`)
        
        if (index === 0) {
          // First content starts visible, fades out slowly
          gsap.to(layer, {
            opacity: 0,
            scrollTrigger: {
              trigger: trigger,
              start: "center center",
              end: "bottom 20%",
              scrub: 2,
            }
          })
        } else {
          // Other content fades in then out - slower
          gsap.fromTo(layer,
            { opacity: 0 },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: trigger,
                start: "top 80%",
                end: "top 20%",
                scrub: 2,
              }
            }
          )

          gsap.to(layer, {
            opacity: 0,
            scrollTrigger: {
              trigger: trigger,
              start: "center center",
              end: "bottom 20%",
              scrub: 2,
            }
          })
        }
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
    <div ref={containerRef} className="w-full">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Outfit:wght@200;300;400;500;600&display=swap');

        html {
          scroll-behavior: auto !important;
        }

        body {
          overflow-x: hidden;
          background: #f5f5f0;
        }

        .headline-font {
          font-family: 'Playfair Display', serif;
        }

        .body-font {
          font-family: 'Outfit', sans-serif;
        }

        .text-shadow-lg {
          text-shadow: 0 2px 40px rgba(255,255,255,0.9), 0 4px 60px rgba(255,255,255,0.5);
        }

        .scroll-progress-bar {
          transform-origin: left;
          transform: scaleX(0);
        }

        /* Hide non-active layers initially */
        .layer-hidden {
          opacity: 0;
        }
      `}</style>

      <Navbar />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-black/10 z-[100]">
        <div className="scroll-progress-bar h-full bg-[#c6912c]" />
      </div>

      {/* ===== UNIFIED WORLD CONTAINER ===== */}
      <div className="fixed inset-0 z-0">
        
        {/* MEDIA STACK */}
        {SECTIONS.map((section, index) => (
          <div 
            key={section.id}
            className={`media-layer absolute inset-[-10%] w-[120%] h-[120%] ${index !== 0 ? 'layer-hidden' : ''}`}
          >
            {section.type === "video" ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={section.media} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={section.media}
                alt={section.headline}
                fill
                className="object-cover"
                priority={index < 3}
              />
            )}
          </div>
        ))}
        
        {/* ===== UNIFYING COLOR WORLD - LIGHT VERSION ===== */}
        {/* This creates the "one world" feeling */}
        
        {/* Base tint - very subtle warm cream */}
        <div 
          className="absolute inset-0 z-20 mix-blend-overlay"
          style={{
            background: "linear-gradient(180deg, rgba(245,240,230,0.15) 0%, rgba(250,245,235,0.1) 50%, rgba(245,240,230,0.15) 100%)"
          }}
        />
        
        {/* Golden hour warmth - very subtle */}
        <div 
          className="absolute inset-0 z-20 mix-blend-soft-light"
          style={{
            background: "linear-gradient(135deg, rgba(198,145,44,0.05) 0%, transparent 50%, rgba(198,145,44,0.03) 100%)"
          }}
        />
        
        {/* Consistent sky gradient at top - subtle */}
        <div 
          className="absolute inset-0 z-20"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 25%, transparent 75%, rgba(245,245,240,0.2) 100%)"
          }}
        />
        
        {/* Vignette - very light */}
        <div 
          className="absolute inset-0 z-20"
          style={{
            boxShadow: "inset 0 0 150px 30px rgba(245,245,240,0.3)"
          }}
        />
        
        {/* Left side gradient for text readability - subtle */}
        <div 
          className="absolute inset-0 z-20"
          style={{
            background: "linear-gradient(90deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.15) 25%, transparent 50%)"
          }}
        />

      </div>

      {/* SCROLL TRIGGERS - taller for slower transitions */}
      {SECTIONS.map((_, index) => (
        <div 
          key={index}
          id={`trigger-${index}`}
          className="h-[150vh] w-full"
        />
      ))}

      {/* FIXED CONTENT */}
      <div className="fixed inset-0 z-40 pointer-events-none">
        {SECTIONS.map((section, index) => (
          <div 
            key={section.id}
            className={`content-layer absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 ${index !== 0 ? 'layer-hidden' : ''}`}
          >
            <div className="max-w-2xl pointer-events-auto">
              {index > 0 && (
                <span className="body-font text-[#996d1f] text-xs tracking-[0.4em] uppercase mb-6 block font-medium">
                  {String(index + 1).padStart(2, "0")} — {section.id}
                </span>
              )}

              <h2 className="headline-font text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] tracking-tight leading-[1.1] text-shadow-lg">
                {section.headline}
              </h2>

              <p className="body-font text-base md:text-lg text-[#333]/80 mt-6 font-light leading-relaxed max-w-lg">
                {section.subtext}
              </p>

              {section.id === "result" && (
                <div className="mt-10">
                  <a
                    href="/contact"
                    className="group inline-flex items-center gap-3 bg-[#c6912c] hover:bg-[#d4a43d] text-white font-medium px-8 py-4 text-base transition-all duration-300 body-font"
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
        ))}
      </div>

      {/* Scroll hint */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
        <span className="body-font text-[#333]/50 text-xs tracking-[0.2em] uppercase">
          Scroll
        </span>
        <svg className="w-4 h-4 text-[#c6912c] animate-bounce" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* Spacer */}
      <div className="h-[50vh]" />

      {/* Final CTA */}
      <section className="relative py-24 md:py-32 z-50 bg-gradient-to-b from-transparent via-[#f5f5f0] to-[#f5f5f0]">
        <div className="relative container mx-auto px-8 md:px-16 text-center">
          <h2 className="headline-font text-3xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] mb-6">
            Ready to Build the{" "}
            <span className="text-[#c6912c]">Impossible</span>?
          </h2>
          <p className="body-font text-base md:text-lg text-[#333]/60 max-w-xl mx-auto mb-10 font-light">
            Tell us about your dream location.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-[#c6912c] hover:bg-[#d4a43d] text-white font-medium px-10 py-4 transition-all duration-300 body-font"
            >
              Contact Us
            </a>
            <a
              href="/projects"
              className="inline-flex items-center justify-center border border-[#1a1a1a]/20 hover:border-[#c6912c] text-[#1a1a1a] hover:text-[#c6912c] font-medium px-10 py-4 transition-all duration-300 body-font"
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
