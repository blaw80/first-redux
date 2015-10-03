import React, { Component } from 'react';
import { connect, dispatch } from 'react-redux';

import { addTrack, removeTrack, loadSongs, playTrack } from '../actions.js';
import * as MusicAction from '../actions.js';

import AudioPlayer from './player.js';
import Playlist from './playlistitems.js';
import Library from './songlibitems.js';

class MusicApp extends Component {
  render(){
    const { dispatch } = this.props;
    return (
      <div className='row' style={{margin: 50 + 'px'}}>
        <h1>music app</h1>
        <button onClick={ () => dispatch(loadSongs(dispatch)) } >ajax call</button>
        <Library library={this.props.library} onAddClick={trackinfo => dispatch(addTrack(trackinfo))} />

        <div className='col-md-8' style={{maxWidth: 400 +'px'}} >
          <AudioPlayer src='https://archive.org/download/BlindLemonJefferson-TheEssential/06%20Rabbit%20Foot%20Blues.mp3' />
          <h2>current playlist:</h2>
          <Playlist playlist={this.props.playlist}
                    onRemoveClick={trackinfo => dispatch(removeTrack(trackinfo))}
                    onPlayClick={trackinfo => dispatch(playTrack(trackinfo))} />
        </div>
      </div>
    );
  }
}

function mapGlobalStateToProps(state){ return{
  library: state.library,
  playlist: state.playlist,
  player: state.player
  }
}

export default connect(mapGlobalStateToProps)(MusicApp);

//
// function mapState(state){
//   return {
//     playlist: state.playlist,
//     library: state.library
//   };
// }
// function mapDispatch(dispatch) {
//   return {
//     actions: bindActionCreators( MusicAction, dispatch)
//   };
// }
