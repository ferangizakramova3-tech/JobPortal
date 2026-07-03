import Link from "next/link";

export default function Header() {
  return (
    <div className="header">
      <Link href="/" className="logo">
        <span>JP</span>
        JobPortal
      </Link>

      <div className="nav">
        <Link href="/">Home</Link>
        <Link href="/jobs">Jobs</Link>
        <Link href="/admin/create" className="blueBtn">
          Post a Job
        </Link>
      </div>
    </div>
  );
}