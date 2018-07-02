import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import { currentTime } from '../../common';
import { saveNotes } from '../CallActions';

class NotesView extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '', saved: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(value) {
    this.setState({ text: value });
  }

  // saves the notes and tells the user when the last save occured.
  handleClick(currentCall, text) {
    let thistext = text;
    thistext = thistext.split('<p>').join('').split('</p>').join('');
    const time = currentTime();
    this.props.saveNotes(currentCall, thistext);
    this.setState({ saved: time });
  }

  render() {
    const { currentCall } = this.props;
    const { saved } = this.state;
    return (
      <div>
        <ReactQuill
          theme="bubble"
          value={this.state.text}
          placeholder="Write your notes here."
          onChange={this.handleChange} />
        <div className="flex flex-row">
          <div role="button"
            className="brand-primary underline pointer hov-transparent"
            onClick={() => this.handleClick(currentCall.id, this.state.text)}>
          Save notes
          </div>
          {saved &&
          <div className="pl2 moon-gray i">Last saved at {saved} </div>}
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({ CallReducer }) => {
  const { currentCall, notes } = CallReducer;
  return {
    currentCall, notes
  };
};

export default connect(mapStateToProps, {
  saveNotes
})(NotesView);
