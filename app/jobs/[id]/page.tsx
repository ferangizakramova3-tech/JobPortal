"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

export default function JobDetailsPage() {
  const params = useParams();
  const id = params.id;

  const [job, setJob] = useState<Job | null>(null);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  async function getJob() {
    if (!id) return;

    const { data } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", id)
      .single();

    if (data) {
      setJob(data);
    }
  }

  async function sendApplication() {

    if (!name || !email) {
      setMessage("Iltimos, ismingiz va emailingizni kiriting!");
      setIsSuccess(false);
      return;
    }

    const { error } = await supabase.from("applications").insert({
      job_id: id,
      name: name,
      email: email,
      phone: phone,
      resume_url: resumeUrl,
      cover_letter: coverLetter,
    });

    if (error) {
      setMessage("Xatolik bo'ldi. Qayta urinib ko'ring.");
      setIsSuccess(false);
    } else {
      setMessage("Application muvaffaqiyatli yuborildi!");
      setIsSuccess(true);
  
      
      setName("");
      setEmail("");
      setPhone("");
      setResumeUrl("");
      setCoverLetter("");
    }
  }

  useEffect(() => {
    if (id) {
      getJob();
    }
  }, [id]);

  if (!job) {
    return (
      <>
        <Header />
        <main className="container" style={{ textAlign: "center", padding: "100px 20px" }}>
          <h2>Yuklanmoqda...</h2>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="container twoColumn" style={{ marginTop: "40px" }}>
        
 
        <div className="panel" style={{ display: "grid", gap: "20px", alignContent: "start" }}>
          <div>
            <span className="tag" style={{ background: "#eff6ff", color: "#1d4ed8", border: "none", marginBottom: "15px" }}>
              {job.category}
            </span>
            <h1 style={{ fontSize: "36px", fontWeight: "bold", margin: "10px 0 5px 0" }}>{job.title}</h1>
            <h3 style={{ color: "#123f82", fontSize: "20px", fontWeight: "600", margin: 0 }}>{job.company}</h3>
          </div>

          <div style={{ display: "grid", gap: "10px", padding: "20px 0", borderTop: "1px solid #eee", borderBottom: "1px solid #eee" }}>
            <p style={{ margin: 0, fontSize: "16px" }}><b>📍 Joylashuv:</b> {job.location}</p>
            <p style={{ margin: 0, fontSize: "16px" }}><b>🕒 Turi:</b> {job.type}</p>
            <p style={{ margin: 0, fontSize: "18px", color: "#123f82" }}><b>💰 Maosh:</b> {job.salary || "Ko'rsatilmagan"}</p>
          </div>

          <div>
            <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "12px" }}>Description</h2>
            <p style={{ color: "#4b5563", lineHeight: "1.7", fontSize: "16px", whiteSpace: "pre-line" }}>
              {job.description}
            </p>
          </div>
        </div>

      
        <div className="panel" style={{ alignSelf: "start" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "20px" }}>Apply for this job</h2>

          <div className="form" style={{ display: "grid", gap: "15px" }}>
            <div style={{ display: "grid", gap: "5px" }}>
              <label style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>Name *</label>
              <input 
                placeholder="Enter your full name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ padding: "12px" }} 
              />
            </div>

            <div style={{ display: "grid", gap: "5px" }}>
              <label style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>Email *</label>
              <input 
                placeholder="Enter your email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: "12px" }} 
              />
            </div>

            <div style={{ display: "grid", gap: "5px" }}>
              <label style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>Phone</label>
              <input 
                placeholder="Enter your phone number" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ padding: "12px" }} 
              />
            </div>

            <div style={{ display: "grid", gap: "5px" }}>
              <label style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>Resume URL</label>
              <input 
                placeholder="https://example.com/resume.pdf" 
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                style={{ padding: "12px" }} 
              />
            </div>

            <div style={{ display: "grid", gap: "5px" }}>
              <label style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>Cover Letter</label>
              <textarea 
                placeholder="Write a brief cover letter..." 
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                style={{ padding: "12px", minHeight: "120px" }} 
              />
            </div>

            <button type="button" onClick={sendApplication} style={{ padding: "14px", fontSize: "15px", marginTop: "10px" }}>
              Submit Application
            </button>
          </div>

          {message && (
            <p className="message" style={{ marginTop: "20px", color: isSuccess ? "#047857" : "#b91c1c", fontWeight: "bold", textAlign: "center" }}>
              {message}
            </p>
          )}
        </div>
      </main>
    </>
  );
}