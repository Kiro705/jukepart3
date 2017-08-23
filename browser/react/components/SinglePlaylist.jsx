import React from 'react';
//import { Link } from 'react-router-dom';
import Songs from './Songs';
import axios from 'axios';
import AddSongForm from './AddSongForm.jsx';

export default class SinglePlaylist extends React.Component {

  constructor () {
    super();
    this.state = {
      playlist: {},
      songs: []
    };
    this.stateSetter = this.stateSetter.bind(this);
    this.addSong = this.addSong.bind(this);
  }

  stateSetter (theProps) {
    axios.get(`/api/playlists/${theProps}`)
    .then(res => res.data)
    .then(playlist => {
      axios.get('/api/playlists/' + playlist.id + '/songs')
      .then(res => res.data)
      .then(songs => {
        this.setState({playlist, songs})
      })
    })
  }

  componentDidMount () {
    const playlistId = this.props.match.params.playlistId;
    this.stateSetter(playlistId)
}


  componentWillReceiveProps (nextProps) {
    const newPlaylistId = +nextProps.match.params.playlistId;
    if (this.state.playlist.id !== newPlaylistId){
      this.stateSetter(newPlaylistId);
    }
  }

  addSong(song){
    if(this.state.playlist.id && song.id){
      axios.post('/api/playlists/' + this.state.playlist.id + '/songs', {song})
    } 
  }


  render () {
    const playlist = this.state.playlist
    const songs = this.state.songs
    return (
      <div>
        <h3>{ playlist.name }</h3>
        <Songs songs={songs} /> {/** Hooray for reusability! */}
        { songs && !songs.length && <small>No songs.</small> }
        <hr />
      <AddSongForm playlist = {this.state.playlist} addSong={this.addSong} />
      </div>
    );
  }
}
