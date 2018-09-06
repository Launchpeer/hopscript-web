/**
 * The purpose of this file is to provide a ReduxForm component that allows an Agent to batch import Leads
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { parseCSV } from '../LeadsActions';
import { InputFile, Button, CSVIcon, ModalCard, RenderAlert } from '../../common';
import { Colors, BorderRadius } from '../../../config/styles';

const DropZoneIcon = (
  <div>
    <CSVIcon color={Colors.brandGreen} width="50px" />
    <div className="mt2">Drop a CSV File Here</div>
    <div className="dib mt1 f6">or</div> <div className="dib pointer brand-green mt1 f6">Browse</div>
  </div>
);

class LeadsCSVForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      showError: false,
      currentCount: 1
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.openCsv = this.openCsv.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.renderCounter = this.renderCounter.bind(this);
    this.accumulateCounter = this.accumulateCounter.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.leadCount < this.props.leadCount) {
      this.renderCounter();
    }
  }

  handleFormSubmit(fields) {
    this.props.parseCSV(fields.csv[0]);
  }

  openCsv() {
    window.open('./csvexample.csv');
  }

  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }


  accumulateCounter(i) {
    this.setState({ currentCount: i });
  }

  renderCounter() {
    const { accumulateCounter } = this;
    for (let i = 0; i < this.props.leadCount; i++) {
      (function (j) {
        setTimeout(() => {
          accumulateCounter(j);
        }, 100 * j + Math.floor(Math.random() * 100));
      }(i));
    }
  }

  render() {
    const {
      handleSubmit, leadsListSuccess, error, err, csvLoading, leadCount
    } = this.props;
    const { modalOpen } = this.state;
    return (

      <div>
        {modalOpen &&
          <ModalCard onClick={this.toggleModal}>
            <div className="pa4 tc">
              Your CSV file should have two columns: "name", and "phone".
              Using headers with different spelling will cause an error during upload (for example, using "lead" instead of "name")
              <div className="brand-green underline pointer f6 mb4" role="button" onClick={() => this.openCsv()}>Download CSV Example</div>
            </div>

          </ModalCard>
        }
        <div className="f3 b">Import a List of Leads</div>
        <div>You can add a list of leads</div>
        <div className="brand-green underline pointer f6" role="button" onClick={() => this.toggleModal()}>How do I format my CSV?</div>
        <form className="mv4" onSubmit={handleSubmit(this.handleFormSubmit)}>
          <InputFile
            name="csv"
            type="text"
            dropzoneContents={DropZoneIcon}
        />
          {csvLoading ?
            <div className="w-100 f4 b--green-glow bg-brand-green white pv3 tc" style={{ borderRadius: BorderRadius.all }}>
            Upload in progress...
              {leadCount && <div>{`${this.state.currentCount}/${leadCount}`}</div>}
            </div> :
            <Button
              backgroundColor={Colors.brandGreen}
              borderRadius="4px"
              classOverrides="w-100 f4"
              onClick={(e) => {
              if (error || err) {
                e.preventDefault();
                this.setState({ showError: true });
               }
            }}
            >
              {leadsListSuccess ? "List Imported!" : "Submit List"}
            </Button>}
          {this.state.showError && error &&
          <div className="pa2">
            <RenderAlert error={{ message: error }} />
          </div>
          }
          {err &&
          <div className="flex flex-column tc">
            <div className="pa2 red">
              {err.message}
            </div>
            <div className="pointer underline" role="button" onClick={(e) => { e.preventDefault(); window.location.reload(); }}>
              Reset form
            </div>
          </div>
          }
        </form>
      </div>

    );
  }
}


const CSVForm = reduxForm({
  form: 'leadsCSVAdd',
  validate
})(LeadsCSVForm);

function validate(values) {
  const errors = {};
  if (!values.csv) {
    errors._error = 'CSV Required';
  }

  return errors;
}


const mapStateToProps = ({ LeadsReducer }) => {
  const {
    leadsListSuccess, error, err, csvLoading, leadCount
  } = LeadsReducer;
  return {
    leadsListSuccess,
    error,
    err,
    csvLoading,
    leadCount
  };
};
export default connect(mapStateToProps, {
  parseCSV
})(CSVForm);
