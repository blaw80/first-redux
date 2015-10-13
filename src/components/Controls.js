import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ProgressBar extends React.Component{
  handleClick(e){
    //calculate the new position...
    let duration = Math.floor(this.props.duration);
    let position = e.nativeEvent.offsetX;
    let barWidth = ReactDOM.findDOMNode(this.refs.pbar).clientWidth;
    let newPosition = duration * ( position / barWidth );
    // and send it off to the parent for updating the AUDIO element
    this.props.progressBarClick(newPosition);
  }

  render(){
    let elapsed = Math.floor((Math.floor(this.props.time) / Math.floor(this.props.duration)) * 100);

    return <div>
            <h2>The current elapsed time is: {elapsed} </h2>
            <div className="progress" onClick={this.handleClick.bind(this)} ref='pbar'>
              <div className="progress-bar" role="progressbar" aria-valuenow={elapsed}
                    aria-valuemin="0" aria-valuemax="100" style={{width: elapsed + '%' }}>
                <span className="sr-only"></span>
              </div>
            </div>
          </div>
  }
}

export default class Controls extends React.Component {

  componentWillReceiveProps(nextProps){
    if (nextProps.playlist.length === 1 && this.props.playlist.length === 0) {
      this.props.onPlayClick(nextProps.playlist[0])
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.player.playing.key !== prevProps.player.playing.key){
      let playerElement = ReactDOM.findDOMNode(this.refs.player);
      playerElement.load();
      playerElement.play();
    }
  }

  componentDidMount() {
    let playerElement = ReactDOM.findDOMNode(this.refs.player);

    playerElement.addEventListener('playing', this.togglePlay.bind(this, true));
    playerElement.addEventListener('pause', this.togglePlay.bind(this, false));
    playerElement.addEventListener('timeupdate', this.audioUpdate.bind(this, playerElement));
    playerElement.addEventListener('ended', this.audioEnded.bind(this, playerElement));
    // playerElement.addEventListener('loadedmetadata', this.newTrackLoaded);
    // playerElement.addEventListener('canplay', this.audioReady);
  }
  newTrackLoaded(){
    let playerElement = ReactDOM.findDOMNode(this.refs.player);
    this.props.setDuration(playerElement.duration)
  }
// just put this method straight into the event handler?
  togglePlay(bool){
    this.props.togglePlay(bool);
  }
  audioUpdate(playerElement) {
    if (Math.floor(playerElement.currentTime) !== this.props.player.time){
      this.props.updateTime(playerElement.currentTime);
    }
  }
  audioEnded(playerElement){
    // first make sure current track is NOT last in Playlist
    let trackIndex = this.props.player.playing.key
    if ( trackIndex !== this.props.playlist.length -1 ){
      this.props.onPlayClick(this.props.playlist[trackIndex+1])
    }
  }
  playAudio(){
    let playerElement = ReactDOM.findDOMNode(this.refs.player);
    if ( this.props.player.playing.currentlyPlaying )
      {
        playerElement.pause();
      }
    else {
      playerElement.load();
      playerElement.play();
    }
  }
  rewindAudio(){
    let playerElement = ReactDOM.findDOMNode(this.refs.player);
    let trackIndex = this.props.player.playing.key;
    if (playerElement.currentTime > 2){ playerElement.currentTime = 0}
    else if (trackIndex > 0){
      this.props.onPlayClick(this.props.playlist[trackIndex-1])
     }
  }

  progressBarClick(newPosition) {
/////////////////////////////////////////////////////////
// THIS REALLY BOTHERS ME BUT I CAN'T FIGURE OUT HOW TO BIND THIS PROPERLY
////////////////////////////////////////////////////////////
    let playerElement = document.getElementById('player');
    playerElement.currentTime = Math.floor(newPosition);
  }

  render(){
    let play = <i className='fa fa-play'></i>;
    let pause = <i className='fa fa-pause'></i>;

    return (
      <div>
        <audio onLoadedMetadata={this.newTrackLoaded.bind(this)}
              ref='player' id='player' controls >
          <source src={this.props.player.playing.url} />
        </audio>
        <ProgressBar time={this.props.player.time}
                      duration={this.props.player.duration}
                      player={this.refs.player}
                      progressBarClick={this.progressBarClick} />
        <button onClick={this.rewindAudio.bind(this)}
                type="button"
                className="btn btn-default">RW</button>
        <button onClick={this.playAudio.bind(this)}
                type="button"
                className="btn btn-default">{this.props.player.playing.currentlyPlaying ? pause : play }</button>
        <button type="button"
                className="btn btn-default">ff</button>
      </div>
    );
  }
}
