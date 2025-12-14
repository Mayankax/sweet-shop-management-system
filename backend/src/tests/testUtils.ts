import {prisma} from "../utils/prisma";

export const clearDatabase = async () => {
  await prisma.sweet.deleteMany();
  await prisma.user.deleteMany();
};
