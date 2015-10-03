import React, { Component } from 'react';

class ProgressBar extends React.Component{
  render(){
    return <h2>The current time is: {this.props.time}</h2>
  }
}

class Controls extends React.Component {
  render(){
    return (
        <button onClick={this.props.alertClick} type="button" className="btn btn-default">alert time</button>
    );
  }
}

export default class AudioPlayer extends React.Component {

      componentDidMount() {
        let playerElement = React.findDOMNode(this.refs.player);

        playerElement.addEventListener('canplay', this.audioReady);
        playerElement.addEventListener('ended', this.audioEnded);
        playerElement.addEventListener('timeupdate', this.audioUpdate);
        playerElement.addEventListener('pause', this.audioPause);
      }

      audioUpdate() {
            let playerElement = React.findDOMNode(this.refs.player);
            // alert('current time is: '+ playerElement.currentTime );
            return playerElement.currentTime;
      }

  render(){
    return (
      <div>
        <h1>audio player</h1>
        <audio ref='player' controls id='player'>
         <source src={this.props.src}/>
       </audio>
        <ProgressBar time={this.audioUpdate} />
        <Controls alertClick={this.audioUpdate.bind(this)} />
      </div>
    );
  }
}
