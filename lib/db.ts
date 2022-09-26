import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  errorFormat: "pretty",
  log:
    process.env.NODE_ENV === "development"
      ? ["error", "info", "query", "warn"]
      : ["error"],
});
prisma
  .$connect()
  .then(() => console.log("Connected TO Database"))
  .catch(console.error);
