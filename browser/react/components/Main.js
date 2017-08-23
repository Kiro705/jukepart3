import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import StatefulAlbums from './StatefulAlbums';
import SingleAlbum from './SingleAlbum';
import AllArtists from './AllArtists';
import SingleArtist from './SingleArtist';
import Sidebar from './Sidebar';
import Player from './Player';
import NewPlaylist from './NewPlaylist';
import SinglePlaylist from './SinglePlaylist.jsx';
import axios from 'axios';


export default class Main extends Component {
  constructor(){
    super()
    this.state = {
      playlists : []
    }
    this.addPlaylist = this.addPlaylist.bind(this);
  }

  componentDidMount(){
    axios.get('/api/playlists')
      .then(res => res.data)
      .then(playlists => this.setState({ playlists }));
  }

  addPlaylist(request) {
    axios.post('/api/playlists', { name : request })
    .then(res => res.data)
    .then(result => {
      this.setState({playlists: [...this.state.playlists, result]});
    });
  }



  render () {
    return (
      <Router>
        <div id="main" className="container-fluid">
          <div className="col-xs-2">
            <Sidebar playlists = {this.state.playlists} />
          </div>
          <div className="col-xs-10">
            <Switch>
              <Route exact path="/albums" component={StatefulAlbums} />
              <Route path="/albums/:albumId" component={SingleAlbum} />
              <Route exact path="/artists" component={AllArtists} />
              <Route path="/artists/:artistId" component={SingleArtist} />
              <Route exact path = "/NewPlaylist" render = { () => <NewPlaylist addPlaylist={this.addPlaylist} /> } />
              <Route path="/playlist/:playlistId" component={SinglePlaylist} />
              <Route component={StatefulAlbums} />

            </Switch>
          </div>
          <Player />
        </div>
    </Router>
    );
  }
}
//<Route path="/playlist/:playlistId" render ={ () => <SinglePlaylist playlist={this.state.playlists[match.params.playlistId - 1]} />
