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

      {/* --- 🔥 PREMIUM FEATURES SECTION 🔥 --- */}
      <section className="sf-features-premium">
        <div className="sf-container">
          <div className="section-head center">
            <span className="section-tag">✨ Features</span>
            <h2>Better technology, <span className="grad-text">better streets</span></h2>
            <p className="section-sub">Powerful tools designed to make civic reporting effortless and effective.</p>
          </div>

          <div className="premium-features-grid">

            {/* Feature 1 */}
            <div className="prem-feature-card">
              <div className="prem-feat-glow"></div>
              <div className="prem-feat-icon bg-blue-grad">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
              <h3>Instant Dispatch</h3>
              <p>Reports are instantly routed to the right crew with smart AI-powered categorization.</p>
              <div className="prem-feat-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="prem-feature-card">
              <div className="prem-feat-glow"></div>
              <div className="prem-feat-icon bg-purple-grad">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <h3>Geolocation</h3>
              <p>Precise GPS mapping ensures crews find the exact location for faster resolution.</p>
              <div className="prem-feat-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="prem-feature-card">
              <div className="prem-feat-glow"></div>
              <div className="prem-feat-icon bg-emerald-grad">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
              </div>
              <h3>Smart Analytics</h3>
              <p>Real-time data dashboards help officials prevent future hazards and plan ahead.</p>
              <div className="prem-feat-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="prem-feature-card">
              <div className="prem-feat-glow"></div>
              <div className="prem-feat-icon bg-orange-grad">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <h3>Secure & Trusted</h3>
              <p>Bank-level security with verified officials handling every report transparently.</p>
              <div className="prem-feat-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
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
            <PremiumCategoryCard
              img="https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&q=80&w=600"
              title="Road Hazards"
              desc="Potholes and damages"
              count="2.4k reports"
              color="red"
            />
            <PremiumCategoryCard
              img="https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=600"
              title="Street Lights"
              desc="Broken or dim lamps"
              count="1.8k reports"
              color="amber"
            />
            <PremiumCategoryCard
              img="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=600"
              title="Waste & Trash"
              desc="Garbage and bins"
              count="3.1k reports"
              color="green"
            />
            <PremiumCategoryCard
              img="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600"
              title="Drainage"
              desc="Water logging issues"
              count="980 reports"
              color="blue"
            />
          </div>
        </div>
      </section>

      {/* --- 🔥 PREMIUM TESTIMONIALS SECTION 🔥 --- */}
      <section className="sf-testi-premium">
        <div className="sf-container">
          <div className="section-head center">
            <span className="section-tag">💬 Testimonials</span>
            <h2>Real impact on <span className="grad-text">real people</span></h2>
            <p className="section-sub">See how StreetFix is transforming neighborhoods and changing lives every day.</p>
          </div>

          <div className="testi-premium-grid">

            {/* Testimonial 1 */}
            <div
              className="testi-prem-card"
              onClick={(e) => {
                e.currentTarget.classList.remove("testi-shake");
                void e.currentTarget.offsetWidth;
                e.currentTarget.classList.add("testi-shake");
              }}
            >
              <div className="testi-prem-quote">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <div className="testi-prem-stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#fbbf24">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              <p className="testi-prem-text">
                Reported a pothole in front of my house, and it was fixed within 48 hours. Amazing! The process was incredibly smooth and the team was professional.
              </p>

              <div className="testi-prem-divider"></div>

              <div className="testi-prem-footer">
                <div className="testi-prem-user">
                  <div className="testi-prem-avatar bg-indigo">RK</div>
                  <div className="testi-prem-info">
                    <strong>Rahat Khan</strong>
                    <span>📍 Uttara Resident</span>
                  </div>
                </div>
                <div className="testi-prem-verified">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Verified
                </div>
              </div>
            </div>

            {/* Testimonial 2 - Featured */}
            <div
              className="testi-prem-card testi-featured"
              onClick={(e) => {
                e.currentTarget.classList.remove("testi-shake");
                void e.currentTarget.offsetWidth;
                e.currentTarget.classList.add("testi-shake");
              }}
            >
              <div className="testi-featured-badge">⭐ Featured</div>
              <div className="testi-prem-quote">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <div className="testi-prem-stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#fbbf24">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              <p className="testi-prem-text">
                The transparency of the tracking system is what I love. I knew exactly when the crew arrived. StreetFix made civic reporting actually work. Highly recommended!
              </p>

              <div className="testi-prem-divider"></div>

              <div className="testi-prem-footer">
                <div className="testi-prem-user">
                  <div className="testi-prem-avatar bg-emerald">SA</div>
                  <div className="testi-prem-info">
                    <strong>Sarah Ahmed</strong>
                    <span>📍 Gulshan Resident</span>
                  </div>
                </div>
                <div className="testi-prem-verified">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Verified
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div
              className="testi-prem-card"
              onClick={(e) => {
                e.currentTarget.classList.remove("testi-shake");
                void e.currentTarget.offsetWidth;
                e.currentTarget.classList.add("testi-shake");
              }}
            >
              <div className="testi-prem-quote">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <div className="testi-prem-stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#fbbf24">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              <p className="testi-prem-text">
                Finally, a platform that takes citizen reports seriously. The street light near my place was fixed in just 2 days. Truly a game-changer for our community.
              </p>

              <div className="testi-prem-divider"></div>

              <div className="testi-prem-footer">
                <div className="testi-prem-user">
                  <div className="testi-prem-avatar bg-orange">MH</div>
                  <div className="testi-prem-info">
                    <strong>Maliha Hossain</strong>
                    <span>📍 Mirpur Resident</span>
                  </div>
                </div>
                <div className="testi-prem-verified">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Verified
                </div>
              </div>
            </div>

          </div>

          {/* Trust Bar */}
          <div className="testi-trust-bar">
            <div className="testi-trust-item">
              <strong>4.9/5</strong>
              <span>Average Rating</span>
            </div>
            <div className="testi-trust-divider"></div>
            <div className="testi-trust-item">
              <strong>10,000+</strong>
              <span>Happy Users</span>
            </div>
            <div className="testi-trust-divider"></div>
            <div className="testi-trust-item">
              <strong>98%</strong>
              <span>Satisfaction Rate</span>
            </div>
          </div>
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

// --- Premium Category Card Component ---
function PremiumCategoryCard({ img, title, desc, count, color }) {
  return (
    <div className={`prem-cat-card cat-color-${color}`}>
      <div className="prem-cat-img">
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