import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './card.scss';

class Card extends Component {

  static propTypes = {
    name: PropTypes.string,
    own: PropTypes.bool.isRequired
  };

  render() {
    const isOwn = this.props.own;
    let cardTitle = null;
    if (isOwn) {
      cardTitle = <h1>{this.props.name || 'No name'}</h1>
    } else {
      cardTitle = <h1>Opp</h1>
    }
    return (
      <div className='card'>Card container
        {cardTitle}
      </div>
    );
  }
}

export default Card;
