import React, { Component } from 'react';

class ProgressBar extends React.Component{

  render(){
    let elapsed = Math.floor((Math.floor(this.props.time) / Math.floor(this.props.duration)) * 100);

    return <div>
            <h2>The current elapsed stime is: {elapsed} </h2>
            <div className="progress">
              <div className="progress-bar" role="progressbar" aria-valuenow={elapsed}
                    aria-valuemin="0" aria-valuemax="100" style={{width: elapsed + '%' }}>
                <span className="sr-only">60% Complete</span>
              </div>
            </div>
          </div>
  }
}

class Controls extends React.Component {

  render(){
    let play =<i className='fa fa-play'></i>;
    let pause =<i className='fa fa-pause'></i>;
    return (
      <div>
        <button type="button"
                className="btn btn-default">RW</button>
        <button onClick={this.props.playClick}
                type="button"
                className="btn btn-default">{this.props.isPlaying ? pause : play }</button>
        <button type="button"
                className="btn btn-default">ff</button>
      </div>
    );
  }
}

export default class AudioPlayer extends React.Component {

      componentDidMount() {
        let playerElement = React.findDOMNode(this.refs.player);

        playerElement.addEventListener('playing', this.togglePlay.bind(this, true));
        playerElement.addEventListener('pause', this.togglePlay.bind(this, false));

        playerElement.addEventListener('canplay', this.audioReady);
        playerElement.addEventListener('ended', this.audioEnded);
        playerElement.addEventListener('timeupdate', this.audioUpdate.bind(this, playerElement));
        playerElement.addEventListener('pause', this.audioPause);
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
    return (
      <div>
        <h1>audio player</h1>
        <audio ref='player' controls >
         <source src={this.props.src}/>
       </audio>
        <ProgressBar time={this.props.time} duration={this.props.duration} />
        <Controls playClick={this.playAudio.bind(this)}
                  isPlaying={this.props.isPlaying} />
      </div>
    );
  }
}
