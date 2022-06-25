import React, {useState } from "react";
import NoteContext from "./NoteContext";

const NotesState = (props) => {
  const host = "http://192.168.0.139:3000/api";
  const [notes, setNotes] = useState([]);

  const fetchedNotes = async (auth) => {
    const fetched = await fetch(`${host}/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": auth.toString(),
      },
    });
    const allItems = await fetched.json();
    setNotes(allItems);
  };

  const addNote = async (title, description, tag) => {
    const req = {
      title: title,
      description: description,
      tag: tag,
    };

    const note = await fetch(`${host}/notes/savenote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify(req),
    });
  };

  const deleteNote = async (id) => {
    const note = await fetch(`${host}/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
  };

  const editNote = async (id, title, description, tag) => {
    const req = {
        title: title,
        description: description,
        tag: tag,
      };

    const response = await fetch(`${host}/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify(req),
    });
  };

  return (
    <NoteContext.Provider
      value={{ notes: notes, addNote, deleteNote, editNote, fetchedNotes}}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NotesState;
