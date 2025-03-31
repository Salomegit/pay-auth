import express from "express";
import authRoutes from "./routes/auth.js";
const app = express();

app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running!");
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));

export default app; // Export the app for testing purposes  
