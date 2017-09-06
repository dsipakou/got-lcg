import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './card.scss';

class Card extends Component {

  render() {
    return (
      <div className='card'>Card container
        <h1>{this.props.name || 'No name'}</h1>
      </div>
    );
  }
}

Card.propTypes = {
  name: PropTypes.string
}

export default Card;
