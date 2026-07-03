"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/app/components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("admin@jobportal.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("admin_logged") === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (email === "admin@jobportal.com" && password === "admin123") {
      localStorage.setItem("admin_logged", "true");
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Email yoki parol noto'g'ri!");
    }
  }

  return (
    <div className="adminLayout">
      <AdminSidebar />
      <div className="adminContent">
        {!isLoggedIn ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
            <div style={{ display: "grid", justifyItems: "center", gap: "25px", width: "100%" }}>
              <div style={{ textAlign: "center", display: "grid", gap: "10px" }}>
                <div className="logo" style={{ fontSize: "28px", justifyContent: "center" }}>
                  <span>JP</span>
                  JobPortal
                </div>
                <h1 style={{ fontSize: "28px", fontWeight: "bold", marginTop: "10px" }}>Admin Dashboard</h1>
                <p style={{ color: "#666" }}>Sign in to manage job postings</p>
              </div>

              <form onSubmit={handleLogin} className="panel" style={{ width: "420px", display: "grid", gap: "18px", padding: "35px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                {error && (
                  <p style={{ color: "red", fontWeight: "bold", fontSize: "14px", textAlign: "center", margin: 0 }}>
                    {error}
                  </p>
                )}
                
                <div style={{ display: "grid", gap: "6px" }}>
                  <label style={{ fontWeight: "bold", fontSize: "14px" }}>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: "12px", border: "1px solid #ddd", borderRadius: "6px" }}
                  />
                </div>

                <div style={{ display: "grid", gap: "6px" }}>
                  <label style={{ fontWeight: "bold", fontSize: "14px" }}>Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: "12px", border: "1px solid #ddd", borderRadius: "6px" }}
                  />
                </div>

                <button type="submit" className="blueBtn" style={{ padding: "14px", fontSize: "15px", marginTop: "10px" }}>
                  Sign In
                </button>

                <div style={{ background: "#f3f4f6", padding: "15px", borderRadius: "8px", fontSize: "13px", color: "#666", border: "1px solid #e5e7eb", marginTop: "10px" }}>
                  <b>Demo Credentials:</b>
                  <div style={{ marginTop: "4px" }}>Email: admin@jobportal.com</div>
                  <div>Password: admin123 </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}