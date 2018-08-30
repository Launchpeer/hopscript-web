import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { LoaderOrThis } from '../../common';
import { fetchLeads, fetchNextLeads, deleteLead } from '../LeadsActions';
import { LeadsListItem } from './';
import { LeadNavCard } from '../';

class LeadsListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.props.fetchLeads();
  }

  handleDelete(lead) {
    this.props.deleteLead(lead);
    browserHistory.push('/leads-list');
  }

  loadMore() {
    const { page } = this.state;
    this.props.fetchNextLeads(page, this.props.leads);
    this.setState({ page: page + 1 });
  }

  render() {
    const {
      leads, location, loading, moreLeads, moreLeadsLoading
    } = this.props;
    return (
      <LeadNavCard location={location}>
        <div className="w-100">
          <LoaderOrThis loading={loading}>
            {leads && leads.length > 0 ?
              <div className="w-100 mb5 mt4">
                {leads.map(lead => <LeadsListItem lead={lead} key={lead.id} removeLead={() => this.handleDelete(lead.id)} />)}
                {!moreLeadsLoading && moreLeads && (
                  <div
                    className="w-100 f4 pointer bg-brand-green white pv3 tc"
                    style={{ borderRadius: '4px' }}
                    role="button"
                    onClick={() => this.loadMore()} >
                  Load More Leads
                  </div>

                )}
                {moreLeadsLoading && (
                  <div className="greenspinner tc">
                    <div className="bounce1 " />
                    <div className="bounce2 " />
                    <div className="bounce3 " />
                  </div>
                )}
              </div> :
              <div className="mt6 tc f4 pa3 silver">
                <div className="mb6">
          You currently do not have any Leads. <br />
          “Add New Lead” to start adding some leads!
                </div>
              </div>}
          </LoaderOrThis>
        </div>
      </LeadNavCard>
    );
  }
}

const mapStateToProps = ({ LeadsReducer }) => {
  const {
    leads, moreLeads, loading, moreLeadsLoading
  } = LeadsReducer;
  return {
    leads,
    moreLeads,
    moreLeadsLoading,
    loading
  };
};

export default connect(mapStateToProps, { fetchLeads, deleteLead, fetchNextLeads })(LeadsListView);
