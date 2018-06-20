import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

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
    const { name, handleSubmit } = this.props;
    return (
      <div>
        <form className="mv4">
          <InputTextEditable
            name="name"
            type="text"
            placeholder={name}
            onSubmit={handleSubmit(this.handleFormSubmit)}
          />
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'updateScriptNameForm'
})(connect(null, {
  updateScript
})(ScriptNameForm));
