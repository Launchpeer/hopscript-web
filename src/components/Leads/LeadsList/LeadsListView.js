import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { LoaderOrThis, InputSearch } from '../../common';
import { fetchLeads, fetchNextLeads, deleteLead } from '../LeadsActions';
import { LeadsListItem } from './';
import { LeadNavCard } from '../';

class LeadsListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      searchText: ''
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

  filterLeads(leads) {
    const { searchText } = this.state;

    return leads.filter(lead => {
      const name = lead.get('name') || '';
      const email = lead.get('email') || '';
      const phone = lead.get('phone') || '';

      return name.indexOf(searchText) !== -1 ||
        email.indexOf(searchText) !== -1 ||
        phone.indexOf(searchText) !== -1
    })
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
                <div className="flex justify-end">
                  <InputSearch input={{
                    value: this.state.searchText,
                    onChange: e => this.setState({ searchText: e.target.value })
                  }} />
                </div>
                <div className="flex justify-between items-center list-alt-color-rows"
                  style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
                  <div className="flex flex-row w-100 items-center ph3">
                    <div className="w-100 flex flex-row">
                      <div className="w-30-ns fw6">Name</div>
                      <div className="w-30-ns fw6">Number</div>
                      <div className="w-30-ns fw6">Email</div>
                    </div>
                    <div/>
                  </div>
                </div>
                {this.filterLeads(leads).map(lead => <LeadsListItem lead={lead} key={lead.id} removeLead={() => this.handleDelete(lead.id)} />)}
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
