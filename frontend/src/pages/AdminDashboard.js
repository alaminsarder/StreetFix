import React, { useEffect, useState, useMemo } from "react";
import { getProblems, updateProblemDetails, deleteProblem } from "../utils/api";
import "./AdminDashboard.css";

// --- SVG Icons ---
const RefreshIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"></polyline>
    <polyline points="1 20 1 14 7 14"></polyline>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </svg>
);
const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);
const AlertIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);
const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);
const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);
const InboxIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
  </svg>
);

// --- Status Helpers ---
function getStatusLabel(s) {
  if (s === "in_progress") return "In Progress";
  if (s === "resolved") return "Resolved";
  return "Pending";
}

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

// --- Main Admin Dashboard ---
export default function AdminDashboard() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [notification, setNotification] = useState(null);

  // --- Toast Notification ---
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // --- Load Data ---
  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getProblems();
      setProblems(Array.isArray(data) ? data : data?.problems || []);
    } catch (err) {
      setError("Failed to load problems. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  // --- Stats ---
  const stats = useMemo(() => {
    const total = problems.length;
    const pending = problems.filter(p => (p.status || "pending") === "pending").length;
    const inProgress = problems.filter(p => p.status === "in_progress").length;
    const resolved = problems.filter(p => p.status === "resolved").length;
    return { total, pending, inProgress, resolved };
  }, [problems]);

  // --- Filter & Sort ---
  const filteredProblems = useMemo(() => {
    const statusOrder = { pending: 1, in_progress: 2, resolved: 3 };
    let list = [...problems];

    if (filterStatus !== "all") {
      list = list.filter(p => (p.status || "pending") === filterStatus);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        (p.title || "").toLowerCase().includes(q) ||
        (p.location || "").toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q)
      );
    }

    return list.sort((a, b) => {
      const sA = a.status || "pending";
      const sB = b.status || "pending";
      return (statusOrder[sA] || 99) - (statusOrder[sB] || 99);
    });
  }, [problems, filterStatus, searchQuery]);

  // --- Checkbox Logic ---
  const handleSelectAll = (e) => {
    setSelectedIds(e.target.checked ? filteredProblems.map(p => p._id) : []);
  };

  const handleSelectOne = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // --- Single Actions ---
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateProblemDetails(id, { status: newStatus });
      showNotification(`Status updated to "${getStatusLabel(newStatus)}"`);
      loadData();
    } catch (err) {
      showNotification("Status update failed!", "error");
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      try {
        await deleteProblem(id);
        setSelectedIds(prev => prev.filter(item => item !== id));
        showNotification("Report deleted successfully");
        loadData();
      } catch (err) {
        showNotification("Failed to delete!", "error");
      }
    }
  };

  // --- Bulk Actions ---
  const handleBulkDelete = async () => {
    if (window.confirm(`Delete ${selectedIds.length} selected reports? This cannot be undone.`)) {
      try {
        await Promise.all(selectedIds.map(id => deleteProblem(id)));
        showNotification(`${selectedIds.length} reports deleted`);
        setSelectedIds([]);
        loadData();
      } catch (err) {
        showNotification("Bulk delete failed!", "error");
      }
    }
  };

  const handleBulkStatus = async (newStatus) => {
    try {
      await Promise.all(selectedIds.map(id => updateProblemDetails(id, { status: newStatus })));
      showNotification(`${selectedIds.length} reports updated to "${getStatusLabel(newStatus)}"`);
      setSelectedIds([]);
      loadData();
    } catch (err) {
      showNotification("Bulk update failed!", "error");
    }
  };

  // --- Loading State ---
  if (loading) {
    return (
      <div className="ad-loading-screen">
        <div className="ad-spinner"></div>
        <p className="ad-loading-text">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="ad-dashboard-wrapper">

      {/* Toast Notification */}
      {notification && (
        <div className={`ad-toast ${notification.type}`}>
          {notification.type === "success" ? <CheckCircleIcon /> : <AlertIcon />}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="ad-container">

        {/* --- Header --- */}
        <div className="ad-header">
          <div className="ad-header-left">
            <h1 className="ad-title">Admin Dashboard</h1>
            <p className="ad-subtitle">Manage and monitor all community reports</p>
          </div>
          <button className="ad-refresh-btn" onClick={loadData}>
            <RefreshIcon /> Refresh
          </button>
        </div>

        {error && <div className="ad-error-msg"><AlertIcon /> {error}</div>}

        {/* --- Stats Cards --- */}
        <div className="ad-stats-grid">
          <div className="ad-stat-card ad-stat-total" onClick={() => setFilterStatus("all")}>
            <div className="ad-stat-icon"><InboxIcon /></div>
            <div className="ad-stat-info">
              <span className="ad-stat-number">{stats.total}</span>
              <span className="ad-stat-label">Total Reports</span>
            </div>
          </div>
          <div className="ad-stat-card ad-stat-pending" onClick={() => setFilterStatus("pending")}>
            <div className="ad-stat-icon"><AlertIcon /></div>
            <div className="ad-stat-info">
              <span className="ad-stat-number">{stats.pending}</span>
              <span className="ad-stat-label">Pending</span>
            </div>
          </div>
          <div className="ad-stat-card ad-stat-progress" onClick={() => setFilterStatus("in_progress")}>
            <div className="ad-stat-icon"><ClockIcon /></div>
            <div className="ad-stat-info">
              <span className="ad-stat-number">{stats.inProgress}</span>
              <span className="ad-stat-label">In Progress</span>
            </div>
          </div>
          <div className="ad-stat-card ad-stat-resolved" onClick={() => setFilterStatus("resolved")}>
            <div className="ad-stat-icon"><CheckCircleIcon /></div>
            <div className="ad-stat-info">
              <span className="ad-stat-number">{stats.resolved}</span>
              <span className="ad-stat-label">Resolved</span>
            </div>
          </div>
        </div>

        {/* --- Toolbar --- */}
        <div className="ad-toolbar">
          <div className="ad-search-box">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="ad-filter-tabs">
            {["all", "pending", "in_progress", "resolved"].map(f => (
              <button
                key={f}
                className={`ad-filter-tab ${filterStatus === f ? "active" : ""}`}
                onClick={() => setFilterStatus(f)}
              >
                {f === "all" ? "All" : getStatusLabel(f)}
                <span className="ad-tab-count">
                  {f === "all" ? stats.total :
                    f === "pending" ? stats.pending :
                    f === "in_progress" ? stats.inProgress :
                    stats.resolved}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* --- Bulk Action Bar --- */}
        {selectedIds.length > 0 && (
          <div className="ad-bulk-bar">
            <span className="ad-bulk-count">
              <strong>{selectedIds.length}</strong> report{selectedIds.length > 1 ? "s" : ""} selected
            </span>
            <div className="ad-bulk-actions">
              <button className="ad-bulk-btn ad-bulk-pending" onClick={() => handleBulkStatus("pending")}>
                Set Pending
              </button>
              <button className="ad-bulk-btn ad-bulk-progress" onClick={() => handleBulkStatus("in_progress")}>
                Set In Progress
              </button>
              <button className="ad-bulk-btn ad-bulk-resolved" onClick={() => handleBulkStatus("resolved")}>
                Set Resolved
              </button>
              <button className="ad-bulk-btn ad-bulk-delete" onClick={handleBulkDelete}>
                <TrashIcon /> Delete All
              </button>
            </div>
          </div>
        )}

        {/* --- Table --- */}
        {filteredProblems.length === 0 ? (
          <div className="ad-empty-state">
            <div className="ad-empty-icon">📋</div>
            <h3>No reports found</h3>
            <p>Try changing your filters or search query.</p>
            <button className="ad-clear-btn" onClick={() => { setSearchQuery(""); setFilterStatus("all"); }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="ad-table-wrapper">
            <table className="ad-table">
              <thead>
                <tr>
                  <th className="ad-th-check">
                    <input
                      type="checkbox"
                      className="ad-checkbox"
                      onChange={handleSelectAll}
                      checked={filteredProblems.length > 0 && selectedIds.length === filteredProblems.length}
                    />
                  </th>
                  <th>Report</th>
                  <th>Location</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Update Status</th>
                  <th className="ad-th-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProblems.map((p) => {
                  const isSelected = selectedIds.includes(p._id);
                  const currentStatus = p.status || "pending";
                  return (
                    <tr key={p._id} className={`${isSelected ? "ad-row-selected" : ""}`}>
                      <td>
                        <input
                          type="checkbox"
                          className="ad-checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectOne(p._id)}
                        />
                      </td>
                      <td>
                        <div className="ad-report-title">{p.title}</div>
                      </td>
                      <td>
                        <div className="ad-location-cell">
                          <span className="ad-loc-pin">📍</span>
                          {p.location || "N/A"}
                        </div>
                      </td>
                      <td>
                        <span className="ad-category-pill">{p.category || "General"}</span>
                      </td>
                      <td>
                        <span className="ad-date-cell">{formatDate(p.createdAt)}</span>
                      </td>
                      <td>
                        <span className={`ad-status-badge ad-badge-${currentStatus}`}>
                          <span className="ad-badge-dot"></span>
                          {getStatusLabel(currentStatus)}
                        </span>
                      </td>
                      <td>
                        <select
                          className={`ad-status-select ad-select-${currentStatus}`}
                          value={currentStatus}
                          onChange={(e) => handleStatusChange(p._id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </td>
                      <td>
                        <button
                          className="ad-delete-btn"
                          onClick={() => handleDelete(p._id, p.title)}
                          title="Delete report"
                        >
                          <TrashIcon />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* --- Footer Info --- */}
        <div className="ad-table-footer">
          <span>Showing {filteredProblems.length} of {problems.length} reports</span>
        </div>

      </div>
    </div>
  );
}