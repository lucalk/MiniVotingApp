import AdminNavbar from "./AdminNavbar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen w-full">
      <AdminNavbar />
      <div className="max-w-5xl mx-auto p-6">{children}</div>
    </div>
  );
}