import React, { Component } from 'react';
import axios from 'axios';
import Songs from '../components/Songs';

export default class SingleAlbum extends Component {

  constructor () {
    super();
    this.state = {
      album: {}
    };
    this.stateSetter = this.stateSetter.bind(this);
  }

  stateSetter (theProps) {
    axios.get(`/api/albums/${theProps}`)
    .then(res => res.data)
    .then(album => {
      this.setState({ album })
    });
  }

  componentDidMount () {
    const albumId = this.props.match.params.albumId;
    this.stateSetter(albumId);
  }
  
  componentWillReceiveProps (nextProps) {
    const newAlbumId = +nextProps.match.params.albumId;
    if (this.state.album.id !== newAlbumId){
      this.stateSetter(newAlbumId);
    }
  }

  render () {
    const album = this.state.album;

    return (
      <div className="album">
        <div>
          <h3>{ album.name }</h3>
          <img src={ album.imageUrl } className="img-thumbnail" />
        </div>
        <Songs songs={album.songs} />
      </div>
    );
  }
}
