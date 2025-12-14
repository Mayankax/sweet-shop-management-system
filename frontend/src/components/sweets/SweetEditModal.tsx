import { useState } from "react";
import api from "../../api/axios";
import type { Sweet } from "../../hooks/useSweets";

export default function SweetEditModal({
  sweet,
  onClose,
  onSuccess
}: {
  sweet: Sweet;
  onClose: () => void;
  onSuccess: (updated: Sweet) => void;
}) {
  const [name, setName] = useState(sweet.name);
  const [category, setCategory] = useState(sweet.category);
  const [price, setPrice] = useState(sweet.price);

  const submit = async () => {
    const res = await api.put(`/api/sweets/${sweet.id}`, {
      name,
      category,
      price
    });
    onSuccess(res.data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96 space-y-3">
        <h3 className="font-bold">Update Sweet</h3>

        <input
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          className="border p-2 w-full"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <div className="flex gap-2">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={submit}
          >
            Save
          </button>
          <button
            className="bg-gray-400 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
