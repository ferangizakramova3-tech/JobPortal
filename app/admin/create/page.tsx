"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CreateJobPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [category, setCategory] = useState("Technology");
  const [type, setType] = useState("Full-time");
  const [description, setDescription] = useState("");

  async function createJob() {
   
    if (!title || !company || !location || !description) {
      setMessage("Iltimos, barcha majburiy (*) maydonlarni to'ldiring!");
      return;
    }

    const { error } = await supabase.from("jobs").insert({
      title: title,
      company: company,
      location: location,
      salary: salary,
      category: category,
      type: type,
      description: description,
    });

    if (!error) {
      router.push("/admin/jobs");
    } else {
      setMessage("Ishni saqlashda xatolik yuz berdi.");
    }
  }

  return (
    <>
      <Link href="/admin/jobs" className="backBtn">
        ← Back to Jobs
      </Link>

      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "5px" }}>Create New Job</h1>
      <p style={{ color: "#666", marginBottom: "30px" }}>Fill in the form below to create a new job posting</p>

      <div className="panel" style={{ maxWidth: "850px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "25px" }}>Add New Job</h2>

        {message && (
          <p style={{ color: "red", fontWeight: "bold", marginBottom: "15px" }}>{message}</p>
        )}

        <div className="formGrid">
          <div style={{ display: "grid", gap: "6px" }}>
            <label style={{ fontWeight: "bold", fontSize: "14px" }}>Job Title *</label>
            <input 
              placeholder="e.g., Senior Frontend Engineer" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div style={{ display: "grid", gap: "6px" }}>
            <label style={{ fontWeight: "bold", fontSize: "14px" }}>Company *</label>
            <input 
              placeholder="e.g., TechCorp" 
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div style={{ display: "grid", gap: "6px" }}>
            <label style={{ fontWeight: "bold", fontSize: "14px" }}>Location *</label>
            <input 
              placeholder="e.g., San Francisco, CA" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div style={{ display: "grid", gap: "6px" }}>
            <label style={{ fontWeight: "bold", fontSize: "14px" }}>Salary (Optional)</label>
            <input 
              placeholder="e.g., $100,000 - $150,000" 
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>

          <div style={{ display: "grid", gap: "6px" }}>
            <label style={{ fontWeight: "bold", fontSize: "14px" }}>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>Technology</option>
              <option>Marketing</option>
              <option>Design</option>
              <option>Sales</option>
              <option>Finance</option>
              <option>Other</option>
            </select>
          </div>

          <div style={{ display: "grid", gap: "6px" }}>
            <label style={{ fontWeight: "bold", fontSize: "14px" }}>Job Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Freelance</option>
            </select>
          </div>

          <div className="col-span-2" style={{ display: "grid", gap: "6px" }}>
            <label style={{ fontWeight: "bold", fontSize: "14px" }}>Description *</label>
            <textarea 
              placeholder="Job description and responsibilities..." 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button type="button" onClick={createJob} style={{ width: "fit-content", padding: "12px 30px" }}>
            Create Job
          </button>
        </div>
      </div>
    </>
  );
}