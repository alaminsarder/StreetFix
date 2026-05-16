import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../utils/api";
import "./AdminLogin.css";

// --- SVG Icons ---
const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

const ShieldIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="m9 12 2 2 4-4"></path>
  </svg>
);

const AlertIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@streetfix.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const data = await adminLogin(email.trim(), password);

      if (!data?.token) {
        setError("Login failed: token not received from server.");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/admin/dashboard");
      window.location.reload();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Login failed. Check email and password.";
      setError(msg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="al-page">
      {/* Background Shapes */}
      <div className="al-bg-shape al-shape-1"></div>
      <div className="al-bg-shape al-shape-2"></div>
      <div className="al-bg-shape al-shape-3"></div>
      <div className="al-grid-pattern"></div>

      <div className="al-container">
        <div className="al-card">

          {/* Left Side - Branding */}
          <div className="al-brand-side">
            <div className="al-brand-content">
              <div className="al-logo">
                <div className="al-logo-icon">
                  <ShieldIcon />
                </div>
                <span className="al-logo-text">StreetFix</span>
              </div>

              <h2 className="al-brand-title">
                Welcome to the<br />
                <span className="al-brand-grad">Admin Portal</span>
              </h2>

              <p className="al-brand-desc">
                Secure access to manage community reports, track issues, and maintain your city's infrastructure.
              </p>

              <div className="al-brand-features">
                <div className="al-brand-feat">
                  <div className="al-feat-dot"></div>
                  <span>Real-time report management</span>
                </div>
                <div className="al-brand-feat">
                  <div className="al-feat-dot"></div>
                  <span>Bulk action capabilities</span>
                </div>
                <div className="al-brand-feat">
                  <div className="al-feat-dot"></div>
                  <span>Advanced analytics dashboard</span>
                </div>
              </div>

              <div className="al-brand-footer">
                <span>🔒 Secured with end-to-end encryption</span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="al-form-side">
            <div className="al-form-wrap">

              {/* Header */}
              <div className="al-form-header">
                <div className="al-form-badge">
                  <span className="al-badge-dot"></span>
                  Admin Access
                </div>
                <h1 className="al-form-title">Sign in to your account</h1>
                <p className="al-form-desc">
                  Enter your credentials to access the admin dashboard
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="al-error">
                  <AlertIcon />
                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="al-form">

                {/* Email */}
                <div className="al-field">
                  <label className="al-label">Email Address</label>
                  <div className="al-input-wrap">
                    <span className="al-input-icon"><EmailIcon /></span>
                    <input
                      className="al-input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@streetfix.com"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="al-field">
                  <div className="al-label-row">
                    <label className="al-label">Password</label>
                    <a href="#forgot" className="al-forgot">Forgot password?</a>
                  </div>
                  <div className="al-input-wrap">
                    <span className="al-input-icon"><LockIcon /></span>
                    <input
                      className="al-input"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="al-eye-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="al-remember">
                  <label className="al-checkbox-wrap">
                    <input type="checkbox" className="al-checkbox" />
                    <span className="al-checkbox-text">Keep me signed in</span>
                  </label>
                </div>

                {/* Submit */}
                <button className={`al-submit ${loading ? "al-loading" : ""}`} type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="al-spinner"></span>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In <ArrowIcon />
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="al-divider">
                  <span>Protected Access</span>
                </div>

                {/* Footer Info */}
                <div className="al-footer-info">
                  <ShieldIcon />
                  <p>This is a restricted area. Only authorized administrators can access this panel.</p>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}