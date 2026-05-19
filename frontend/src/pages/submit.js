import React, { useState } from "react";
import { createProblem } from "../utils/api";
import "./submit.css";

// --- Minimal SVG Icons for Form ---
const IconTitle = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" /></svg>;
const IconCategory = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>;
const IconLocation = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>;
const IconImage = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>;
const IconDesc = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="10" x2="3" y2="10" /><line x1="21" y1="6" x2="3" y2="6" /><line x1="21" y1="14" x2="3" y2="14" /><line x1="14" y1="18" x2="3" y2="18" /></svg>;
const IconSend = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" /></svg>;
const IconAlert = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>;

// --- Big Success Icon ---
const IconSuccessBig = () => (
  <svg className="sb-success-icon-anim" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// 🔥 Background Watermark Icons 🔥
const WmStreetLight = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V6c0-2-2-4-4-4H4"/><circle cx="4" cy="4" r="2"/><path d="M9 22h6"/></svg>;
const WmCar = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 15v2a1 1 0 001 1h1a1 1 0 001-1v-2h8v2a1 1 0 001 1h1a1 1 0 001-1v-2a3 3 0 003-3v-3a2 2 0 00-2-2h-2.5l-2.5-4H8L5.5 8H3a2 2 0 00-2 2v3a3 3 0 003 3z"/><circle cx="7.5" cy="15.5" r="1.5"/><circle cx="16.5" cy="15.5" r="1.5"/></svg>;
const WmRoad = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22L10 2h4l6 20 M12 6v4 M12 14v4" /></svg>;
const WmCone = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L6 22h12L12 2z" /><path d="M8.5 10h7M7.5 15h9" /></svg>;

const CATEGORIES = ["Broken Road", "Drain Problem", "Street Light", "Water Logging", "Garbage"];

export default function Submit() {
  const [form, setForm] = useState({
    title: "", category: "Broken Road", description: "", location: "", photoUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [isSubmitted, setIsSubmitted] = useState(false); 

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (msg.text) setMsg({ type: "", text: "" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    if (!form.title.trim() || !form.location.trim()) {
      setMsg({ type: "error", text: "Title and Location are required." });
      return;
    }

    try {
      setLoading(true);
      await createProblem({
        title: form.title.trim(),
        category: form.category,
        description: form.description.trim(),
        location: form.location.trim(),
        photoUrl: form.photoUrl.trim(),
      });

      setForm({ title: "", category: "Broken Road", description: "", location: "", photoUrl: "" });
      setIsSubmitted(true); 
      
    } catch (err) {
      setMsg({
        type: "error",
        text: err?.response?.data?.message || err?.message || "Submission failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnother = () => {
    setIsSubmitted(false);
    setMsg({ type: "", text: "" });
  };

  const filledCount = [form.title, form.location, form.category].filter(Boolean).length;
  const progress = Math.round((filledCount / 3) * 100);
  const hasPreview = form.photoUrl.trim().startsWith("http");

  return (
    <div className="sb-page">
      
      {/* 🔥 Background Watermarks 🔥 */}
      <div className="sb-watermarks">
        <div className="sb-wm sb-wm-1"><WmStreetLight /></div>
        <div className="sb-wm sb-wm-2"><WmRoad /></div>
        <div className="sb-wm sb-wm-3"><WmCar /></div>
        <div className="sb-wm sb-wm-4"><WmCone /></div>
      </div>

      <div className="sb-container">

        {/* --- Success Screen --- */}
        {isSubmitted ? (
          <div className="sb-success-screen">
            <div className="sb-success-card">
              <IconSuccessBig />
              <h1 className="sb-success-title">Report Submitted!</h1>
              <p className="sb-success-desc">
                Thank you for making our community better. Our team has been notified and will review your report shortly.
              </p>
              <div className="sb-success-actions">
                <button className="sb-btn-primary" onClick={handleSubmitAnother}>
                  Submit Another Report
                </button>
                <button className="sb-btn-secondary" onClick={() => window.location.href = '/status'}>
                  Check Status
                </button>
              </div>
            </div>
          </div>
        ) : (
          
          /* --- Form Screen --- */
          <>
            <div className="sb-page-header">
              <h1 className="sb-page-title">Report an Issue</h1>
              <p className="sb-page-desc">
                Help us improve your neighborhood. Submit details below and our team will get notified instantly.
              </p>
            </div>

            <div className="sb-form-card">
              <div className="sb-form-header">
                <div>
                  <h2 className="sb-form-title">Issue Details</h2>
                  <p className="sb-form-subtitle">Required fields are marked with *</p>
                </div>
                <div className="sb-progress-ring">
                  <svg viewBox="0 0 36 36" className="sb-ring-svg">
                    <path className="sb-ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="sb-ring-fill" strokeDasharray={`${progress}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <span className="sb-ring-text">{progress}%</span>
                </div>
              </div>

              {msg.text && (
                <div className={`sb-alert sb-alert-${msg.type}`}>
                  <div className="sb-alert-icon"><IconAlert /></div>
                  <p>{msg.text}</p>
                </div>
              )}

              <form className="sb-form" onSubmit={onSubmit}>
                <div className="sb-grid">
                  <div className="sb-field">
                    <label className="sb-label">Title <span className="sb-req">*</span></label>
                    <div className="sb-input-wrap">
                      <span className="sb-input-icon"><IconTitle /></span>
                      <input type="text" name="title" className="sb-input" placeholder="e.g., Large pothole near school" value={form.title} onChange={onChange} required />
                    </div>
                  </div>

                  <div className="sb-field">
                    <label className="sb-label">Category</label>
                    <div className="sb-input-wrap">
                      <span className="sb-input-icon"><IconCategory /></span>
                      <select name="category" className="sb-input sb-select" value={form.category} onChange={onChange}>
                        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="sb-field sb-full">
                    <label className="sb-label">Location <span className="sb-req">*</span></label>
                    <div className="sb-input-wrap">
                      <span className="sb-input-icon"><IconLocation /></span>
                      <input type="text" name="location" className="sb-input" placeholder="e.g., House 12, Road 4, Dhanmondi" value={form.location} onChange={onChange} required />
                    </div>
                  </div>

                  <div className="sb-field sb-full">
                    <label className="sb-label">Photo URL <span className="sb-opt">(optional)</span></label>
                    <div className="sb-input-wrap">
                      <span className="sb-input-icon"><IconImage /></span>
                      <input type="url" name="photoUrl" className="sb-input" placeholder="https://example.com/photo.jpg" value={form.photoUrl} onChange={onChange} />
                    </div>
                  </div>

                  {hasPreview && (
                    <div className="sb-field sb-full">
                      <div className="sb-preview">
                        <img src={form.photoUrl} alt="Preview" onError={(e) => e.target.style.display = "none"} />
                      </div>
                    </div>
                  )}

                  <div className="sb-field sb-full">
                    <label className="sb-label">Description <span className="sb-opt">(optional)</span></label>
                    <div className="sb-input-wrap sb-textarea-wrap">
                      <span className="sb-input-icon sb-icon-top"><IconDesc /></span>
                      <textarea name="description" className="sb-input sb-textarea" placeholder="Describe the issue in detail..." value={form.description} onChange={onChange} rows="5" />
                    </div>
                  </div>
                </div>

                <button className={`sb-submit ${loading ? "sb-loading" : ""}`} type="submit" disabled={loading}>
                  {loading ? (
                    <><span className="sb-spinner" /> Submitting...</>
                  ) : (
                    <><IconSend /> Submit Report</>
                  )}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}