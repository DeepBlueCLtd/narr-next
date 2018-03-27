import React from 'react'

const SideBar = () => (
  <div className="side-bar">
      <div className="row">
        <div className="col-md-12 col-lg-12">
          <div className="filter-recent">
            <h4>Filters</h4>
            <button type="button">Recent</button>
            <button type="button">Private</button>
          </div>
        </div>
      </div>
    <div className="filter-deta">
      <div className="filter-deta-scrolling">

      </div>
    </div>
  </div>
);

export default SideBar