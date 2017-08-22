import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class NewPlaylist extends Component {

  constructor () {
    super();
    this.state = {
      inputValue : '',
      invalid : true
    };
    this.handler = this.handler.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handler(e) {
    e.preventDefault();
    let bool = true;
    if (e.target.value.length > 0 && e.target.value.length < 17) {
      bool = false
    }
      this.setState({invalid: bool, inputValue: e.target.value})
    }


  handleSubmit(e){
    e.preventDefault();
    console.log(this.state.inputValue)
    this.setState({inputValue: ''})
  }

  render () {

    return (
    <div className="well">
        <form className="form-horizontal" onSubmit = {this.handleSubmit}>
          <fieldset>
            <legend>New Playlist</legend>
            <div className="form-group">
              <label className="col-xs-2 control-label">Name</label>
              <div className="col-xs-10">
                <input className="form-control" type="text" onChange = {this.handler} value = {this.state.inputValue}/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button disabled = {this.state.invalid} type="submit" className="btn btn-success">Create Playlist</button>
              </div>
            </div>
          </fieldset>
        </form>
    </div>
    );
  }
}
