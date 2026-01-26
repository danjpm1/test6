"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function RemoteBuildsHero() {
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (logoRef.current) {
        logoRef.current.style.opacity = "1";
        logoRef.current.style.transform = "scale(1)";
      }
    }, 100);

    const timer2 = setTimeout(() => {
      if (textRef.current) {
        textRef.current.style.opacity = "1";
        textRef.current.style.transform = "translateY(0)";
      }
    }, 400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <section className="relative">
      {/* LOGO HERO SECTION - with forest background */}
      <div className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/forest.png"
            alt="Remote forest location"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for contrast */}
          <div className="absolute inset-0 bg-black/40" />
          {/* Gradient overlay for depth */}
          <div 
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(10,15,26,0.3) 0%, rgba(10,15,26,0.6) 70%, rgba(10,15,26,0.95) 100%)"
            }}
          />
        </div>

        {/* Centered Logo */}
        <div
          ref={logoRef}
          className="relative z-10 flex flex-col items-center transition-all duration-1000 ease-out"
          style={{
            opacity: 0,
            transform: "scale(0.9)",
          }}
        >
          {/* Ambient glow behind logo */}
          <div
            className="absolute inset-0 blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(180, 142, 87, 0.3) 0%, transparent 70%)",
              transform: "scale(2)",
            }}
          />

          {/* The geometric logo from header */}
          <Image
            src="/antova-logo-gold.svg"
            alt="Antova Builders"
            width={280}
            height={280}
            className="relative w-40 h-auto md:w-56 lg:w-72"
            style={{
              filter: "drop-shadow(0 0 60px rgba(180, 142, 87, 0.4))",
            }}
          />

          {/* Optional: Company name under logo */}
          <p 
            className="mt-6 text-white/90 text-xl md:text-2xl font-light tracking-[0.2em]"
            style={{
              textShadow: "0 2px 20px rgba(0,0,0,0.5)"
            }}
          >
            ANTOVA BUILDERS
          </p>
        </div>
      </div>

      {/* BUILD YOUR DREAM ANYWHERE Section */}
      <div
        className="relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/forest.png')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0a0f1a]/85" />

        <div
          ref={textRef}
          className="relative z-10 max-w-3xl mx-auto px-6 py-20 md:py-28 transition-all duration-1000 ease-out"
          style={{
            opacity: 0,
            transform: "translateY(20px)",
          }}
        >
          {/* Heading */}
          <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none mb-2">
            BUILD YOUR
          </h2>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none mb-10"
            style={{
              color: "#b48e57",
              fontStyle: "italic",
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            DREAM ANYWHERE
          </h2>

          {/* Body text */}
          <div className="space-y-6 text-gray-300 text-base md:text-lg leading-relaxed">
            <p>
              Antova Builders specializes in building homes and structures in the
              most challenging locations — mountaintops, remote mountain valleys,
              islands, and sites where conventional contractors refuse to go.
            </p>
            <p>
              We mobilize helicopters, specialized off-road vehicles, and seasoned
              crews who excel in extreme conditions. Whether airlifting all
              materials to an inaccessible peak or pioneering access where no
              roads exist, we turn impossible sites into reality.
            </p>
          </div>

          {/* Gold tagline */}
          <p
            className="mt-10 text-lg md:text-xl font-medium"
            style={{ color: "#b48e57" }}
          >
            If you can dream the location, we can build it there
          </p>
        </div>
      </div>
    </section>
  );
}
