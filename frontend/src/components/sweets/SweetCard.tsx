import type { Sweet } from "../../hooks/useSweets";
import { useAuth } from "../../auth/AuthContext";
import api from "../../api/axios";
import { useState } from "react";

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

    onRestock(res.data); // ✅ update only this sweet
    setRestockQty(0);
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h3 className="text-lg font-semibold">{sweet.name}</h3>
      <p className="text-sm text-gray-600">{sweet.category}</p>
      <p className="font-medium">₹ {sweet.price}</p>
      <p>Stock: {sweet.quantity}</p>

      <button
        disabled={sweet.quantity === 0}
        onClick={onPurchase}
        className="mt-2 w-full bg-green-600 text-white py-2 rounded disabled:bg-gray-400"
      >
        Purchase
      </button>

      {/* ADMIN ONLY */}
      {user?.role === "ADMIN" && (
        <div className="mt-3 space-y-2">
          <button
            className="bg-yellow-500 text-white w-full py-1 rounded"
            onClick={() => onEdit(sweet)}
          >
            Update
          </button>

          <button
            className="bg-red-600 text-white w-full py-1 rounded"
            onClick={() => onDelete(sweet.id)}
          >
            Delete
          </button>

          {/* RESTOCK */}
          <div className="flex gap-2">
            <input
              type="number"
              min={1}
              placeholder="Qty"
              className="border p-1 w-full"
              value={restockQty}
              onChange={(e) => setRestockQty(Number(e.target.value))}
            />
            <button
              className="bg-blue-600 text-white px-3 rounded"
              onClick={restock}
            >
              Restock
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
