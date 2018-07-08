import React from 'react';
import ReactQuill from 'react-quill';

const NotesView = () => {
  const {
    handleChange, saveNotes, saved, text
  } = this.props;
  return (
    <div>
      <ReactQuill
        theme="bubble"
        value={text}
        placeholder="Write your notes here."
        onChange={handleChange} />
      <div className="flex flex-row">
        <div role="button"
          className="brand-primary underline pointer hov-transparent"
          onClick={() => { saveNotes(text); }}>
        Save notes
        </div>
        {saved &&
        <div className="pl2 moon-gray i">Last saved at {saved} </div>}
      </div>
    </div>
  );
};

export default NotesView;
