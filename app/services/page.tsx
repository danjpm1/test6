"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

/* ─── Scroll-Reveal Hook ─────────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

/* ─── Service Data ────────────────────────────────────────────── */
const services = [
  {
    number: "01",
    eyebrow: "FLAGSHIP SERVICE",
    title: "Signature Custom Design",
    titleBreak: <>Signature Custom<br className="hidden md:block" /> Design</>,
    description: "Your vision, architecturally realized. Every element — from foundation engineering to interior finish — is custom-designed and precision-built for your site, your lifestyle, your legacy.",
    price: "From $280 per square foot",
    tags: ["Architectural Design", "Smart Home", "Premium Materials", "Energy Efficient"],
    estimatorType: "custom-home",
    learnMoreLink: "/offers#signature-custom-design",
    image: "/luxury-custom-home-interior-design-modern-architec.jpg",
  },
  {
    number: "02",
    eyebrow: "MOST POPULAR",
    title: "Renovation",
    titleBreak: <>Renovation</>,
    description: "Kitchen, bathroom, whole-house, or gut renovation — we transform what you have into what you've always wanted. Minimal disruption, maximum impact.",
    price: "Starting from $28,000 · $2K–$5K credits available",
    tags: ["Kitchen & Bath", "Whole House", "Additions", "Structural"],
    estimatorType: "renovation",
    learnMoreLink: "/offers#renovation",
    image: "/renovation-human.png",
  },
  {
    number: "03",
    eyebrow: "NEW CONSTRUCTION",
    title: "New Builds",
    titleBreak: <>New Builds</>,
    description: "New construction on your lot or ours. Site-ready plans, energy-efficient design, and code-compliant builds — from first foundation pour to final inspection.",
    price: "New homes from $250,000",
    tags: ["Site-Ready Plans", "Energy Efficient", "Code Compliant", "Your Lot or Ours"],
    estimatorType: "new-build",
    learnMoreLink: "/offers#new-builds",
    image: "/luxury-modern-cabin-interior-with-large-windows-wo1.jpg",
  },
  {
    number: "04",
    eyebrow: "COMMERCIAL",
    title: "Commercial Projects",
    titleBreak: <>Commercial<br className="hidden md:block" /> Projects</>,
    description: "Office build-outs, retail spaces, restaurants, and warehouse conversions. ADA-compliant, code-ready, and designed for your business operations from day one.",
    price: "From $145 per square foot",
    tags: ["Office", "Retail", "Restaurant", "Warehouse"],
    estimatorType: "commercial",
    learnMoreLink: "/offers#commercial",
    image: "/modern-commercial-building-exterior-glass-facade.jpg",
  },
  {
    number: "05",
    eyebrow: "OFF-GRID SPECIALISTS",
    title: "Remote & Off-Grid Builds",
    titleBreak: <>Remote &<br className="hidden md:block" /> Off-Grid Builds</>,
    description: "Cabins, ADUs, workshops, and fully self-sufficient homes in the most remote locations. We handle access logistics, off-grid systems, and everything between.",
    price: "From $155 per square foot",
    tags: ["Cabins", "ADU / Guest House", "Solar & Off-Grid", "Remote Access"],
    estimatorType: "remote",
    learnMoreLink: "/offers#remote",
    image: "/modern-glass-house-reflecting-in-lake-at-sunset-wi.jpg",
  },
  {
    number: "06",
    eyebrow: "EXPERT ANALYSIS",
    title: "Engineering & Consulting",
    titleBreak: <>Engineering &<br className="hidden md:block" /> Consulting</>,
    description: "Structural assessments, feasibility studies, permit support, and site analysis. The analytical foundation that makes every other service possible.",
    price: "From $2,500 per engagement",
    tags: ["Structural", "Feasibility", "Permits", "Site Analysis"],
    estimatorType: "consulting",
    learnMoreLink: "/offers#engineering-consulting",
    image: "/images/engineering-blueprints.png",
  },
]

const phases = [
  { step: "01", title: "AI Estimate", desc: "Get an instant, data-driven cost estimate tailored to your project type, location, and specs. No calls, no waiting." },
  { step: "02", title: "Design & Plan", desc: "We refine your vision into architectural plans, material selections, and a detailed timeline with weekly milestones." },
  { step: "03", title: "Precision Build", desc: "Execution with obsessive attention to detail. Real-time progress tracking, quality checkpoints, and on-time delivery." },
]

