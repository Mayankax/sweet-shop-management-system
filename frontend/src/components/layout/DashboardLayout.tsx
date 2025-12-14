import { useAuth } from "../../auth/AuthContext";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Sweet Shop</h1>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Role: <b>{user?.role}</b>
          </span>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="p-6">{children}</main>
    </div>
  );
}
