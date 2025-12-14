import {prisma} from "../utils/prisma";

export const createSweet = async (
  name: string,
  category: string,
  price: number,
  quantity: number
) => {
  return prisma.sweet.create({
    data: { name, category, price, quantity }
  });
};

export const getAllSweets = async () => {
  return prisma.sweet.findMany({
    orderBy: {
      createdAt: "asc"
    }
  });
};

export const searchSweets = async (filters: any) => {
  const { name, category, minPrice, maxPrice } = filters;

  return prisma.sweet.findMany({
    where: {
      name: name ? { contains: name, mode: "insensitive" } : undefined,
      category: category ? { equals: category } : undefined,
      price: {
        gte: minPrice ? Number(minPrice) : undefined,
        lte: maxPrice ? Number(maxPrice) : undefined
      }
    }
  });
};


export const updateSweet = async (
  id: string,
  data: { name: string; category: string; price: number }
) => {
  return prisma.sweet.update({
    where: { id },
    data
  });
};


export const deleteSweet = async (id: string) => {
  return prisma.sweet.delete({
    where: { id }
  });
};
