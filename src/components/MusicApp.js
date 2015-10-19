import React, { Component } from 'react';
import { connect, dispatch } from 'react-redux';
import { addTrack, removeTrack, loadLibrary, playTrack, updateTime,
        togglePlay, setDuration } from '../actions.js';

import AudioPlayer from './Player.js';
import Library from './Library';
import StatusBar from './StatusBar';

class MusicApp extends Component {
  componentDidMount(){
    this.props.dispatch(loadLibrary())
  }
  render() {
    const { dispatch } = this.props;
    return (
      <div className='row' style={{margin: '50px'}}>
        <h1>make a playlist!</h1>
        <Library songs={this.props.library.songs}
                  onAddClick={trackinfo => dispatch(addTrack(trackinfo))} />
        <AudioPlayer player={this.props.player}
                    playlist={this.props.playlist}
                    togglePlay={(bool)=> dispatch(togglePlay(bool))}
                    updateTime={(currentTime) => dispatch(updateTime(currentTime))}
                    setDuration={(duration)=> dispatch(setDuration(duration))}
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
