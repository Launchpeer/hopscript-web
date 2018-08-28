import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Edit2 } from 'react-feather';

import { InputTextEditable } from '../../common';

import { updateScript } from './ScriptBuilderActions';

class ScriptNameForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(data) {
    this.props.updateScript(data, this.props.scriptId);
  }

  render() {
    const { name, handleSubmit, disableGlossary } = this.props;
    return (
      <div>
        <form>
          <InputTextEditable
            name="name"
            type="text"
            placeholder={name || "Script Name Here"}
            editOrThis={<Edit2 />}
            fontSize="f3"
            noEdit={disableGlossary}
            onSubmit={handleSubmit(this.handleFormSubmit)}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ ScriptBuilderReducer }) => {
  const {
    disableGlossary
  } = ScriptBuilderReducer;
  return {
    disableGlossary
  };
};

export default reduxForm({
  form: 'updateScriptNameForm'
})(connect(mapStateToProps, {
  updateScript
})(ScriptNameForm));
