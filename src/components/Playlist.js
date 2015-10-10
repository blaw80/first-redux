import React, { Component } from 'react';

class PlaylistItem extends Component{

  handleRemoveClick(e){
    e.preventDefault();
    this.props.onRemoveClick(this.props.trackinfo);
  }

  handlePlayClick(e){
    e.preventDefault();
    this.props.onPlayClick(this.props.trackinfo);
    // use a promise here to start the player after track is loaded?
    // if so: send duration to the store here instead of on updateTime?
  }

  render(){
    let style = {
      highlight: {
        background: 'black',
        color: 'white'
      },
      base: {
        MozUserSelect:'none',
        WebkitUserSelect:'none',
        MsUserSelect:'none'
      }
    }

    return(
      <li  onDoubleClick={(e)=> this.handlePlayClick(e)}
            className='list-group-item'
            style={this.props.currentTrack == this.props.trackinfo.key ? {...style.highlight, ...style.base} : style.base} >
          <span>
          {this.props.trackinfo.title }, {this.props.trackinfo.artist}</span>
          <span onClick={(e) => this.handleRemoveClick(e)}
                className="fa fa-trash-o"
                style={{float:'right'}}></span>
      </li>
    );
  }
}

export default class Playlist extends Component{

  render(){
    let playlistNodes = this.props.playlist.map((node, index) => {
      node.key = index;
      return (
        <PlaylistItem key={index}
                      trackinfo={node}
                      currentTrack={this.props.currentTrack}
                      onRemoveClick={this.props.onRemoveClick}
                      onPlayClick={this.props.onPlayClick} />
      );
    });

    return (
        <ul className='list-group'>
          {playlistNodes}
        </ul>
    );
  }
}
