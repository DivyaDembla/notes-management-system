const db = require("../config/db");

exports.getNotes = (req, res) => {
  const { deviceId } = req.query;

  db.query(
    `
SELECT *
FROM notes
WHERE deviceId=?
ORDER BY updatedAt DESC
`,
    [deviceId],

    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    },
  );
};
exports.createNote = (req, res) => {
  const { title, content, deviceId, doodles } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "Title required",
    });
  }

  db.query(
    `
INSERT INTO notes
(title, content, color, deviceId, doodles)
VALUES (?, ?, ?, ?, ?)
`,
    [title, content, "white", deviceId, JSON.stringify(doodles || [])],

    (err, result) => {
      if (err) {
        console.log(err);

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
  const { title, content, doodles } = req.body;

  db.query(
    `
UPDATE notes
SET
title=?,
content=?,
doodles=?,
updatedAt=CURRENT_TIMESTAMP
WHERE id=?
`,
    [title, content, JSON.stringify(doodles || []), req.params.id],

    (err) => {
      if (err) {
        console.log(err);

        return res.status(500).json(err);
      }

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
SET
pinned=NOT pinned,
updatedAt=updatedAt
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
SET
color=?,
updatedAt=updatedAt
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
