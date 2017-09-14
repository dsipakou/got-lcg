import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Player from '../../components/player/player'
import { playCard, drawCard } from '../../redux/actions/card'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class PlayerContainer extends Component {
  render() {
    const { cards, playCard } = this.props
    console.log(playCard)
    return (
      <Player cards={cards} onDeckClick={playCard} />
    )
  }
}

const PlayerContainer11 = (cards, drawCard) => {
  return (
    <Player cards={cards} onDeckClick={drawCard} />
  )
}

PlayerContainer.propTypes = {
  cards: PropTypes.array.isRequired,
  drawCard: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return { cards: state }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ playCard }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer)
