import {prisma} from "../utils/prisma";

export const clearDatabase = async () => {
  await prisma.user.deleteMany();
};
