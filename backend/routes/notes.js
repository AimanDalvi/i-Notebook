const express = require('express');
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require ('../middleware/fetchuser');
const { body, validationResult } = require("express-validator");
const Remind = require("../models/Remind")




      




  router.get('/fetchallreminders',fetchuser,async (req,res)=>{  
        const notes =   await Note.find({user:req.user.id})
        res.json(notes)
            if(notes){
                notes.forEach(note => {
                    if(!note.isReminded){
                        const now = new Date()
                        if((new Date(note.remindAt) - now) < 0) {
                            Note.findByIdAndUpdate(note._id, {isReminded: true}, (err, remindObj)=>{
                                if(err){
                                    console.log(err)
                                }
                                const accountSid = '';//your twilio sid
                                const authToken = '';//your twilio tken
                                const client = require('twilio')(accountSid, authToken);

                                client.messages
                                    .create({
                                        body: 'From iNotebook,                                                                         This is a reminder for your note \n' + note.title ,
                                        from: 'whatsapp:+14155238886',
                                        to: 'whatsapp:+919967964296'//dont use my no
                                    })
                                    .then(message => console.log(message.sid))
                                    .done();
                            })
                        }
                    }
                }) 
            }
        });


 
    







//get all notes of the useer using localhost:5000/api/notes/fetchallnotes.login required
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
        const notes = await Note.find({user:req.user.id})
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
    
});


// Add notes using localhost:5000/api/notes/addnotes.login req
router.post("/addnotes",fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({ min: 5}),
  ],
  async (req, res) => {
    try{
        const {title,description,tag,remindAt}= req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
        }
    
        const note = new Note({
            title,description,tag,isReminded:false,remindAt,user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
}
);

//update an exsting note by giving id.put req.localhost:5000/api/notes/updatenote/:id.login req
router.put("/updatenotes/:id",fetchuser,
  async (req, res) => {
    const {title,description,tag}= req.body;
    try {
        const newNote={};
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};

        //find the note to upadte and update it.
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true})
        res.json({note})
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

  }
);

//delete an exsting note by giving id.delete req.localhost:5000/api/notes/deletenote/:id.login req
router.delete("/deletenotes/:id",fetchuser,
  async (req, res) => {
    try{
       //find the note to delete and delete it.
        let note = await Note.findById(req.params.id);//ye wo note ki id ha jo upar delete req me bhejege
        if(!note){return res.status(404).send("Not Found")}
        //if the note is matchd thn chq tht the note is of the respective useer 
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has been deleted", note: note});
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

  }

);




module.exports= router