import { useEffect, useState } from "react";
import api from "../api/axios";

export type Sweet = {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

export function useSweets() {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);

  // fetch ONCE on page load
  useEffect(() => {
    api.get("/api/sweets").then((res) => {
      setSweets(res.data);
      setLoading(false);
    });
  }, []);

  // update ONLY one sweet
  const updateSweet = (updated: Sweet) => {
    setSweets((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s))
    );
  };

  // remove one sweet
  const removeSweet = (id: string) => {
    setSweets((prev) => prev.filter((s) => s.id !== id));
  };

  // add one sweet
  const addSweet = (sweet: Sweet) => {
    setSweets((prev) => [...prev, sweet]);
  };

  // 🔥 replace full list (used for search)
  const setAllSweets = (list: Sweet[]) => {
    setSweets(list);
  };

  return {
    sweets,
    loading,
    updateSweet,
    removeSweet,
    addSweet,
    setAllSweets
  };
}
