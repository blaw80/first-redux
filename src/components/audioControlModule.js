
const audioControls = {
  newTrackLoaded(){
    let duration = this.playerElement.duration;
    this.props.setDuration(duration)
  },

  playAudio(){
    if ( this.props.player.playing.currentlyPlaying ) {
        this.playerElement.pause();
      }
    else {
      // this.playerElement.load();
      this.playerElement.play();
    }
  },
  rewindAudio(){
    let trackIndex = this.props.player.playing.key;
    if (this.playerElement.currentTime > 2){ this.playerElement.currentTime = 0}
    else if (trackIndex > 0){
      this.props.onPlayClick(this.props.playlist[trackIndex-1])
     }
  },
  ffAudio(){
    let trackIndex = this.props.player.playing.key;
    if (trackIndex < this.props.playlist.length -1){
      this.props.onPlayClick(this.props.playlist[trackIndex+1]);
    }
  },
  progressBarClick(newPosition) {
    this.playerElement.currentTime = Math.floor(newPosition);
  }

}


export default audioControls;
