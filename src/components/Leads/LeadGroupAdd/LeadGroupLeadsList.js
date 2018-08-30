import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addLeadToGroup, fetchNextLeads } from '../LeadsActions';
import LeadGroupLeadListItem from './LeadGroupLeadListItem';

class LeadGroupLeadList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
    this.handleClick = this.handleClick.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  handleClick(lead) {
    this.props.addLeadToGroup(lead);
  }

  loadMore() {
    const { page } = this.state;
    this.props.fetchNextLeads(page, this.props.leads);
    this.setState({ page: page + 1 });
  }

  render() {
    const {
      leads, moreLeads, moreLeadsLoading
    } = this.props;
    return (
      <div className="w-100">
        {leads &&
          leads.map(lead => <LeadGroupLeadListItem lead={lead} key={lead.id} adds onClick={() => this.handleClick(lead)} />)}
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
      </div>
    );
  }
}

const mapStateToProps = ({ LeadsReducer }) => {
  const {
    leadsToAdd, leads, moreLeads, moreLeadsLoading
  } = LeadsReducer;
  return {
    leadsToAdd,
    leads,
    moreLeads,
    moreLeadsLoading
  };
};

export default connect(mapStateToProps, { fetchNextLeads, addLeadToGroup })(LeadGroupLeadList);
