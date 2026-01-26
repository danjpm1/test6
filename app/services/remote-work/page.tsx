"use client";

import Image from "next/image";

export default function BuildDreamSection() {
  return (
    <section
      className="relative py-20 md:py-28 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/forest.png')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0a0f1a]/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left: Text Content */}
          <div className="flex-1">
            {/* Bebas Neue headline */}
            <h2 className="font-bebas text-5xl md:text-6xl lg:text-7xl text-white uppercase tracking-wide leading-none mb-1">
              BUILD YOUR
            </h2>
            {/* Playfair Display italic gold accent */}
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none mb-8"
              style={{
                color: "#b48e57",
                fontStyle: "italic",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              DREAM ANYWHERE
            </h2>

            {/* Inter body text */}
            <div className="space-y-5 font-sans text-gray-300 text-base md:text-lg leading-relaxed max-w-xl">
              <p>
                Antova Builders specializes in building homes and structures in
                the most challenging locations — mountaintops, remote mountain
                valleys, islands, and sites where conventional contractors
                refuse to go.
              </p>
              <p>
                We mobilize helicopters, specialized off-road vehicles, and
                seasoned crews who excel in extreme conditions. Whether
                airlifting all materials to an inaccessible peak or pioneering
                access where no roads exist, we turn impossible sites into
                reality.
              </p>
            </div>

            {/* Gold tagline */}
            <p
              className="mt-8 font-sans text-lg md:text-xl font-medium"
              style={{ color: "#b48e57" }}
            >
              If you can dream the location, we can build it there
            </p>
          </div>

          {/* Right: Big Logo (replaces image grid) */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative">
              {/* Ambient glow behind logo */}
              <div
                className="absolute inset-0 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(180, 142, 87, 0.25) 0%, transparent 60%)",
                  transform: "scale(1.8)",
                }}
              />

              {/* The geometric logo */}
              <Image
                src="/antova-logo-gold.svg"
                alt="Antova Builders"
                width={400}
                height={400}
                className="relative w-64 h-auto md:w-80 lg:w-96"
                style={{
                  filter: "drop-shadow(0 0 80px rgba(180, 142, 87, 0.3))",
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
