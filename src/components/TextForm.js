import React, { useState } from "react";

export default function TextForm(props) {
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.ShowAlert("Converted to Uppercase","success")

  };

  const handleLowClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.ShowAlert("Converted to Lowercase","success")

  };

  const copyText = ()=>{
    
    navigator.clipboard.writeText(text);
    props.ShowAlert("Copied to Clipboard","success")
  }

  const clearText=()=>{
    let newText='';
    setText(newText);
  }

  const removeSpace = ()=>{
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.ShowAlert("Extra Spaces Removed","success");

  }

  const handleOnChange = (event) => {
    console.log("On change");
    setText(event.target.value);
  };

  const [text, setText] = useState("");
  return (
    <>
      <div className="container" style={{color: props.mode==='dark'?'white':'#051623'}}>
        <h3 className="mb-3">{props.heading}</h3>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="myBox"
            rows="8"
            value={text}
            onChange={handleOnChange}
            style={{backgroundColor: props.mode==='dark'?'#2a3f5e':'white',color: props.mode==='dark'?'white':'#011525'}}

          ></textarea>
        </div>
        <button disabled={text.length===0} className="btn btn-primary mx-1" onClick={handleUpClick}>
          Convert to Uppercase  
        </button>
        <button disabled={text.length===0} className="btn btn-primary mx-1" onClick={handleLowClick}>
          Convert to Lowercase
        </button>
        <button disabled={text.length===0} className="btn btn-primary mx-1" onClick={copyText}>
          Copy Text  
        </button>
        <button disabled={text.length===0} className="btn btn-primary mx-1" onClick={clearText}>
          Clear Text  
        </button>
        <button disabled={text.length===0} className="btn btn-primary mx-1" onClick={removeSpace}>
          Remove Extra Spaces  
        </button>
      </div>
      <div className="container my-3" style={{color: props.mode==='dark'?'white':'#011525'}}>
        <h2>Your Text Summary</h2>
        <p>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p>
        <p>{0.008 * text.split(" ").filter((element)=>{return element.length!==0}).length } Minutes to Read</p>
        <p>Preview</p>
        <p>{text.length>0?text:"Nothing to preview"}</p>
      </div>
    </>
  );
}
