import React, { Component } from 'react';

class PlaylistItem extends Component{

  handleRemoveClick(e){
    e.preventDefault();
    this.props.onRemoveClick(this.props.trackinfo);
  }

  handlePlayClick(e){
    e.preventDefault();
    this.props.onPlayClick(this.props.trackinfo);
    // if so: send duration to the store here instead of on updateTime?
  }

  render(){
    let highlight = {
      background: 'black',
      color: 'white'
    }

    return(
      <li className='list-group-item' style={this.props.currentTrack == this.props.trackinfo.key ? highlight : {}}>
          <span onDoubleClick={(e)=> this.handlePlayClick(e)}>
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
