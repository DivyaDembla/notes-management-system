const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const app = express();

const notesRoutes = require("./routes/notes");

app.use(
  cors({
    origin: ["https://notes-management-system-sigma.vercel.app/"],

    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.use("/notes", notesRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running");
});
