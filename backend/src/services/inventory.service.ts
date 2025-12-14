import {prisma} from "../utils/prisma";

export const purchaseSweet = async (id: string, qty: number) => {
  const sweet = await prisma.sweet.findUnique({ where: { id } });

  if (!sweet || sweet.quantity < qty) {
    throw new Error("INSUFFICIENT_STOCK");
  }

  return prisma.sweet.update({
    where: { id },
    data: { quantity: sweet.quantity - qty }
  });
};

export const restockSweet = async (id: string, qty: number) => {
  return prisma.sweet.update({
    where: { id },
    data: { quantity: { increment: qty } }
  });
};
