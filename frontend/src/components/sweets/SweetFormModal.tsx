import { useState } from "react";
import api from "../../api/axios";

export default function SweetFormModal({
  onClose,
  onSuccess
}: {
  onClose: () => void;
  onSuccess: (sweet: any) => void;
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
    <div className="fixed inset-0 backdrop-blur bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur rounded-xl p-6 w-96 space-y-4 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-800">
          Add Sweet
        </h3>

        <input
          className="border rounded-lg p-2 w-full"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border rounded-lg p-2 w-full"
          placeholder="Category"
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="number"
          className="border rounded-lg p-2 w-full"
          placeholder="Price"
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <input
          type="number"
          className="border rounded-lg p-2 w-full"
          placeholder="Quantity"
          onChange={(e) => setQuantity(Number(e.target.value))}
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
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
