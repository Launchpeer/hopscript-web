import React from 'react';
import { Field } from 'redux-form';
import { Colors } from '../../../config/styles';
import { MicrophoneIcon } from '../../common';

const renderAudioRecord = ({ record, stop }) => (
  <div className="w-100 ba b--brand-green pa3">
    <div className="flex flex-row">
      <div>
        <MicrophoneIcon width="2rem" height="2rem" color={Colors.brandGreen} />
      </div>
      <div role="button" className="pointer pa3 mh2 ba" onClick={record}>record</div>
      <div role="button" className="pointer pa3 mh2 ba" onClick={stop}>stop</div>
    </div>
  </div>
);


const InputRecordAudio = props => (
  <div className="w-100 tc">
    <Field {...props} component={renderAudioRecord} />
  </div>
);

export default InputRecordAudio;