/* ─── Floating Estimate Pill ─────────────────────────────────── */
function FloatingPill() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const h = () => setShow(window.scrollY > window.innerHeight * 0.7)
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])
  return (
    <Link
      href="/cost-estimator"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-6 py-3.5 text-[13px] font-semibold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: "#c6912c",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(20px)",
        pointerEvents: show ? "auto" : "none",
        boxShadow: "0 8px 32px rgba(198,145,44,0.35)",
      }}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
      </span>
      Get Free Estimate
    </Link>
  )
}

/* ─── Scroll Progress ────────────────────────────────────────── */
function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const h = () => {
      const max = document.body.scrollHeight - window.innerHeight
      setPct(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 z-[101] h-[2px]">
      <div className="h-full transition-[width] duration-150 ease-linear" style={{ width: `${pct}%`, background: "#c6912c" }} />
    </div>
  )
}

/* ─── Service Section ────────────────────────────────────────── */
function ServiceSection({ service, index }: { service: typeof services[0]; index: number }) {
  const isEven = index % 2 === 1

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-screen relative overflow-hidden">
      {/* Image */}
      <div className={`relative overflow-hidden min-h-[50vh] md:min-h-screen group ${isEven ? "md:order-2" : ""}`}>
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[8s] ease-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Desktop: gradient fades toward content side */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background: isEven
              ? "linear-gradient(-90deg, transparent 40%, #0a0a0a 100%)"
              : "linear-gradient(90deg, transparent 40%, #0a0a0a 100%)",
          }}
        />
        {/* Mobile: bottom fade */}
        <div className="absolute inset-0 md:hidden bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />
      </div>

      {/* Content */}
      <div className={`relative flex flex-col justify-center bg-[#0a0a0a] px-8 py-16 md:px-12 lg:px-20 xl:px-24 ${isEven ? "md:order-1" : ""}`}>
        {/* Background number */}
        <span
          className="absolute top-[15%] right-[8%] text-[100px] md:text-[150px] font-bold leading-none pointer-events-none select-none"
          style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.025)" }}
        >
          {service.number}
        </span>

        <Reveal>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-[1px] bg-[#c6912c]" />
            <span className="text-[11px] font-semibold tracking-[0.18em] text-[#c6912c]">{service.eyebrow}</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            className="text-3xl md:text-4xl lg:text-[48px] font-bold text-white mb-4 leading-[1.08]"
            style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.02em" }}
          >
            {service.titleBreak}
          </h2>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="text-[15px] leading-[1.7] text-white/40 max-w-[440px] mb-3 font-light">
            {service.description}
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="flex items-center gap-2 mb-7 text-[13px] font-medium text-[#c6912c] tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c6912c] flex-shrink-0" />
            {service.price}
          </div>
        </Reveal>

        <Reveal delay={0.28}>
          <div className="flex flex-wrap gap-2 mb-9">
            {service.tags.map((tag) => (
              <span key={tag} className="text-[11px] font-medium tracking-wide text-white/40 px-3.5 py-1.5 border border-white/[0.08]">
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.34}>
          <div className="flex flex-wrap items-center gap-3">
            <Link href={`/cost-estimator?type=${service.estimatorType}`}>
              <button
                className="group/btn flex items-center gap-2 px-7 py-3.5 text-[13px] font-semibold text-white tracking-wide transition-all duration-300 hover:-translate-y-px"
                style={{ background: "#c6912c" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#d4a03a"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(198,145,44,0.35)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#c6912c"; e.currentTarget.style.boxShadow = "none"; }}
              >
                Get Estimate
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </Link>
            <Link
              href={service.learnMoreLink}
              className="px-7 py-3.5 text-[13px] font-semibold text-white tracking-wide border border-white/[0.15] transition-all duration-300 hover:border-[#c6912c] hover:text-[#c6912c]"
            >
              See Your Offer
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function ServicesPage() {
  return (
    <div className="w-full overflow-x-hidden bg-[#0a0a0a]">
      <ScrollProgress />
      <Navbar />
      <FloatingPill />

      <main className="bg-[#0a0a0a] min-h-screen">

        {/* ─── HERO ─── Full-viewport cinematic opener ─── */}
        <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
          <div className="absolute inset-0">
            <img src="/luxury-custom-home-interior-design-modern-architec.jpg" alt="Luxury custom home" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-[#0a0a0a]" />
          </div>

          <div className="relative z-10 px-8 lg:px-12 xl:px-20 pb-16 md:pb-24 max-w-[900px]">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-[1px] bg-[#c6912c]" />
                <span className="text-[11px] font-semibold tracking-[0.2em] text-[#c6912c]">PRECISION CONSTRUCTION</span>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <h1
                className="text-4xl md:text-6xl lg:text-7xl xl:text-[80px] font-bold text-white leading-[1.05] mb-5"
                style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.02em" }}
              >
                We don&apos;t build houses.<br />We engineer <em className="italic text-[#c6912c]">legacies.</em>
              </h1>
            </Reveal>

            <Reveal delay={0.22}>
              <p className="text-base md:text-lg text-white/40 max-w-[560px] leading-relaxed mb-10 font-light">
                Six disciplines. One team. From architectural vision through final walkthrough — precision construction for the Inland Northwest&apos;s most discerning clients.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/cost-estimator">
                  <button
                    className="flex items-center gap-2.5 px-9 py-4 text-[14px] font-semibold text-white tracking-wide transition-all duration-300 hover:-translate-y-0.5"
                    style={{ background: "#c6912c" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#d4a03a"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(198,145,44,0.4)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#c6912c"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    Get Your AI Estimate
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </button>
                </Link>
                <a
                  href="#services"
                  className="px-8 py-[15px] text-[14px] font-medium text-white tracking-wide border border-white/20 transition-all duration-300 hover:border-[#c6912c] hover:text-[#c6912c]"
                >
                  Explore Services
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="flex flex-wrap gap-10 md:gap-16 mt-14 pt-8 border-t border-white/[0.08]">
                {[
                  { value: "150+", label: "PROJECTS COMPLETED" },
                  { value: "$48M", label: "TOTAL PROJECT VALUE" },
                  { value: "98%", label: "ON-TIME DELIVERY" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-3xl md:text-[40px] font-bold text-[#c6912c]" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
                    <div className="text-[11px] text-white/40 tracking-[0.06em] mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─── SERVICES ─── Alternating cinematic sections ─── */}
        <div id="services">
          {services.map((service, i) => (
            <ServiceSection key={service.number} service={service} index={i} />
          ))}
        </div>

        {/* ─── PROCESS ─── Editorial treatment ─── */}
        <section className="relative py-24 md:py-36 overflow-hidden" style={{ background: "#050505" }}>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(198,145,44,0.05) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 text-center px-6 mb-16">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.2em] text-[#c6912c] mb-5">HOW WE WORK</div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="text-3xl md:text-5xl font-bold text-white mb-4"
                style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.02em" }}
              >
                From Vision to Reality
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-[15px] text-white/40 font-light">
                AI-powered estimation. Human-powered craft. Every project follows our precision framework.
              </p>
            </Reveal>
          </div>

          <div className="relative max-w-[960px] mx-auto px-6">
            <div className="hidden md:block absolute top-9 left-[18%] right-[18%] h-[1px]" style={{ background: "linear-gradient(90deg, transparent, #c6912c, transparent)", opacity: 0.15 }} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
              {phases.map((phase, i) => (
                <Reveal key={phase.step} delay={i * 0.12} className="text-center relative z-10">
                  <div
                    className="w-[72px] h-[72px] mx-auto mb-5 flex items-center justify-center text-[28px] font-bold text-[#c6912c] rounded-full border border-[#c6912c]/20"
                    style={{ fontFamily: "'Playfair Display', serif", background: "#050505" }}
                  >
                    {phase.step}
                  </div>
                  <h3
                    className="text-xl font-semibold text-white mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {phase.title}
                  </h3>
                  <p className="text-[13px] text-white/40 leading-relaxed font-light max-w-[280px] mx-auto">
                    {phase.desc}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FINAL CTA ─── Cinematic closer ─── */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/modern-glass-house-reflecting-in-lake-at-sunset-wi.jpg"
              alt="Modern architecture"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/85" />
          </div>

          <div className="relative z-10 text-center px-6 py-20">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.2em] text-[#c6912c] mb-5">START YOUR PROJECT</div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.02em" }}
              >
                Your Vision, <em className="italic text-[#c6912c]">Engineered</em>
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-[15px] text-white/40 font-light mb-10">
                Get a free AI-powered estimate in 60 seconds. No commitment, no sales calls.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <Link href="/cost-estimator">
                <button
                  className="flex items-center gap-2.5 px-9 py-4 mx-auto text-[14px] font-semibold text-white tracking-wide transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "#c6912c" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#d4a03a"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(198,145,44,0.4)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#c6912c"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  Get Your Free Estimate
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </Link>
            </Reveal>
            <Reveal delay={0.34}>
              <p className="text-[13px] text-white/20 mt-5 tracking-wide">
                Or call us: <a href="tel:+15095551234" className="text-white/40 hover:text-[#c6912c] transition-colors">(509) 555-1234</a>
              </p>
            </Reveal>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  )
}
