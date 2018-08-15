import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HSCardHeader, CardRight, LoaderOrThis } from '../common';
import { fetchHistory } from './HistoryActions';
import { HistoryListItem } from './';

class HistoryListView extends Component {
  componentWillMount() {
    this.props.fetchHistory();
  }


  render() {
    const { historyItems, loading } = this.props;
    return (
      <CardRight>
        <HSCardHeader>Call History</HSCardHeader>
        <LoaderOrThis loading={loading}>
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
        </LoaderOrThis>
      </CardRight>
    );
  }
}


const mapStateToProps = ({ HistoryReducer }) => {
  const { historyItems, loading } = HistoryReducer;
  return {
    historyItems,
    loading
  };
};

export default connect(mapStateToProps, { fetchHistory })(HistoryListView);
