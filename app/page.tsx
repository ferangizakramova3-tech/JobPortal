"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/jobs?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/jobs");
    }
  }

  return (
    <>
      <Header />

      <main className="home" style={{ padding: "80px 20px" }}>
        <p className="orangeText">CAREER OPPORTUNITIES</p>

        <h1 style={{ fontSize: "60px", margin: "20px 0" }}>
          Find Your Perfect <span>Career</span>
        </h1>

        <p className="homeText" style={{ marginBottom: "40px" }}>
          Discover career opportunities from top companies. Search, filter, and
          apply to roles that match your skills and aspirations.
        </p>

        {/* Home qidiruv paneli */}
        <form onSubmit={handleSearch} className="heroSearchContainer" style={{ maxWidth: "600px", margin: "0 auto 40px auto", display: "flex", gap: "10px", padding: "8px", background: "white", borderRadius: "8px", border: "1px solid #ddd" }}>
          <input
            type="text"
            placeholder="Search by job title, company, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, padding: "12px", border: "none", outline: "none", fontSize: "16px" }}
          />
          <button type="submit" className="blueBtn" style={{ padding: "12px 24px" }}>
            Search
          </button>
        </form>

        <div className="homeButtons" style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          <Link href="/jobs" className="blueBtn">
            Browse All Jobs
          </Link>

          <Link href="/admin/create" className="whiteBtn">
            Post a Job
          </Link>
        </div>

        <div className="numbers">
          <div>
            <h2>500+</h2>
            <p>Active Jobs</p>
          </div>

          <div>
            <h2>200+</h2>
            <p>Companies</p>
          </div>

          <div>
            <h2>50K+</h2>
            <p>Placements</p>
          </div>
        </div>
      </main>

      {/* Why Choose JobPortal Section */}
      <section className="whySection" style={{ padding: "80px 20px", background: "#f8fafc", textAlign: "center" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "10px" }}>Why Choose JobPortal?</h2>
        <p className="subtitle" style={{ color: "#666", marginBottom: "50px" }}>
          We've designed the most intuitive job search platform to help you find opportunities that align with your career goals.
        </p>

        <div className="whyGrid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "25px", maxWidth: "1200px", margin: "0 auto" }}>
          <div className="whyCard">
            <div className="whyIcon">🔍</div>
            <h3>Powerful Search</h3>
            <p>Advanced filtering by job title, category, and more. Find exactly what you're looking for in seconds.</p>
          </div>

          <div className="whyCard">
            <div className="whyIcon">⭐</div>
            <h3>Curated Opportunities</h3>
            <p>Carefully selected job postings from verified companies across industries and experience levels.</p>
          </div>

          <div className="whyCard">
            <div className="whyIcon">✨</div>
            <h3>User-Friendly Interface</h3>
            <p>Intuitive design makes job hunting simple and enjoyable. Browse, filter, and explore with ease.</p>
          </div>

          <div className="whyCard">
            <div className="whyIcon">⚡</div>
            <h3>Real-Time Updates</h3>
            <p>Instant notifications for new job postings. Never miss an opportunity that matches your profile.</p>
          </div>
        </div>
      </section>

      {/* Trusted by Job Seekers Section */}
      <section className="trustBanner" style={{ background: "#123f82", color: "white", padding: "80px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "10px" }}>Trusted by Job Seekers Worldwide</h2>
        <p className="subtitle" style={{ color: "rgba(255,255,255,0.8)", marginBottom: "50px" }}>
          Our platform has helped thousands of professionals find their ideal career opportunities.
        </p>

        <div className="trustStats" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "30px", maxWidth: "1000px", margin: "0 auto" }}>
          <div className="trustStatItem">
            <h3 style={{ fontSize: "40px", fontWeight: "bold" }}>500+</h3>
            <p style={{ color: "rgba(255,255,255,0.8)" }}>Active Job Listings</p>
          </div>
          <div className="trustStatItem">
            <h3 style={{ fontSize: "40px", fontWeight: "bold" }}>200+</h3>
            <p style={{ color: "rgba(255,255,255,0.8)" }}>Top Companies</p>
          </div>
          <div className="trustStatItem">
            <h3 style={{ fontSize: "40px", fontWeight: "bold" }}>50K+</h3>
            <p style={{ color: "rgba(255,255,255,0.8)" }}>Successful Placements</p>
          </div>
          <div className="trustStatItem">
            <h3 style={{ fontSize: "40px", fontWeight: "bold" }}>98%</h3>
            <p style={{ color: "rgba(255,255,255,0.8)" }}>User Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Ready to Advance Section */}
      <section className="ctaSection" style={{ padding: "80px 20px", textAlign: "center" }}>
        <div className="ctaCard" style={{ background: "linear-gradient(135deg, #123f82 0%, #1e40af 100%)", color: "white", padding: "60px 40px", borderRadius: "16px", maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "15px" }}>Ready to Advance Your Career?</h2>
          <p style={{ color: "rgba(255,255,255,0.9)", marginBottom: "30px", maxWidth: "600px", margin: "0 auto 30px auto" }}>
            Discover hundreds of job opportunities from leading companies. Start your journey to your next role today.
          </p>
          <div className="ctaButtons" style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
            <Link href="/jobs" className="whiteBtn">
              Explore Jobs
            </Link>
            <Link href="/admin/create" className="whiteBtn" style={{ background: "transparent", color: "white", border: "1px solid white" }}>
              Post a Job
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" style={{ background: "#080b14", color: "#9ca3af", padding: "60px 10% 40px 10%" }}>
        <div className="footerGrid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", marginBottom: "40px" }}>
          <div>
            <h4 style={{ color: "white", fontSize: "20px", marginBottom: "15px" }}>About JobPortal</h4>
            <p style={{ fontSize: "14px", lineHeight: "1.6" }}>
              Your trusted platform for connecting with career opportunities. Find jobs that match your skills.
            </p>
          </div>
          <div>
            <h4 style={{ color: "white", fontSize: "20px", marginBottom: "15px" }}>Quick Links</h4>
            <div style={{ display: "grid", gap: "10px", fontSize: "14px" }}>
              <Link href="/jobs">Browse Jobs</Link>
              <Link href="/admin/create">Post a Job</Link>
            </div>
          </div>
          <div>
            <h4 style={{ color: "white", fontSize: "20px", marginBottom: "15px" }}>Contact</h4>
            <p style={{ fontSize: "14px" }}>support@jobportal.com</p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #1f2937", paddingTop: "20px", textAlign: "center", fontSize: "14px" }}>
          © 2026 JobPortal. All rights reserved.
        </div>
      </footer>
    </>
  );
}