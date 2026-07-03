"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const path = usePathname();

  function handleLogout() {
    localStorage.removeItem("admin_logged");
    window.location.href = "/";
  }

  return (
    <div className="sidebar">
      <Link href="/" className="adminLogo">
        <span>JP</span>
        JobPortal
      </Link>

      <p className="menuTitle">ADMIN MENU</p>

      <Link className={path === "/admin/jobs" ? "active" : ""} href="/admin/jobs">
        📄 Jobs
      </Link>

      <Link className={path === "/admin/create" ? "active" : ""} href="/admin/create">
        ➕ Create Job
      </Link>

      <Link className={path === "/admin/applications" ? "active" : ""} href="/admin/applications">
        🧾 Applications
      </Link>

      <button onClick={handleLogout} className="logout">
        Logout
      </button>
    </div>
  );
}