import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useSweets, type Sweet } from "../hooks/useSweets";
import SweetCard from "../components/sweets/SweetCard";
import SweetFormModal from "../components/sweets/SweetFormModal";
import SweetEditModal from "../components/sweets/SweetEditModal";
import FiltersBar from "../components/sweets/FiltersBar";
import { useAuth } from "../auth/AuthContext";
import api from "../api/axios";

export default function Dashboard() {
  const {
    sweets,
    loading,
    updateSweet,
    removeSweet,
    addSweet,
    setAllSweets
  } = useSweets();

  const { user } = useAuth();

  const [editSweet, setEditSweet] = useState<Sweet | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  // ✅ purchase → update ONLY that sweet
  const purchase = async (sweet: Sweet) => {
    const res = await api.post(
      `/api/sweets/${sweet.id}/purchase`,
      { quantity: 1 }
    );
    updateSweet(res.data);
  };

  // ✅ delete → remove ONLY that sweet
  const remove = async (id: string) => {
    await api.delete(`/api/sweets/${id}`);
    removeSweet(id);
  };

  // ✅ search → replace list ONCE (search is intentional refetch)
  const search = async (filters: any) => {
    const params = new URLSearchParams(filters).toString();
    const res = await api.get(`/api/sweets/search?${params}`);
    // search is allowed to replace whole list
    setAllSweets(res.data);
  };

  return (
    <DashboardLayout>
      <FiltersBar onSearch={search} />

      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Sweets</h2>
        {user?.role === "ADMIN" && (
          <button
            onClick={() => setShowAdd(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Sweet
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : sweets.length === 0 ? (
        <p>No sweets found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sweets.map((sweet) => (
            <SweetCard
              key={sweet.id}
              sweet={sweet}
              onPurchase={() => purchase(sweet)}
              onDelete={remove}
              onEdit={setEditSweet}
              onRestock={updateSweet}
            />
          ))}
        </div>
      )}

      {/* ADD */}
      {showAdd && (
        <SweetFormModal
          onClose={() => setShowAdd(false)}
          onSuccess={(sweet: Sweet) => {
            addSweet(sweet);
            setShowAdd(false);
          }}
        />
      )}

      {/* EDIT */}
      {editSweet && (
        <SweetEditModal
          sweet={editSweet}
          onClose={() => setEditSweet(null)}
          onSuccess={(updated: Sweet) => {
            updateSweet(updated);
            setEditSweet(null);
          }}
        />
      )}
    </DashboardLayout>
  );
}
