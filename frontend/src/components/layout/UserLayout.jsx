import UserNavbar from "./UserNavbar";

export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen">
      <UserNavbar />
      <div className="max-w-5xl mx-auto p-6">{children}</div>
    </div>
  );
}