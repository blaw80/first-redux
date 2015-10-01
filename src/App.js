import React, { Component, Proptypes } from 'react';
import { createStore, combineReducers, compose } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { Provider } from 'react-redux';

import musicApp from './reducers.js';
import MusicApp from './components/musicbox.js';

const finalCreateStore = compose(
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const store = finalCreateStore(musicApp);

export default class App extends Component {
  render(){
    return (
      <div>
        <Provider store={store}>
          {() => <MusicApp store={store}/>}
        </Provider>
        <DebugPanel top right bottom>
        <DevTools store={store}
                  monitor={LogMonitor}
                  visibleOnLoad={true} />
        </DebugPanel>
      </div>
    );
  }
}

// Dispatch some actions
// store.dispatch(addTrack({url: '#', song: '1234', artist:'pppppp'}));
// store.dispatch(addTrack('listen about reducers'));
// store.dispatch(addTrack('Learn about drugs'));
// store.dispatch(removeTrack(2));
//store.dispatch(removeTrack(2));
