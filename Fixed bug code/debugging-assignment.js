const express = require("express");
const app = express();

app.use(express.json());

const users = [
  { id: 1, name: "Amit", email: "amit@test.com" },
  { id: 2, name: "Riya", email: "riya@test.com" },
];

const notes = [
  { id: 1, title: "Note 1", content: "Content 1", userId: 1 },
  { id: 2, title: "Note 2", content: "Content 2", userId: 2 },
];
// FIX 1: Change 'userList' to 'allUsers' in the response
app.get("/users", (req, res) => {
  const allUsers = users;
  res.send(allUsers);
});

//FIX 2: Change 'id' to 'Number(id)' to ensure correct type comparison
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);
  res.send(user);
});

//FIX 3: function did not return anything, we need to return the user object
function getUserById(id) {
  const user = users.find((u) => u.id === id);
  return user;
}

//FIX 4: length is misspelled as 'lenght'
app.get("/notes/count", (req, res) => {
  const total = notes.length;
  res.send({ total });
});

//FIX 5: 'fetchExternalData' is not defined, we need to define it or mock it for this example
async function fetchExternalData() {
  return { data: "External data fetched successfully" };
}

//FIX 6: 'fetchExternalData' is an asynchronous function, await  prefix needed before function.
app.get("/external-data", async (req, res) => {
  const data = await fetchExternalData();
  res.send(data);
});

app.get("/notes", (req, res) => {
  //FIX 7: notes is an array and it doesnt compare with an operator, it needs to be checked for length
  if (notes.length === 0) {
    console.log("No notes found");
  }
  res.send(notes);
});

function generateNoteId() {
  return Math.random() * 1000;
}

//FIX 8: 'generateNoteId' is a function, we need to call it to get the new ID value
//const newId = generateNoteId();
//but this will generate a new ID only once when the server starts, so we should move this inside the route handler to generate a new ID for each new note.

app.post("/notes", (req, res) => {
  const { title, content, userId } = req.body;

  //FIX 9: The condition should check either of them, not both so use || operator instead.
  if (!title || !content) {
    return res.send("Invalid input");
  }

  const newNote = {
    id: generateNoteId(),
    title: title,
    content: content,
    userId: userId,
  };

  notes.push(newNote);
  res.send(newNote);
});

//FIX 10: 'noteIndex' can be -1 if the note is not found, we need to check for that before splicing
app.delete("/notes/:id", (req, res) => {
  //also id needs to be a number for correct comparsion.
  const id = Number(req.params.id);
  const noteIndex = notes.findIndex((n) => n.id === id);

  //fixed
  if (noteIndex === -1) {
    return res.send({ message: "Note not found" });
  }

  notes.splice(noteIndex, 1);
  res.send({ message: "Note deleted" });
});

app.put("/users/:id", (req, res) => {
  //also id needs to be a number for correct comparsion.
  const id = Number(req.params.id);
  const { name } = req.body;

  const user = users.find((u) => u.id == id);

  //also add null check for user object
  if (!user) {
    return res.send({ message: "User not found" });
  }

  //FIX 11: 'username' is not defined, we need to use 'name' from the request body
  user.name = name;
  res.send(user);
});

app.get("/user-notes/:userId", (req, res) => {
  //also userId needs to be a number for correct comparsion.
  const userId = Number(req.params.userId);

  // FIX 12: Use === instead of = and convert userId to Number for correct filtering
  const userNotes = notes.filter((n) => n.userId === userId);
  res.send(userNotes);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  //FIX 13: The condition should check both email and password.
  if (email === "admin@test.com" && password === "123456") {
    res.send({ message: "Login successful" });
  } else {
    res.send({ message: "Invalid credentials" });
  }
});

app.get("/profile/:id", (req, res) => {
  const id = Number(req.params.id);
  //FIX 14: 'filter' returns an array, we need to use 'find' to get the single user object
  const user = users.find((u) => u.id === id);

  //check if user exists before trying to access its properties
  if (!user) {
    return res.send({ message: "User not found" });
  }
  res.send(user.name);
});

//FIX 15: 'a' and 'b' are being added as strings, we need to convert them to numbers
app.post("/sum", (req, res) => {
  const { a, b } = req.body;
  const total = Number(a) + Number(b);
  res.send({ total });
});

//FIX16: Wrong port number in the console log.
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
