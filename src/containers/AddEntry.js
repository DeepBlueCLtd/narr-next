import React from 'react';
import { connect } from 'react-redux';
import { addEntry } from '../actions';
import {ButtonToolbar, Button} from 'react-bootstrap'
let input;
class AddEntry extends React.Component {
  constructor(){
    super();
    this.state={
      active:''
    }
  }

  activeBtn=(e)=>{
    this.setState({
      active:e.target.id
    });
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-12">
          <form className="form-tab-button"
                onSubmit={e => {
                  e.preventDefault();
                  if (!input.value.trim()) {
                    return
                  }
                  this.props.dispatch(addEntry(input.value, 'OOW Comment', 'public'));
                  input.value = ''
                }}
          >
            <input
              ref={node => {
                input = node
              }}
            />
            <ButtonToolbar>
              <Button id={'A'} className={this.state.active==='A' ? 'active' : ''} onClick={this.activeBtn} type="submit">
                Add Entry A
              </Button>
              <Button id={'B'} className={this.state.active==='B' ? 'active' : ''} onClick={e => {
                e.preventDefault();
                this.activeBtn(e);
                this.props.dispatch(addEntry('lorem ipsum', 'CO Comment', 'sensitive'));
              }}>
                Add Entry B
              </Button>
              <Button id={'C'} className={this.state.active==='C' ? 'active' : ''} onClick={e => {
                e.preventDefault();
                this.activeBtn(e);
                this.props.dispatch(addEntry('lorem ipsum', 'Weather', 'private'));
              }}>
                Add Entry C
              </Button>
              <Button id={'D'} className={this.state.active==='D' ? 'active' : ''} onClick={e => {
                e.preventDefault();
                this.activeBtn(e);
                for (var i = 0; i < 100; i++) {
                  this.props.dispatch(addEntry('lorem ipsum ' + i, 'New  contact', 'public'));
                }
              }}>
                Add Bulk D
              </Button>
            </ButtonToolbar>
          </form>
        </div>
      </div>
    )
  };
}
AddEntry = connect()(AddEntry);

export default AddEntry