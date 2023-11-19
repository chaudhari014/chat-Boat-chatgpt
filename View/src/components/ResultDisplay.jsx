// ResultDisplay.js

import React, { useState } from "react";

const ResultDisplay = ({ results }) => {
  console.log(results);
  return (
    <div className="resultDisplay">
      {results.res.choices[0].message.content}
    </div>
  );
};

export default ResultDisplay;
