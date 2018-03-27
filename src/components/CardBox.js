import React from 'react'

const CardBox = ({ card }) => (
  <div className="col-md-6 pl1 pr1 pt1 pb1">
    <div className="card-box-wrapper">
      <div className="card-head">
        <h4>{card.name}</h4>
      </div>
      <div className="card-item">
        {card.tiles.map((n, i) => <div key={i} className="card-list">{n}</div>)}
      </div>
    </div>
  </div>
);

export default CardBox