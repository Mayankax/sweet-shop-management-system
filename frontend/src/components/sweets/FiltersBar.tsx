import { useState } from "react";

export default function FiltersBar({
  onSearch
}: {
  onSearch: (filters: {
    name?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  }) => void;
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const applyFilters = () => {
    const filters: any = {};

    if (name.trim()) filters.name = name.trim();
    if (category.trim()) filters.category = category.trim();
    if (minPrice) filters.minPrice = Number(minPrice);
    if (maxPrice) filters.maxPrice = Number(maxPrice);

    onSearch(filters);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
      <input
        placeholder="Name"
        className="border p-2 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Category"
        className="border p-2 rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="number"
        placeholder="Min Price"
        className="border p-2 rounded"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />

      <input
        type="number"
        placeholder="Max Price"
        className="border p-2 rounded"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <button
        className="col-span-full bg-gray-800 text-white py-2 rounded"
        onClick={applyFilters}
      >
        Apply Filters
      </button>
    </div>
  );
}
