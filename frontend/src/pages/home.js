import React from "react";
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
            <p className="hero-subtitle">The professional platform to report urban issues. Connect directly with officials and track repairs in real-time.</p>
            <div className="hero-buttons">
              <Link to="/submit" className="btn-primary">Report an Issue</Link>
              <Link to="/problems" className="btn-outline">Explore Map</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="img-container">
              <img src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1000" alt="City" className="hero-main-img" />
            </div>
          </div>
        </div>
      </header>

      {/* --- Features Section --- */}
      <section className="sf-section">
        <div className="sf-container">
          <div className="section-head center">
            <span className="section-tag">Features</span>
            <h2>Better technology, better streets</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card"><h3>⚡ Instant Dispatch</h3><p>Reports are instantly routed to the crew.</p></div>
            <div className="feature-card"><h3>📍 Geolocation</h3><p>Precise mapping for faster resolution.</p></div>
            <div className="feature-card"><h3>📊 Analytics</h3><p>Data to prevent future hazards.</p></div>
          </div>
        </div>
      </section>

      {/* --- Categories Section --- */}
      <section className="sf-section sf-bg-light">
        <div className="sf-container">
          <div className="section-head center"><h2>Report Categories</h2></div>
          <div className="category-grid">
            <CategoryCard img="https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&q=80&w=600" title="Road Hazards" desc="Potholes and damages." />
            <CategoryCard img="https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=600" title="Street Lights" desc="Broken or dim lamps." />
            <CategoryCard img="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=600" title="Waste & Trash" desc="Garbage and bins." />
            <CategoryCard img="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600" title="Drainage" desc="Water logging issues." />
          </div>
        </div>
      </section>

      {/* --- Premium Testimonials Section --- */}
      <section className="sf-section sf-testi-section">
        <div className="sf-container">
          <div className="section-head center">
            <h2>Real impact on real people</h2>
            <p className="section-subtitle">See how StreetFix is changing neighborhoods every day.</p>
          </div>
          
          <div className="premium-testimonial-grid">
            <div className="premium-testi-card">
              <div className="quote-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
              </div>
              <p className="testi-text">"Reported a pothole in front of my house, and it was fixed within 48 hours. Amazing! The process was incredibly smooth."</p>
              <div className="testi-user-box">
                <div className="user-avatar bg-indigo">RK</div>
                <div className="user-info">
                  <strong>Rahat Khan</strong>
                  <span>Uttara Resident</span>
                </div>
              </div>
            </div>

            <div className="premium-testi-card">
              <div className="quote-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
              </div>
              <p className="testi-text">"The transparency of the tracking system is what I love. I knew exactly when the crew arrived. Highly recommended!"</p>
              <div className="testi-user-box">
                <div className="user-avatar bg-emerald">SA</div>
                <div className="user-info">
                  <strong>Sarah Ahmed</strong>
                  <span>Gulshan Resident</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Premium Stats Section --- */}
      <section className="sf-stats-premium">
        <div className="sf-container">
          <div className="stats-grid-modern">
            <div className="modern-stat-card">
              <div className="stat-icon-wrap bg-blue-light">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <div>
                <h3 className="stat-number">12,400+</h3>
                <p className="stat-label">Issues Resolved</p>
              </div>
            </div>

            <div className="modern-stat-card">
              <div className="stat-icon-wrap bg-purple-light">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <div>
                <h3 className="stat-number text-purple">24h</h3>
                <p className="stat-label">Avg. Response Time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="sf-cta">
        <div className="sf-container">
          <div className="cta-box">
            <h2>Ready to improve your street?</h2>
            <p>Join thousands of citizens making a difference today.</p>
            <Link to="/submit" className="btn-white">Report Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Category Card Component
function CategoryCard({ img, title, desc }) {
  return (
    <div className="cat-card-premium">
      <div className="cat-img-box"><img src={img} alt={title} /></div>
      <div className="cat-details">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
}