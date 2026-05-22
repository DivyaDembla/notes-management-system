const express = require("express");
const router = express.Router();

const {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
  togglePin,
  changeColor,
} = require("../controllers/notesController");

router.get("/", getNotes);

router.get("/:id", getNoteById);

router.post("/", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

router.put("/pin/:id", togglePin);

router.put("/color/:id", changeColor);

module.exports = router;
