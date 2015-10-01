import React, { Component } from 'react';

class PlaylistItem extends Component{
  handleRemoveClick(e){
    e.preventDefault();
    this.props.onRemoveClick(this.props.trackinfo);
  }
  render(){
    return(
      <li className='list-group-item'>{this.props.trackinfo.title },
       {this.props.trackinfo.artist}
       <span onClick={(e) => this.handleRemoveClick(e)}
       className="fa fa-trash-o"
       style={{float:'right'}}></span></li>
    );
  }
}

export default class Playlist extends Component{

  render(){
    let playlistNodes = this.props.playlist.map( (node, index) =>
      { node.key = index;
        return (<PlaylistItem trackinfo={node} onRemoveClick={this.props.onRemoveClick} />); } );

    return (
      <div className='col-md-8' style={{maxWidth: 400 +'px'}} >
        <h2>current playlist</h2>
        <ul className='list-group'>
          {playlistNodes}
        </ul>
      </div>
    );
  }
}
