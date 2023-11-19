// App.js

import React, { useState } from "react";
import TextInput from "./components/TextInput";
import ResultDisplay from "./components/ResultDisplay";

const App = () => {
  // State to manage uploaded documents and generated results
  const [generatedResults, setGeneratedResults] = useState(null);
  const [loading, setloading] = useState(false);
  const [resultlength, setResultlength] = useState(0);

  const handleTextSubmit = (text, language, topiq) => {
    // Placeholder: Handle the submitted text (e.g., send it to the backend)
    // Update the state or perform necessary actions
    setloading(true);
    if (!text) {
      alert("need text");
      setloading(false);
      return;
    }
    const promptObject = {
      joke: `[Act as a comedian] Tell a light-hearted joke that will make someone smile about ${text} and language should be ${language}.`,
      positiveThought: `[act as a positive thinker] Share an optimistic and uplifting thought about life or the day and plae use this topiq ${text} ahead and language should be ${language} give small.`,
      summary: `[act as a summarizer] Summarize the following text: ${text} language should be ${language} result length should be reduce`,
    };
    const apiKey = "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";
    if (!promptObject[topiq]) {
      console.log(topiq);
      alert("please select Topiq you want");
      setloading(false);
      return;
    }
    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: promptObject[topiq] }],
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setloading(false);
        setGeneratedResults({ res });
        console.log(res.choices[0].message.content.length);
        setResultlength(res.choices[0].message.content.length);
      })
      .finally((res) => setloading(false))
      .catch((error) => {
        setloading(false);
        console.log(error);
      });
    console.log("Text Submitted:", text);
  };

  return (
    <div className="mainContainer">
      <div>
        <h1>Advanced AI Content Generation</h1>

        <TextInput
          onTextSubmit={handleTextSubmit}
          resultlength={resultlength}
        />

        {/* Result Display Component */}
        {loading && <div className="loading">loading...</div>}

        {generatedResults && <ResultDisplay results={generatedResults} />}
      </div>
    </div>
  );
};

export default App;
