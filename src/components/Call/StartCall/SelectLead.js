import React, { Component } from 'react';
import { Colors, BorderRadius } from '../../../config/styles';
import { LeadsList } from './';

const SelectedLeadItem = ({ lead, removeLead }) => {
  const { name } = lead.attributes;
  return (
    <div
      className="flex w-100 items-center justify-between list-alt-color-rows pa3 pointer list-hover"
    >
      <div className="w-30-ns brand-near-black">{name}</div>
      <div
        className="br-100 bg-brand-near-black white flex items-center justify-center hov-danger"
        role="button"
        style={{ width: '2rem', height: '2rem' }}
        onClick={removeLead}>
        X
      </div>
    </div>
  );
};

class SelectLead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
    this.handleRemoveLead = this.handleRemoveLead.bind(this);
  }

  handleRemoveLead() {
    this.props.removeLead();
    this.setState({ search: '' });
  }

  render() {
    const {
      leads,
      selectLead,
      leadLoaded
    } = this.props;
    return (
      <div className="mb4">
        <div
          role="button"
          onClick={this.props.onClick}
          className={`f3 b mb4 pointer ${this.props.classOverrides}`}>
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
                    onChange={(e) => { this.setState({ search: e.target.value }); }}
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
                {leads && <LeadsList leads={leads} search={this.state.search} selectLead={selectLead} />}
              </div>
            </div>
          : <div>{leadLoaded && <SelectedLeadItem lead={leadLoaded} removeLead={this.handleRemoveLead} />}</div>
        }
      </div>
    );
  }
}

export default SelectLead;
