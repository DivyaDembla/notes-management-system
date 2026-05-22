const db = require("../config/db");

exports.getNotes = (req, res) => {
  db.query("SELECT * FROM notes ORDER BY updatedAt DESC", (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

exports.createNote = (req, res) => {
  const { title, content } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "Title required",
    });
  }

  db.query(
    "INSERT INTO notes(title, content,color) VALUES(?,?,?)",
    [title, content, "white"],

    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Note created",
      });
    },
  );
};

exports.getNoteById = (req, res) => {
  db.query(
    "SELECT * FROM notes WHERE id=?",
    [req.params.id],

    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json(result[0]);
    },
  );
};

exports.updateNote = (req, res) => {
  const { title, content } = req.body;

  db.query(
    `
UPDATE notes
SET title=?, content=?
WHERE id=?
`,
    [title, content, req.params.id],

    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Updated",
      });
    },
  );
};

exports.deleteNote = (req, res) => {
  db.query(
    "DELETE FROM notes WHERE id=?",
    [req.params.id],

    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Deleted",
      });
    },
  );
};

exports.togglePin = (req, res) => {
  db.query(
    `
UPDATE notes
SET pinned = NOT pinned
WHERE id=?
`,

    [req.params.id],

    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Pin updated",
      });
    },
  );
};

exports.changeColor = (req, res) => {
  const { color } = req.body;

  db.query(
    `
UPDATE notes
SET color=?
WHERE id=?
`,

    [color, req.params.id],

    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Color updated",
      });
    },
  );
};
