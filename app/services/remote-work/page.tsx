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
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Connected particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const particles: Array<{
      x: number
      y: number
      baseX: number
      baseY: number
      size: number
      vx: number
      vy: number
    }> = []

    for (let i = 0; i < 40; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      particles.push({
        x, y,
        baseX: x,
        baseY: y,
        size: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
      })
    }

    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vx += (particle.baseX - particle.x) * 0.0003
        particle.vy += (particle.baseY - particle.y) * 0.0003
        particle.vx *= 0.99
        particle.vy *= 0.99

        // Subtle gold particle
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 4
        )
        gradient.addColorStop(0, "rgba(198, 145, 44, 0.5)")
        gradient.addColorStop(0.5, "rgba(198, 145, 44, 0.1)")
        gradient.addColorStop(1, "rgba(198, 145, 44, 0)")
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Connection lines
        particles.forEach((other, j) => {
          if (i >= j) return
          const dist = Math.hypot(particle.x - other.x, particle.y - other.y)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(198, 145, 44, ${0.08 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  // GSAP animations
  useEffect(() => {
    const initAnimations = async () => {
      const gsap = (await import("gsap")).default
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default
      
      gsap.registerPlugin(ScrollTrigger)

      const mediaLayers = document.querySelectorAll(".media-layer")
      const contentLayers = document.querySelectorAll(".content-layer")

      // Media crossfade
      mediaLayers.forEach((layer, index) => {
        if (index === 0) {
          gsap.set(layer, { opacity: 1, scale: 1 })
        } else {
          gsap.set(layer, { opacity: 0, scale: 1.05 })
        }

        if (index < mediaLayers.length - 1) {
          const trigger = document.querySelector(`#trigger-${index}`)
          
          gsap.timeline({
            scrollTrigger: {
              trigger: trigger,
              start: "top top",
              end: "bottom top",
              scrub: 1.5,
            }
          })
          .to(layer, { 
            opacity: 0, 
            scale: 1.1,
            duration: 1 
          }, 0)
          .to(mediaLayers[index + 1], { 
            opacity: 1, 
            scale: 1,
            duration: 1 
          }, 0)
        }
      })

      // Content fade
      contentLayers.forEach((layer, index) => {
        const trigger = document.querySelector(`#trigger-${index}`)
        
        gsap.set(layer, { opacity: 0 })

        gsap.to(layer, {
          opacity: 1,
          scrollTrigger: {
            trigger: trigger,
            start: "top 70%",
            end: "top 20%",
            scrub: 1,
          }
        })

        gsap.to(layer, {
          opacity: 0,
          scrollTrigger: {
            trigger: trigger,
            start: "bottom 80%",
            end: "bottom 40%",
            scrub: 1,
          }
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
    <div ref={containerRef} className="w-full">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Outfit:wght@200;300;400;500;600&display=swap');

        html {
          scroll-behavior: auto !important;
        }

        body {
          overflow-x: hidden;
          background: #0d1810;
        }

        .headline-font {
          font-family: 'Playfair Display', serif;
        }

        .body-font {
          font-family: 'Outfit', sans-serif;
        }

        .text-shadow-lg {
          text-shadow: 0 2px 40px rgba(0,0,0,0.9), 0 4px 60px rgba(0,0,0,0.5);
        }

        .scroll-progress-bar {
          transform-origin: left;
          transform: scaleX(0);
        }
      `}</style>

      <Navbar />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/5 z-[100]">
        <div className="scroll-progress-bar h-full bg-[#c6912c]" />
      </div>

      {/* ===== UNIFIED WORLD CONTAINER ===== */}
      <div className="fixed inset-0 z-0">
        
        {/* MEDIA STACK */}
        {SECTIONS.map((section, index) => (
          <div 
            key={section.id}
            className="media-layer absolute inset-0 w-full h-full"
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
        
        {/* ===== UNIFYING COLOR WORLD ===== */}
        {/* This creates the "one world" feeling */}
        
        {/* Base tint - warm forest green/teal */}
        <div 
          className="absolute inset-0 z-20 mix-blend-overlay"
          style={{
            background: "linear-gradient(180deg, rgba(20,60,50,0.4) 0%, rgba(30,50,40,0.3) 50%, rgba(20,40,30,0.5) 100%)"
          }}
        />
        
        {/* Golden hour warmth */}
        <div 
          className="absolute inset-0 z-20 mix-blend-soft-light"
          style={{
            background: "linear-gradient(135deg, rgba(198,145,44,0.15) 0%, transparent 50%, rgba(198,145,44,0.1) 100%)"
          }}
        />
        
        {/* Consistent sky gradient at top */}
        <div 
          className="absolute inset-0 z-20"
          style={{
            background: "linear-gradient(180deg, rgba(15,35,30,0.7) 0%, transparent 30%, transparent 70%, rgba(10,25,20,0.8) 100%)"
          }}
        />
        
        {/* Vignette - same throughout */}
        <div 
          className="absolute inset-0 z-20"
          style={{
            boxShadow: "inset 0 0 200px 50px rgba(10,20,15,0.8)"
          }}
        />
        
        {/* Left side gradient for text readability */}
        <div 
          className="absolute inset-0 z-20"
          style={{
            background: "linear-gradient(90deg, rgba(10,20,15,0.7) 0%, rgba(10,20,15,0.4) 30%, transparent 60%)"
          }}
        />

      </div>

      {/* Particle Canvas */}
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-30"
        style={{ mixBlendMode: "screen" }}
      />

      {/* SCROLL TRIGGERS */}
      {SECTIONS.map((_, index) => (
        <div 
          key={index}
          id={`trigger-${index}`}
          className="h-screen w-full"
        />
      ))}

      {/* FIXED CONTENT */}
      <div className="fixed inset-0 z-40 pointer-events-none">
        {SECTIONS.map((section, index) => (
          <div 
            key={section.id}
            className="content-layer absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24"
          >
            <div className="max-w-2xl pointer-events-auto">
              {index > 0 && (
                <span className="body-font text-[#c6912c] text-xs tracking-[0.4em] uppercase mb-6 block font-medium">
                  {String(index + 1).padStart(2, "0")} — {section.id}
                </span>
              )}

              <h2 className="headline-font text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] text-shadow-lg">
                {section.headline}
              </h2>

              <p className="body-font text-base md:text-lg text-white/75 mt-6 font-light leading-relaxed max-w-lg">
                {section.subtext}
              </p>

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
        ))}
      </div>

      {/* Scroll hint */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
        <span className="body-font text-white/30 text-xs tracking-[0.2em] uppercase">
          Scroll
        </span>
        <svg className="w-4 h-4 text-[#c6912c] animate-bounce" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* Spacer */}
      <div className="h-screen" />

      {/* Final CTA */}
      <section className="relative py-24 md:py-32 z-50 bg-gradient-to-b from-transparent via-[#0d1810] to-[#0d1810]">
        <div className="relative container mx-auto px-8 md:px-16 text-center">
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
