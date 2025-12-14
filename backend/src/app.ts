import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import sweetsRoutes from "./routes/sweets.routes";
import inventoryRoutes from "./routes/inventory.routes";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetsRoutes);
app.use("/api/sweets", inventoryRoutes);

export default app;
