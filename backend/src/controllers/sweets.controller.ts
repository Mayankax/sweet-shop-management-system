import { Request, Response } from "express";
import { createSweet, getAllSweets } from "../services/sweets.service";
import { searchSweets } from "../services/sweets.service";

export const addSweet = async (req: Request, res: Response) => {
  const { name, category, price, quantity } = req.body;

  const sweet = await createSweet(name, category, price, quantity);
  res.status(201).json(sweet);
};

export const listSweets = async (_req: Request, res: Response) => {
  const sweets = await getAllSweets();
  res.status(200).json(sweets);
};


export const search = async (req: Request, res: Response) => {
  const sweets = await searchSweets(req.query);
  res.status(200).json(sweets);
};
