import React, { Component } from 'react';
import { connect, dispatch } from 'react-redux';
import { addTrack, removeTrack, loadLibrary } from '../actions.js';
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
        <Playlist playlist={this.props.playlist} onRemoveClick={trackinfo => dispatch(removeTrack(trackinfo))} />
        <StatusBar libraryStatus={this.props.library.status} />
      </div>
    );
  }
}

function mapGlobalStateToProps(state) {
  return {
    library: state.library,
    playlist: state.playlist
  }
}

export default connect(mapGlobalStateToProps)(MusicApp);
