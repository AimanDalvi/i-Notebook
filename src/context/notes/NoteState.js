import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  const getReminder = async () => {
    //API CALL
    const response = await fetch(`${host}/api/notes/fetchallreminders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });
    // eslint-disable-next-line 
    const json = await response.json();
    
    
  };



  //Fetch All Notes
  const getNotes = async () => {
    //API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  //Add Notes
  const addNote=async (title,description,tag,remindAt)=>{
    //API CALL
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag,remindAt})
    });
    const note = await response.json();
    setNotes(notes.concat(note))

  };

  //Delete Notes
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setNotes(json);

    console.log("deleting" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };



  //edit a note
  const editNote = async (id, title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json =  await response.json();
    console.log(json)


    //logic to edit in client
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);

    
  };
  //remind a note
  const reminderNote = async(rtitle,remindAt)=>{
    //api call
    const response = await fetch(`${host}/api/notes/addreminders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({ rtitle,remindAt }),
    });
    const json =  await response.json();
    console.log(json)
  };

  return (
    <NoteContext.Provider value={{ notes,addNote, getNotes, deleteNote, editNote, reminderNote,getReminder }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
