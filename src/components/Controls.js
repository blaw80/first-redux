import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import audioControls from './audioControlModule.js'

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
  ///////////////////////FIX THIS
///////////////////ONCLICK is broken after adding the stacked pbar for loading
  render(){
    let elapsed = Math.floor(this.props.time / Math.floor(this.props.duration) * 100);
    let buffered = this.props.buffered - elapsed;

    return <div>
            <div style={{marginBottom: 10 + 'px'}}className="progress" onClick={this.handleClick.bind(this)} ref='pbar'>
              <div className="progress-bar" role="progressbar" aria-valuenow={elapsed}
                    aria-valuemin="0" aria-valuemax="100" style={{width: elapsed + '%' }}>
                <span className="sr-only"></span>
              </div>
              <div className="progress-bar progress-bar-striped progress-bar-success" role="progressbar" aria-valuenow={buffered}
                    aria-valuemin="0" aria-valuemax="100" style={{width: buffered + '%' }}>
                <span className="sr-only"></span>
              </div>
            </div>
          </div>
  }
}

export default class Controls extends React.Component {
  constructor(){
    super();
    this.playerElement = {};
    this.buffered = 0;
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.playlist.length === 1 && this.props.playlist.length === 0) {
      this.props.onPlayClick(nextProps.playlist[0])
    }
  }
  componentDidUpdate(prevProps){
    if (this.props.player.playing.key !== prevProps.player.playing.key){
      this.playerElement.load();
      this.playerElement.play();
    }
  }
  componentDidMount() {
    this.playerElement = this.refs.player
// if this app ever gets multiple pages, unbind these listeners in componenDidUnmount
    this.playerElement.addEventListener('playing', this.togglePlay.bind(this, true));
    this.playerElement.addEventListener('pause', this.togglePlay.bind(this, false));
    this.playerElement.addEventListener('timeupdate', this.audioUpdate.bind(this, this.playerElement));
    this.playerElement.addEventListener('ended', this.audioEnded.bind(this));
    this.playerElement.addEventListener('progress', this.getLoadStatus.bind(this));
    // this.playerElement.addEventListener('canplay', this.audioReady);
    // playerElement.addEventListener('loadedmetadata', this.newTrackLoaded);
  }
  getLoadStatus(){
    let buffered =  this.playerElement.buffered.end(this.playerElement.buffered.length -1);
    this.buffered = Math.floor(( buffered / this.playerElement.duration) * 100);
    console.log(this.buffered);
  }
  togglePlay(bool){
    this.props.togglePlay(bool);
  }
  audioUpdate(playerElement) {
    if (Math.floor(playerElement.currentTime) !== this.props.player.time){
      this.props.updateTime(playerElement.currentTime);
    }
  }
  audioEnded(){
    // first make sure current track is NOT last in Playlist
    let trackIndex = this.props.player.playing.key
    if ( trackIndex !== this.props.playlist.length -1 ){
      this.props.onPlayClick(this.props.playlist[trackIndex+1])
    }
  }
  render(){
    let play = <i className='fa fa-play'></i>;
    let pause = <i className='fa fa-pause'></i>;
    let seconds = this.props.player.time % 60;
    //OBJECT DESTRUCTURING IS AWESOME - USE THIS MORE
    const {playlist, player} = this.props;
    let {title, artist} = player.playing;
    let minutes = Math.floor(this.props.player.time / 60);
    if (seconds < 10) { seconds = '0'+seconds}
    return (
      <div>
        <audio onLoadedMetadata={audioControls.newTrackLoaded.bind(this)}
              ref='player' id='player' >
          <source src={player.playing.url} />
        </audio>
        <h4>now playing:</h4>
        {playlist.length ? <p>{artist}, {title} - {minutes}:{seconds}</p> : 'add a track from the library to start the music'}
        <ProgressBar time={this.props.player.time}
                      buffered={this.buffered}
                      duration={this.props.player.duration}
                      player={this.refs.player}
                      progressBarClick={audioControls.progressBarClick.bind(this)} />
        <button onClick={audioControls.rewindAudio.bind(this)}
                type="button"
                className="btn btn-default">
                <i className='fa fa-step-backward'></i></button>
        <button onClick={audioControls.playAudio.bind(this)}
                type="button"
                className="btn btn-default">{this.props.player.playing.currentlyPlaying ? pause : play }</button>
        <button onClick={audioControls.ffAudio.bind(this)}
                type="button"
                className="btn btn-default">
                <i className='fa fa-step-forward'></i></button>
      </div>
    );
  }
}
