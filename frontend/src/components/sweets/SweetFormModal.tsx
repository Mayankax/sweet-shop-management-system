import { useState } from "react";
import api from "../../api/axios";
import type { Sweet } from "../../hooks/useSweets";

export default function SweetFormModal({
  onClose,
  onSuccess
}: {
  onClose: () => void;
  onSuccess: (updated: Sweet) => void;
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  const submit = async () => {
    const res = await api.post("/api/sweets", {
      name,
      category,
      price,
      quantity
    });
    onSuccess(res.data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96 space-y-3">
        <h3 className="text-lg font-bold">Add Sweet</h3>

        <input
          className="border p-2 w-full"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Category"
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          className="border p-2 w-full"
          placeholder="Price"
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <input
          type="number"
          className="border p-2 w-full"
          placeholder="Quantity"
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <div className="flex gap-2">
          <button
            onClick={submit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
