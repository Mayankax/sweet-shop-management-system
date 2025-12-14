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
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur rounded-xl p-6 w-96 space-y-4 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-800">
          Update Sweet
        </h3>

        <input
          className="border rounded-lg p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border rounded-lg p-2 w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="number"
          className="border rounded-lg p-2 w-full"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
