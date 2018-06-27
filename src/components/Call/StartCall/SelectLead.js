import React, { Component } from 'react';
import { InputSearch } from '../../common';
import { Colors, BorderRadius } from '../../../config/styles';

class SelectLead extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div
          role="button"
          onClick={this.props.onClick}
          className={`f4 mb2 pointer ${this.props.classOverrides}`}>
          Select a Lead
        </div>
        {this.props.selectedGroup &&
          <div className="flex items-center pr4">
            <div style={{ width: '9rem' }} className="mr2 f7">Search Leads</div>
            <div className="w-100">
              <input
                type="text"
                placeholder="Search Leads..."
                className="ba w-100 pa3"
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
        }
      </div>
    );
  }
}

export default SelectLead;
