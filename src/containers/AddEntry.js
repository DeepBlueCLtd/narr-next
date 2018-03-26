import React from 'react';
import { connect } from 'react-redux';
import { addEntry } from '../actions';
import {ButtonToolbar, Button} from 'react-bootstrap'

let AddEntry = (props) => {
    let input;

    return (
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <form className="form-button mt2"
                      onSubmit={e => {
                          e.preventDefault();
                          if (!input.value.trim()) {
                              return
                          }
                          props.dispatch(addEntry(input.value, 'OOW Comment', 'public'));
                          input.value = ''
                      }}
                >
                    <input
                        ref={node => {
                            input = node
                        }}
                    />
                    <ButtonToolbar>
                        <Button id='EntryA' className={props.buttonActive === 'EntryA' && 'active'}
                                onClick={props.BtnHandler}
                                type="submit">
                            Add Entry A
                        </Button>
                        <Button id='EntryB' className={props.buttonActive === 'EntryB' && 'active'} onClick={e => {
                            e.preventDefault();
                            props.BtnHandler(e);
                            props.dispatch(addEntry('lorem ipsum', 'CO Comment', 'sensitive'));
                        }}>
                            Add Entry B
                        </Button>
                        <Button id='EntryC' className={props.buttonActive === 'EntryC' && 'active'} onClick={e => {
                            e.preventDefault();
                            props.BtnHandler(e);
                            props.dispatch(addEntry('lorem ipsum', 'Weather', 'private'));
                        }}>
                            Add Entry C
                        </Button>
                        <Button id='EntryD' className={props.buttonActive === 'EntryD' && 'active'} onClick={e => {
                            props.BtnHandler(e);
                            e.preventDefault();
                            for(let i=0;i<100;i++) {
                                props.dispatch(addEntry('lorem ipsum ' + i, 'New  contact', 'public'));
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
AddEntry = connect()(AddEntry);

export default AddEntry