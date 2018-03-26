import { connect } from 'react-redux'
import MiddleBar from '../components/MiddleBar'

const mapStateToProps = (state) => {
  return {
    cards: state.cards
  }
}

const MiddleBarContainer = connect(
  mapStateToProps,
)(MiddleBar)

export default MiddleBarContainer