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
      const sections = document.querySelectorAll(".parallax-section")

      sections.forEach((section, index) => {
        const media = section.querySelector(".parallax-media")
        const headline = section.querySelector(".parallax-headline")
        const subtext = section.querySelector(".parallax-subtext")
        const number = section.querySelector(".parallax-number")
        const overlay = section.querySelector(".parallax-overlay")

        // Direction alternates for variety
        const direction = index % 2 === 0 ? 1 : -1

        // MEDIA: Moves OPPOSITE to scroll (creates depth)
        // As you scroll DOWN, image moves UP (and vice versa)
        gsap.fromTo(media,
          { 
            yPercent: -15,
            scale: 1.15,
            rotation: direction * 1
          },
          {
            yPercent: 15,
            scale: 1,
            rotation: direction * -1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        )

        // HEADLINE: Moves FASTER than scroll (foreground feel)
        gsap.fromTo(headline,
          { 
            yPercent: 50,
            xPercent: direction * 10,
            opacity: 0,
            rotation: direction * 3
          },
          {
            yPercent: -50,
            xPercent: direction * -10,
            opacity: 1,
            rotation: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        )

        // SUBTEXT: Moves at different rate than headline
        gsap.fromTo(subtext,
          { 
            yPercent: 80,
            xPercent: direction * -5,
            opacity: 0
          },
          {
            yPercent: -30,
            xPercent: direction * 5,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        )

        // NUMBER: Moves in opposite direction to text
        gsap.fromTo(number,
          { 
            yPercent: -100,
            xPercent: direction * -20,
            opacity: 0,
            rotation: direction * -10
          },
          {
            yPercent: 100,
            xPercent: direction * 20,
            opacity: 0.3,
            rotation: direction * 10,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        )

        // OVERLAY: Fades based on position
        gsap.fromTo(overlay,
          { opacity: 0.5 },
          {
            opacity: 0.2,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "center center",
              scrub: 1,
            },
          }
        )
        
        // Overlay darkens as you leave
        gsap.fromTo(overlay,
          { opacity: 0.2 },
          {
            opacity: 0.6,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "center center",
              end: "bottom top",
              scrub: 1,
            },
          }
        )
      })

      // Floating particles with continuous diagonal movement
      const particles = document.querySelectorAll(".particle")
      particles.forEach((particle, i) => {
        const direction = i % 2 === 0 ? 1 : -1
        
        // Continuous floating
        gsap.to(particle, {
          y: `random(-150, 150)`,
          x: `random(-100, 100)`,
          rotation: `random(-180, 180)`,
          scale: `random(0.5, 1.5)`,
          duration: `random(6, 12)`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
        
        // Diagonal drift based on scroll
        gsap.to(particle, {
          y: direction * -800,
          x: direction * -400,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 2,
          },
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
          text-shadow: 0 4px 30px rgba(0,0,0,0.5), 0 0 80px rgba(0,0,0,0.3);
        }

        .scroll-progress-bar {
          transform-origin: left;
          transform: scaleX(0);
        }
      `}</style>

      <Navbar />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-[100]">
        <div className="scroll-progress-bar h-full bg-gradient-to-r from-[#c6912c] to-[#e8b84a]" />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute rounded-full"
            style={{
              width: Math.random() * 8 + 3 + "px",
              height: Math.random() * 8 + 3 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              opacity: Math.random() * 0.3 + 0.1,
              background: i % 3 === 0 
                ? "radial-gradient(circle, #c6912c 0%, transparent 70%)" 
                : "#c6912c",
              filter: i % 3 === 0 ? "blur(2px)" : "none",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="parallax-section relative w-full h-screen overflow-hidden">
        <div className="parallax-media absolute inset-[-15%] w-[130%] h-[130%]">
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

        <div className="parallax-overlay absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6">
          <h1 className="parallax-headline headline-font text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight text-shadow-lg">
            YOU FOUND IT.
          </h1>
          <p className="parallax-subtext body-font text-xl md:text-2xl lg:text-3xl text-white/90 mt-6 md:mt-8 font-light max-w-2xl">
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

        {/* Diagonal Decorative Line */}
        <div 
          className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"
          style={{ clipPath: "polygon(0 60%, 100% 0%, 100% 100%, 0 100%)" }}
        />
      </section>

      {/* Content Sections */}
      {SECTIONS.slice(1).map((section, index) => (
        <section
          key={section.id}
          className="parallax-section relative w-full min-h-screen overflow-hidden"
        >
          {/* Background Image - Oversized for parallax movement */}
          <div className="parallax-media absolute inset-[-15%] w-[130%] h-[130%]">
            <Image
              src={section.media}
              alt={section.headline}
              fill
              className="object-cover"
              priority={index < 2}
            />
          </div>

          {/* Overlay */}
          <div className="parallax-overlay absolute inset-0 bg-black/30" />

          {/* Diagonal Top Border */}
          <div 
            className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 40%, 0 100%)" }}
          />

          {/* Content */}
          <div className="relative z-20 min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 py-32">
            {/* Section Number */}
            <span className="parallax-number body-font text-[#c6912c] text-[10rem] md:text-[14rem] font-bold absolute top-1/2 -translate-y-1/2 right-4 md:right-12 opacity-20 pointer-events-none">
              {String(index + 2).padStart(2, "0")}
            </span>

            <div className="max-w-4xl">
              <h2 className="parallax-headline headline-font text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[0.95] text-shadow-lg">
                {section.headline}
              </h2>

              <p className="parallax-subtext body-font text-lg md:text-xl lg:text-2xl text-white/85 mt-6 md:mt-10 font-light leading-relaxed max-w-2xl">
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

          {/* Diagonal Bottom Border */}
          <div 
            className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"
            style={{ clipPath: "polygon(0 60%, 100% 0%, 100% 100%, 0 100%)" }}
          />
        </section>
      ))}

      {/* Final CTA Section */}
      <section className="relative bg-black py-32 md:py-48 overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #c6912c 1px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-16 text-center">
          <h2 className="headline-font text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
            Ready to Build the{" "}
            <span className="text-[#c6912c] italic">Impossible</span>?
          </h2>
          <p className="body-font text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 font-light">
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
