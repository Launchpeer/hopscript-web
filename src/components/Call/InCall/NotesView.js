import React from 'react';
import ReactQuill from 'react-quill';

const NotesView = ({ handleChange, text }) => (
  <div>
    <ReactQuill
      theme="bubble"
      value={text}
      placeholder="Write your notes here."
      onChange={handleChange} />
  </div>
);

export default NotesView;
