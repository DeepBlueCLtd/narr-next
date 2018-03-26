import React from 'react';
import Footer from './Filters';
import VisibleEntryList from '../containers/VisibleEntryList';
import AddEntry from '../containers/AddEntry';

class App extends React.Component {
    constructor(){
        super();
        this.state={
            buttonActive:''
        }
    }
    BtnHandler=(e)=> {
        let {buttonActive} = this.state;
        buttonActive = e.target.id;
        this.setState({buttonActive});
    };
    render() {
        return(
        <div className="main">
            <div className="container">
                <AddEntry {...this.state} BtnHandler={this.BtnHandler} />
                <Footer/>
                <VisibleEntryList/>
            </div>
        </div>)
    }
};

export default App