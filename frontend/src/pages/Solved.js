import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getProblems } from "../utils/api";
import "./Solved.css";

function normStatus(s) {
  const v = String(s || "").toLowerCase();
  if (v === "resolved" || v === "solved") return "resolved";
  if (v === "in_progress" || v === "in progress") return "in_progress";
  if (v.includes("pending") || !v) return "pending";
  return v;
}

// Premium SVG Icons
const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const CategoryIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
    <line x1="7" y1="7" x2="7.01" y2="7"></line>
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const CheckCircleIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const TrophyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
    <path d="M4 22h16"></path>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 19.24 7 20h10c0-.76-.85-1.25-2.03-1.79C14.47 17.98 14 17.55 14 17v-2.34"></path>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
  </svg>
);

const SparkleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
  </svg>
);

export default function Solved() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [sort, setSort] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await getProblems();
        const solvedOnly = (Array.isArray(data) ? data : []).filter(
          (p) => normStatus(p.status) === "resolved"
        );
        setItems(solvedOnly);
      } catch (e) {
        console.error(e);
        setErr("Failed to load solved reports. Please check your connection.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const sorted = useMemo(() => {
    let list = [...items];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          (p.title || "").toLowerCase().includes(q) ||
          (p.location || "").toLowerCase().includes(q) ||
          (p.category || "").toLowerCase().includes(q)
      );
    }

    return list.sort((a, b) => {
      const da = new Date(a.createdAt || 0).getTime() || 0;
      const db = new Date(b.createdAt || 0).getTime() || 0;
      return sort === "newest" ? db - da : da - db;
    });
  }, [items, sort, searchQuery]);

  // Calculate time ago
  const timeAgo = (date) => {
    if (!date) return "";
    const now = new Date();
    const diff = now - new Date(date);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  return (
    <div className="sv-page">
      {/* ===== HERO SECTION ===== */}
      <header className="sv-hero">
        <div className="sv-hero-bg-pattern"></div>
        <div className="sv-container">
          <div className="sv-hero-content">
            <div className="sv-hero-left">
              <div className="sv-hero-badge">
                <SparkleIcon />
                <span>Success Stories</span>
              </div>
              <h1 className="sv-hero-title">
                Resolved <span className="sv-gradient-text">Issues</span>
              </h1>
              <p className="sv-hero-subtitle">
                Transparent civic tracking. Explore all community reports that
                have been successfully resolved by our dedicated team.
              </p>
            </div>

            <div className="sv-hero-right">
              <div className="sv-hero-stats">
                <div className="sv-hero-stat-card sv-stat-main">
                  <div className="sv-stat-icon-wrap">
                    <TrophyIcon />
                  </div>
                  <div className="sv-stat-content">
                    <span className="sv-stat-value">{items.length}</span>
                    <span className="sv-stat-desc">Issues Resolved</span>
                  </div>
                </div>
                <div className="sv-hero-stat-card sv-stat-secondary">
                  <div className="sv-stat-icon-wrap sv-icon-green">
                    <CheckCircleIcon size={20} />
                  </div>
                  <div className="sv-stat-content">
                    <span className="sv-stat-value">100%</span>
                    <span className="sv-stat-desc">Completion Rate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===== TOOLBAR ===== */}
      <div className="sv-toolbar-section">
        <div className="sv-container">
          <div className="sv-toolbar">
            <div className="sv-search-box">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search resolved issues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="sv-toolbar-right">
              <span className="sv-results-count">
                {sorted.length} {sorted.length === 1 ? "result" : "results"}
              </span>
              <select
                className="sv-sort-select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <main className="sv-main">
        <div className="sv-container">
          {/* Loading Skeleton */}
          {loading && (
            <div className="sv-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div className="sv-card sv-skeleton-card" key={i}>
                  <div className="sv-skel-header"></div>
                  <div className="sv-skel-title"></div>
                  <div className="sv-skel-line w70"></div>
                  <div className="sv-skel-line w50"></div>
                  <div className="sv-skel-footer"></div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {!loading && err && (
            <div className="sv-error-state">
              <div className="sv-error-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h3>Something went wrong</h3>
              <p>{err}</p>
              <button className="sv-retry-btn" onClick={() => window.location.reload()}>
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !err && sorted.length === 0 && (
            <div className="sv-empty-state">
              <div className="sv-empty-icon-wrap">
                <CheckCircleIcon size={56} />
              </div>
              <h3>No resolved reports yet</h3>
              <p>
                {searchQuery
                  ? "No results match your search. Try a different keyword."
                  : "Our team is working hard. Check back later for updates."}
              </p>
              {searchQuery ? (
                <button className="sv-clear-btn" onClick={() => setSearchQuery("")}>
                  Clear Search
                </button>
              ) : (
                <Link className="sv-cta-btn" to="/problems">
                  Explore Active Issues
                </Link>
              )}
            </div>
          )}

          {/* Cards Grid */}
          {!loading && !err && sorted.length > 0 && (
            <div className="sv-grid">
              {sorted.map((p, index) => (
                <Link
                  key={p._id}
                  to={`/problems/${p._id}`}
                  className="sv-card"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Card Top */}
                  <div className="sv-card-top">
                    <span className="sv-solved-pill">
                      <CheckCircleIcon size={14} />
                      Resolved
                    </span>
                    <span className="sv-time-ago">{timeAgo(p.createdAt)}</span>
                  </div>

                  {/* Card Body */}
                  <h3 className="sv-card-title">{p.title}</h3>

                  <div className="sv-card-meta">
                    <div className="sv-meta-item">
                      <LocationIcon />
                      <span className="sv-truncate">
                        {p.location || "Location not provided"}
                      </span>
                    </div>
                    <div className="sv-meta-item">
                      <CalendarIcon />
                      <span>
                        {p.createdAt
                          ? new Date(p.createdAt).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "—"}
                      </span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="sv-card-footer">
                    <div className="sv-category-chip">
                      <CategoryIcon />
                      {p.category || "General"}
                    </div>
                    <span className="sv-view-link">
                      View Details
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}