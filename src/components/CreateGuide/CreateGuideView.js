import React from 'react';
import { Card, FullScreenContainer } from '../common';
import { CreateGuideForm } from './';
import { Colors } from '../../config/styles';

const CreateGuideView = () => (
  <FullScreenContainer color={Colors.brandOffWhite}>
    <div className="mb6">
      <CreateGuideForm />
    </div>
  </FullScreenContainer>
);

/*
const CreateGuideView = () => (
  <FullScreenCenter color={Colors.brandOffWhite}>
    <Card classOverrides="mw6 mt5 mb6" boxShadow>
      <CreateGuideForm />
    </Card>
  </FullScreenCenter>
);
*/

export default CreateGuideView;
