import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  return (
    <div className="sf-landing-page">
      {/* --- HERO SECTION --- */}
      <header className="sf-hero">
        <div className="sf-container hero-grid">
          <div className="hero-content">
            <div className="hero-badge"><span className="badge-dot"></span> Rated #1 City Management Tool</div>
            <h1 className="hero-title">Fix your street, <br /> <span>empower your city.</span></h1>
            <p className="hero-subtitle">StreetFix is a web-based platform that allows users to report street problems 
          with photos and location. Authorities can view reports, take action, and update 
          the status from <b>Pending</b> to <b>Solved</b> for faster resolution.</p>
            <div className="hero-buttons">
              <Link to="/submit" className="btn-primary">Report an Issue</Link>
              <Link to="/problems" className="btn-outline">Explore Problems</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="img-container">
              <img src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1000" alt="City" className="hero-main-img" />
            </div>
          </div>
        </div>
      </header>

      {/* --- 🔥 LIVE STATS (ANIMATED) 🔥 --- */}
      <section className="sf-stats-section">
        <div className="sf-container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon bg-blue-grad">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <h2 className="stat-number">
                <AnimatedCounter target={6000} duration={2000} />+
              </h2>
              <p className="stat-label">Issues Resolved</p>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon bg-purple-grad">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>
              </div>
              <h2 className="stat-number">
                <AnimatedCounter target={15} duration={1500} />+
              </h2>
              <p className="stat-label">City Zones Covered</p>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon bg-emerald-grad">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <h2 className="stat-number">
                <AnimatedCounter target={48} duration={1800} />h
              </h2>
              <p className="stat-label">Average Fix Time</p>
            </div>

            {/* 🔥 নতুন 4th Stat যোগ করা হয়েছে 🔥 */}
            <div className="stat-card">
              <div className="stat-icon bg-orange-grad">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </div>
              <h2 className="stat-number">
                <AnimatedCounter target={98} duration={1600} />%
              </h2>
              <p className="stat-label">Satisfaction Rate</p>
            </div>

          </div>
        </div>
      </section>

            {/* --- 🔥 HOW IT WORKS SECTION (MODERN REDESIGN) 🔥 --- */}
      <section className="sf-how-it-works">
        <div className="sf-container">
          <div className="section-head center">
            <span className="section-tag">🚀 Process</span>
            <h2>How <span className="grad-text">StreetFix</span> works</h2>
            <p className="section-sub">Report issues and help keep your city clean and green. It's as easy as 1-2-3.</p>
          </div>

          <div className="hiw-modern-grid">
            
            {/* Step 1 */}
            <div className="hiw-modern-card" data-step="01">
              <div className="hiw-icon-wrapper glow-blue">
                <svg width="32" height="32" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
              </div>
              <div className="hiw-content">
                <span className="hiw-badge badge-blue">Step 1</span>
                <h3>Snap a Photo</h3>
                <p>See a pothole, broken street light, or garbage dump? Take a quick picture using your smartphone.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="hiw-modern-card" data-step="02">
              <div className="hiw-icon-wrapper glow-orange">
                <svg width="32" height="32" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              <div className="hiw-content">
                <span className="hiw-badge badge-orange">Step 2</span>
                <h3>Set Location</h3>
                <p>Enter the exact address or let the app detect your GPS location so crews can find the issue easily.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="hiw-modern-card" data-step="03">
              <div className="hiw-icon-wrapper glow-green">
                <svg width="32" height="32" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
              </div>
              <div className="hiw-content">
                <span className="hiw-badge badge-green">Step 3</span>
                <h3>Track Progress</h3>
                <p>Follow your report in real-time as officials review it, dispatch a team, and finally resolve the issue.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

           {/* --- 🔥 PREMIUM FEATURES SECTION (DEEP TECH LOOK) 🔥 --- */}
      <section className="sf-features-tech-dark">
        
        {/* Background Ambient Glows */}
        <div className="tech-ambient-glow glow-left"></div>
        <div className="tech-ambient-glow glow-right"></div>

        <div className="sf-container">
          <div className="section-head center tech-head">
            <span className="section-tag tech-tag">✨ Advanced Tech</span>
            <h2>Better technology, <span className="grad-text-tech">better streets</span></h2>
            <p className="section-sub tech-sub">Experience the next generation of civic management with our powerful, AI-driven tools.</p>
          </div>

          <div className="tech-features-grid">
            
            {/* Feature 1 */}
            <div className="tech-feature-card card-blue">
              <div className="tech-bg-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </div>
              <div className="tech-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </div>
              <h3>Instant Dispatch</h3>
              <p>Reports are instantly routed to the right crew with our smart AI-powered categorization engine.</p>
            </div>

            {/* Feature 2 */}
            <div className="tech-feature-card card-purple">
              <div className="tech-bg-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div className="tech-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <h3>Geolocation Map</h3>
              <p>Precise GPS mapping ensures crews find the exact location for faster, seamless resolution.</p>
            </div>

            {/* Feature 3 */}
            <div className="tech-feature-card card-emerald">
              <div className="tech-bg-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              </div>
              <div className="tech-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              </div>
              <h3>Live Analytics</h3>
              <p>Real-time data dashboards help officials prevent future hazards and plan ahead smartly.</p>
            </div>

            {/* Feature 4 */}
            <div className="tech-feature-card card-orange">
              <div className="tech-bg-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
              </div>
              <div className="tech-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
              </div>
              <h3>Secure & Verified</h3>
              <p>Bank-level security with verified officials handling every report with complete transparency.</p>
            </div>

          </div>
        </div>
      </section>

               {/* --- 🔥 PREMIUM CATEGORIES SECTION 🔥 --- */}
      <section className="sf-section sf-cat-premium">
        <div className="sf-container">
          <div className="section-head center">
            <span className="section-tag">📋 Categories</span>
            <h2>Report <span className="grad-text">any issue</span></h2>
            <p className="section-sub">Choose from common civic issue categories to file your report quickly.</p>
          </div>

          <div className="prem-category-grid">
            {/* 1. Road Hazards */}
            <PremiumCategoryCard
              img="https://i.ibb.co.com/Rp8LVpW4/Road-hagard.png"
              title="Road Hazards"
              desc="Potholes and damages"
              count="2.4k reports"
              color="red"
            />
            
            {/* 2. Street Lights */}
            <PremiumCategoryCard
              img="https://i.ibb.co.com/9k5QNx4Q/road-light.png"
              title="Street Lights"
              desc="Broken or dim lamps"
              count="1.8k reports"
              color="amber"
            />
            
            {/* 3. Waste & Trash (নতুন ছবি) */}
            <PremiumCategoryCard
              img="https://i.ibb.co.com/spjyjTj4/Waste-Trash.png"
              title="Waste & Trash"
              desc="Garbage and bins"
              count="3.1k reports"
              color="green"
            />
            
            {/* 4. Drainage */}
            <PremiumCategoryCard
              img="https://i.ibb.co.com/MxG9RxMB/drain.png"
              title="Drainage"
              desc="Water logging issues"
              count="980 reports"
              color="blue"
            />
          </div>
        </div>
      </section>

      {/* --- 🔥 REAL LIFE TESTIMONIALS SECTION 🔥 --- */}
      <section className="sf-testi-premium sf-testi-real">
        <div className="sf-container">
          <div className="section-head center">
            <span className="section-tag">💬 Community Reviews</span>
            <h2>Real impact on <span className="grad-text">real people</span></h2>
            <p className="section-sub">See how StreetFix is transforming neighborhoods and changing lives every day.</p>
          </div>

          <div className="real-testi-grid">
            {/* Review 1 */}
            <div className="real-testi-card">
              <div className="real-testi-header">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" className="real-avatar" />
                <div className="real-user-info">
                  <h4>Rahat Khan</h4>
                  <span className="real-location">📍 Uttara, Dhaka</span>
                </div>
                <div className="real-date">2 days ago</div>
              </div>
              <div className="real-stars">
                ⭐⭐⭐⭐⭐
                <span className="real-verified"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Verified</span>
              </div>
              <p className="real-review-text">
                "Reported a pothole in front of my house on Tuesday, and it was completely fixed by Thursday morning. The process was incredibly smooth and the tracking feature is brilliant!"
              </p>
            </div>

            {/* Review 2 - Featured */}
            <div className="real-testi-card featured-review">
              <div className="real-testi-header">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="User" className="real-avatar" />
                <div className="real-user-info">
                  <h4>Sarah Ahmed</h4>
                  <span className="real-location">📍 Gulshan, Dhaka</span>
                </div>
                <div className="real-date">1 week ago</div>
              </div>
              <div className="real-stars">
                ⭐⭐⭐⭐⭐
                <span className="real-verified"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Verified</span>
              </div>
              <p className="real-review-text">
                "The transparency of the tracking system is what I love the most. I knew exactly when the city crew arrived. StreetFix finally made civic reporting actually work. Highly recommended!"
              </p>
            </div>

            {/* Review 3 */}
            <div className="real-testi-card">
              <div className="real-testi-header">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User" className="real-avatar" />
                <div className="real-user-info">
                  <h4>Maliha Hossain</h4>
                  <span className="real-location">📍 Mirpur, Dhaka</span>
                </div>
                <div className="real-date">3 weeks ago</div>
              </div>
              <div className="real-stars">
                ⭐⭐⭐⭐⭐
                <span className="real-verified"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Verified</span>
              </div>
              <p className="real-review-text">
                "Finally, a platform that takes citizen reports seriously. The broken street light near my apartment was fixed in just 2 days after reporting. Truly a game-changer for our community safety."
              </p>
            </div>
          </div>
          
          {/* 🔥 Trust Bar রিমুভ করা হয়েছে (আপনার নির্দেশ অনুযায়ী) 🔥 */}
        </div>
      </section>

      {/* --- 🔥 PREMIUM CTA SECTION 🔥 --- */}
      <section className="sf-cta-premium">
        <div className="sf-container">
          <div className="cta-prem-box">

            {/* Animated Background Shapes */}
            <div className="cta-shape cta-shape-1"></div>
            <div className="cta-shape cta-shape-2"></div>
            <div className="cta-shape cta-shape-3"></div>
            <div className="cta-grid-pattern"></div>

            <div className="cta-prem-content">
              {/* Badge */}
              <div className="cta-prem-badge">
                <span className="cta-badge-dot"></span>
                Join the movement
              </div>

              {/* Title */}
              <h2 className="cta-prem-title">
                Ready to improve <br />
                <span className="cta-grad">your street?</span>
              </h2>

              {/* Description */}
              <p className="cta-prem-desc">
                Join thousands of citizens making a real difference in their neighborhoods every day. Your voice matters.
              </p>

              {/* Buttons */}
              <div className="cta-prem-buttons">
                <Link to="/submit" className="cta-btn-primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                  </svg>
                  Report Now
                </Link>
                <Link to="/problems" className="cta-btn-secondary">
                  Explore Issues
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="cta-prem-trust">
                <div className="cta-trust-item">
                  <div className="cta-trust-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Free Forever</span>
                </div>
                <div className="cta-trust-item">
                  <div className="cta-trust-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>No Sign-up Required</span>
                </div>
                <div className="cta-trust-item">
                  <div className="cta-trust-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>24/7 Tracking</span>
                </div>
              </div>

              {/* User Avatars */}
              <div className="cta-prem-users">
                <div className="cta-avatars">
                  <div className="cta-avatar" style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)' }}>RK</div>
                  <div className="cta-avatar" style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}>SA</div>
                  <div className="cta-avatar" style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)' }}>MH</div>
                  <div className="cta-avatar" style={{ background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' }}>+</div>
                </div>
                <div className="cta-users-text">
                  <strong>10,000+</strong> active citizens already joined
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ==========================================
// Animated Counter Component (Scroll Effect)
// ==========================================
function AnimatedCounter({ target, duration }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);

  useEffect(() => {
    let startTime = null;
    let observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * target));

            if (progress < 1) {
              window.requestAnimationFrame(animate);
            }
          };
          window.requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) observer.observe(counterRef.current);
    
    return () => {
      if (observer) observer.disconnect();
    };
  }, [target, duration]);

  return <span ref={counterRef}>{count}</span>;
}

// ==========================================
// Premium Category Card Component (Updated big-img)
// ==========================================
function PremiumCategoryCard({ img, title, desc, count, color }) {
  return (
    <div className={`prem-cat-card cat-color-${color}`}>
      {/* 🔥 big-img ক্লাস যোগ করা হয়েছে ছবির সাইজ বড় করার জন্য 🔥 */}
      <div className="prem-cat-img big-img">
        <img src={img} alt={title} />
        <div className="prem-cat-overlay"></div>
        <span className="prem-cat-count">{count}</span>
      </div>
      <div className="prem-cat-content">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
}