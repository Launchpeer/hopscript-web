import React, { Component } from 'react';
import { InputDropDown } from '../../common';

class SelectGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="mb4">
        <div
          role="button"
          onClick={this.props.onClick}
          className={`f3 b mb4 pointer ${this.props.classOverrides}`}>
          Select a Lead Group
        </div>
        {this.props.selectedGroup &&
          <div className="flex items-center">
            <div style={{ width: '9rem' }} className="mr2 f6">Lead Group</div>
            <InputDropDown classOverrides="w-100" name="leadGroup" />
          </div>
        }
      </div>
    );
  }
}

export default SelectGroup;
