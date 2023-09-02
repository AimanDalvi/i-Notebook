import React,{ useContext } from "react";
import noteContext from "../context/notes/noteContext";



const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note,updateNote,remindNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body ">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id);props.ShowAlert("Deleted Successfully","success");}}></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
            <i className="fa-solid fa-stopwatch mx-2" onClick={()=>{remindNote(note)}}></i>
          </div>
          <p className="card-text">{note.description} </p>
          
          <h6>Remind me at :</h6>
          <p>{String(new Date(note.remindAt.toLocaleString(undefined, {timezone:"Asia/Kolkata"})))}</p>
         
        </div>
      </div>
    </div>
  );
  
};

export default Noteitem;
