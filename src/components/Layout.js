import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigation from './navigation/Navigation';
import DropableContainer from '../containers/dropablecontainer/DropableContainer';
import './Layout.scss';

class Layout extends Component {
  render() {
    return(
      <div className='main-layout'>
        <Navigation />
        <DropableContainer>
          { this.props.children }
        </DropableContainer>
      </div>
    )
  }
}

export default Layout;
