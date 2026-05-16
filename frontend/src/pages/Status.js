import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getProblems } from "../utils/api";
import "./Status.css";

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
  if (st === "resolved") return "st-badge-resolved";
  if (st === "in_progress") return "st-badge-progress";
  return "st-badge-pending";
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
const LocIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);
const ArrowIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);
const AlertCircleIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);
const FolderSearchIcon = () => (
  <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
    <circle cx="14" cy="13" r="3"></circle>
    <line x1="16.12" y1="15.12" x2="19" y2="18"></line>
  </svg>
);
const ActivityIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);
const ClockIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);
const CheckIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export default function Status() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await getProblems();
        setProblems(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setErr("Failed to load status records. Please check the backend connection.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const stats = useMemo(() => {
    const total = problems.length;
    const pending = problems.filter(
      (p) => normStatus(p.status) === "pending" || normStatus(p.status) === "in_progress"
    ).length;
    const resolved = problems.filter((p) => normStatus(p.status) === "resolved").length;
    const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;
    return { total, pending, resolved, resolutionRate };
  }, [problems]);

  const filtered = useMemo(() => {
    if (filter === "all") return problems;
    if (filter === "pending")
      return problems.filter(
        (p) => normStatus(p.status) === "pending" || normStatus(p.status) === "in_progress"
      );
    return problems.filter((p) => normStatus(p.status) === filter);
  }, [problems, filter]);

  return (
    <div className="st-page-wrapper">

      {/* === HERO === */}
      <header className="st-hero">
        <div className="st-container">
          <div className="st-hero-inner">
            <div className="st-hero-left">
              <span className="st-top-badge">
                <span className="st-badge-dot"></span>
                Tracking Dashboard
              </span>
              <h1 className="st-hero-title">Report Status</h1>
              <p className="st-hero-desc">
                Monitor the real-time progress of all community reports and track resolution updates in one place.
              </p>
            </div>

            {/* Resolution Rate Card */}
            <div className="st-hero-right">
              <div className="st-rate-card">
                <div className="st-rate-circle">
                  <svg viewBox="0 0 36 36" className="st-circle-svg">
                    <path
                      className="st-circle-bg"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="st-circle-fill"
                      strokeDasharray={`${stats.resolutionRate}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="st-circle-text">
                    <span className="st-circle-num">{stats.resolutionRate}%</span>
                    <span className="st-circle-lbl">Resolved</span>
                  </div>
                </div>
                <div className="st-rate-info">
                  <span className="st-rate-title">Resolution Rate</span>
                  <span className="st-rate-desc">{stats.resolved} of {stats.total} resolved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="st-container">

        {/* === FILTER CARDS === */}
        <div className="st-filter-grid">
          <button
            className={`st-filter-card st-filter-all ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            <div className="st-filter-icon"><ActivityIcon /></div>
            <div className="st-filter-info">
              <span className="st-filter-num">{stats.total}</span>
              <span className="st-filter-lbl">All Issues</span>
            </div>
          </button>

          <button
            className={`st-filter-card st-filter-pending ${filter === "pending" ? "active" : ""}`}
            onClick={() => setFilter("pending")}
          >
            <div className="st-filter-icon"><ClockIcon /></div>
            <div className="st-filter-info">
              <span className="st-filter-num">{stats.pending}</span>
              <span className="st-filter-lbl">Active / Pending</span>
            </div>
          </button>

          <button
            className={`st-filter-card st-filter-resolved ${filter === "resolved" ? "active" : ""}`}
            onClick={() => setFilter("resolved")}
          >
            <div className="st-filter-icon"><CheckIcon /></div>
            <div className="st-filter-info">
              <span className="st-filter-num">{stats.resolved}</span>
              <span className="st-filter-lbl">Resolved</span>
            </div>
          </button>
        </div>

        {/* === RESULTS BAR === */}
        {!loading && !err && (
          <div className="st-results-bar">
            <span className="st-results-text">
              Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? "report" : "reports"}
              {filter !== "all" && (
                <span className="st-filter-pill">
                  {filter === "pending" ? "Active / Pending" : "Resolved"}
                </span>
              )}
            </span>
          </div>
        )}

        {/* === ERROR === */}
        {err && !loading && (
          <div className="st-error-box">
            <AlertCircleIcon />
            <div>
              <strong>Connection Error</strong>
              <p>{err}</p>
            </div>
          </div>
        )}

        {/* === CONTENT === */}
        {loading ? (
          <div className="st-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="st-card st-skeleton" key={i}>
                <div className="st-skel-top"></div>
                <div className="st-skel-title"></div>
                <div className="st-skel-loc"></div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 && !err ? (
          <div className="st-empty-state">
            <div className="st-empty-icon-box">
              <FolderSearchIcon />
            </div>
            <h3>No reports found</h3>
            <p>There are no issues matching the current filter selection.</p>
            <button className="st-empty-btn" onClick={() => setFilter("all")}>
              Show All Reports
            </button>
          </div>
        ) : (
          <div className="st-grid">
            {filtered.map((p, i) => (
              <Link
                key={p._id}
                to={`/problems/${p._id}`}
                className="st-card"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div className="st-card-top">
                  <span className={`st-badge ${statusClass(p.status)}`}>
                    <span className="st-pulse-dot"></span>
                    {statusLabel(p.status)}
                  </span>
                  <span className="st-time-ago">{timeAgo(p.createdAt)}</span>
                </div>

                <h3 className="st-card-title">{p.title}</h3>

                <div className="st-card-loc">
                  <LocIcon />
                  <span className="st-truncate">{p.location || "Unknown Location"}</span>
                </div>

                <div className="st-card-divider"></div>

                <div className="st-card-bottom">
                  <span className="st-date">{formatDate(p.createdAt)}</span>
                  <span className="st-arrow-link">
                    View Details <ArrowIcon />
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