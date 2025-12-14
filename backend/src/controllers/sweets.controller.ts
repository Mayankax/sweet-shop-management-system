import { Request, Response } from "express";
import { createSweet, deleteSweet, getAllSweets, updateSweet } from "../services/sweets.service";
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


export const update = async (req: Request, res: Response) => {
  const sweet = await updateSweet(req.params.id, req.body);
  res.status(200).json(sweet);
};

export const remove = async (req: Request, res: Response) => {
  await deleteSweet(req.params.id);
  res.status(204).send();
};