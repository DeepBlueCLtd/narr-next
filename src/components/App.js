import React from 'react';

import Sidebar from './SideBar';
import MiddleBar from '../containers/MiddleBarContainer';
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
                <div className="row">
                    <div className="col-md-3 col-lg-3">
                        <Sidebar/>
                    </div>
                    <div className="col-md-9 col-lg-9">
                        <MiddleBar/>
                    </div>
                </div>


            </div>
        </div>)
    }
};

export default App