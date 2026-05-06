import React, { useEffect, useState, useMemo } from "react";
import { getProblems, updateProblemDetails, deleteProblem } from "../utils/api"; 
import "./AdminDashboard.css";

// --- Review Modal Component (Updated for Bulk) ---
function ReviewModal({ problem, isBulk, bulkCount, isOpen, onClose, onSave }) {
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (isOpen) {
      // সিঙ্গেল হলে আগের কমেন্ট দেখাবে, আর Bulk হলে ফাঁকা থাকবে
      if (problem && !isBulk) setComment(problem.adminComment || "");
      else setComment(""); 
    }
  }, [problem, isBulk, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="ad-modal-overlay" onClick={onClose}>
      <div className="ad-modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{isBulk ? `Bulk Review (${bulkCount} items)` : `Review for: "${problem?.title}"`}</h3>
        <p>Add an optional comment. {isBulk && "This will apply to ALL selected items."}</p>
        <textarea
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="e.g., 'Work has started, expected to be fixed by Friday.'"
        />
        <div className="ad-modal-actions">
          <button className="ad-btn-secondary" onClick={onClose}>Cancel</button>
          <button className="ad-btn-primary" onClick={() => onSave(isBulk ? null : problem?._id, comment)}>
            Save Comment
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Main Admin Dashboard ---
export default function AdminDashboard() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [isBulkReview, setIsBulkReview] = useState(false);

  // Checkbox state
  const [selectedIds, setSelectedIds] = useState([]);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getProblems();
      setProblems(Array.isArray(data) ? data : data?.problems || []);
    } catch (err) {
      setError("Failed to load problems.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  // Sorting
  const sortedProblems = useMemo(() => {
    const statusOrder = { pending: 1, in_progress: 2, resolved: 3 };
    return [...problems].sort((a, b) => {
      const sA = a.status || 'pending';
      const sB = b.status || 'pending';
      return (statusOrder[sA] || 99) - (statusOrder[sB] || 99);
    });
  }, [problems]);

  // --- Checkbox Logic ---
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(sortedProblems.map(p => p._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // --- Single Actions ---
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateProblemDetails(id, { status: newStatus }); 
      loadData();
    } catch (err) { alert("Status update failed!"); }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete "${title}"?`)) {
      try {
        await deleteProblem(id);
        setSelectedIds(selectedIds.filter(item => item !== id));
        loadData();
      } catch (err) { alert("Failed to delete!"); }
    }
  };

  // --- Bulk Actions ---
  const handleBulkDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedIds.length} items?`)) {
      try {
        // Promise.all দিয়ে একসাথে সব ডিলিট
        await Promise.all(selectedIds.map(id => deleteProblem(id)));
        setSelectedIds([]);
        loadData();
        alert("Bulk delete successful!");
      } catch (err) { alert("Bulk delete failed!"); }
    }
  };

  const handleBulkStatus = async (newStatus) => {
    try {
      await Promise.all(selectedIds.map(id => updateProblemDetails(id, { status: newStatus })));
      setSelectedIds([]);
      loadData();
      alert(`Status updated to ${newStatus} for ${selectedIds.length} items!`);
    } catch (err) { alert("Bulk status update failed!"); }
  };

  const handleSaveComment = async (id, comment) => {
    try {
      if (isBulkReview) {
        await Promise.all(selectedIds.map(itemId => updateProblemDetails(itemId, { adminComment: comment })));
        setSelectedIds([]);
      } else {
        await updateProblemDetails(id, { adminComment: comment });
      }
      setIsModalOpen(false);
      loadData();
    } catch (err) { alert("Failed to save comment!"); }
  };

  if (loading) return <div className="ad-loading-screen"><div className="ad-spinner"></div></div>;

  return (
    <div className="ad-dashboard-wrapper">
      <div className="sf-container">
        
        <div className="ad-header">
          <div>
            <h1 className="ad-title">Admin Dashboard</h1>
            <p className="ad-subtitle">Manage reports, update statuses, and add reviews</p>
          </div>
          <button className="ad-refresh-btn" onClick={loadData}>↻ Refresh</button>
        </div>

        {error && <div className="ad-error-msg">⚠️ {error}</div>}

        {/* 🔥 BULK ACTION TOOLBAR 🔥 */}
        {selectedIds.length > 0 && (
          <div className="ad-bulk-toolbar">
            <span className="ad-bulk-count">{selectedIds.length} items selected</span>
            <div className="ad-bulk-buttons">
              <button className="ad-bulk-btn status-pending" onClick={() => handleBulkStatus('pending')}>Make Pending</button>
              <button className="ad-bulk-btn status-progress" onClick={() => handleBulkStatus('in_progress')}>Make In Progress</button>
              <button className="ad-bulk-btn status-resolved" onClick={() => handleBulkStatus('resolved')}>Make Resolved</button>
              <button className="ad-bulk-btn btn-review" onClick={() => { setIsBulkReview(true); setIsModalOpen(true); }}>📝 Bulk Review</button>
              <button className="ad-bulk-btn btn-delete" onClick={handleBulkDelete}>🗑️ Bulk Delete</button>
            </div>
          </div>
        )}

        <div className="ad-table-container">
          <table className="ad-table">
            <thead>
              <tr>
                <th>
                  <input 
                    type="checkbox" 
                    className="ad-checkbox"
                    onChange={handleSelectAll} 
                    checked={sortedProblems.length > 0 && selectedIds.length === sortedProblems.length} 
                  />
                </th>
                <th>Title</th>
                <th>Location</th>
                <th>Category</th>
                <th>Status</th>
                <th>Manage Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedProblems.map((p) => {
                const isSelected = selectedIds.includes(p._id);
                const currentStatus = p.status || 'pending';
                return (
                  <tr key={p._id} className={`ad-row-${currentStatus} ${isSelected ? 'ad-row-selected' : ''}`}>
                    <td>
                      <input 
                        type="checkbox" 
                        className="ad-checkbox"
                        checked={isSelected} 
                        onChange={() => handleSelectOne(p._id)} 
                      />
                    </td>
                    <td className="ad-font-strong">{p.title}</td>
                    <td className="ad-text-muted">📍 {p.location || "N/A"}</td>
                    <td><span className="ad-category-tag">{p.category || "General"}</span></td>
                    <td>
                      <span className={`ad-status-badge ${currentStatus}`}>
                        {currentStatus === "in_progress" ? "In Progress" : currentStatus}
                      </span>
                    </td>
                    <td>
                      <select
                        className="ad-action-select"
                        value={currentStatus}
                        onChange={(e) => handleStatusChange(p._id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                    <td>
                      <div className="ad-action-buttons">
                        <button className="ad-review-btn" onClick={() => { setIsBulkReview(false); setSelectedProblem(p); setIsModalOpen(true); }}>
                          {p.adminComment ? "📝 Edit" : "➕ Review"}
                        </button>
                        <button className="ad-delete-btn" onClick={() => handleDelete(p._id, p.title)}>
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        problem={selectedProblem}
        isBulk={isBulkReview}
        bulkCount={selectedIds.length}
        onSave={handleSaveComment}
      />
    </div>
  );
}