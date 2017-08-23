import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Bluebird from 'bluebird';
import axios from 'axios';
import AllAlbums from './AllAlbums';
import Songs from './Songs';

class SingleArtist extends React.Component {

  constructor () {
    super();
    this.state = {
      artist: {}
    };
    this.stateSetter = this.stateSetter.bind(this);
  }

  stateSetter (theId) {
    const mainPath = `/api/artists/${theId}`;
    const paths = [mainPath, `${mainPath}/albums`, `${mainPath}/songs`];
    Bluebird
      .map(paths, path => axios.get(path))
      .map(res => res.data)
      .spread((artist, albums, songs) => {
        artist.albums = albums;
        artist.songs = songs;
        this.setState({ artist });
      });
  }

  componentDidMount () {
    const artistId = this.props.match.params.artistId;
    this.stateSetter(artistId);
  }
  
  componentWillReceiveProps (nextProps) {
    const newAtristId = +nextProps.match.params.artistId;
    if (this.state.artist.id !== newAtristId){
      this.stateSetter(newAtristId);
    }
  }

  render () {

    const artist = this.state.artist;
    const albums = artist.albums || [];
    const songs = artist.songs || [];

    return (
      <div>
        <h3>{ artist.name }</h3>
        <ul className="nav nav-tabs">
          <li><Link to={`/artists/${artist.id}/albums`}>ALBUMS</Link></li>
          <li><Link to={`/artists/${artist.id}/songs`}>SONGS</Link></li>
        </ul>
        <Switch>
          <Route path={`/artists/${artist.id}/albums`} render={() => (
            <AllAlbums albums={albums} />
          )} />
          <Route path={`/artists/${artist.id}/songs`} render={() => (
            <Songs songs={songs} />
          )} />
        </Switch>
      </div>
    );
  }
}

export default SingleArtist;

