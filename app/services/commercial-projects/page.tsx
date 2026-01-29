import { useState, useEffect, useRef } from 'react';

export default function CommercialServicesPage() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const videoRef = useRef(null);
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      setIsPaused(!isPaused);
    }
  };

  const stats = [
    { value: '100%', unit: '', label: 'Code Compliant' },
    { value: 'Budget', unit: '', label: 'Driven' },
    { value: '100%', unit: '', label: 'Customer Satisfaction' },
  ];

  return (
    <div style={{ 
      fontFamily: "'Gotham', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      backgroundColor: '#fff',
      color: '#171a20',
      minHeight: '200vh',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          overflow-x: hidden;
        }

        .nav-link {
          color: #171a20;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.5px;
          transition: opacity 0.3s ease;
        }
        
        .nav-link:hover {
          opacity: 0.7;
        }

        .nav-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: opacity 0.3s ease;
          color: #171a20;
        }
        
        .nav-icon:hover {
          opacity: 0.7;
        }

        .pause-btn {
          position: absolute;
          bottom: 32px;
          left: 32px;
          width: 44px;
          height: 44px;
          border: none;
          background: rgba(0, 0, 0, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10;
        }
        
        .pause-btn:hover {
          background: rgba(0, 0, 0, 0.1);
          transform: scale(1.05);
        }

        .hero-title {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 500;
          letter-spacing: -0.5px;
          margin-bottom: 4px;
          opacity: 0;
          transform: translateY(15px);
          animation: fadeUp 1s ease forwards;
          animation-delay: 0.3s;
          color: #171a20;
        }

        .hero-subtitle {
          font-size: clamp(12px, 1.5vw, 14px);
          font-weight: 400;
          letter-spacing: 0.3px;
          opacity: 0;
          transform: translateY(10px);
          animation: fadeUp 1s ease forwards;
          animation-delay: 0.5s;
          color: #393c41;
        }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stat-item {
          text-align: center;
          opacity: 0;
          transform: translateY(40px);
        }

        .stat-item.visible {
          animation: statFadeUp 0.8s ease forwards;
        }

        .stat-item:nth-child(1).visible { animation-delay: 0.1s; }
        .stat-item:nth-child(2).visible { animation-delay: 0.2s; }
        .stat-item:nth-child(3).visible { animation-delay: 0.3s; }
        .stat-item:nth-child(4).visible { animation-delay: 0.4s; }

        @keyframes statFadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stat-value {
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 500;
          letter-spacing: -1px;
          line-height: 1;
          color: #171a20;
          display: inline;
        }

        .stat-unit {
          font-size: clamp(16px, 2vw, 24px);
          font-weight: 400;
          color: #171a20;
          margin-left: 4px;
          display: inline;
        }

        .stat-label {
          font-size: clamp(11px, 1.2vw, 14px);
          font-weight: 400;
          letter-spacing: 0.2px;
          color: #5c5e62;
          margin-top: 8px;
        }

        .divider {
          width: 1px;
          height: 60px;
          background: rgba(0, 0, 0, 0.12);
          align-self: center;
        }

        @media (max-width: 768px) {
          .stats-grid {
            flex-direction: column !important;
            gap: 32px !important;
          }
          .divider {
            width: 50px;
            height: 1px;
            background: rgba(0, 0, 0, 0.12);
          }
        }
      `}</style>

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 48px',
        background: scrollY > 50 ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
        backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        {/* Logo */}
        <div style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: '#171a20',
        }}>
          ANTOVA
        </div>

        {/* Center Nav */}
        <div style={{ 
          display: 'flex', 
          gap: '40px',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}>
          <a href="#" className="nav-link">Residential</a>
          <a href="#" className="nav-link">Commercial</a>
          <a href="#" className="nav-link">Remote</a>
          <a href="#" className="nav-link">About</a>
          <a href="#" className="nav-link">Contact</a>
        </div>

        {/* Right Icons */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div className="nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#171a20" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>
          <div className="nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#171a20" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </div>
          <div className="nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#171a20" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
      }}>
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src="/newbuilds-video.mp4" type="video/mp4" />
        </video>

        {/* Hero Content - Top Center like Tesla */}
        <div style={{
          position: 'absolute',
          top: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          textAlign: 'center',
          padding: '0 24px',
        }}>
          <h1 className="hero-title">Commercial</h1>
          <p className="hero-subtitle">Large-Scale Construction Services</p>
        </div>

        {/* Pause Button */}
        <button className="pause-btn" onClick={toggleVideo}>
          {isPaused ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#171a20">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#171a20">
              <rect x="6" y="4" width="4" height="16"/>
              <rect x="14" y="4" width="4" height="16"/>
            </svg>
          )}
        </button>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 48px',
          background: '#fff',
        }}
      >
        <div 
          className="stats-grid"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '48px',
            maxWidth: '1000px',
            width: '100%',
          }}
        >
          {stats.map((stat, index) => (
            <>
              <div 
                key={stat.label} 
                className={`stat-item ${statsVisible ? 'visible' : ''}`}
              >
                <div>
                  <span className="stat-value">{stat.value}</span>
                  {stat.unit && <span className="stat-unit">{stat.unit}</span>}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
              {index < stats.length - 1 && <div className="divider" />}
            </>
          ))}
        </div>
      </section>

      {/* Image + Text Section - Tesla Style */}
      <section style={{
        padding: '80px 48px',
        background: '#fff',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        {/* 21:9 Image Container */}
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '21 / 9',
          overflow: 'hidden',
          borderRadius: '8px',
          marginBottom: '40px',
        }}>
          <img 
            src="/commercial_wide1.png" 
            alt="Commercial construction project"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
        
        {/* Text Content */}
        <div style={{
          maxWidth: '900px',
        }}>
          <h2 style={{
            fontSize: 'clamp(24px, 4vw, 40px)',
            fontWeight: '500',
            letterSpacing: '-0.5px',
            color: '#171a20',
            marginBottom: '16px',
            lineHeight: '1.2',
          }}>
            Building Excellence, Delivering Results
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 1.5vw, 16px)',
            fontWeight: '400',
            lineHeight: '1.7',
            color: '#5c5e62',
          }}>
            Our commercial construction services combine precision engineering with modern design principles. We deliver projects that meet the highest standards of quality, safety, and efficiency. From retail spaces to office complexes, our team ensures every detail is executed to perfection. <a href="#" style={{ color: '#171a20', textDecoration: 'underline' }}>Learn more about our process</a>.
          </p>
        </div>
      </section>

      {/* Additional Content Placeholder */}
      <section style={{
        minHeight: '40vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 48px',
        background: 'linear-gradient(180deg, #fff 0%, #f4f4f4 100%)',
      }}>
        <p style={{ 
          fontSize: '18px', 
          opacity: 0.5, 
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#171a20',
        }}>
          More sections coming soon
        </p>
      </section>
    </div>
  );
}
