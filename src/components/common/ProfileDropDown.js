import React, { Component } from 'react';
import { User } from 'react-feather';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { Colors } from '../../config/styles';
import { Card, CenterThis, OutsideClicker, Avatar } from './';
import { logOutUser } from '../Auth/AuthActions';

const SignOut = onClick => (
  <div onClick={onClick} className="white pointer" role="button">
    Sign out
  </div>
);

class ProfileDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDown: false
    };
    this.handleSignOut = this.handleSignOut.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.openDropdown = this.openDropdown.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleRouting = this.handleRouting.bind(this);
  }

  handleSignOut() {
    this.closeDropdown();
    this.props.logOutUser();
  }

  toggleDropdown() {
    this.setState({ dropDown: !this.state.dropDown });
  }

  closeDropdown() {
    this.setState({ dropDown: false });
  }

  openDropdown() {
    this.setState({ dropDown: true });
  }

  handleRouting() {
    this.closeDropdown();
    browserHistory.push('/profile');
  }

  renderUser(image) {
    return image ? (
      <Avatar backgroundImage={image._url} />
    ) : (
      <User color="white" size={30} scale={3} />
    );
  }

  render() {
    const { username, logoImage } = this.props.user.attributes;
    return (
      <OutsideClicker handleToggle={this.closeDropdown}>
        <div
          className="bg-brand-primary br-100 flex items-center justify-center pointer"
          style={{
            width: '3rem',
            height: '3rem'
          }}
          role="button"
          onKeyPress={this.toggleDropdown}
          onClick={this.toggleDropdown}
        >
          {this.renderUser(logoImage)}
        </div>
        {this.state.dropDown && (
          <Card
            classOverrides="mw6 absolute right-0 tc mt3"
            boxShadow
            bottomContent={SignOut(this.handleSignOut)}
            borderRadius="medium"
            bottomColor="brandPrimary"
          >
            <div
              className="pointer"
              role="button"
              onKeyPress={this.handleRouting}
              onClick={this.handleRouting}
            >
              <CenterThis>
                <div
                  className="br-100 flex items-center justify-center mb2 bg-brand-primary"
                  style={{
                    width: '3rem',
                    height: '3rem'
                  }}
                >
                  {this.renderUser(logoImage)}
                </div>
              </CenterThis>
              <div className="moon-gray">{username}</div>
            </div>
          </Card>
        )}
      </OutsideClicker>
    );
  }
}

export default connect(null, {
  logOutUser
})(ProfileDropDown);
