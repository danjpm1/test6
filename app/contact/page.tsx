"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  Calendar,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  Copy,
  MessageCircle,
  MapPin,
} from "lucide-react"

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <section className="relative bg-[#0a0a0a] py-24 mt-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight mb-6">CONTACT</h1>
            <a
              href="tel:2086258342"
              className="text-white/90 text-2xl md:text-3xl hover:text-amber-500 transition-colors"
            >
              (208) 625-8342
            </a>
            <p className="text-white/50 mt-4">Response within 24 hours</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            <div className="border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors">
              <Zap className="w-5 h-5 text-white/70 mb-4" />
              <h3 className="text-white font-medium mb-1">Project Completion</h3>
              <p className="text-white/50 text-sm">4-6 weeks</p>
            </div>
            <div className="border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors">
              <Shield className="w-5 h-5 text-white/70 mb-4" />
              <h3 className="text-white font-medium mb-1">100% Guarantee</h3>
              <p className="text-white/50 text-sm">Precision Built</p>
            </div>
            <div className="border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors">
              <Clock className="w-5 h-5 text-white/70 mb-4" />
              <h3 className="text-white font-medium mb-1">24/7 Support</h3>
              <p className="text-white/50 text-sm">Always available</p>
            </div>
            <div className="border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors">
              <TrendingUp className="w-5 h-5 text-white/70 mb-4" />
              <h3 className="text-white font-medium mb-1">Performance</h3>
              <p className="text-white/50 text-sm">Optimized</p>
            </div>
          </div>

          <div className="mb-10">
            <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Email</p>
            <button
              onClick={() => navigator.clipboard.writeText("sales@antovabuilders.com")}
              className="w-full border border-white/10 rounded-lg p-5 flex items-center justify-between hover:border-white/20 transition-colors group"
            >
              <span className="text-white text-lg font-mono">sales@antovabuilders.com</span>
              <Copy className="w-5 h-5 text-white/30 group-hover:text-white/50 transition-colors" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <button
              onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
              className="border border-white/10 rounded-lg p-8 flex flex-col items-center hover:border-white/20 transition-colors group"
            >
              <Calendar className="w-6 h-6 text-white/50 mb-3 group-hover:text-white/70" />
              <span className="text-white font-medium">Schedule a Call</span>
              <span className="text-white/50 text-sm mt-1">Book online</span>
            </button>

            <a
              href="sms:+15096717386?body=Hi, I would like to schedule a consultation."
              className="border border-white/10 rounded-lg p-8 flex flex-col items-center hover:border-white/20 transition-colors group"
            >
              <MessageCircle className="w-6 h-6 text-white/50 mb-3 group-hover:text-white/70" />
              <span className="text-white font-medium">Text Us</span>
              <span className="text-white/50 text-sm mt-1">Quick questions</span>
            </a>
          </div>
        </div>
      </section>

      <section id="booking" className="bg-black py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              SCHEDULE A <span className="text-amber-500">CONSULTATION</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto mb-6">
              Select a time that works for you. After choosing, you can pick your preferred meeting type.
            </p>
            <div className="flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-white/70">
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Virtual (Google Meet)</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>On-Site Visit</span>
              </div>
            </div>
          </div>
          
          <div className="bg-[#111] rounded-2xl border border-white/10 overflow-hidden">
            {/* Cal.com Embed */}
            <iframe 
              src="https://cal.com/danjpm?embed=true&theme=dark"
              width="100%"
              height="700"
              frameBorder="0"
              style={{ minHeight: '700px', background: '#111' }}
            />
          </div>
        </div>
      </section>

      <section className="bg-black py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps?q=Antova+Builders,+280+Tower+Road,+Cocolalla,+ID+83813&output=embed"
              className="w-full h-96 lg:h-[500px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="bg-white p-12 flex flex-col items-center justify-center text-center">
              <MapPin className="w-10 h-10 text-amber-500 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Visit Us</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Antova Builders
                <br />
                280 Tower Road
                <br />
                Cocolalla, ID 83813
              </p>
              <a
                href="https://maps.google.com/?q=280+Tower+Road+Cocolalla+ID+83813"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-900 hover:text-amber-600 uppercase tracking-wide"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
