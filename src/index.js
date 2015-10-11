import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

import ReactDOMServer from 'react-dom/server';

import musicApp from './reducers.js';
import MusicApp from './components/MusicApp';

const store = configureStore();

let rootElement = document.getElementById('root');

ReactDOM.render(
  <div>
    <Provider store={store}>
      {<MusicApp />}
    </Provider>
    <DebugPanel top right bottom>
    <DevTools store={store}
              monitor={LogMonitor}
              visibleOnLoad={true} />
    </DebugPanel>
  </div>,
  rootElement
);

// Dispatch some actions
// store.dispatch(addTrack({url: '#', song: '1234', artist:'pppppp'}));
// store.dispatch(addTrack('listen about reducers'));
// store.dispatch(addTrack('Learn about songs'));
// store.dispatch(removeTrack(2));
//store.dispatch(removeTrack(2));
