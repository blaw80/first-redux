import React, { Component } from 'react';
import { connect, dispatch } from 'react-redux';
import { addTrack, removeTrack, loadLibrary, playTrack } from '../actions.js';

import AudioPlayer from './player.js';
import Playlist from './Playlist';
import Library from './Library';
import StatusBar from './StatusBar';

class MusicApp extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <div className='row' style={{margin: '50px'}}>
        <h1>music app</h1>
        <input type="button" value="Load Songs Library" onClick={() => dispatch(loadLibrary())} />
        <Library songs={this.props.library.songs} onAddClick={trackinfo => dispatch(addTrack(trackinfo))} />
        <div className='col-md-8' style={{maxWidth: 400 +'px'}} >
          <AudioPlayer src={this.props.player.url} />
          <h2>current playlist:</h2>
          <Playlist playlist={this.props.playlist}
                    onRemoveClick={trackinfo => dispatch(removeTrack(trackinfo))}
                    onPlayClick={trackinfo => dispatch(playTrack(trackinfo))} />
        </div>
        <StatusBar libraryStatus={this.props.library.status} />
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
