import Editor from "@monaco-editor/react";
import { useState } from "react";

function CodeEditor({ onCodeChange }) {

  const [code, setCode] = useState("// Write your solution here");

  const handleChange = (value) => {
    setCode(value);
    onCodeChange(value);
  };

  return (
    <Editor
      height="400px"
      defaultLanguage="javascript"
      value={code}
      onChange={handleChange}
    />
  );
}

export default CodeEditor;