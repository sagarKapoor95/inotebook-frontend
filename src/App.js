import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NotesState from "./context/notes/NoteState";
import Alert from "./components/Alert";

function App() {
  return (
    <>
      <NotesState>
        <Router>
          <Navbar key={"navbar"} />
          <Alert message = "This is amazing react course"/>
          <div className="container"> 
          <Routes>
            <Route path="/about" key={"about"} element={<About />}></Route>
            <Route path="/home" key={"home"} element={<Home />}></Route>
            <Route path="/login" key={"login"} element={<Login/>}></Route>
            <Route path="/signup" key={"signup"} element={<Signup />}></Route>
            <Route exact path="/" key={"home"} element={<Home />}></Route>
          </Routes>
          </div>
        </Router>
      </NotesState>
    </>
  );
}

export default App;
