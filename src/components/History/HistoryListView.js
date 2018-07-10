import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { HSButton, HSCardHeader, CardRight } from '../common';
import { fetchHistory } from './HistoryActions';
import { HistoryListItem } from './';

class HistoryListView extends Component {
  componentWillMount() {
    this.props.fetchHistory();
  }


  render() {
    const { historyItems } = this.props;
    return (
      <CardRight>
        <HSCardHeader>My History</HSCardHeader>
        <div className="ph3 pt4 pb3">
          <div className="w-100">
            {historyItems && historyItems.length > 0 ?
              <div className="w-100 mb5">
                {historyItems.map(historyItem => <HistoryListItem historyItem={historyItem} key={historyItem.id} />)}
              </div> :
              <div className="mt6 tc f4 pa3 silver">
                <div className="mb6">
                You currently do not have any history <br />
                Navigate to Scripts to get started! <br /> <br />
                </div>
              </div>}
          </div>
        </div>
      </CardRight>
    );
  }
}


const mapStateToProps = ({ HistoryReducer }) => {
  const { historyItems } = HistoryReducer;
  return {
    historyItems
  };
};

export default connect(mapStateToProps, { fetchHistory })(HistoryListView);
