export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string | null;
  category: string;
  type: string;
  description: string;
  created_at: string;
};

export type Application = {
  id: string;
  job_id: string;
  name: string;
  email: string;
  phone: string | null;
  cover_letter: string | null;
  resume_url: string | null;
  created_at: string;
  jobs?: { title: string; company: string } | null;
};

export const categories = ["Technology", "Marketing", "Design", "Sales", "Finance", "Other"];
export const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance"];