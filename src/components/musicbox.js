import React, { Component } from 'react';
import { connect, dispatch } from 'react-redux';

import { addTrack, removeTrack } from '../actions.js';
import * as MusicAction from '../actions.js';

import Playlist from './playlistitems.js';
import Library from './songlibitems.js';

class MusicApp extends Component {
  render(){
    const { dispatch } = this.props;
    return (
      <div className='row' style={{margin: 50 + 'px'}}>
        <h1>music app</h1>
        <Library library={this.props.library} onAddClick={trackinfo => dispatch(addTrack(trackinfo))} />
        <Playlist playlist={this.props.playlist} onRemoveClick={trackinfo => dispatch(removeTrack(trackinfo))} />
      </div>
    );
  }
}

function mapGlobalStateToProps(state){ return{
  library: state.library,
  playlist: state.playlist
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
