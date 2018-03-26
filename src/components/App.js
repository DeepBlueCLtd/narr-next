import React from 'react';
// import Footer from './Filters';
// import VisibleEntryList from '../containers/VisibleEntryList';
// import AddEntry from '../containers/AddEntry';
import Sidebar from './SideBar';
import MiddleBar from '../containers/MiddleBarContainer';

const App = () => (
  <div className="filter_card">
    <div className="container">
      <div className="row">
        {/*<AddEntry />
        <Footer />
        <VisibleEntryList />*/}
        <div className="col-md-3">
          <Sidebar/>
        </div>
        <div className="col-md-9">
          <MiddleBar/>
        </div>
      </div>


    </div>
  </div>
);

export default App