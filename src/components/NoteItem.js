import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

function NoteItem(props) {
    const context = useContext(NoteContext);
    const {deleteNote} = context;
    const deleteItem = (event) => {
        deleteNote(props.item._id);
    }
  const style = {
    width: "18rem",
  };
  return (
    <div className="col-md-3">
      <div className="card my-3" style={style}>
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{props.item.title}</h5>
            <i className="fa-solid fa-trash-can mx-2" onClick = {deleteItem}></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick = {() => props.updateNote(props.item)}></i>
          </div>
          <p className="card-text">{props.item.description}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
