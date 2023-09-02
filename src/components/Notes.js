import '../App.css';
import React, { useContext } from "react";
import { useEffect,useRef,useState } from "react";
import noteContext from "../context/notes/noteContext";
import Addnote from "./Addnote";
import Noteitem from "./Noteitem";
import { useNavigate } from 'react-router-dom';
import DateTimePicker from "react-datetime-picker";


const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes,getNotes,editNote,reminderNote,getReminder } = context;
  useEffect(()=>{
    if(localStorage.getItem('token')){
      getNotes()
      setInterval(() => {
        getReminder()
       }, 1000);
    }
    
    else{
      navigate("/login")
    }
    // eslint-disable-next-line
  },[])
  
  
  
  const [ remindAt, setRemindAt ] = useState()
 
  
  const [note, setNote] = useState({id:"", etitle: "", edescription: "",etag: "" ,remindAt:""})
  const [rNote, setrNote] = useState({ rtitle: "",rreminder: ""})
  
//jab updatenote func call hoyga to jo currwnt notes lki value ha wo setnote me populte hojygi fir setnote se wo value={note.title} ha waha populate hogi
//currentnote jo ha wo aara ha notestate se jo ki notes naam se ha jiske andr id,title,desc,tag ha.notes or note same ha q ki notes.map ek arg leta ha note fir usse note.tag aise sab call krte ha 
  const updateNote=(currentNote)=>{
    ref.current.click(); 
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  }

  const remindNote=(currentNote)=>{
    ref1.current.click();
    setrNote({rtitle:currentNote.title,rreminder:currentNote.remindAt})
     
  }

  const setReminder = () =>{
    reminderNote(rNote.rtitle,remindAt)
    ref1Close.current.click();
    props.ShowAlert("Reminder Added Successfully","success")
  }

  
  const handleClick=(e)=>{
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    props.ShowAlert("Updated Successfully","success")
    
}
  const onChange=(e)=>{
    setNote({...note, [e.target.name]: e.target.value})
}
  const ref = useRef(null)
  const refClose = useRef(null)

  const ref1 = useRef(null)
  const ref1Close = useRef(null)

  return (
    <>
      <Addnote ShowAlert={props.ShowAlert}/>
     
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form className='form-horizontal'>
              <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
              </div>
              <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
              </div>
              <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
              </div>  
            </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button  type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
    </div>
    {/* #modal for reminder */}

    
    <button type="button"  ref={ref1} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal1" data-bs-whatever="@getbootstrap">Open modal for @getbootstrap</button>

    <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Remind Me 🙋‍♂️</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">

            <form>
              <div className="mb-3">
                <label htmlFor="etitle" className="col-form-label">Title:</label>
                <input type="text" className="form-control" id="rtitle" name="rtitle" value={rNote.rtitle} readOnly />
              </div>
              <div className="mb-3" >
                <label htmlFor="message-text" className="col-form-label">Set Reminder:</label>
                <div className='container' style={{width:'100'}}>
                <DateTimePicker
                  name="rreminder"
                  value={rNote.rreminder}
                  onChange={setRemindAt}
                  minDate={new Date()}
                  minutePlaceholder="mm"
                  hourPlaceholder="hh"
                  dayPlaceholder="DD"
                  monthPlaceholder="MM"
                  yearPlaceholder="YYYY"
                />
                </div> 
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button"  ref={ref1Close} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={setReminder}>Set Reminder</button>
          </div>
        </div>
      </div>
    </div>



    <div className="row my-3" style={{display:'0', margin:'0 auto'}}>
      <h3>Your Notes</h3>
      <div className="container mx-2 my-2">
      {notes.length===0 && "NO NOTES TO DISPLAY"}   
      </div>
      {notes.map((note) => {
         return <Noteitem ShowAlert={props.ShowAlert} key={note._id} updateNote={updateNote} remindNote={remindNote} note={note}  />;
      })}
    </div>
    </>
  );
};

export default Notes;
