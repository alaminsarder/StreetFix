import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProblemById } from "../utils/api";
import "./ProblemDetail.css";

// --- Icons ---
const ArrowLeftIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
const MapPinIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const CalendarIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const TagIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path></svg>;
const ShieldCheckIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>;

// Status helper
const getStatusConfig = (status) => {
  const s = String(status || "").toLowerCase();
  if (s === "resolved" || s === "solved") return { label: "Resolved", cls: "pd-status-resolved" };
  if (s === "in_progress" || s === "in progress") return { label: "In Progress", cls: "pd-status-progress" };
  return { label: "Pending", cls: "pd-status-pending" };
};

export default function ProblemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getProblemById(id);
        setProblem(data.problem || data);
      } catch (err) {
        setError("Issue not found or failed to load data.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="pd-wrapper">
        <div className="pd-container pd-skeleton">
          <div className="pd-skel-nav"></div>
          <div className="pd-skel-title"></div>
          <div className="pd-grid">
            <div className="pd-skel-box huge"></div>
            <div className="pd-skel-box"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="pd-wrapper">
        <div className="pd-container pd-error-state">
          <h2>Oops!</h2>
          <p>{error || "Something went wrong."}</p>
          <button className="pd-btn-back" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(problem.status);
  const formattedDate = problem.createdAt
    ? new Date(problem.createdAt).toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : "Unknown Date";

  return (
    <div className="pd-wrapper">
      <div className="pd-container">

        <button className="pd-back-link" onClick={() => navigate(-1)}>
          <ArrowLeftIcon /> Back to List
        </button>

        <header className="pd-header">
          <div className="pd-header-meta">
            <span className={`pd-badge ${statusConfig.cls}`}>{statusConfig.label}</span>
            <span className="pd-meta-item"><TagIcon /> {problem.category || "General Issue"}</span>
            <span className="pd-meta-item"><CalendarIcon /> {formattedDate}</span>
          </div>
          <h1 className="pd-title">{problem.title}</h1>
        </header>

        <div className="pd-grid">

          {/* Left */}
          <div className="pd-main-content">
            <div className="pd-section">
              <h3 className="pd-section-title">Description</h3>
              <div className="pd-description-box">
                <p>{problem.description || "No description provided."}</p>
              </div>
            </div>

            {problem.adminComment && (
              <div className="pd-official-update">
                <div className="pd-ou-header">
                  <ShieldCheckIcon />
                  <h4>Official Update</h4>
                </div>
                <div className="pd-ou-body">
                  <p>{problem.adminComment}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="pd-sidebar">

            {/* Location only */}
            <div className="pd-card pd-location-card">
              <h4 className="pd-card-title">Location</h4>
              <div className="pd-location-body">
                <div className="pd-loc-icon"><MapPinIcon /></div>
                <p>{problem.location || "Location not specified."}</p>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}