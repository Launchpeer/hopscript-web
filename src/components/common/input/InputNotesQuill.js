import React from 'react';
import ReactQuill from 'react-quill';

const InputNotesQuill = ({ handleChange, text, placeholder }) => (
  <div>
    <ReactQuill
      theme="bubble"
      value={text}
      placeholder={placeholder || "Write your notes here."}
      onChange={handleChange} />
  </div>
);

export default InputNotesQuill;
