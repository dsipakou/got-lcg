import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Card extends Component {

  render() {
    return (
      <div>Card container
        <h1>{this.props.name || 'No name'}</h1>
      </div>
    );
  }
}

Card.propTypes = {
  name: PropTypes.string
}

export default Card;
