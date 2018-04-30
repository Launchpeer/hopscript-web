import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { BorderRadius, Colors } from '../../config/styles';

class GoogleAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
    this.onAddressChange = this.onAddressChange.bind(this);
  }

  onAddressChange(address) {
    const { input } = this.props;
    const { onChange } = input;
    this.setState({ address });
    onChange(address);
  }

  render() {
    const inputProps = {
      value: this.state.address,
      type: 'search',
      placeholder: 'Search Places...',
      onChange: this.onAddressChange,
    };
    if (this.props.editInput) {
      return (
        <div className="flex items-center justify-between"
          style={{
            borderBottom: `1px solid ${this.props.borderColor}`
          }}
          >
          <PlacesAutocomplete inputProps={inputProps}
            styles={{
              input: {
                border: "none",
                width: '100%'
              }
            }}
            className="ba w-100 f5 pa2 mt2 bn" />
          <div className="pointer"
            style={{
                  color: Colors.brandPrimary
                }}
            onClick={this.props.onClick}
            onKeyPress={this.props.onClick}
            role="button"
                >Save
          </div>
        </div>
      );
    }
    return (
      <div className="mt2">
        <PlacesAutocomplete inputProps={inputProps}
          styles={{
            input: {
              borderWidth: '1px',
              borderStyle: 'solid',
              borderRadius: BorderRadius['medium'].all,
              borderColor: Colors.silver
            }
          }} />
      </div>
    );
  }
}

export default GoogleAutocomplete;
