import React, { Component } from 'react';
import { connect, dispatch } from 'react-redux';

import { addTrack, removeTrack } from '../actions.js';
import * as MusicAction from '../actions.js';

import Playlist from './playlistitems.js';
import Library from './songlibitems.js';

class MusicApp extends Component {
  render(){
    let store = this.props.store;
    return (
      <div className='row' style={{margin: 50 + 'px'}}>
        <h1>music app</h1>
        <Library library={this.props.library} onAddClick={( trackinfo ) => store.dispatch(addTrack(trackinfo))} />
        <Playlist playlist={this.props.playlist} onRemoveClick={ (trackinfo) =>  store.dispatch(removeTrack(trackinfo)) } />
      </div>
    );
  }
}
function select(state){ return{
  library: state.library,
  playlist: state.playlist
  }
}

export default connect(select)(MusicApp);

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
