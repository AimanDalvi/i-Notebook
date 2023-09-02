import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Home from './components/Home';
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";


function App() {

  const [alert, setAlert] = useState(null);

  const ShowAlert = (message, type)=>{
    setAlert(
      {
        msg:message,
        type:type
      }
    )
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar/>
    <Alert alert={alert}/>
    <div className="container">
    <Routes>
    <Route exact path="/" element={<Home ShowAlert={ShowAlert}/>}/>
    <Route exact path="/textform" element={<TextForm heading="TextUtils - Text Analyzer Tool" ShowAlert={ShowAlert}/>}/>
    <Route exact path="/login" element={<Login ShowAlert={ShowAlert}/>}/>
    <Route exact path="/signup" element={<Signup ShowAlert={ShowAlert}/>}/>
    </Routes>
    </div>
    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
