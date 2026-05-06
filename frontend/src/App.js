import { BrowserRouter, Routes, Route, NavLink, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import api from "./utils/api"; // ✅ এই লাইনটি যোগ করা হয়েছে

// আপনার পেজ কম্পোনেন্টগুলো import করুন
import Home from "./pages/home";
import Submit from "./pages/submit";
import Problems from "./pages/Problems";
import ProblemDetail from "./pages/Problemdetail";
import Status from "./pages/Status";
import Solved from "./pages/Solved";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

// আপনার CSS ফাইল import করুন
import "./pages/home.css"; 

// PrivateRoute for Admin Dashboard
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/admin/login" replace />;
}

// Navbar Component
function Navbar() {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(() => !!localStorage.getItem("token"));
  const location = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    setOpen(false);
    setIsAdmin(!!localStorage.getItem("token"));
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (open && menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAdmin(false);
    window.location.href = "/admin/login";
  };

  return (
    <nav className="sf-nav">
      <div className="sf-container nav-container">
        <NavLink className="sf-logo" to="/">Street<span>Fix</span></NavLink>

        {/* --- Desktop Menu --- */}
        <div className="nav-links-desktop">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/problems">All Issues</NavLink>
          <NavLink to="/status">Track Status</NavLink>
          <NavLink to="/solved">Solved</NavLink>
          
          <div className="nav-divider"></div>
          
          {!isAdmin ? (
            <>
              <NavLink to="/admin/login" className="admin-text">Admin Login</NavLink>
              {/* ✅ এই বোতামটি যোগ করা হয়েছে */}
              <NavLink to="/submit" className="nav-cta">Report Problem</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/admin/dashboard" className="admin-text">Dashboard</NavLink>
              <button onClick={logout} className="nav-cta logout-btn">Logout</button>
            </>
          )}
        </div>

        <button className="mobile-toggle" onClick={() => setOpen(!open)}>
          {open ? "✕" : "≡"}
        </button>
      </div>

      {/* --- Mobile Menu --- */}
      <div className={`mobile-menu ${open ? "active" : ""}`} ref={menuRef}>
        <NavLink to="/">Home</NavLink>
        {/* ✅ এই লিঙ্কটি যোগ করা হয়েছে */}
        <NavLink to="/submit">Submit Problem</NavLink>
        <NavLink to="/problems">All Issues</NavLink>
        <NavLink to="/status">Track Status</NavLink>
        <NavLink to="/solved">Solved</NavLink>
        <div className="mobile-divider"></div>
        {isAdmin ? (
          <>
            <NavLink to="/admin/dashboard">Admin Dashboard</NavLink>
            <button onClick={logout} className="logout-mobile-btn">Logout</button>
          </>
        ) : (
          <NavLink to="/admin/login">Admin Login</NavLink>
        )}
      </div>
    </nav>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="sf-footer">
      <div className="sf-container footer-grid">
        <div className="footer-brand">
          <div className="sf-logo footer-logo">Street<span>Fix</span></div>
          <p>Building smarter, safer, and cleaner cities together.</p>
        </div>
        <div className="footer-links">
          <h4>Platform</h4>
          <NavLink to="/submit">Report Issue</NavLink>
          <NavLink to="/problems">Live Map</NavLink>
          <NavLink to="/status">Track Status</NavLink>
        </div>
        <div className="footer-links">
          <h4>Admin</h4>
          <NavLink to="/admin/login">Login</NavLink>
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
        </div>
        <div className="footer-links">
          <h4>Contact</h4>
          <p>Dhaka, Bangladesh</p>
          <p>support@streetfix.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="sf-container">
          <p>© {new Date().getFullYear()} StreetFix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="sf-main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/status" element={<Status />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/solved" element={<Solved />} />
          <Route path="/problems/:id" element={<ProblemDetail />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
// ✅ নতুন: ডিলিট করার ফাংশন
export async function deleteProblem(problemId) {
  const token = localStorage.getItem("token");
  const res = await api.delete(`/api/problems/${problemId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return res.data;
}