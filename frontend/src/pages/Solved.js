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

// Reusable SVG Icons for a premium look
const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const CategoryIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line>
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const CheckCircleIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export default function Solved() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [sort, setSort] = useState("newest");

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
    return [...items].sort((a, b) => {
      const da = new Date(a.createdAt || 0).getTime() || 0;
      const db = new Date(b.createdAt || 0).getTime() || 0;
      return sort === "newest" ? db - da : da - db;
    });
  }, [items, sort]);

  return (
    <div className="sf-solvedPage">
      {/* Premium Hero Section */}
      <header className="sf-solvedHero">
        <div className="sf-solvedHeroContainer">
          <div className="sf-heroContent">
            <div className="sf-heroIconWrapper">
              <CheckCircleIcon size={32} />
            </div>
            <div>
              <h1 className="sf-solvedTitle">Resolved Issues</h1>
              <p className="sf-solvedSub">
                Transparent civic tracking. See all community reports that have been successfully resolved.
              </p>
            </div>
          </div>

          <div className="sf-heroMetrics">
            <div className="sf-metricCard">
              <span className="sf-metricValue">{items.length}</span>
              <span className="sf-metricLabel">Total Solved</span>
            </div>
            
            <div className="sf-solvedToolbar">
              <select
                className="sf-premiumSelect"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="sf-solvedMain">
        {loading && (
          <div className="sf-solvedGrid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="sf-solvedCard sf-skel" key={i}>
                <div className="sf-skelHeader"></div>
                <div className="sf-skelLine w60" />
                <div className="sf-skelFooter">
                   <div className="sf-skelLine w40" />
                   <div className="sf-skelLine w40" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && err && (
          <div className="sf-errorState">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <p>{err}</p>
          </div>
        )}

        {!loading && !err && sorted.length === 0 && (
          <div className="sf-emptyState">
            <div className="sf-emptyIconWrap">
               <CheckCircleIcon size={48} />
            </div>
            <h3>No resolved reports yet</h3>
            <p>Our team is working hard. Check back later for updates on community reports.</p>
            <Link className="sf-btnPrimary" to="/problems">
              Explore Active Issues
            </Link>
          </div>
        )}

        {!loading && !err && sorted.length > 0 && (
          <div className="sf-solvedGrid">
            {sorted.map((p) => (
              <Link key={p._id} to={`/problems/${p._id}`} className="sf-solvedCard">
                <div className="sf-cardHeader">
                  <span className="sf-statusPill">
                    <CheckCircleIcon size={14} /> Solved
                  </span>
                  <div className="sf-dateInfo">
                    <CalendarIcon />
                    {p.createdAt ? new Date(p.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : "—"}
                  </div>
                </div>

                <h3 className="sf-cardTitle">{p.title}</h3>

                <div className="sf-cardLocation">
                  <LocationIcon />
                  <span className="sf-truncate">{p.location || "Location not provided"}</span>
                </div>

                <div className="sf-cardFooter">
                  <div className="sf-categoryTag">
                    <CategoryIcon />
                    {p.category || "General"}
                  </div>
                  
                  <div className="sf-viewDetailsBtn">
                    View Details →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}