import { Request, Response } from "express";
import { purchaseSweet, restockSweet } from "../services/inventory.service";

export const purchase = async (req: Request, res: Response) => {
  try {
    const sweet = await purchaseSweet(
      req.params.id,
      Number(req.body.quantity)
    );
    res.status(200).json(sweet);
  } catch {
    res.status(400).json({ message: "Insufficient stock" });
  }
};

export const restock = async (req: Request, res: Response) => {
  const sweet = await restockSweet(
    req.params.id,
    Number(req.body.quantity)
  );
  res.status(200).json(sweet);
};
