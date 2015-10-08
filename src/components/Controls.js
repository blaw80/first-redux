import React, { Component } from 'react';

class ProgressBar extends React.Component{
  handleClick(e){
    let duration = Math.floor(this.props.duration);
    let position = e.nativeEvent.offsetX;
    let barWidth = React.findDOMNode(this.refs.pbar).clientWidth;

    let newPosition = duration * ( position / barWidth );
    let playerElement = React.findDOMNode(this.props.player);
    playerElement.currentTime = newPosition;
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
  componentDidMount() {
    let playerElement = React.findDOMNode(this.refs.player);

    playerElement.addEventListener('playing', this.togglePlay.bind(this, true));
    playerElement.addEventListener('pause', this.togglePlay.bind(this, false));
    playerElement.addEventListener('timeupdate', this.audioUpdate.bind(this, playerElement));
    // playerElement.addEventListener('canplay', this.audioReady);
    // playerElement.addEventListener('ended', this.audioEnded);
  }

  togglePlay(bool){
    this.props.togglePlay(bool);
  }
  audioUpdate(playerElement) {
    this.props.updateTime(playerElement.currentTime, playerElement.duration);
  }
  playAudio(){
    let playerElement = React.findDOMNode(this.refs.player);
    if ( this.props.isPlaying )
      {
        playerElement.pause();
      }
    else {
      playerElement.load();
      playerElement.play();
    }
  }

  render(){
    let play = <i className='fa fa-play'></i>;
    let pause = <i className='fa fa-pause'></i>;
    return (
      <div>
        <audio ref='player' id='player' controls >
          <source src={this.props.src} />
        </audio>
        <ProgressBar time={this.props.time}
                      duration={this.props.duration}
                      player={this.refs.player}/>
        <button type="button"
                className="btn btn-default">RW</button>
        <button onClick={this.playAudio.bind(this)}
                type="button"
                className="btn btn-default">{this.props.isPlaying ? pause : play }</button>
        <button type="button"
                className="btn btn-default">ff</button>
      </div>
    );
  }
}
