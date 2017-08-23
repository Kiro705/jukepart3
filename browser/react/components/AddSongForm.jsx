import React, { Component } from 'react';
import axios from 'axios';


export default class extends Component {
  constructor(){
      super()
      this.state = {
        songs : []
      }
    }

   componentDidMount(){
    axios.get('/api/songs')
      .then(res => res.data)
      .then(songs => this.setState({ songs }));
  }



  render () {

    return (
    <div className="well">
    <form className="form-horizontal" noValidate name="songSelect">
      <fieldset>
        <legend>Add to Playlist</legend>
        <div className="form-group">
          <label htmlFor="song" className="col-xs-2 control-label">Song</label>
          <div className="col-xs-10">
            <select className="form-control" name="song">

            {this.state.songs.map( (song) => {
              return (
            <option key = {song.id} value={song}>{song.name}</option>
                    )
            })}
            </select>
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-10 col-xs-offset-2">
            <button type="submit" className="btn btn-success">Add Song</button>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
    );
  }
}
