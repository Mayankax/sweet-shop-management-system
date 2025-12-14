import { disconnectPrisma } from "../utils/prisma";

afterAll(async () => {
  await disconnectPrisma();
});
