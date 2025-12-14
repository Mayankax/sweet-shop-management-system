import type { Sweet } from "../../hooks/useSweets";
import { useAuth } from "../../auth/AuthContext";
import api from "../../api/axios";
import { useState } from "react";
import { Pencil, Trash2, PackagePlus } from "lucide-react";

export default function SweetCard({
  sweet,
  onPurchase,
  onEdit,
  onDelete,
  onRestock
}: {
  sweet: Sweet;
  onPurchase: () => void;
  onEdit: (sweet: Sweet) => void;
  onDelete: (id: string) => void;
  onRestock: (updated: Sweet) => void;
}) {
  const { user } = useAuth();
  const [restockQty, setRestockQty] = useState(0);

  const restock = async () => {
    if (!restockQty) return;

    const res = await api.post(
      `/api/sweets/${sweet.id}/restock`,
      { quantity: restockQty }
    );

    onRestock(res.data);
    setRestockQty(0);
  };

  return (
    <div className="rounded-xl border-4 border-gray-50 bg-white shadow-sm hover:shadow-md transition p-4 flex flex-col gap-3">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {sweet.name}
          </h3>
          <p className="text-sm text-gray-500">{sweet.category}</p>
        </div>

        {/* ADMIN ACTIONS (ICON ONLY) */}
        {user?.role === "ADMIN" && (
          <div className="flex gap-2 text-gray-500">
            <button
              onClick={() => onEdit(sweet)}
              className="hover:text-blue-600 transition"
              title="Edit"
            >
              <Pencil size={18} />
            </button>

            <button
              onClick={() => onDelete(sweet.id)}
              className="hover:text-red-600 transition"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-800">₹ {sweet.price}</span>
        <span
          className={`text-sm ${
            sweet.quantity === 0
              ? "text-red-600"
              : "text-green-600"
          }`}
        >
          Stock: {sweet.quantity}
        </span>
      </div>

      {/* PURCHASE */}
      <button
        disabled={sweet.quantity === 0}
        onClick={onPurchase}
        className="mt-1 w-full rounded-lg border border-green-600 text-green-700 py-2 font-medium hover:bg-green-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Purchase
      </button>

      {/* ADMIN RESTOCK */}
      {user?.role === "ADMIN" && (
        <div className="flex items-center gap-2 mt-2">
          <input
            type="number"
            min={1}
            placeholder="Qty"
            className="border rounded-lg px-2 py-1 w-full text-sm"
            value={restockQty}
            onChange={(e) => setRestockQty(Number(e.target.value))}
          />
          <button
            onClick={restock}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border text-sm text-gray-700 hover:bg-gray-100 transition"
            title="Restock"
          >
            <PackagePlus size={16} />
            Add
          </button>
        </div>
      )}
    </div>
  );
}
