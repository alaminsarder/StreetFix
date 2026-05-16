import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getProblems } from "../utils/api";
import "./Problems.css";

// --- Helper Functions ---
function normStatus(s) {
  const v = String(s || "pending").toLowerCase();
  if (v === "resolved" || v === "solved") return "resolved";
  if (v === "in_progress" || v === "in progress") return "in_progress";
  if (v.includes("pending")) return "pending";
  return v;
}

function statusLabel(s) {
  const st = normStatus(s);
  if (st === "resolved") return "Resolved";
  if (st === "in_progress") return "In Progress";
  return "Pending";
}

function statusClass(s) {
  const st = normStatus(s);
  if (st === "resolved") return "ts-badge-resolved";
  if (st === "in_progress") return "ts-badge-progress";
  return "ts-badge-pending";
}

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function timeAgo(date) {
  if (!date) return "";
  const diff = new Date() - new Date(date);
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

// --- Icons ---
const SearchIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="M21 21l-4.35-4.35"></path>
  </svg>
);
const LocIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);
const InboxIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
  </svg>
);
const ClockIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);
const AlertIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);
const CheckIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);
const ArrowRightIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getProblems();
        setProblems(Array.isArray(data) ? data : []);
      } catch (e) {
        setErr("Failed to load reports. Please check your connection.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const stats = useMemo(() => {
    const total = problems.length;
    const pending = problems.filter((p) => normStatus(p.status) === "pending").length;
    const progress = problems.filter((p) => normStatus(p.status) === "in_progress").length;
    const resolved = problems.filter((p) => normStatus(p.status) === "resolved").length;
    return { total, pending, progress, resolved };
  }, [problems]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    let list = problems;

    if (filter !== "all") {
      list = list.filter((p) => normStatus(p.status) === filter);
    }

    if (query) {
      list = list.filter((p) => {
        return (
          (p.title || "").toLowerCase().includes(query) ||
          (p.location || "").toLowerCase().includes(query) ||
          (p.category || "").toLowerCase().includes(query)
        );
      });
    }

    return [...list].sort((a, b) => {
      const da = new Date(a.createdAt).getTime() || 0;
      const db = new Date(b.createdAt).getTime() || 0;
      return sort === "newest" ? db - da : da - db;
    });
  }, [problems, q, filter, sort]);

  return (
    <div className="ts-page-wrapper">
      
      {/* === HERO === */}
      <header className="ts-hero">
        <div className="ts-container">
          <div className="ts-hero-inner">
            <div className="ts-hero-left">
              <span className="ts-live-badge">
                <span className="ts-live-dot"></span>
                LIVE TRACKING
              </span>
              <h1 className="ts-hero-title">Community Issues</h1>
              <p className="ts-hero-desc">
                Track and monitor reported problems in your neighborhood. Real-time updates on every issue.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="ts-container">

        {/* === STATS CARDS === */}
        <div className="ts-stats-grid">
          <div
            className={`ts-stat-card ts-stat-total ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            <div className="ts-stat-icon"><InboxIcon /></div>
            <div className="ts-stat-info">
              <span className="ts-stat-num">{stats.total}</span>
              <span className="ts-stat-label">Total Reports</span>
            </div>
            <div className="ts-stat-trend">All issues</div>
          </div>

          <div
            className={`ts-stat-card ts-stat-pending ${filter === "pending" ? "active" : ""}`}
            onClick={() => setFilter("pending")}
          >
            <div className="ts-stat-icon"><AlertIcon /></div>
            <div className="ts-stat-info">
              <span className="ts-stat-num">{stats.pending}</span>
              <span className="ts-stat-label">Pending</span>
            </div>
            <div className="ts-stat-trend">Awaiting review</div>
          </div>

          <div
            className={`ts-stat-card ts-stat-progress ${filter === "in_progress" ? "active" : ""}`}
            onClick={() => setFilter("in_progress")}
          >
            <div className="ts-stat-icon"><ClockIcon /></div>
            <div className="ts-stat-info">
              <span className="ts-stat-num">{stats.progress}</span>
              <span className="ts-stat-label">In Progress</span>
            </div>
            <div className="ts-stat-trend">Being handled</div>
          </div>

          <div
            className={`ts-stat-card ts-stat-resolved ${filter === "resolved" ? "active" : ""}`}
            onClick={() => setFilter("resolved")}
          >
            <div className="ts-stat-icon"><CheckIcon /></div>
            <div className="ts-stat-info">
              <span className="ts-stat-num">{stats.resolved}</span>
              <span className="ts-stat-label">Resolved</span>
            </div>
            <div className="ts-stat-trend">Successfully fixed</div>
          </div>
        </div>

        {/* === TOOLBAR === */}
        <div className="ts-toolbar">
          <div className="ts-search-box">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search by title, location or category..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            {q && (
              <button className="ts-search-clear" onClick={() => setQ("")}>
                ×
              </button>
            )}
          </div>

          <div className="ts-filter-group">
            <div className="ts-segmented-control">
              {["all", "pending", "in_progress", "resolved"].map((f) => (
                <button
                  key={f}
                  className={`ts-seg-btn ${filter === f ? "active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f === "all" ? "All" : f === "in_progress" ? "In Progress" : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            <select
              className="ts-sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* === RESULTS COUNT === */}
        {!loading && !err && (
          <div className="ts-results-bar">
            <span className="ts-results-count">
              Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? "report" : "reports"}
              {filter !== "all" && <span className="ts-filter-tag">{statusLabel(filter)}</span>}
            </span>
          </div>
        )}

        {/* === CONTENT === */}
        {loading && (
          <div className="ts-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="ts-card ts-skeleton" key={i}>
                <div className="ts-skel-header"></div>
                <div className="ts-skel-title"></div>
                <div className="ts-skel-line"></div>
                <div className="ts-skel-footer"></div>
              </div>
            ))}
          </div>
        )}

        {!loading && err && (
          <div className="ts-error-state">
            <AlertIcon />
            <h3>Connection Error</h3>
            <p>{err}</p>
            <button className="ts-clear-btn" onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        )}

        {!loading && !err && filtered.length === 0 && (
          <div className="ts-empty-state">
            <div className="ts-empty-icon-box">
              <SearchIcon />
            </div>
            <h3>No reports found</h3>
            <p>We couldn't find any issues matching your filters.</p>
            <button className="ts-clear-btn" onClick={() => { setQ(""); setFilter("all"); }}>
              Clear all filters
            </button>
          </div>
        )}

        {!loading && !err && filtered.length > 0 && (
          <div className="ts-grid">
            {filtered.map((p, i) => (
              <Link
                key={p._id}
                to={`/problems/${p._id}`}
                className="ts-card"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div className="ts-card-top">
                  <div className={`ts-status-badge ${statusClass(p.status)}`}>
                    <span className="ts-pulse-dot"></span>
                    {statusLabel(p.status)}
                  </div>
                  <span className="ts-time-ago">{timeAgo(p.createdAt)}</span>
                </div>

                <h3 className="ts-card-title">{p.title}</h3>

                <div className="ts-card-loc">
                  <LocIcon />
                  <span className="ts-truncate">{p.location || "Location not provided"}</span>
                </div>

                <div className="ts-card-divider"></div>

                <div className="ts-card-bottom">
                  <div className="ts-card-meta">
                    <span className="ts-category-tag">{p.category || "General"}</span>
                    <span className="ts-date">{formatDate(p.createdAt)}</span>
                  </div>
                  <span className="ts-view-link">
                    View <ArrowRightIcon />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}