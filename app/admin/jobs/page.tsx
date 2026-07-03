"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  type: string;
};

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  async function getJobs() {
    const { data } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      setJobs(data);
    }
  }

  async function deleteJob(id: string) {
    if (confirm("Ishni o'chirishga ishonchingiz komilmi?")) {
      await supabase.from("jobs").delete().eq("id", id);
      getJobs();
    }
  }

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <>
      <div className="adminTop" style={{ display: "block" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "5px" }}>Jobs Management</h1>
        <p style={{ color: "#666", marginBottom: "20px" }}>Manage all your job postings</p>
        
        <Link href="/admin/create" className="blueBtn" style={{ display: "inline-block", textDecoration: "none" }}>
          Create New Job
        </Link>
      </div>

      <div className="panel" style={{ marginTop: "30px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "20px" }}>All Jobs ({jobs.length})</h2>

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Category</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>
                  <b>{job.title}</b>
                  <br />
                  <small style={{ color: "#666" }}>{job.location}</small>
                </td>
                <td>{job.company}</td>
                <td>
                  <span className="tag" style={{ background: "#f3f4f6", border: "none", color: "#374151" }}>
                    {job.category}
                  </span>
                </td>
                <td>{job.type}</td>
                <td>
                  <button onClick={() => deleteJob(job.id)} className="deleteBtn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}