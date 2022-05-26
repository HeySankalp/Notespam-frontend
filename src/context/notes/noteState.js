
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

  const host = "https://notespam.herokuapp.com"

  let notesAll = []

  //🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷GET notes🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: 'GET',
      headers: {
        "auth-token": localStorage.getItem('token'),
        "Content-Type": "application/json"
      }
    });
    const notesAll = await response.json();
    
   //client side
    setNotes(notesAll)
  }



  const [notes, setNotes] = useState(notesAll)





  //🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷ADD note🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷

  const addNote = async (title, description) => {

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        "auth-token": localStorage.getItem('token'),
        "Content-Type": "application/json"

      },
      body: JSON.stringify({ title, description })
    });

    //client side
    const newNote = await response.json();
    setNotes(notes.concat(newNote))
  }





  //🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷DELETE notes🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷

  const deleteNote =  (id) => {

    fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        "auth-token": localStorage.getItem('token'),
        "Content-Type": "application/json"
      },
    });

    //client side
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
  }






  //🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷EDIT notes🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷

  const editNote = (title, description, id) => {
   fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "auth-token": localStorage.getItem('token'),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, description })
    });

    //Deep copy of notes
    let notesCopy = JSON.parse(JSON.stringify(notes))

//client side
    for (let index = 0; index < notesCopy.length; index++) {
      const element = notesCopy[index];
      if (element._id === id) {
        notesCopy[index].title = title;
        notesCopy[index].description = description;
        break;
      }
    }
    setNotes(notesCopy);
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, editNote, addNote, deleteNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState 