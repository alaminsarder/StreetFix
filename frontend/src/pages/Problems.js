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
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// --- Premium SVG Icons ---
const SearchIcon = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.35-4.35"></path></svg>;
const LocIcon = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const FilterIcon = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>;

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
        return (p.title || "").toLowerCase().includes(query) || 
               (p.location || "").toLowerCase().includes(query) || 
               (p.category || "").toLowerCase().includes(query);
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
      <div className="ts-container">
        
        {/* --- Header & Stats --- */}
        <header className="ts-header">
          <div className="ts-title-area">
            <span className="ts-badge-main">LIVE TRACKING</span>
            <h1>Track Community Issues</h1>
            <p>Monitor the progress of reported problems in your neighborhood in real-time.</p>
          </div>
          
          <div className="ts-stats-grid">
            <div className="ts-stat-card">
              <span className="ts-stat-label">Total Reports</span>
              <span className="ts-stat-num">{stats.total}</span>
            </div>
            <div className="ts-stat-card pending">
              <span className="ts-stat-label">Pending Review</span>
              <span className="ts-stat-num">{stats.pending}</span>
            </div>
            <div className="ts-stat-card progress">
              <span className="ts-stat-label">Work In Progress</span>
              <span className="ts-stat-num">{stats.progress}</span>
            </div>
            <div className="ts-stat-card resolved">
              <span className="ts-stat-label">Successfully Resolved</span>
              <span className="ts-stat-num">{stats.resolved}</span>
            </div>
          </div>
        </header>

        {/* --- Toolbar (Search & Filters) --- */}
        <div className="ts-toolbar">
          <div className="ts-search-box">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search by title, location or category..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
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

            <div className="ts-sort-box">
              <FilterIcon />
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* --- Content Area --- */}
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
            ⚠️ {err}
          </div>
        )}

        {!loading && !err && filtered.length === 0 && (
          <div className="ts-empty-state">
            <div className="ts-empty-icon">🔍</div>
            <h3>No reports found</h3>
            <p>We couldn't find any issues matching your current filters.</p>
            <button className="ts-clear-btn" onClick={() => { setQ(""); setFilter("all"); }}>
              Clear all filters
            </button>
          </div>
        )}

        {!loading && !err && filtered.length > 0 && (
          <div className="ts-grid">
            {filtered.map((p) => (
              <Link key={p._id} to={`/problems/${p._id}`} className="ts-card">
                <div className="ts-card-top">
                  <div className={`ts-status-badge ${statusClass(p.status)}`}>
                    <span className="ts-pulse-dot"></span>
                    {statusLabel(p.status)}
                  </div>
                  <span className="ts-date">{formatDate(p.createdAt)}</span>
                </div>
                
                <h3 className="ts-card-title">{p.title}</h3>
                
                <div className="ts-card-loc">
                  <LocIcon /> 
                  <span className="ts-truncate">{p.location || "Location not provided"}</span>
                </div>
                
                <div className="ts-card-bottom">
                  <span className="ts-category-tag">{p.category || "General"}</span>
                  <span className="ts-view-link">View Details &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}