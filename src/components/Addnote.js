import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext";
import DateTimePicker from "react-datetime-picker";

const Addnote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [ remindAt, setRemindAt ] = useState()
    
    const [note, setNote] = useState({title: "", description: "",tag: ""})

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag,remindAt);
        setNote({title: "", description: "",tag: ""})
        setRemindAt("")
        props.ShowAlert("Note Added Successfully","success")
    }

    const onChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    //yha ye value={note.title} feilds ko empty k liye diya hu add krne k baad feilds empty honi chhye  
  return (
    <div>
      <div className="container my-3">
     <h3>Add a Note</h3>
     <form className='form-horizontal'>
     <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" value={note.title} name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
     </div>
     <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input type="text" className="form-control" value={note.description}id="description" name="description" onChange={onChange} minLength={5} required/>
     </div>
     <div className="mb-3">
        <label htmlFor="tag" className="form-label">Tag</label>
        <input type="text" className="form-control" value={note.tag}id="tag" name="tag" onChange={onChange} minLength={5} required/>
     </div>
     <div className="mb-3">
        <label htmlFor="tag" className="form-label">Reminder</label>
        <div className='mb-3'>
                <DateTimePicker
                  name='remindAt'
                  value={remindAt}
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
     
     <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick }>Add Note</button>
     </form>
   
     </div>
    </div>
  )
}

export default Addnote
