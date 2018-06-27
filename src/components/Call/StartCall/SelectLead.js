import React, { Component } from 'react';
import { InputSearch } from '../../common';
import { Colors, BorderRadius } from '../../../config/styles';
import { LeadsList } from './';

class SelectLead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  render() {
    const { leads } = this.props;
    return (
      <div>
        <div
          role="button"
          onClick={this.props.onClick}
          className={`f4 mb2 pointer ${this.props.classOverrides}`}>
          Select a Lead
        </div>
        {this.props.selectedGroup &&
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
            <div className="w-100 flex">
              <div style={{ width: '9rem' }} className="mr2 f7 w-30">Search Leads</div>
              <div className="w-70">
                <input
                  type="text"
                  placeholder="Search Leads..."
                  className="ba w-100 pa3"
                  onChange={(e) => {this.setState({ search: e.target.value })}}
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
              {leads && <LeadsList leads={leads} search={this.state.search} />}
            </div>
          </div>
        }
      </div>
    );
  }
}

export default SelectLead;
