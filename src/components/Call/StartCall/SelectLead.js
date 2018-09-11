import React, { Component } from 'react';
import _ from 'lodash';
import { Colors, BorderRadius } from '../../../config/styles';
import { LeadsList } from './';
import SelectedLeadItem from './SelectedLeadItem';

class SelectLead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
    this.handleRemoveLead = this.handleRemoveLead.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.debouncedSearch = _.debounce(this.debouncedSearch, 300).bind(this);
  }

  handleRemoveLead() {
    this.props.removeLead();
    this.setState({ search: '' });
  }

  handleOnChange(e) {
    this.setState({ search: e.target.value });
    this.debouncedSearch(e);
  }

  loadMore() {
    const { page } = this.state;
    this.props.fetchNextLeads(page, this.props.leads);
    this.setState({ page: page + 1 });
  }

  debouncedSearch() {
    if (this.state.search !== '') {
      console.log(this.state.search);
      this.props.searchForLeads(this.state.search);
    }
  }

  render() {
    const {
      leads,
      selectLead,
      leadLoaded,
      moreLeads,
      moreLeadsLoading,
      searchResults
    } = this.props;
    return (
      <div className="mb4">
        <div
          role="button"
          onClick={this.props.onClick}
          className={`f3 b mb2 pointer ${this.props.classOverrides}`}>
          Select a Lead
        </div>
        {(this.props.selectedGroup && !leadLoaded)
          ?
            <div
              className="pa3"
              style={{
                  color: Colors.inputFontColor,
                  borderRadius: BorderRadius.all,
                  borderColor: Colors.moonGray,
                  borderStyle: 'solid',
                  borderWidth: '1px',
                }}
            >
              <div className="w-100 flex items-center">
                <div style={{ width: '9rem' }} className="f6 w-20">Search Leads</div>
                <div className="w-80">
                  <input
                    type="text"
                    placeholder="Search Leads..."
                    className="ba w-100 pa3"
                    onChange={this.handleOnChange}
                    style={{
                        color: Colors.inputFontColor,
                        borderRadius: BorderRadius.all,
                        borderColor: Colors.moonGray,
                        borderStyle: 'solid',
                        borderWidth: '1px',
                      }}
                    />
                </div>
              </div>
              <div className="w-100 mt2">
                {leads && <LeadsList leads={leads} searchResults={searchResults} selectLead={selectLead} />}
                {!moreLeadsLoading && moreLeads && this.state.search === '' &&
                  (<div
                    className="w-100 f4 pointer bg-brand-green white pv3 tc"
                    style={{ borderRadius: '4px' }}
                    role="button"
                    onClick={() => this.loadMore()} >
                  Load More Leads
                  </div>)}
                {moreLeadsLoading && (
                  <div className="greenspinner tc">
                    <div className="bounce1 " />
                    <div className="bounce2 " />
                    <div className="bounce3 " />
                  </div>
                )}
              </div>
            </div>
          : <div>{leadLoaded && <SelectedLeadItem lead={leadLoaded} removeLead={this.handleRemoveLead} />}</div>
        }
      </div>
    );
  }
}

export default SelectLead;
