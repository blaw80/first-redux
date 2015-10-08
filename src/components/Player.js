import React, { Component } from 'react';
import Playlist from './Playlist';
import Controls from './Controls';

export default class AudioPlayer extends React.Component {

  render(){
    return (
      <div className='col-md-8' style={{maxWidth: 400 +'px'}} >
        <h1>audio player</h1>
        <Controls isPlaying={this.props.isPlaying}
                  time={this.props.time}
                  duration={this.props.duration}
                  player={this.refs.player}
                  src={this.props.src}
                  togglePlay={this.props.togglePlay}
                  audioUpdate={this.props.audioUpdate}
                  updateTime={this.props.updateTime}
                  isPlaying={this.props.isPlaying} />
        <h2>current playlist:</h2>
        <Playlist playlist={this.props.playlist}
                  onRemoveClick={this.props.onRemoveClick}
                  onPlayClick={this.props.onPlayClick} />
      </div>
    );
  }
}