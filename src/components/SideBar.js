import React from 'react'

const SideBar = () => (
  <div className="side-bar-wrapper">
    <div className="filter-recent-card">
      <div className="row">
        <div className="col-md-12">
          <div className="filter_recent-box">
            <h4>Filters</h4>
            <button className="btn-primary" type="button">Recent</button>
            <button className="btn-success" type="button">Private</button>
          </div>
        </div>
      </div>
    </div>
    <div className="filter_textbar">
      <div className="filter-text-bar-scrolling">

      </div>
    </div>
  </div>
);

export default SideBar