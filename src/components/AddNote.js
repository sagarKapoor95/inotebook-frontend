import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

function AddNote() {
    const context = useContext(NoteContext);
    const {addNote} = context; 
    const [note, setNote] = useState({title: "", description: "", tag: ""})
    const handleClick = (event) => {
        event.preventDefault();
        addNote(note.title, note.description, note.tag)
    }
    const onChange = (event) => {
        setNote({...note, [event.target.name]: event.target.value});
    }
  return (
    <div>
        <h2>Add Note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            name = "title"
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
            name = "description"
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
            name = "tag"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
}

export default AddNote;
