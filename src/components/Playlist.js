import React, { Component } from 'react';

class PlaylistItem extends Component{

  handleRemoveClick(e){
    e.preventDefault();
    this.props.onRemoveClick(this.props.trackinfo);
  }

  handlePlayClick(e){
    e.preventDefault();
    this.props.onPlayClick(this.props.trackinfo);
  }

  render(){
    return(
      <li className='list-group-item'>{this.props.trackinfo.title }, {this.props.trackinfo.artist}
      <span className='fa fa-play' style={{marginLeft: 10 + 'px'}}
      onClick={ (e)=> this.handlePlayClick(e) }></span>
       <span onClick={(e) => this.handleRemoveClick(e)}
       className="fa fa-trash-o"
       style={{float:'right'}}></span></li>
    );
  }
}

export default class Playlist extends Component{

  render(){
    let playlistNodes = this.props.playlist.map((node, index) => {
      node.key = index;
      return (
        <PlaylistItem key={index} trackinfo={node} onRemoveClick={this.props.onRemoveClick}
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
