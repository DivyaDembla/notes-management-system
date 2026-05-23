/* eslint-disable react-refresh/only-export-components */

import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

export const getNotes = () => API.get("/notes");

export const createNote = (data) => API.post("/notes", data);

export const deleteNote = (id) => API.delete(`/notes/${id}`);

export const updateNote = (id, data) => API.put(`/notes/${id}`, data);

export const togglePin = (id) => API.put(`/notes/pin/${id}`);

export const changeColor = (id, color) =>
  API.put(
    `/notes/color/${id}`,

    {
      color,
    },
  );

export default API;
