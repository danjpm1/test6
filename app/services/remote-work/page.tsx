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
      {/* Dark overlay - matching the existing style */}
      <div className="absolute inset-0 bg-[#0a0f1a]/75" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left: Text Content - UNCHANGED */}
          <div className="flex-1 max-w-xl">
            {/* BUILD YOUR - Bebas Neue */}
            <h2 className="font-bebas text-5xl md:text-6xl text-white uppercase tracking-wide leading-none mb-1">
              BUILD YOUR
            </h2>
            {/* DREAM ANYWHERE - Playfair Display Italic */}
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight leading-none mb-8"
              style={{
                color: "#b48e57",
                fontStyle: "italic",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              DREAM ANYWHERE
            </h2>

            {/* Body text - Inter */}
            <div className="space-y-5 font-sans text-gray-300 text-base md:text-lg leading-relaxed">
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

          {/* Right: LOGO (replacing the 4-image grid) */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative">
              {/* Ambient glow behind logo */}
              <div
                className="absolute inset-0 blur-3xl opacity-60"
                style={{
                  background:
                    "radial-gradient(circle, rgba(180, 142, 87, 0.3) 0%, transparent 60%)",
                  transform: "scale(2)",
                }}
              />

              {/* The geometric Antova logo */}
              <Image
                src="/antova-logo-gold.svg"
                alt="Antova Builders"
                width={400}
                height={400}
                className="relative w-56 h-auto md:w-72 lg:w-80 xl:w-96"
                style={{
                  filter: "drop-shadow(0 0 60px rgba(180, 142, 87, 0.25))",
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
