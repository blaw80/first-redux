import React, { Component } from 'react';
import { connect, dispatch } from 'react-redux';
import { addTrack, removeTrack, loadLibrary, playTrack, updateTime,
        togglePlay } from '../actions.js';

import AudioPlayer from './Player.js';
import Library from './Library';
import StatusBar from './StatusBar';

class MusicApp extends Component {
  componentDidMount(){
    this.props.dispatch(loadLibrary())
  }
// i really need to re-write this to be simpler about passing my props!!
  render() {
    const { dispatch } = this.props;
    return (
      <div className='row' style={{margin: '50px'}}>
        <h1>music app</h1>
        <Library songs={this.props.library.songs}
                  onAddClick={trackinfo => dispatch(addTrack(trackinfo))} />
        <AudioPlayer src={this.props.player.playing.url}
                    time={this.props.player.time}
                    currentTrack={this.props.player.playing.key}
                    duration={this.props.player.duration}
                    isPlaying={this.props.player.playing.currentlyPlaying}
                    togglePlay={(bool)=> dispatch(togglePlay(bool))}
                    updateTime={(currentTime, duration) => dispatch(updateTime(currentTime, duration))}
                    playlist={this.props.playlist}
                    onRemoveClick={trackinfo => dispatch(removeTrack(trackinfo))}
                    onPlayClick={trackinfo => dispatch(playTrack(trackinfo))}  />
      </div>
    );
  }
}

function mapGlobalStateToProps(state) {
  return {
    library: state.library,
    playlist: state.playlist,
    player: state.player
  }
}

export default connect(mapGlobalStateToProps)(MusicApp);
