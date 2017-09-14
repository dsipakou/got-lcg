import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Player from '../../components/player/player'
import { playCard, drawCard } from '../../redux/actions/card'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class PlayerContainer extends Component {
  render() {
    const { cards, drawCard } = this.props
    console.log(drawCard)
    return (
      <Player cards={cards} onDeckClick={drawCard} />
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
  console.log(drawCard)
  return bindActionCreators({ drawCard }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer)
