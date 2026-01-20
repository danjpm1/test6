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

  // Connected particles animation (like Pioneer's constellation effect)
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

    // Create particles
    const particles: Array<{
      x: number
      y: number
      baseX: number
      baseY: number
      size: number
      vx: number
      vy: number
    }> = []

    for (let i = 0; i < 60; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        size: Math.random() * 4 + 1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      })
    }

    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, i) => {
        // Float movement
        particle.x += particle.vx
        particle.y += particle.vy

        // Pull back to base position
        particle.vx += (particle.baseX - particle.x) * 0.0003
        particle.vy += (particle.baseY - particle.y) * 0.0003

        // Damping
        particle.vx *= 0.995
        particle.vy *= 0.995

        // Draw particle (glowing dot)
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        )
        gradient.addColorStop(0, "rgba(198, 145, 44, 0.8)")
        gradient.addColorStop(0.5, "rgba(198, 145, 44, 0.3)")
        gradient.addColorStop(1, "rgba(198, 145, 44, 0)")
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw connections (constellation lines)
        particles.forEach((other, j) => {
          if (i >= j) return
          const dist = Math.hypot(particle.x - other.x, particle.y - other.y)
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(198, 145, 44, ${0.2 * (1 - dist / 150)})`
            ctx.lineWidth = 1
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

  // GSAP Scroll animations
  useEffect(() => {
    const initAnimations = async () => {
      const gsap = (await import("gsap")).default
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default
      
      gsap.registerPlugin(ScrollTrigger)

      // Animate each section - PINNED with dramatic effects
      const sections = document.querySelectorAll(".pinned-section")

      sections.forEach((section) => {
        const media = section.querySelector(".section-media")
        const mediaInner = section.querySelector(".section-media-inner")
        const content = section.querySelector(".section-content")

        // PIN the section and scrub through animation
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

        // IMAGE CONTAINER: Scale up (zoom effect)
        tl.fromTo(media,
          { scale: 1 },
          { scale: 1.3, duration: 1 },
          0
        )

        // IMAGE INNER: Additional scale + slight blur as you leave
        tl.fromTo(mediaInner,
          { scale: 1.1, filter: "blur(0px) brightness(1)" },
          { scale: 1, filter: "blur(3px) brightness(0.7)", duration: 1 },
          0
        )

        // CONTENT: Fade in then out (text stays HORIZONTAL, no movement)
        tl.fromTo(content,
          { opacity: 0 },
          { opacity: 1, duration: 0.25 },
          0.1
        )
        tl.to(content,
          { opacity: 0, duration: 0.25 },
          0.75
        )
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
          background: #0a0f0a;
        }

        .headline-font {
          font-family: 'Playfair Display', serif;
        }

        .body-font {
          font-family: 'Outfit', sans-serif;
        }

        .text-shadow-lg {
          text-shadow: 0 2px 40px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.5);
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

      {/* Connected Particle Network (constellation effect) */}
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-30"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Hero Section */}
      <section className="pinned-section relative w-full h-screen overflow-hidden">
        <div className="section-media absolute inset-0 w-full h-full origin-center">
          <div className="section-media-inner w-full h-full">
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
        </div>

        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0a] via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f0a]/60 via-transparent to-transparent z-10" />

        {/* Content */}
        <div className="section-content absolute inset-0 z-40 flex flex-col justify-end pb-24 md:pb-32 px-8 md:px-16 lg:px-24">
          <h1 className="headline-font text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight text-shadow-lg max-w-4xl">
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
          className="pinned-section relative w-full h-screen overflow-hidden"
        >
          {/* Image - Scales dramatically like Pioneer */}
          <div className="section-media absolute inset-0 w-full h-full origin-center">
            <div className="section-media-inner w-full h-full">
              <Image
                src={section.media}
                alt={section.headline}
                fill
                className="object-cover"
                priority={index < 2}
              />
            </div>
          </div>

          {/* Gradients for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0a] via-transparent to-[#0a0f0a]/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f0a]/70 via-[#0a0f0a]/20 to-transparent z-10" />

          {/* Content - STATIC position, only fades */}
          <div className="section-content absolute inset-0 z-40 flex flex-col justify-center px-8 md:px-16 lg:px-24">
            <div className="max-w-xl">
              <span className="body-font text-[#c6912c] text-sm tracking-[0.3em] uppercase mb-4 block font-medium">
                {String(index + 2).padStart(2, "0")}
              </span>

              <h2 className="headline-font text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] text-shadow-lg">
                {section.headline}
              </h2>

              <p className="body-font text-base md:text-lg text-white/75 mt-6 font-light leading-relaxed">
                {section.subtext}
              </p>

              {section.id === "result" && (
                <div className="mt-8">
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

      {/* Final CTA */}
      <section className="relative bg-[#0a0f0a] py-24 md:py-32 z-50">
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
