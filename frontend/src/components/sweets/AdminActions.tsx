export default function AdminActions({
  onRestock
}: {
  onRestock: (qty: number) => void;
}) {
  return (
    <div className="mt-3 flex gap-2">
      <input
        type="number"
        min={1}
        placeholder="Qty"
        className="border rounded px-2 py-1 w-full"
        onChange={(e) => onRestock(Number(e.target.value))}
      />
    </div>
  );
}
