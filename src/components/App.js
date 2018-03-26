import React from 'react';
import Footer from './Filters';
import VisibleEntryList from '../containers/VisibleEntryList';
import AddEntry from '../containers/AddEntry';


const App = () => (
  <div className="add-entry-wrp">
    <div className="container">
        <AddEntry />
        <Footer />
        <VisibleEntryList />
    </div>
  </div>
);

export default App