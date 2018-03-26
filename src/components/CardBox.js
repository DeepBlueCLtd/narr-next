import React from 'react'

const CardBox = ({ card }) => (
  <div className="col-md-6 padding-left-1 padding-right-1 padding-top-1 padding-bottom-1">
    <div className="card-box-wrapper">
      <div className="card-name">
        <h4>{card.name}</h4>
      </div>
      <div className="card-tiles">
        {card.tiles.map((n, i) => <div key={i} className="card-tile">{n}</div>)}
      </div>
    </div>
  </div>
);

export default CardBox