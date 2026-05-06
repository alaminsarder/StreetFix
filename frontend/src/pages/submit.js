import React, { useState } from "react";
import { createProblem } from "../utils/api";
import "./submit.css";

// --- Premium SVG Icons ---
const TitleIcon = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>;
const CategoryIcon = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>;
const LocationIcon = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const ImageIcon = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>;
const DescIcon = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="14" y1="18" x2="3" y2="18"></line></svg>;
const SendIcon = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>;

const CATEGORIES = [
  "Broken Road",
  "Drain Problem",
  "Street Light",
  "Water Logging",
  "Garbage",
];

export default function Submit() {
  const [form, setForm] = useState({
    title: "",
    category: "Broken Road",
    description: "",
    location: "",
    photoUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
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

      setMsg({ type: "success", text: "Report submitted successfully! Thank you for helping." });

      setForm({
        title: "",
        category: "Broken Road",
        description: "",
        location: "",
        photoUrl: "",
      });
    } catch (err) {
      const backendMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Submit failed. Please check the backend connection.";
      setMsg({ type: "error", text: backendMsg });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sub-page-wrapper">
      <div className="sub-container">
        
        {/* Header Area */}
        <div className="sub-header-area">
          <div className="sub-badge">New Report</div>
          <h1 className="sub-title">Report an Issue</h1>
          <p className="sub-subtitle">
            Help us improve the neighborhood. Fill out the details below, and our team will be notified instantly.
          </p>
        </div>

        {/* Form Card */}
        <div className="sub-card">
          {msg.text && (
            <div className={`sub-alert ${msg.type}`}>
              {msg.type === "success" ? "✅" : "⚠️"} {msg.text}
            </div>
          )}

          <form className="sub-form" onSubmit={onSubmit}>
            
            {/* Grid Layout for Desktop */}
            <div className="sub-form-grid">
              
              {/* Title Field */}
              <div className="sub-field">
                <label className="sub-label">Report Title <span className="req">*</span></label>
                <div className="sub-input-group">
                  <div className="sub-icon"><TitleIcon /></div>
                  <input
                    type="text"
                    name="title"
                    className="sub-input"
                    placeholder="e.g., Pothole on main street"
                    value={form.title}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>

              {/* Category Field */}
              <div className="sub-field">
                <label className="sub-label">Category</label>
                <div className="sub-input-group">
                  <div className="sub-icon"><CategoryIcon /></div>
                  <select
                    name="category"
                    className="sub-select"
                    value={form.category}
                    onChange={onChange}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Location Field */}
              <div className="sub-field sub-col-span-2">
                <label className="sub-label">Exact Location <span className="req">*</span></label>
                <div className="sub-input-group">
                  <div className="sub-icon"><LocationIcon /></div>
                  <input
                    type="text"
                    name="location"
                    className="sub-input"
                    placeholder="e.g., House 12, Road 4, Dhanmondi"
                    value={form.location}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>

              {/* Photo URL Field */}
              <div className="sub-field sub-col-span-2">
                <label className="sub-label">Photo Link <span className="opt">(Optional)</span></label>
                <div className="sub-input-group">
                  <div className="sub-icon"><ImageIcon /></div>
                  <input
                    type="url"
                    name="photoUrl"
                    className="sub-input"
                    placeholder="https://example.com/photo.jpg"
                    value={form.photoUrl}
                    onChange={onChange}
                  />
                </div>
              </div>

              {/* Description Field */}
              <div className="sub-field sub-col-span-2">
                <label className="sub-label">Additional Details <span className="opt">(Optional)</span></label>
                <div className="sub-textarea-group">
                  <div className="sub-icon textarea-icon"><DescIcon /></div>
                  <textarea
                    name="description"
                    className="sub-textarea"
                    placeholder="Provide any additional information that might help our crew..."
                    value={form.description}
                    onChange={onChange}
                    rows="4"
                  />
                </div>
              </div>

            </div>

            {/* Submit Button */}
            <div className="sub-action-area">
              <button className={`sub-btn ${loading ? 'loading' : ''}`} type="submit" disabled={loading}>
                {loading ? (
                  <span className="sub-loader"></span>
                ) : (
                  <>
                    <SendIcon /> Submit Report
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}