// TextInput.js

import React, { useState } from "react";

const TextInput = ({ onTextSubmit, resultlength }) => {
  const [inputText, setInputText] = useState("");
  const [lang, setLang] = useState("english");
  const [topiq, setTopiq] = useState("");
  const [text, settext] = useState(false);
  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = () => {
    onTextSubmit(inputText, lang, topiq);
  };

  return (
    <div className="textInput">
      <select
        name=""
        id=""
        onChange={(e) => {
          setTopiq(e.target.value);
          if (e.target.value === "summary") {
            settext(true);
          } else {
            settext(false);
          }
        }}
      >
        <option value="">Select Topiq</option>
        <option value="joke">Joke</option>
        <option value="positiveThought">Positive Thoght</option>
        <option value="summary">Summary</option>
      </select>

      <select name="" id="" onChange={(e) => setLang(e.target.value)}>
        <option value="english">english</option>
        <option value="hindi">Hindi</option>
        <option value="gujarati">Gujarati</option>
      </select>
      <br />

      {text && (
        <textarea
          name=""
          id=""
          cols="60"
          rows="15"
          onChange={handleTextChange}
          value={inputText}
        ></textarea>
      )}
      {!text && (
        <input type="search" value={inputText} onChange={handleTextChange} />
      )}

      <button onClick={handleSubmit}>Submit Text</button>
      <div className="textLength">
        {" "}
        {text && (
          <p>
            text length:<span className="inputText">{inputText.length}</span>
          </p>
        )}
        {resultlength > 0 && (
          <p>
            summary Text Length:
            <span className="resultText">{resultlength}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default TextInput;
