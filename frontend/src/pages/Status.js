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
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// --- Premium SVG Icons ---
const LocIcon = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const CalendarIcon = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const AlertCircleIcon = () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>;
const FolderSearchIcon = () => <svg width="48" height="48" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path><circle cx="14" cy="13" r="3"></circle><line x1="16.12" y1="15.12" x2="19" y2="18"></line></svg>;

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
    const pending = problems.filter((p) => normStatus(p.status) === "pending" || normStatus(p.status) === "in_progress").length;
    const resolved = problems.filter((p) => normStatus(p.status) === "resolved").length;
    return { total, pending, resolved };
  }, [problems]);

  const filtered = useMemo(() => {
    if (filter === "all") return problems;
    if (filter === "pending") return problems.filter((p) => normStatus(p.status) === "pending" || normStatus(p.status) === "in_progress");
    return problems.filter((p) => normStatus(p.status) === filter);
  }, [problems, filter]);

  return (
    <div className="st-page-wrapper">
      <div className="st-container">
        
        {/* --- Header Area --- */}
        <header className="st-header">
          <div className="st-title-box">
            <span className="st-top-badge">Tracking Dashboard</span>
            <h1>Check Report Status</h1>
            <p>Monitor the real-time progress of all community reports in one place.</p>
          </div>

          {/* --- Premium Filter Toggles --- */}
          <div className="st-toggles-wrapper">
            <div className="st-toggles">
              <button 
                className={`st-toggle-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                <span>All Issues</span>
                <span className="st-count bg-gray">{stats.total}</span>
              </button>
              <button 
                className={`st-toggle-btn ${filter === "pending" ? "active" : ""}`}
                onClick={() => setFilter("pending")}
              >
                <span>Active / Pending</span>
                <span className="st-count bg-amber">{stats.pending}</span>
              </button>
              <button 
                className={`st-toggle-btn ${filter === "resolved" ? "active" : ""}`}
                onClick={() => setFilter("resolved")}
              >
                <span>Resolved</span>
                <span className="st-count bg-emerald">{stats.resolved}</span>
              </button>
            </div>
          </div>
        </header>

        {/* --- Error State --- */}
        {err && !loading && (
          <div className="st-error-box">
            <AlertCircleIcon />
            <span>{err}</span>
          </div>
        )}

        {/* --- Content Area --- */}
        {loading ? (
          /* Skeleton Loader */
          <div className="st-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="st-card st-skeleton" key={i}>
                <div className="st-skel-top"></div>
                <div className="st-skel-title"></div>
                <div className="st-skel-loc"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="st-grid">
            {filtered.length === 0 && !err ? (
              /* Empty State */
              <div className="st-empty-state">
                <FolderSearchIcon />
                <h3>No reports found</h3>
                <p>There are no issues matching the current "{filter}" filter.</p>
              </div>
            ) : (
              /* Premium Cards */
              filtered.map((p) => (
                <Link key={p._id} to={`/problems/${p._id}`} className="st-card">
                  <div className="st-card-top">
                    <span className={`st-badge ${statusClass(p.status)}`}>
                      <span className="st-pulse-dot"></span>
                      {statusLabel(p.status)}
                    </span>
                    <span className="st-date">
                      <CalendarIcon /> {formatDate(p.createdAt)}
                    </span>
                  </div>
                  
                  <h3 className="st-card-title">{p.title}</h3>
                  
                  <div className="st-card-bottom">
                    <div className="st-card-loc">
                      <LocIcon /> 
                      <span className="st-truncate">{p.location || "Unknown Location"}</span>
                    </div>
                    <div className="st-arrow-link">
                      Details &rarr;
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}