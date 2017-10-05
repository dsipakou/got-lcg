import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigation from './navigation/Navigation';
import './Layout.scss';

class Layout extends Component {
  render() {
    return(
      <div className='main-layout'>
        <Navigation />
        { this.props.children }
      </div>
    )
  }
}

export default Layout;
