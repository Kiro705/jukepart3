import React from 'react';
//import { Link } from 'react-router-dom';
import Songs from './Songs';
import axios from 'axios';

export default class SinglePlaylist extends React.Component {

  constructor () {
    super();
    this.state = {
      playlist: {}
    };
    this.stateSetter = this.stateSetter.bind(this);
  }

  stateSetter (theProps) {
    axios.get(`/api/playlists/${theProps}`)
    .then(res => res.data)
    .then(playlist => {
      this.setState({ playlist })
    });
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


  render () {
    const playlist = this.state.playlist
    return (
      <div>
        <h3>{ playlist.name }</h3>
        {//<Songs songs={playlist.songs} /> {/** Hooray for reusability! */}
        //{ playlist.songs && !playlist.songs.length && <small>No songs.</small> }
      }
        <hr />
      </div>
    );
  }
}