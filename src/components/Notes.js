import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NoteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

function Notes(props) {
  const navigator = useNavigate();
  const context = useContext(NoteContext);
  const { notes, editNote, fetchedNotes} = context;
  const ref = useRef(null);
  const closeRef = useRef(null);
  const [note, setNote] = useState({ title: "", description: "", tag: "", _id: "" });
  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchedNotes(localStorage.getItem('token'));
    } else {
      navigator("/login");
    }
    
  }, []);
  const updateNote = (note) => {
    ref.current.click();
    setNote({
      title: note.title,
      description: note.description,
      tag: note.tag,
      _id: note._id
    });
  };

  const handleOnClick = (event) => {
    closeRef.current.click();
    editNote(note._id, note.title, note.description, note.tag);
  };

  const onChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };
  return (
    <>
      <AddNote />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={note.title}
                    aria-describedby="emailHelp"
                    name="title"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="textarea"
                    className="form-control"
                    id="description"
                    name="description"
                    value={note.description}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    value={note.tag}
                    onChange={onChange}
                  />
                </div>
                <button 
                ref={closeRef}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary mx-3" onClick={handleOnClick}>
                  Update Note
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-2 mx-2">
        <h2>Your Notes</h2>
        {notes.map((element) => {
          return (
            <NoteItem
              key={element._id}
              item={element}
              updateNote={updateNote}
            />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
