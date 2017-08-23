import React, { Component } from 'react';
import axios from 'axios';


export default class extends Component {
  constructor(props){
      super(props)
      this.state = {
        songs : [],
        selectedSong : []
      }
      this.handleChange = this.handleChange.bind(this);
    }

   componentDidMount(){
    axios.get('/api/songs')
      .then(res => res.data)
      .then(songs => this.setState({ songs }));
  }

  handleChange(event){
    console.log(event.target.value);
    this.setState({selectedSong: this.state.songs.filter(function(song){
      return (event.target.value === song.id);
    })
  })
  }


  render () {

    return (
    <div className="well">
    <form className="form-horizontal" noValidate name="songSelect" onSubmit = {this.props.addSong(this.state.selectedSong)}>
      <fieldset>
        <legend>Add to Playlist</legend>
        <div className="form-group">
          <label htmlFor="song" className="col-xs-2 control-label">Song</label>
          <div className="col-xs-10">
            <select className="form-control" name="song" onChange={this.handleChange}>

            {this.state.songs.map( (song) => {
              return (
            <option key = {song.id} value= {song.id} >{song.name}</option>
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
