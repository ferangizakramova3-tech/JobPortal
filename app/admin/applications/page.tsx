"use client";

import { useEffect, useState } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { supabase } from "@/lib/supabase";

type Application = {
  id: string;
  name: string;
  email: string;
  phone: string;
  resume_url: string;
  cover_letter: string;
  created_at: string;
  jobs: {
    title: string;
    company: string;
  } | null;
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selected, setSelected] = useState<Application | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function getApplications() {
  
    const { data: appsData } = await supabase.from("applications").select("*").order("created_at", { ascending: false });

    const { data: jobsData } = await supabase
      .from("jobs")
      .select("id, title, company");

    if (appsData) {

      const combined = appsData.map((app: any) => {
        const matchingJob = jobsData ? jobsData.find((j: any) => j.id === app.job_id) : null;
        return {
          ...app,
          jobs: matchingJob ? { title: matchingJob.title, company: matchingJob.company } : null
        };
      });
      setApplications(combined as Application[]);
    }
  }

  async function deleteApplication(id: string) {
    if (confirm("Arizani o'chirishga ishonchingiz komilmi?")) {
      await supabase.from("applications").delete().eq("id", id);
      getApplications();
    }
  }

  function openModal(application: Application) {
    setSelected(application);
    setModalOpen(true);
  }

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "5px" }}>Job Applications</h1>
      <p style={{ color: "#666", marginBottom: "30px" }}>Review and manage all job applications ({applications.length} total)</p>

      <div className="panel">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Job</th>
              <th>Applied Date</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>
                  {app.jobs
                    ? `${app.jobs.title} - ${app.jobs.company}`
                    : "No job"}
                </td>
                <td>
                  {new Date(app.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </td>
                <td style={{ textAlign: "right" }}>
                  <button onClick={() => openModal(app)}>View</button>
                  <button onClick={() => deleteApplication(app.id)} className="deleteBtn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mounted && (
        <Rodal
          visible={modalOpen}
          onClose={() => setModalOpen(false)}
          width={520}
          height={430}
          customStyles={{ borderRadius: "10px", padding: "20px" }}
        >
          {selected && (
            <div className="modalContent">
              <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
                Application Details
              </h2>

              <p style={{ marginBottom: "10px" }}>
                <b>Name:</b> {selected.name}
              </p>

              <p style={{ marginBottom: "10px" }}>
                <b>Email:</b> {selected.email}
              </p>

              <p style={{ marginBottom: "10px" }}>
                <b>Phone:</b> {selected.phone || "-"}
              </p>

              <p style={{ marginBottom: "10px" }}>
                <b>Job:</b>{" "}
                {selected.jobs
                  ? `${selected.jobs.title} - ${selected.jobs.company}`
                  : "No job"}
              </p>

              <p style={{ marginBottom: "10px" }}>
                <b>Resume:</b>{" "}
                {selected.resume_url ? (
                  <a href={selected.resume_url} target="_blank" rel="noreferrer" style={{ color: "#123f82", textDecoration: "underline" }}>
                    {selected.resume_url}
                  </a>
                ) : "-"}
              </p>

              <p style={{ marginBottom: "10px" }}>
                <b>Cover Letter:</b>
              </p>
              <div style={{ background: "#f9fafb", padding: "10px", borderRadius: "6px", border: "1px solid #eee", maxHeight: "120px", overflowY: "auto" }}>
                {selected.cover_letter || "-"}
              </div>
            </div>
          )}
        </Rodal>
      )}
    </>
  );
}