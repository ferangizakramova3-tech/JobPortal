"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "@/app/components/Header";
import { supabase } from "@/lib/supabase";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  category: string;
  type: string;
  description: string;
};

function JobsList() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState("All");

  async function getJobs() {
    const { data } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      setJobs(data);
    }
  }

  useEffect(() => {
    getJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || job.category === category;
    return matchesSearch && matchesCategory;
  });

  function resetFilters() {
    setSearch("");
    setCategory("All");
  }

  return (
    <main className="container">
      <h1 style={{ fontSize: "36px", fontWeight: "800", marginBottom: "8px" }}>Find Your Next Opportunity</h1>
      <p style={{ color: "#666", fontSize: "16px", marginBottom: "40px" }}>
        Explore our curated list of job openings and find the perfect match for your career.
      </p>

      <div className="jobsLayout">
 
        <div className="filterBox">
          <h3>Filter Jobs</h3>
          
          <div className="filterGroup">
            <label>Search by keyword</label>
            <input
              placeholder="Job title, company, or skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filterGroup">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="All">All Categories</option>
              <option value="Technology">Technology</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
              <option value="Sales">Sales</option>
              <option value="Finance">Finance</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button onClick={resetFilters} className="whiteBtn" style={{ width: "100%", padding: "10px" }}>
            Reset Filters
          </button>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Available Jobs</h2>
            <span style={{ color: "#666", fontSize: "14px" }}>{filteredJobs.length} positions</span>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="panel" style={{ textAlign: "center", padding: "40px" }}>
              <p style={{ color: "#666" }}>No jobs match your filters.</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div className="publicJobCard" key={job.id}>
              
                <div className="jobInitialIcon">
                  {job.company ? job.company.charAt(0).toUpperCase() : "J"}
                </div>

                <div>
                  <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>{job.title}</h2>
                  <p className="company">{job.company}</p>
                </div>

                <div className="tagRow">
                  <span className="category">{job.category}</span>
                  <span className="type">{job.type}</span>
                </div>

                <div className="metaRow">
                  <span>📍 {job.location}</span>
                  <span>💰 {job.salary || "Salary Undisclosed"}</span>
                </div>

                <p style={{ color: "#4b5563", fontSize: "14px", lineHeight: "1.5" }}>
                  {job.description && job.description.length > 150
                    ? `${job.description.slice(0, 150)}...`
                    : job.description}
                </p>

                <div className="requirementsRow">
                  <span>React</span>
                  <span>TypeScript</span>
                  <span>JavaScript</span>
                </div>

                <Link
                  href={`/jobs/${job.id}`}
                  className="blueBtn"
                  style={{ textAlign: "center", textDecoration: "none", display: "block", padding: "12px" }}
                >
                  View Details
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export default function JobsPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="container">Loading...</div>}>
        <JobsList />
      </Suspense>
    </>
  );
}