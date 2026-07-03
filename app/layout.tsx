import "./globals.css";

export const metadata = {
  title: "JobPortal",
  description: "Job portal project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}