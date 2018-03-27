import React from 'react'
import CardBox from './CardBox'

const MiddleBar = ({ cards }) => (
  <div className="middle-bar">
    <div className="row">
      {cards.map((c, i) => <CardBox key={i} card={c} />)}
    </div>
  </div>
);

export default MiddleBar